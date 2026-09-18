import { NextResponse } from "next/server";
import { isRecord, parseJsonBody, validateBoolean, validateEmail, validateEnum, validateString, validateStringArray, validateUrl } from "../../../lib/api-validation";
import { checkPublicFormRateLimit } from "../../../lib/rate-limit";
import { sendResendEmail } from "../../../lib/resend";
import { saveLead, withPersistenceTimeout } from "../../../lib/lead-storage";

export async function POST(request: Request) {
  const rateLimit = await checkPublicFormRateLimit(request, "demo");
  if (!rateLimit.available) {
    return NextResponse.json(
      { success: false, error: "This service is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }
  if (!rateLimit.success) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
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

  const durableResult = await saveLead({
    id: crypto.randomUUID(),
    type: "demo",
    source: "website",
    submittedAt: new Date().toISOString(),
    fields: lead,
  });
  if (!durableResult.ok) {
    console.error("Demo durable lead storage failed.", durableResult.reason);
    return NextResponse.json(
      { success: false, error: "We could not save your request. Please try again later." },
      { status: 503 },
    );
  }

  try {
    const response = await withPersistenceTimeout(fetch(sheetsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      }));

    if (!response.ok) {
      throw new Error("Google Sheets mirror returned an unsuccessful response.");
    }
  } catch (error) {
    console.error("Demo Google Sheets mirror failed; durable lead retained.", error instanceof Error ? error.message : "unknown-error");
  }

  const recipient = process.env.CONTACT_INTERNAL_ALERT_EMAIL || "info@articog.com";

  try {
    const result = await sendResendEmail("demo-internal-notification", {
      to: recipient,
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
      replyTo: lead.email,
    });
    if (!result.ok) console.error("Demo internal notification was not delivered; lead was already persisted.");
  } catch {
    console.error("Demo internal notification failed unexpectedly; lead was already persisted.");
  }

  return NextResponse.json({ success: true, message: "Demo request saved." });
}
