export const MAX_JSON_BODY_BYTES = 32 * 1024;

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

const ok = <T>(value: T): ValidationResult<T> => ({ ok: true, value });
const fail = (error: string): ValidationResult<never> => ({ ok: false, error });

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function parseJsonBody(
  request: Request,
  maxBytes = MAX_JSON_BODY_BYTES,
): Promise<ValidationResult<Record<string, unknown>>> {
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number.isFinite(Number(contentLength)) && Number(contentLength) > maxBytes) {
    return fail("Invalid request body.");
  }

  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > maxBytes) return fail("Invalid request body.");
    const data: unknown = JSON.parse(body);
    return isRecord(data) ? ok(data) : fail("Invalid request body.");
  } catch {
    return fail("Invalid request body.");
  }
}

export function validateString(
  value: unknown,
  options: { required?: boolean; minLength?: number; maxLength: number },
): ValidationResult<string | undefined> {
  if (value === undefined || value === null) {
    return options.required ? fail("A required field is missing.") : ok(undefined);
  }
  if (typeof value !== "string") return fail("A field has an invalid type.");

  const normalized = value.trim();
  if (options.required && normalized.length === 0) return fail("A required field is missing.");
  if (options.minLength !== undefined && normalized.length < options.minLength) return fail("A field is too short.");
  if (normalized.length > options.maxLength) return fail("A field is too long.");
  return ok(normalized);
}

export function validateEmail(value: unknown, maxLength = 320): ValidationResult<string> {
  const result = validateString(value, { required: true, maxLength });
  if (!result.ok || !result.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.value)) {
    return fail("Please provide a valid email address.");
  }
  return ok(result.value);
}

export function validateUrl(
  value: unknown,
  options: { required?: boolean; maxLength: number },
): ValidationResult<string | undefined> {
  const result = validateString(value, options);
  if (!result.ok) return result;
  if (result.value === undefined || result.value === "") return ok(undefined);

  try {
    const url = new URL(result.value);
    return url.protocol === "http:" || url.protocol === "https:"
      ? ok(result.value)
      : fail("Please provide a valid URL.");
  } catch {
    return fail("Please provide a valid URL.");
  }
}

export function validateEnum<T extends string>(
  value: unknown,
  allowed: readonly T[],
  options: { required?: boolean; maxLength: number },
): ValidationResult<T | undefined> {
  const result = validateString(value, options);
  if (!result.ok) return result;
  if (result.value === undefined || result.value === "") return ok(undefined);
  return allowed.includes(result.value as T) ? ok(result.value as T) : fail("A field has an invalid value.");
}

export function validateStringArray<T extends string>(
  value: unknown,
  options: { allowed?: readonly T[]; maxItems: number; maxItemLength: number },
): ValidationResult<T[]> {
  if (value === undefined || value === null) return ok([]);
  if (!Array.isArray(value) || value.length > options.maxItems) return fail("A field has an invalid array.");

  const values: T[] = [];
  for (const item of value) {
    const result = validateString(item, { required: true, maxLength: options.maxItemLength });
    if (!result.ok || result.value === undefined) return fail("A field has an invalid array.");
    if (options.allowed && !options.allowed.includes(result.value as T)) return fail("A field has an invalid array.");
    values.push(result.value as T);
  }
  return ok(values);
}

export function validateBoolean(value: unknown, required = false): ValidationResult<boolean> {
  if (value === undefined || value === null) return required ? fail("A required field is missing.") : ok(false);
  return typeof value === "boolean" ? ok(value) : fail("A field has an invalid type.");
}