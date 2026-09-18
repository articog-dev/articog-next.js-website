import { NextResponse } from "next/server";

type DemoPayload = {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  company: string;
  role: string;
  serviceInterest: string[];
  budget: string;
  timeline: string;
  projectContext?: string;
  referenceUrl?: string;
  consent: boolean;
  attribution: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
    term?: string;
    referrer?: string;
  };
};

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

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  if (isRateLimited(request)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let data: DemoPayload;
  try {
    data = (await request.json()) as DemoPayload;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
  }

  if (
    !data.firstName?.trim() ||
    !data.lastName?.trim() ||
    !data.name?.trim() ||
    !isValidEmail(data.email?.trim() || "") ||
    !data.company?.trim() ||
    !data.consent
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
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    name: data.name.trim(),
    email: data.email.trim(),
    company: data.company.trim(),
    role: data.role?.trim() || "",
    serviceInterest: Array.isArray(data.serviceInterest) ? data.serviceInterest : [],
    budget: data.budget?.trim() || "",
    timeline: data.timeline?.trim() || "",
    projectContext: data.projectContext?.trim() || "",
    referenceUrl: data.referenceUrl?.trim() || "",
    consent: true,
    attribution: data.attribution ?? {},
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
