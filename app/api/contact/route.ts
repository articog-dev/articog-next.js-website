import { parseJsonBody, validateEmail, validateEnum, validateString, validateUrl } from "../../../lib/api-validation";
import { acquireIdempotency, completeIdempotency, getIdempotencyFingerprint, releaseIdempotency } from "../../../lib/idempotency";
import { checkPublicFormRateLimit } from "../../../lib/rate-limit";
import { getRequestId, withRequestId } from "../../../lib/request-context";
import { sendResendEmail } from "../../../lib/resend";
import { saveLead, withPersistenceTimeout } from "../../../lib/lead-storage";

type ContactData = {
  name: string;
  email: string;
  company?: string;
  companyWebsite?: string;
  inquiryType: string;
  message: string;
};

const DEFAULT_INTERNAL_ALERT_EMAIL = "articog.media.01@gmail.com";
const CONTACT_NOTIFICATION_EMAIL = "info@articog.com";
async function alertSheetFailure(data: ContactData, error: unknown, requestId: string) {
  const recipient = process.env.CONTACT_INTERNAL_ALERT_EMAIL || DEFAULT_INTERNAL_ALERT_EMAIL;

  if (!recipient) {
    console.error(
      "Contact lead backup alert is not configured. Set CONTACT_INTERNAL_ALERT_EMAIL so failed Google Sheets submissions trigger an internal notification.",
      { requestId, error: error instanceof Error ? error.message : "unknown-error" }
    );
    return;
  }

  try {
    const result = await sendResendEmail(`contact-sheet-failure-alert:${requestId}`, {
      to: recipient,
      subject: "Contact form backup alert: Google Sheets submission failed",
      text: [
        "A contact form lead could not be saved to Google Sheets.",
        "",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${data.company}`,
        `Company website: ${data.companyWebsite}`,
        `Inquiry type: ${data.inquiryType}`,
        `Message: ${data.message}`,
        "",
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      ].join("\n"),
    });
    if (!result.ok) console.error("Contact sheet failure alert could not be delivered.", { requestId });
  } catch (alertError) {
    console.error("Contact lead backup alert failed unexpectedly.", { requestId, error: alertError instanceof Error ? alertError.name : "unknown-error" });
  }
}

export async function POST(request: Request) {
  const requestId = getRequestId(request);
  let idempotencyKey: string | undefined;
  try {
    const rateLimit = await checkPublicFormRateLimit(request, "contact");
    if (!rateLimit.available) {
      return withRequestId(requestId,
        { success: false, error: "This service is temporarily unavailable. Please try again later." },
        { status: 503 },
      );
    }
    if (!rateLimit.success) {
      return withRequestId(requestId,
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
      );
    }

    const body = await parseJsonBody(request, 16 * 1024);
    if (!body.ok) {
      return withRequestId(requestId, { success: false, error: body.error }, { status: 400 });
    }

    const website = validateString(body.value.website, { maxLength: 200 });
    if (!website.ok) {
      return withRequestId(requestId, { success: false, error: "Invalid request body." }, { status: 400 });
    }
    if (website.value) {
      return withRequestId(requestId, { success: true, message: "Message submitted successfully." });
    }

    const name = validateString(body.value.name, { required: true, maxLength: 160 });
    const email = validateEmail(body.value.email);
    const company = validateString(body.value.company, { required: true, maxLength: 160 });
    const companyWebsite = validateUrl(body.value.companyWebsite, { maxLength: 2_048 });
    const inquiryType = validateEnum(body.value.inquiryType, ["Sales", "Partnerships", "Press", "Other"] as const, { required: true, maxLength: 32 });
    const message = validateString(body.value.message, { required: true, maxLength: 5_000 });

    if (!name.ok || !email.ok || !company.ok || !companyWebsite.ok || !inquiryType.ok || !message.ok) {
      return withRequestId(requestId,
        {
          success: false,
          error: "All fields are required.",
        },
        { status: 400 }
      );
    }

    const fingerprint = getIdempotencyFingerprint(request, "contact", {
      name: name.value,
      email: email.value,
      company: company.value,
      companyWebsite: companyWebsite.value || "",
      inquiryType: inquiryType.value,
      message: message.value,
    });
    const idempotency = await acquireIdempotency("contact", fingerprint, requestId);
    if (!idempotency.available) {
      console.error("Contact idempotency store unavailable.", { requestId });
      return withRequestId(requestId, { success: false, error: "We could not process your message. Please try again later." }, { status: 503 });
    }
    if (!idempotency.acquired) {
      return withRequestId(requestId,
        idempotency.state === "completed"
          ? { success: true, message: "This message was already processed." }
          : { success: false, error: "This message is already being processed. Please try again later." },
        { status: idempotency.state === "completed" ? 200 : 202 },
      );
    }
    idempotencyKey = idempotency.key;

    const lead = {
      id: `contact-${fingerprint.digest}`,
      type: "contact" as const,
      source: "website" as const,
      submittedAt: new Date().toISOString(),
      fields: {
        name: name.value,
        email: email.value,
        company: company.value,
        companyWebsite: companyWebsite.value || "",
        inquiryType: inquiryType.value,
        message: message.value,
      },
    };

    const durableResult = await saveLead(lead);
    if (!durableResult.ok) {
      console.error("Contact durable lead storage failed.", { requestId, reason: durableResult.reason });
      await releaseIdempotency(idempotencyKey);
      idempotencyKey = undefined;
      return withRequestId(requestId,
        { success: false, error: "We could not save your message. Please try again later." },
        { status: 503 },
      );
    }

    if (!await completeIdempotency(idempotencyKey)) {
      console.error("Contact idempotency completion failed.", { requestId });
      return withRequestId(requestId, { success: false, error: "We could not process your message. Please try again later." }, { status: 503 });
    }
    idempotencyKey = undefined;

    try {
      const googleSheetsUrl = process.env.GOOGLE_SHEETS_WEB_APP_URL;

      if (!googleSheetsUrl) throw new Error("Google Sheets URL is not configured.");

      const response = await withPersistenceTimeout(fetch(googleSheetsUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name.value, email: email.value, company: company.value, companyWebsite: companyWebsite.value || "", inquiryType: inquiryType.value, message: message.value }),
        }));

      if (!response.ok) throw new Error("Failed to save data to Google Sheets.");
    } catch (error) {
      await alertSheetFailure({ name: name.value!, email: email.value, company: company.value, companyWebsite: companyWebsite.value, inquiryType: inquiryType.value!, message: message.value! }, error, requestId);
      console.error("Contact Google Sheets mirror failed; durable lead retained.", { requestId, error: error instanceof Error ? error.message : "unknown-error" });
    }

    try {
      const result = await sendResendEmail(`contact-internal-notification:${requestId}`, {
        to: CONTACT_NOTIFICATION_EMAIL,
        subject: "New contact form submission | Articog",
        text: [
          "New contact form submission received.",
          "",
          `Name: ${name.value}`,
          `Email: ${email.value}`,
          `Company: ${company.value}`,
          `Company website: ${companyWebsite.value || ""}`,
          `Inquiry type: ${inquiryType.value}`,
          "",
          "Message:",
          message.value,
        ].join("\n"),
        replyTo: email.value,
      });
      if (!result.ok) console.error("Contact internal notification was not delivered.", { requestId });
    } catch (emailError) {
      console.error("Contact notification email failed unexpectedly.", { requestId, error: emailError instanceof Error ? emailError.name : "unknown-error" });
    }

    try {
      const result = await sendResendEmail(`contact-confirmation:${requestId}`, {
        to: email.value,
        subject: "We received your message | Articog",
        text: [`Hi ${name.value}`, "", "Thanks for reaching out to Articog. We received your message and will follow up within 1 business day.", "", "Best,", "The Articog team"].join("\n"),
        replyTo: email.value,
      });
      if (!result.ok) console.error("Contact confirmation email was not delivered.", { requestId });
    } catch (emailError) {
      console.error("Contact confirmation email failed unexpectedly.", { requestId, error: emailError instanceof Error ? emailError.name : "unknown-error" });
    }

    return withRequestId(requestId, {
      success: true,
      message: "Message submitted successfully.",
    });
  } catch (error) {
    console.error("Contact form error.", { requestId, error: error instanceof Error ? error.name : "unknown-error" });
    if (idempotencyKey) await releaseIdempotency(idempotencyKey);

    return withRequestId(requestId,
      {
        success: false,
        error: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}