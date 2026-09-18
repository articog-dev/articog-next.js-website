import { beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "../app/api/contact/route";
import { buildContactPayload } from "../lib/contact-payload";
import { resetTestRateLimits } from "../lib/rate-limit";
import { resetTestLeadStorage, setTestLeadStorage } from "../lib/lead-storage";

describe("POST /api/contact", () => {
  beforeEach(() => {
    process.env.GOOGLE_SHEETS_WEB_APP_URL = "https://sheets.test/submit";
    process.env.RESEND_API_KEY = "test-key";
    process.env.CONTACT_FROM_EMAIL = "noreply@example.com";
    vi.restoreAllMocks();
    resetTestRateLimits();
    resetTestLeadStorage();
  });

  it("includes the empty honeypot value in the real form payload", () => {
    const formData = new FormData();
    formData.set("name", "Test User");
    formData.set("email", "test@example.com");
    formData.set("inquiryType", "Sales");
    formData.set("message", "Test message");
    formData.set("website", "");

    expect(buildContactPayload(formData).website).toBe("");
  });

  it("passes a populated honeypot value through the real form payload", () => {
    const formData = new FormData();
    formData.set("name", "Bot");
    formData.set("email", "bot@example.com");
    formData.set("inquiryType", "Other");
    formData.set("message", "Bot message");
    formData.set("website", "filled-honeypot");

    expect(buildContactPayload(formData).website).toBe("filled-honeypot");
  });

  it("saves the lead and sends the internal notification to info@articog.com without exposing form data to analytics", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(null, { status: 200 }));

    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "198.51.100.10" },
        body: JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          company: "Example Co",
          inquiryType: "Sales",
          message: "Test message",
        }),
      })
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ success: true });
    expect(fetchMock).toHaveBeenCalledTimes(3);

    const payloads = fetchMock.mock.calls.map(([input, init]) => ({
      input,
      init,
    }));

    const emailPayload = payloads.find((entry) =>
      typeof entry.input === "string" && entry.input === "https://api.resend.com/emails"
    );

    expect(emailPayload).toBeDefined();
    const body = JSON.parse(String(emailPayload?.init?.body));
    expect(body.to).toContain("info@articog.com");
  });

  it("logs a failed non-blocking email notification without changing persisted-lead success", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
      if (input === "https://sheets.test/submit") return new Response(null, { status: 200 });
      if (input === "https://api.resend.com/emails") {
        return new Response(JSON.stringify({ error: { message: "private provider detail" } }), { status: 422 });
      }
      return new Response(null, { status: 200 });
    });

    const response = await POST(new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "x-real-ip": "198.51.100.16" },
      body: JSON.stringify({ name: "Test User", email: "test@example.com", company: "Example Co", inquiryType: "Sales", message: "Test message" }),
    }));

    expect(response.status).toBe(200);
    expect(JSON.stringify(await response.json())).not.toContain("private");
    expect(log.mock.calls.flat().join(" ")).toContain("Contact internal notification was not delivered.");
  });

  it("does not claim success when durable storage fails", async () => {
    setTestLeadStorage({ set: async () => { throw new Error("storage secret detail"); } });
    const fetchMock = vi.spyOn(globalThis, "fetch");

    const response = await POST(new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "x-real-ip": "198.51.100.17" },
      body: JSON.stringify({ name: "Test User", email: "test@example.com", company: "Example Co", inquiryType: "Sales", message: "Test message" }),
    }));

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ success: false, error: "We could not save your message. Please try again later." });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("short-circuits honeypot submissions successfully without saving or emailing", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");

    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "198.51.100.11" },
        body: JSON.stringify({
          name: "Bot",
          email: "bot@example.com",
          inquiryType: "Other",
          message: "Bot message",
          website: "https://spam.example",
        }),
      })
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ success: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects invalid fields before calling downstream integrations", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");

    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "198.51.100.14" },
        body: JSON.stringify({
          name: "Valid User",
          email: "not-an-email",
          company: "Example Co",
          companyWebsite: "not-a-url",
          inquiryType: "Unknown",
          message: "Valid-looking submission.",
        }),
      }),
    );

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects oversized bodies before calling downstream integrations", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");
    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "198.51.100.15" },
        body: JSON.stringify({
          name: "Valid User",
          email: "valid@example.com",
          company: "Example Co",
          inquiryType: "Sales",
          message: "x".repeat(16_001),
        }),
      }),
    );

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects a valid contact submission when the honeypot is filled", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");

    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "198.51.100.13" },
        body: JSON.stringify({
          name: "Valid User",
          email: "valid@example.com",
          company: "Example Co",
          companyWebsite: "https://example.com",
          inquiryType: "Partnership",
          message: "A valid-looking submission.",
          website: "filled-honeypot",
        }),
      })
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      message: "Message submitted successfully.",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns 429 after the request limit is reached", async () => {
    const ip = "198.51.100.12";
    const request = () =>
      POST(
        new Request("http://localhost/api/contact", {
          method: "POST",
          headers: { "content-type": "application/json", "x-forwarded-for": ip },
          body: JSON.stringify({
            name: "Bot",
            email: "bot@example.com",
            inquiryType: "Other",
            message: "Bot message",
            website: "filled",
          }),
        })
      );

    for (let attempt = 0; attempt < 5; attempt += 1) {
      expect((await request()).status).toBe(200);
    }

    const limitedResponse = await request();
    expect(limitedResponse.status).toBe(429);
    expect(limitedResponse.headers.get("Retry-After")).toMatch(/^[1-9]\d*$/);
    await expect(limitedResponse.json()).resolves.toMatchObject({ success: false });
  });
});
