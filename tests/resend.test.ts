import { beforeEach, describe, expect, it, vi } from "vitest";

import { sendResendEmail } from "../lib/resend";

const email = {
  to: "recipient@example.com",
  subject: "Test notification",
  text: "A test notification.",
};

describe("Resend email helper", () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.CONTACT_FROM_EMAIL = "noreply@example.com";
    vi.restoreAllMocks();
  });

  it("accepts a successful provider response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ id: "message-id" }), { status: 200 }),
    );

    await expect(sendResendEmail("test-success", email)).resolves.toEqual({ ok: true, id: "message-id" });
  });

  it("classifies provider error objects without exposing their contents", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ error: { message: "provider secret detail" } }), { status: 422 }),
    );

    await expect(sendResendEmail("test-provider-error", email)).resolves.toEqual({
      ok: false,
      reason: "provider",
      status: 422,
    });
    expect(log.mock.calls.flat().join(" ")).not.toContain("provider secret detail");
    expect(log.mock.calls.flat().join(" ")).not.toContain("recipient@example.com");
  });

  it("rejects an error object even when the provider returns HTTP 200", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ error: { message: "provider secret detail" } }), { status: 200 }),
    );

    await expect(sendResendEmail("test-success-error-object", email)).resolves.toEqual({
      ok: false,
      reason: "provider",
      status: 200,
    });
  });

  it("classifies thrown network failures without exposing the exception", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network secret detail"));

    await expect(sendResendEmail("test-network-error", email)).resolves.toEqual({
      ok: false,
      reason: "network",
    });
    expect(log.mock.calls.flat().join(" ")).not.toContain("network secret detail");
    expect(log.mock.calls.flat().join(" ")).not.toContain("recipient@example.com");
  });

  it("classifies missing configuration without making a provider call", async () => {
    delete process.env.RESEND_API_KEY;
    const fetchMock = vi.spyOn(globalThis, "fetch");

    await expect(sendResendEmail("test-configuration", email)).resolves.toEqual({
      ok: false,
      reason: "configuration",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});