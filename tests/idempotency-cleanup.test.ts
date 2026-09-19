import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../lib/lead-storage", async () => {
  const actual = await vi.importActual<typeof import("../lib/lead-storage")>("../lib/lead-storage");
  return { ...actual, saveLead: vi.fn() };
});

import { POST as postDemo } from "../app/api/demo/route";
import { POST as postPrivacyRequest } from "../app/api/privacy-request/route";
import { resetTestIdempotency, setTestIdempotencyStore } from "../lib/idempotency";
import { resetTestRateLimits } from "../lib/rate-limit";
import { resetTestLeadStorage, saveLead } from "../lib/lead-storage";

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
  attribution: {},
};

function request(path: string, payload: unknown, key: string) {
  return new Request(`http://localhost${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "idempotency-key": key,
      "x-forwarded-for": "198.51.100.90",
    },
    body: JSON.stringify(payload),
  });
}

function createStore() {
  const values = new Map<string, string>();
  const deleted: string[] = [];

  return {
    deleted,
    store: {
      set: async (key: string, value: string, options?: { nx?: boolean; ex?: number }) => {
        if (options?.nx && values.has(key)) return null;
        values.set(key, value);
        return "OK";
      },
      get: async <T>(key: string) => (values.has(key) ? JSON.parse(values.get(key)!) as T : null),
      del: async (key: string) => {
        deleted.push(key);
        return values.delete(key);
      },
    },
  };
}

describe("public form idempotency cleanup", () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.CONTACT_FROM_EMAIL = "noreply@example.com";
    process.env.PRIVACY_REQUEST_ALERT_EMAIL = "privacy@example.com";
    vi.restoreAllMocks();
    resetTestRateLimits();
    resetTestLeadStorage();
    resetTestIdempotency();
    vi.mocked(saveLead).mockResolvedValue({ ok: true, id: "test-lead" });
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ id: "email-id" }), { status: 200 }));
  });

  it.each([
    ["demo", () => postDemo(request("/api/demo", validDemoPayload, "demo-replay-key")), () => postDemo(request("/api/demo", validDemoPayload, "demo-replay-key"))],
    ["privacy request", () => postPrivacyRequest(request("/api/privacy-request", { name: "Test User", email: "test@example.com", requestType: "delete" }, "privacy-replay-key")), () => postPrivacyRequest(request("/api/privacy-request", { name: "Test User", email: "test@example.com", requestType: "delete" }, "privacy-replay-key"))],
  ])("acquires and replays a completed %s request", async (_label, firstRequest, replayRequest) => {
    setTestIdempotencyStore(createStore().store);
    expect((await firstRequest()).status).toBe(200);
    const replay = await replayRequest();
    expect(replay.status).toBe(200);
    await expect(replay.json()).resolves.toMatchObject({ success: true });
  });

  it.each([
    ["demo", "/api/demo", validDemoPayload, postDemo],
    ["privacy request", "/api/privacy-request", { name: "Test User", email: "test@example.com", requestType: "delete" }, postPrivacyRequest],
  ])("releases an acquired %s lease after an unexpected failure", async (_label, path, payload, post) => {
    const testStore = createStore();
    setTestIdempotencyStore(testStore.store);
    vi.mocked(saveLead).mockRejectedValueOnce(new Error("unexpected storage failure"));

    const response = await post(request(path, payload, `${_label}-unexpected-key`));

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({ success: false, error: "Something went wrong. Please try again." });
    expect(testStore.deleted).toHaveLength(1);
  });
});
