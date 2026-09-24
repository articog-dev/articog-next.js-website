export type UTMAttribution = {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  term: string;
  referrer: string;
  landingPage: string;
  firstTouchAt: string;
};

export const UTM_STORAGE_KEY = "articog-first-touch-utm";
export const UTM_TTL_MS = 30 * 24 * 60 * 60 * 1000;

const UTM_FIELD_NAMES = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "source",
  "referrer",
  "landingPage",
] as const;

export function sanitizeUTMValue(value: string | null | undefined): string {
  if (typeof value !== "string") return "";

  const trimmed = value.trim().replace(/[\u0000-\u001F\u007F]+/g, "");
  if (trimmed.includes("<") || trimmed.includes(">")) {
    return trimmed.replace(/[<>/\\]+/g, "").replace(/\s+/g, " ").trim();
  }

  return trimmed.replace(/[<>\\]+/g, "").replace(/\s+/g, " ").trim();
}

export function buildAttributionObject(
  search: string | URLSearchParams | undefined,
  referrer = typeof document !== "undefined" ? document.referrer : "",
): Partial<UTMAttribution> {
  const currentSearch = typeof window !== "undefined" && window.location ? window.location.search : "";
  const currentPath = typeof window !== "undefined" && window.location ? window.location.pathname : "";
  const params = typeof search === "string"
    ? new URLSearchParams(search.startsWith("?") ? search.slice(1) : search)
    : search instanceof URLSearchParams
      ? search
      : new URLSearchParams(currentSearch);

  const values = {
    source: sanitizeUTMValue(params.get("utm_source") ?? params.get("source") ?? ""),
    medium: sanitizeUTMValue(params.get("utm_medium") ?? ""),
    campaign: sanitizeUTMValue(params.get("utm_campaign") ?? ""),
    content: sanitizeUTMValue(params.get("utm_content") ?? ""),
    term: sanitizeUTMValue(params.get("utm_term") ?? ""),
    referrer: sanitizeUTMValue(referrer),
    landingPage: sanitizeUTMValue(currentPath),
  };

  return values;
}

export function normalizeAttribution(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object") return {};

  const record = value as Record<string, unknown>;
  const attribution: Record<string, string> = {};

  for (const field of UTM_FIELD_NAMES) {
    const nextValue = record[field];
    if (typeof nextValue === "string" && nextValue.trim()) {
      attribution[field] = sanitizeUTMValue(nextValue);
    }
  }

  return attribution;
}

export function readSavedUTM(): Partial<UTMAttribution> | null {
  if (typeof window === "undefined") return null;

  const stored = window.localStorage.getItem(UTM_STORAGE_KEY);
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored) as Partial<UTMAttribution> & { firstTouchAt?: string };
    if (!parsed || typeof parsed !== "object") return null;

    const firstTouchAt = parsed.firstTouchAt ? Date.parse(parsed.firstTouchAt) : Number.NaN;
    if (Number.isFinite(firstTouchAt) && Date.now() - firstTouchAt > UTM_TTL_MS) {
      window.localStorage.removeItem(UTM_STORAGE_KEY);
      return null;
    }

    return {
      source: sanitizeUTMValue(parsed.source ?? ""),
      medium: sanitizeUTMValue(parsed.medium ?? ""),
      campaign: sanitizeUTMValue(parsed.campaign ?? ""),
      content: sanitizeUTMValue(parsed.content ?? ""),
      term: sanitizeUTMValue(parsed.term ?? ""),
      referrer: sanitizeUTMValue(parsed.referrer ?? ""),
      landingPage: sanitizeUTMValue(parsed.landingPage ?? ""),
      firstTouchAt: parsed.firstTouchAt ?? new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function captureFirstTouchUTM(
  override?: Partial<UTMAttribution>,
): Partial<UTMAttribution> | null {
  if (typeof window === "undefined") return null;

  const existing = readSavedUTM();
  if (existing && Object.values(existing).some((value) => typeof value === "string" && value.length > 0)) {
    return existing;
  }

  const currentSearch = typeof window.location !== "undefined" ? window.location.search : "";
  const next = {
    ...buildAttributionObject(currentSearch, typeof document !== "undefined" ? document.referrer : ""),
    ...override,
    firstTouchAt: new Date().toISOString(),
  } as Partial<UTMAttribution>;

  const values = Object.values(next).filter((value): value is string => typeof value === "string" && value.length > 0);
  if (!values.length) return null;

  const payload = {
    source: sanitizeUTMValue(next.source ?? ""),
    medium: sanitizeUTMValue(next.medium ?? ""),
    campaign: sanitizeUTMValue(next.campaign ?? ""),
    content: sanitizeUTMValue(next.content ?? ""),
    term: sanitizeUTMValue(next.term ?? ""),
    referrer: sanitizeUTMValue(next.referrer ?? ""),
    landingPage: sanitizeUTMValue(next.landingPage ?? ""),
    firstTouchAt: next.firstTouchAt ?? new Date().toISOString(),
  };

  window.localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(payload));
  return payload;
}

export function getUTMHiddenFieldValues(): Record<string, string> {
  if (typeof window === "undefined") return {};

  const currentSearch = typeof window.location !== "undefined" ? window.location.search : "";
  const saved = readSavedUTM() ?? buildAttributionObject(currentSearch, typeof document !== "undefined" ? document.referrer : "");
  const values: Record<string, string> = {};

  for (const [key, value] of Object.entries({
    utm_source: saved.source ?? "",
    utm_medium: saved.medium ?? "",
    utm_campaign: saved.campaign ?? "",
    utm_content: saved.content ?? "",
    utm_term: saved.term ?? "",
    source: saved.source ?? "",
    referrer: saved.referrer ?? "",
    landingPage: saved.landingPage ?? "",
  })) {
    if (value) values[key] = value;
  }

  return values;
}

export function attachHiddenUTMFields(form: HTMLFormElement): void {
  if (typeof document === "undefined") return;

  const values = getUTMHiddenFieldValues();
  for (const [name, value] of Object.entries(values)) {
    const existing = form.querySelector<HTMLInputElement>(`input[name="${name}"]`);
    if (existing) {
      existing.value = value;
      continue;
    }
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }
}
