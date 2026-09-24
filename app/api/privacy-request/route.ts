import { parseJsonBody, validateEmail, validateEnum, validateString } from "../../../lib/api-validation";
import { acquireIdempotency, completeIdempotency, getIdempotencyFingerprint, releaseIdempotency } from "../../../lib/idempotency";
import { checkPublicFormRateLimit } from "../../../lib/rate-limit";
import { getRequestId, withRequestId } from "../../../lib/request-context";
import { logOperational } from "../../../lib/observability";
import { sendResendEmail } from "../../../lib/resend";
import { saveLead } from "../../../lib/lead-storage";

export async function POST(request: Request) {
  const requestId = getRequestId(request);
  const idempotencyState: { key?: string } = {};
  try {
    return await handlePrivacyRequest(request, requestId, idempotencyState);
  } catch (error) {
    if (idempotencyState.key) {
      await releaseIdempotency(idempotencyState.key);
    }
    logOperational("error", "api_unexpected_exception", { requestId, route: "privacy-request", errorName: error instanceof Error ? error.name : "unknown-error", result: "failure" });
    return withRequestId(requestId, { success: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

async function handlePrivacyRequest(request: Request, requestId: string, idempotencyState: { key?: string }) {
  const rateLimit = await checkPublicFormRateLimit(request, "privacy-request");
  if (!rateLimit.available) {
    logOperational("error", "rate_limit_unavailable", { requestId, route: "privacy-request", result: "failure" });
    return withRequestId(requestId,
      { success: false, error: "This service is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }
  if (!rateLimit.success) {
    logOperational("warn", "api_request_rejected", { requestId, route: "privacy-request", result: "rate_limited", status: 429 });
    return withRequestId(requestId,
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
    );
  }

  const body = await parseJsonBody(request, 16 * 1024);
  if (!body.ok) {
    logOperational("warn", "api_request_rejected", { requestId, route: "privacy-request", result: "validation", status: 400 });
    return withRequestId(requestId, { success: false, error: body.error }, { status: 400 });
  }

  const attribution = typeof body.value.attribution === "object" && body.value.attribution !== null
    ? Object.fromEntries(
        Object.entries(body.value.attribution as Record<string, unknown>)
          .filter(([, value]) => typeof value === "string" && value.trim().length > 0)
          .map(([key, value]) => [key, String(value).trim()]),
      )
    : {};

  const name = validateString(body.value.name, { required: true, maxLength: 160 });
  const email = validateEmail(body.value.email);
  const requestType = validateEnum(body.value.requestType, ["know", "delete", "correct", "opt-out"] as const, { required: true, maxLength: 16 });
  const details = validateString(body.value.details, { maxLength: 5_000 });

  if (!name.ok || !email.ok || !requestType.ok || !details.ok) {
    logOperational("warn", "api_request_rejected", { requestId, route: "privacy-request", result: "validation", status: 400 });
    return withRequestId(requestId,
      { success: false, error: "Please provide a valid name, email, and request type." },
      { status: 400 }
    );
  }

  const fingerprint = getIdempotencyFingerprint(request, "privacy-request", {
    name: name.value,
    email: email.value,
    requestType: requestType.value,
    details: details.value || "",
  });
  const idempotency = await acquireIdempotency("privacy-request", fingerprint, requestId);
  if (!idempotency.available) {
    logOperational("error", "idempotency_store_unavailable", { requestId, route: "privacy-request", result: "failure" });
    return withRequestId(requestId, { success: false, error: "We could not process your request. Please try again later." }, { status: 503 });
  }
  if (!idempotency.acquired) {
    logOperational("info", "idempotency_replay", { requestId, route: "privacy-request", result: idempotency.state });
    return withRequestId(requestId,
      idempotency.state === "completed"
        ? { success: true, message: "This request was already processed." }
        : { success: false, error: "This request is already being processed. Please try again later." },
      { status: idempotency.state === "completed" ? 200 : 202 },
    );
  }
  idempotencyState.key = idempotency.key;

  const recipient = process.env.PRIVACY_REQUEST_ALERT_EMAIL || process.env.CONTACT_INTERNAL_ALERT_EMAIL;
  if (!recipient || !process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) {
    logOperational("error", "privacy_request_configuration_unavailable", {
      requestId,
      route: "privacy-request",
      operation: "privacy-request-submission",
      result: "failure",
      reason: "configuration",
    });
    await releaseIdempotency(idempotency.key);
    return withRequestId(requestId,
      {
        success: false,
        error: "Privacy requests are not configured for submission yet. Please email info@articog.com.",
      },
      { status: 503 }
    );
  }

  const durableResult = await saveLead({
    id: `privacy-request-${fingerprint.digest}`,
    type: "privacy-request",
    source: "website",
    submittedAt: new Date().toISOString(),
    fields: {
      name: name.value,
      email: email.value,
      requestType: requestType.value,
      details: details.value || "",
      ...(Object.keys(attribution).length ? { attribution } : {}),
    },
  }, { requestId });
  if (!durableResult.ok) {
    logOperational("error", "lead_storage_failed", { requestId, route: "privacy-request", reason: durableResult.reason, result: "failure" });
    await releaseIdempotency(idempotency.key);
    return withRequestId(requestId,
      { success: false, error: "We could not submit your request. Please try again later." },
      { status: 503 },
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
  }, { requestId, route: "privacy-request" });

  if (!result.ok) {
    await releaseIdempotency(idempotency.key);
    return withRequestId(requestId,
      { success: false, error: "We could not submit your request. Please try again later." },
      { status: 502 }
    );
  }

  if (!await completeIdempotency(idempotency.key)) {
    logOperational("error", "idempotency_completion_failed", { requestId, route: "privacy-request", result: "failure" });
    return withRequestId(requestId, { success: false, error: "We could not process your request. Please try again later." }, { status: 503 });
  }
  idempotencyState.key = undefined;

  return withRequestId(requestId, {
    success: true,
    message: "Your request was received for review. We may contact you to verify your identity.",
  });
}
