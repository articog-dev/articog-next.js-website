import { afterEach, describe, expect, it, vi } from "vitest";

import { logOperational } from "../lib/observability";

describe("structured operational logging", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("emits JSON-safe operational fields without arbitrary sensitive fields", () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => undefined);

    logOperational("error", "resend_delivery_failed", ({
      requestId: "request-123",
      route: "contact",
      operation: "contact-confirmation",
      result: "failure",
      providerStatus: 422,
      durationMs: 42,
      reason: "provider",
      errorName: "Error",
      email: "person@example.com",
      apiKey: "secret",
    } as unknown) as never);

    const entry = JSON.parse(String(log.mock.calls[0]?.[0])) as Record<string, unknown>;
    expect(entry).toMatchObject({
      level: "error",
      event: "resend_delivery_failed",
      requestId: "request-123",
      route: "contact",
      providerStatus: 422,
      durationMs: 42,
    });
    expect(entry).not.toHaveProperty("email");
    expect(entry).not.toHaveProperty("apiKey");
  });
});