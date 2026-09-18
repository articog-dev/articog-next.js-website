import { beforeEach, describe, expect, it, vi } from "vitest";

import { POST as postDemo } from "../app/api/demo/route";
import { POST as postPrivacyRequest } from "../app/api/privacy-request/route";

const validDemoPayload = {
  firstName: "Test",
  lastName: "User",
  name: "Test User",
  email: "test@example.com",
  company: "Example Co",
  role: "Marketing",
  serviceInterest: ["Brand Film"],
  budget: "Under $5k",
  timeline: "Immediately",
  projectContext: "A short project.",
  referenceUrl: "https://example.com/reference",
  consent: true,
  attribution: {
    source: "newsletter",
    medium: "email",
    campaign: "spring",
    content: "cta",
    term: "video",
    referrer: "https://example.com/previous",
  },
};

function request(path: string, payload: unknown, ip: string) {
  return new Request(`http://localhost${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(payload),
  });
}

describe("public form API validation", () => {
  beforeEach(() => {
    process.env.GOOGLE_SHEETS_WEB_APP_URL = "https://sheets.test/submit";
    process.env.RESEND_API_KEY = "test-key";
    process.env.CONTACT_FROM_EMAIL = "noreply@example.com";
    process.env.PRIVACY_REQUEST_ALERT_EMAIL = "privacy@example.com";
    vi.restoreAllMocks();
  });

  it("accepts a valid demo request and persists it", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 200 }));

    const response = await postDemo(request("/api/demo", validDemoPayload, "198.51.100.20"));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ success: true });
    expect(fetchMock).toHaveBeenCalledWith("https://sheets.test/submit", expect.any(Object));
  });

  it.each([
    ["missing required field", { ...validDemoPayload, company: undefined }],
    ["wrong field type", { ...validDemoPayload, consent: "yes" }],
    ["invalid URL", { ...validDemoPayload, referenceUrl: "not-a-url" }],
    ["invalid enum", { ...validDemoPayload, budget: "free" }],
    ["oversized array", { ...validDemoPayload, serviceInterest: Array(7).fill("Brand Film") }],
    ["oversized string", { ...validDemoPayload, projectContext: "x".repeat(5_001) }],
  ])("rejects demo input: %s without persistence", async (_label, payload) => {
    const fetchMock = vi.spyOn(globalThis, "fetch");

    const response = await postDemo(request("/api/demo", payload, `198.51.100.${Math.floor(Math.random() * 200) + 21}`));

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("accepts a valid privacy request and sends it for review", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 200 }));

    const response = await postPrivacyRequest(
      request("/api/privacy-request", { name: "Test User", email: "test@example.com", requestType: "delete", details: "Please delete my data." }, "198.51.100.40"),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ success: true });
    expect(fetchMock).toHaveBeenCalledWith("https://api.resend.com/emails", expect.any(Object));
  });

  it.each([
    ["missing required field", { email: "test@example.com", requestType: "delete" }],
    ["wrong field type", { name: "Test User", email: "test@example.com", requestType: 1 }],
    ["invalid email", { name: "Test User", email: "invalid", requestType: "delete" }],
    ["invalid enum", { name: "Test User", email: "test@example.com", requestType: "export" }],
    ["oversized details", { name: "Test User", email: "test@example.com", requestType: "delete", details: "x".repeat(5_001) }],
  ])("rejects privacy input: %s without sending", async (_label, payload) => {
    const fetchMock = vi.spyOn(globalThis, "fetch");

    const response = await postPrivacyRequest(
      request("/api/privacy-request", payload, `198.51.100.${Math.floor(Math.random() * 200) + 41}`),
    );

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});