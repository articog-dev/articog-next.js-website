import { beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "../app/api/contact/route";

describe("POST /api/contact", () => {
  beforeEach(() => {
    process.env.GOOGLE_SHEETS_WEB_APP_URL = "https://sheets.test/submit";
    process.env.RESEND_API_KEY = "test-key";
    process.env.CONTACT_FROM_EMAIL = "noreply@example.com";
    vi.restoreAllMocks();
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
    await expect(limitedResponse.json()).resolves.toMatchObject({ success: false });
  });
});
