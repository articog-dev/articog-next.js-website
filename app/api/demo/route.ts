import { NextResponse } from "next/server";
import { isRecord, parseJsonBody, validateBoolean, validateEmail, validateEnum, validateString, validateStringArray, validateUrl } from "../../../lib/api-validation";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestHistory = new Map<string, number[]>();

function isRateLimited(request: Request): boolean {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp = forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip");

  if (!clientIp) return false;

  const now = Date.now();
  const recentRequests = (requestHistory.get(clientIp) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestHistory.set(clientIp, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requestHistory.set(clientIp, recentRequests);
  return false;
}

export async function POST(request: Request) {
  if (isRateLimited(request)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const body = await parseJsonBody(request);
  if (!body.ok) {
    return NextResponse.json({ success: false, error: body.error }, { status: 400 });
  }

  const data = body.value;
  const firstName = validateString(data.firstName, { required: true, maxLength: 80 });
  const lastName = validateString(data.lastName, { required: true, maxLength: 80 });
  const name = validateString(data.name, { required: true, maxLength: 170 });
  const email = validateEmail(data.email);
  const company = validateString(data.company, { required: true, maxLength: 160 });
  const role = validateString(data.role, { maxLength: 160 });
  const serviceInterest = validateStringArray(data.serviceInterest, {
    allowed: ["Brand Film", "Commercial/Ad", "Social Content", "Product Visuals", "Audio Ad", "Other"] as const,
    maxItems: 6,
    maxItemLength: 40,
  });
  const budget = validateEnum(data.budget, ["Under $5k", "$5k $15k", "$15k $50k", "$50k+"] as const, { maxLength: 32 });
  const timeline = validateEnum(data.timeline, ["Immediately", "Within 1 month", "1-3 months", "Planning for future"] as const, { maxLength: 32 });
  const projectContext = validateString(data.projectContext, { maxLength: 5_000 });
  const referenceUrl = validateUrl(data.referenceUrl, { maxLength: 2_048 });
  const consent = validateBoolean(data.consent, true);
  const attribution = data.attribution === undefined ? {} : data.attribution;
  const attributionValid = isRecord(attribution);
  const attributionValues = attributionValid ? {
    source: validateString(attribution.source, { maxLength: 200 }),
    medium: validateString(attribution.medium, { maxLength: 200 }),
    campaign: validateString(attribution.campaign, { maxLength: 200 }),
    content: validateString(attribution.content, { maxLength: 200 }),
    term: validateString(attribution.term, { maxLength: 200 }),
    referrer: validateUrl(attribution.referrer, { maxLength: 2_048 }),
  } : null;

  if (
    !firstName.ok || !lastName.ok || !name.ok || !email.ok || !company.ok || !role.ok ||
    !serviceInterest.ok || !budget.ok || !timeline.ok || !projectContext.ok || !referenceUrl.ok ||
    !consent.ok || !consent.value || !attributionValid || !attributionValues ||
    !attributionValues.source.ok || !attributionValues.medium.ok || !attributionValues.campaign.ok ||
    !attributionValues.content.ok || !attributionValues.term.ok || !attributionValues.referrer.ok
  ) {
    return NextResponse.json(
      { success: false, error: "Please complete the required fields and consent." },
      { status: 400 }
    );
  }

  const sheetsUrl = process.env.GOOGLE_SHEETS_WEB_APP_URL;
  if (!sheetsUrl) {
    return NextResponse.json(
      {
        success: false,
        error: "Demo requests are not configured for submission yet. Please contact info@articog.com.",
      },
      { status: 503 }
    );
  }

  const lead = {
    formType: "demo",
    firstName: firstName.value,
    lastName: lastName.value,
    name: name.value,
    email: email.value,
    company: company.value,
    role: role.value || "",
    serviceInterest: serviceInterest.value,
    budget: budget.value || "",
    timeline: timeline.value || "",
    projectContext: projectContext.value || "",
    referenceUrl: referenceUrl.value || "",
    consent: true,
    attribution: {
      source: attributionValues.source.value || "",
      medium: attributionValues.medium.value || "",
      campaign: attributionValues.campaign.value || "",
      content: attributionValues.content.value || "",
      term: attributionValues.term.value || "",
      referrer: attributionValues.referrer.value || "",
    },
  };

  try {
    const response = await fetch(sheetsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "We could not save your request. Please try again later." },
        { status: 502 }
      );
    }
  } catch {
    return NextResponse.json(
      { success: false, error: "We could not save your request. Please try again later." },
      { status: 502 }
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const recipient = process.env.CONTACT_INTERNAL_ALERT_EMAIL || "info@articog.com";

  if (resendApiKey && from) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: [recipient],
          subject: "New demo request | Articog",
          text: [
            "New demo request saved.",
            "",
            `Name: ${lead.name}`,
            `Email: ${lead.email}`,
            `Company: ${lead.company}`,
            `Role: ${lead.role}`,
            `Service interest: ${lead.serviceInterest.join(", ")}`,
            `Budget: ${lead.budget}`,
            `Timeline: ${lead.timeline}`,
            `Project context: ${lead.projectContext}`,
            `Reference / Website URL: ${lead.referenceUrl}`,
            `Source: ${lead.attribution.source || ""}`,
            `Referrer: ${lead.attribution.referrer || ""}`,
          ].join("\n"),
          reply_to: lead.email,
        }),
      });
      if (!response.ok) throw new Error(`Email provider returned ${response.status}.`);
    } catch {
      // The lead is already persisted; email notification is best effort.
    }
  }

  return NextResponse.json({ success: true, message: "Demo request saved." });
}
