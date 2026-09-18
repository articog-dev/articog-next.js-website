import { NextResponse } from "next/server";
import { parseJsonBody, validateEmail, validateEnum, validateString } from "../../../lib/api-validation";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;
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

  const body = await parseJsonBody(request, 16 * 1024);
  if (!body.ok) {
    return NextResponse.json({ success: false, error: body.error }, { status: 400 });
  }

  const name = validateString(body.value.name, { required: true, maxLength: 160 });
  const email = validateEmail(body.value.email);
  const requestType = validateEnum(body.value.requestType, ["know", "delete", "correct", "opt-out"] as const, { required: true, maxLength: 16 });
  const details = validateString(body.value.details, { maxLength: 5_000 });

  if (!name.ok || !email.ok || !requestType.ok || !details.ok) {
    return NextResponse.json(
      { success: false, error: "Please provide a valid name, email, and request type." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const recipient = process.env.PRIVACY_REQUEST_ALERT_EMAIL || process.env.CONTACT_INTERNAL_ALERT_EMAIL;

  if (!apiKey || !from || !recipient) {
    return NextResponse.json(
      {
        success: false,
        error: "Privacy requests are not configured for submission yet. Please email info@articog.com.",
      },
      { status: 503 }
    );
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [recipient],
        subject: `Data rights request: ${requestType.value}`,
        text: [
          "A data rights request was received for review.",
          "",
          `Name: ${name.value}`,
          `Email: ${email.value}`,
          `Request type: ${requestType.value}`,
          "",
          "Details:",
          details.value || "No additional details provided.",
        ].join("\n"),
        reply_to: email.value,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "We could not submit your request. Please try again later." },
        { status: 502 }
      );
    }
  } catch {
    return NextResponse.json(
      { success: false, error: "We could not submit your request. Please try again later." },
      { status: 502 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Your request was received for review. We may contact you to verify your identity.",
  });
}
