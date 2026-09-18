const RESEND_ENDPOINT = "https://api.resend.com/emails";

export type ResendEmail = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
};

export type ResendResult =
  | { ok: true; id?: string }
  | { ok: false; reason: "configuration" | "provider" | "network"; status?: number };

type ResendFailure = Exclude<ResendResult, { ok: true }>;

function logFailure(operation: string, reason: ResendFailure) {
  console.error("Resend email delivery failed", {
    operation,
    reason: reason.reason,
    ...(reason.status ? { status: reason.status } : {}),
  });
}

export async function sendResendEmail(operation: string, email: ResendEmail): Promise<ResendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    const result = { ok: false as const, reason: "configuration" as const };
    logFailure(operation, result);
    return result;
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [email.to],
        subject: email.subject,
        text: email.text,
        ...(email.replyTo ? { reply_to: email.replyTo } : {}),
      }),
    });

    let providerBody: unknown;
    try {
      providerBody = await response.clone().json();
    } catch {
      providerBody = undefined;
    }

    const hasProviderError =
      typeof providerBody === "object" && providerBody !== null && "error" in providerBody;

    if (!response.ok || hasProviderError) {
      try {
        await response.body?.cancel();
      } catch {
        // A provider error may not include a JSON body.
      }
      const result = { ok: false as const, reason: "provider" as const, status: response.status };
      logFailure(operation, result);
      return result;
    }

    const id = typeof providerBody === "object" && providerBody !== null && "id" in providerBody && typeof providerBody.id === "string"
      ? providerBody.id
      : undefined;

    return { ok: true, ...(id ? { id } : {}) };
  } catch {
    const result = { ok: false as const, reason: "network" as const };
    logFailure(operation, result);
    return result;
  }
}