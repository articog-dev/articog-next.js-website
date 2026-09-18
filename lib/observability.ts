type LogLevel = "info" | "warn" | "error";

type LogFields = {
  requestId?: string;
  route?: string;
  operation?: string;
  result?: string;
  status?: number;
  providerStatus?: number;
  durationMs?: number;
  reason?: string;
  errorName?: string;
};

const SAFE_FIELD_NAMES = new Set<keyof LogFields>([
  "requestId",
  "route",
  "operation",
  "result",
  "status",
  "providerStatus",
  "durationMs",
  "reason",
  "errorName",
]);

function sanitizeFields(fields: LogFields): Partial<LogFields> {
  const safeFields: Partial<LogFields> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (SAFE_FIELD_NAMES.has(key as keyof LogFields) && value !== undefined) {
      if (typeof value === "string") safeFields[key as keyof LogFields] = value.slice(0, 160) as never;
      if (typeof value === "number" && Number.isFinite(value)) safeFields[key as keyof LogFields] = Math.max(0, Math.round(value)) as never;
    }
  }
  return safeFields;
}

export function logOperational(level: LogLevel, event: string, fields: LogFields = {}): void {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    event: event.slice(0, 100),
    ...sanitizeFields(fields),
  };
  console[level](JSON.stringify(entry));
}