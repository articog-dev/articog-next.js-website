import { Redis } from "@upstash/redis";
import { logOperational } from "./observability";

export type LeadType = "contact" | "demo" | "privacy-request";

export type LeadRecord = {
  id: string;
  type: LeadType;
  source: "website";
  submittedAt: string;
  fields: Record<string, unknown>;
};

type LeadStorageResult =
  | { ok: true; id: string }
  | { ok: false; reason: "configuration" | "timeout" | "provider" };

export type LeadStorageClient = {
  set(key: string, value: string): Promise<unknown>;
};

const LEAD_KEY_PREFIX = "articog:lead:";
const LEAD_STORAGE_TIMEOUT_MS = 5_000;
let redisClient: LeadStorageClient | undefined;
let testClient: LeadStorageClient | undefined;

function getRedisClient(): LeadStorageClient | undefined {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return undefined;
  redisClient ??= Redis.fromEnv();
  return redisClient;
}

export async function withPersistenceTimeout<T>(promise: Promise<T>, timeoutMs = LEAD_STORAGE_TIMEOUT_MS): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("Lead storage timed out.")), timeoutMs);
  });

  try {
    return await Promise.race([promise, timeout]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

export async function saveLead(record: LeadRecord, context: { requestId?: string } = {}): Promise<LeadStorageResult> {
  const startedAt = Date.now();
  const client = process.env.NODE_ENV === "test" ? testClient : getRedisClient();
  if (!client) {
    logOperational("error", "lead_storage_failed", { requestId: context.requestId, route: record.type, reason: "configuration", result: "failure", durationMs: Date.now() - startedAt });
    return { ok: false, reason: "configuration" };
  }

  try {
    const result = await withPersistenceTimeout(
      client.set(`${LEAD_KEY_PREFIX}${record.id}`, JSON.stringify(record)),
      LEAD_STORAGE_TIMEOUT_MS,
    );
    if (result !== "OK") {
      logOperational("error", "lead_storage_failed", { requestId: context.requestId, route: record.type, reason: "provider", result: "failure", durationMs: Date.now() - startedAt });
      return { ok: false, reason: "provider" };
    }
    return { ok: true, id: record.id };
  } catch (error) {
    const reason = error instanceof Error && error.message === "Lead storage timed out." ? "timeout" as const : "provider" as const;
    logOperational("error", "lead_storage_failed", { requestId: context.requestId, route: record.type, reason, result: "failure", durationMs: Date.now() - startedAt });
    return {
      ok: false,
      reason,
    };
  }
}

export function resetTestLeadStorage(): void {
  testClient = {
    set: async () => "OK",
  };
}

export function setTestLeadStorage(client: LeadStorageClient | undefined): void {
  testClient = client;
}