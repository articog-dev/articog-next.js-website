import { createHmac } from "node:crypto";
import { Redis } from "@upstash/redis";

import { isValidIdempotencyKey } from "./request-context";

export type IdempotencyRoute = "contact" | "demo" | "privacy-request";

type IdempotencyState = "processing" | "completed";

type IdempotencyStore = {
  set(key: string, value: string, options?: { nx?: boolean; ex?: number }): Promise<unknown>;
  get<T>(key: string): Promise<T | null>;
  del(key: string): Promise<unknown>;
};

type IdempotencyResult =
  | { available: true; acquired: true; key: string; digest: string }
  | { available: true; acquired: false; state: IdempotencyState }
  | { available: false };

const IDEMPOTENCY_PREFIX = "articog:idempotency:";
const PROCESSING_TTL_SECONDS = 120;
const COMPLETED_TTL_SECONDS = 24 * 60 * 60;
let redisStore: IdempotencyStore | undefined;
let testStore: IdempotencyStore | undefined;

function getStore(): IdempotencyStore | undefined {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return undefined;
  redisStore ??= Redis.fromEnv();
  return redisStore;
}

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (typeof value !== "object" || value === null) return JSON.stringify(value);

  return `{${Object.entries(value as Record<string, unknown>)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, entry]) => `${JSON.stringify(key)}:${stableStringify(entry)}`)
    .join(",")}}`;
}

export function getIdempotencyFingerprint(
  request: Request,
  route: IdempotencyRoute,
  validatedPayload: unknown,
): { digest: string; key: string } {
  const suppliedKey = request.headers.get("idempotency-key");
  const seed = isValidIdempotencyKey(suppliedKey)
    ? `header:${suppliedKey}`
    : `body:${stableStringify(validatedPayload)}`;
  const secret = process.env.UPSTASH_REDIS_REST_TOKEN || "test-idempotency-secret";
  const digest = createHmac("sha256", secret).update(`${route}:${seed}`).digest("hex");
  return { digest, key: `${IDEMPOTENCY_PREFIX}${route}:${digest}` };
}

export async function acquireIdempotency(
  route: IdempotencyRoute,
  fingerprint: { digest: string; key: string },
  requestId: string,
): Promise<IdempotencyResult> {
  const store = process.env.NODE_ENV === "test" ? testStore : getStore();
  if (!store) return { available: false };

  try {
    const result = await store.set(
      fingerprint.key,
      JSON.stringify({ state: "processing", requestId }),
      { nx: true, ex: PROCESSING_TTL_SECONDS },
    );
    if (result === "OK") return { available: true, acquired: true, ...fingerprint };

    const existing = await store.get<{ state?: unknown }>(fingerprint.key);
    return {
      available: true,
      acquired: false,
      state: existing?.state === "completed" ? "completed" : "processing",
    };
  } catch {
    return { available: false };
  }
}

export async function completeIdempotency(key: string): Promise<boolean> {
  const store = process.env.NODE_ENV === "test" ? testStore : getStore();
  if (!store) return false;

  try {
    return (await store.set(key, JSON.stringify({ state: "completed" }), { ex: COMPLETED_TTL_SECONDS })) === "OK";
  } catch {
    return false;
  }
}

export async function releaseIdempotency(key: string): Promise<void> {
  const store = process.env.NODE_ENV === "test" ? testStore : getStore();
  if (!store) return;
  try {
    await store.del(key);
  } catch {
    // The processing lease will expire if cleanup cannot reach Redis.
  }
}

export function resetTestIdempotency(): void {
  const values = new Map<string, string>();
  testStore = {
    set: async (key, value, options) => {
      if (options?.nx && values.has(key)) return null;
      values.set(key, value);
      return "OK";
    },
    get: async <T>(key: string) => (values.has(key) ? JSON.parse(values.get(key)!) as T : null),
    del: async (key: string) => values.delete(key),
  };
}

export function setTestIdempotencyStore(store: IdempotencyStore | undefined): void {
  testStore = store;
}