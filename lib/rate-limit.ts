import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { logOperational } from "./observability";

export type PublicFormRoute = "contact" | "demo" | "privacy-request";

type RateLimitConfig = {
  limit: number;
  window: "10 m";
  windowMs: number;
};

type RateLimitResult =
  | { available: true; success: true }
  | { available: true; success: false; retryAfterSeconds: number }
  | { available: false };

const RATE_LIMITS: Record<PublicFormRoute, RateLimitConfig> = {
  contact: { limit: 5, window: "10 m", windowMs: 10 * 60 * 1000 },
  demo: { limit: 5, window: "10 m", windowMs: 10 * 60 * 1000 },
  "privacy-request": { limit: 3, window: "10 m", windowMs: 10 * 60 * 1000 },
};

const testRequests = new Map<string, number[]>();
const rateLimiters = new Map<PublicFormRoute, Ratelimit>();

function getClientIp(request: Request): string {
  const platformHeader = request.headers.get("x-vercel-forwarded-for");
  const rawValue = platformHeader || request.headers.get("x-real-ip") || "unknown";
  const firstValue = rawValue.split(",")[0]?.trim() || "unknown";

  return firstValue.slice(0, 128);
}

function getRateLimiter(route: PublicFormRoute): Ratelimit | undefined {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return undefined;

  const existing = rateLimiters.get(route);
  if (existing) return existing;

  const config = RATE_LIMITS[route];
  const limiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(config.limit, config.window),
    analytics: false,
    prefix: `articog:${route}`,
  });
  rateLimiters.set(route, limiter);
  return limiter;
}

function testRateLimit(request: Request, route: PublicFormRoute): RateLimitResult {
  const config = RATE_LIMITS[route];
  const key = `${route}:${getClientIp(request)}`;
  const now = Date.now();
  const recentRequests = (testRequests.get(key) ?? []).filter(
    (timestamp) => now - timestamp < config.windowMs,
  );

  if (recentRequests.length >= config.limit) {
    const oldestRequest = recentRequests[0] ?? now;
    return {
      available: true,
      success: false,
      retryAfterSeconds: Math.max(1, Math.ceil((oldestRequest + config.windowMs - now) / 1000)),
    };
  }

  recentRequests.push(now);
  testRequests.set(key, recentRequests);
  return { available: true, success: true };
}

export async function checkPublicFormRateLimit(
  request: Request,
  route: PublicFormRoute,
): Promise<RateLimitResult> {
  if (process.env.NODE_ENV === "test") return testRateLimit(request, route);

  const limiter = getRateLimiter(route);
  if (!limiter) return { available: false };

  try {
    const result = await limiter.limit(getClientIp(request));
    if (result.success) return { available: true, success: true };

    return {
      available: true,
      success: false,
      retryAfterSeconds: Math.max(1, Math.ceil((result.reset - Date.now()) / 1000)),
    };
  } catch (error) {
    const errorRecord = typeof error === "object" && error !== null
      ? error as Record<string, unknown>
      : undefined;
    const status = typeof errorRecord?.status === "number"
      ? errorRecord.status
      : typeof errorRecord?.statusCode === "number"
        ? errorRecord.statusCode
        : undefined;
    const reason = typeof error === "object" && error !== null && "message" in error && typeof error.message === "string"
      ? error.message.split(", command was:", 1)[0].trim().slice(0, 80)
      : undefined;

    logOperational("error", "rate_limit_check_failed", {
      route,
      operation: "upstash-rate-limit",
      result: "failure",
      errorName: error instanceof Error ? error.name : "unknown-error",
      providerStatus: status,
      reason,
    });
    return { available: false };
  }
}

export function resetTestRateLimits(): void {
  testRequests.clear();
}

export function getRateLimitConfig(route: PublicFormRoute): Readonly<RateLimitConfig> {
  return RATE_LIMITS[route];
}