import { NextResponse } from "next/server";
import { parseJsonBody, validateEmail, validateEnum, validateString } from "../../../lib/api-validation";
import { checkPublicFormRateLimit } from "../../../lib/rate-limit";
import { sendResendEmail } from "../../../lib/resend";

export async function POST(request: Request) {
  const rateLimit = await checkPublicFormRateLimit(request, "privacy-request");
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

  const recipient = process.env.PRIVACY_REQUEST_ALERT_EMAIL || process.env.CONTACT_INTERNAL_ALERT_EMAIL;

  if (!recipient || !process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) {
    return NextResponse.json(
      {
        success: false,
        error: "Privacy requests are not configured for submission yet. Please email info@articog.com.",
      },
      { status: 503 }
    );
  }

  const result = await sendResendEmail("privacy-request-review", {
    to: recipient,
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
    replyTo: email.value,
  });

  if (!result.ok) {
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
