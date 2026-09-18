export const COOKIE_CONSENT_KEY = "articog-cookie-consent";
export const COOKIE_CONSENT_EVENT = "articog-cookie-consent-updated";

export type CookieConsent = {
  necessary: true;
  analytics: boolean;
};

export function hasGlobalPrivacyControl(request?: Request): boolean {
  if (request?.headers.get("Sec-GPC") === "1") return true;
  return typeof navigator !== "undefined" &&
    (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

export function readCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;

  if (hasGlobalPrivacyControl()) return { necessary: true, analytics: false };

  try {
    const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!value) return null;

    const parsed = JSON.parse(value) as Partial<CookieConsent>;
    if (typeof parsed.analytics !== "boolean") return null;

    return { necessary: true, analytics: parsed.analytics };
  } catch {
    return null;
  }
}

export function saveCookieConsent(analytics: boolean): CookieConsent {
  const consent: CookieConsent = { necessary: true, analytics: hasGlobalPrivacyControl() ? false : analytics };
  window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: consent }));
  return consent;
}

export function subscribeCookieConsent(callback: () => void): () => void {
  window.addEventListener(COOKIE_CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(COOKIE_CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function readCookieConsentSnapshot(): string | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!value) return null;

  try {
    const parsed = JSON.parse(value) as Partial<CookieConsent>;
    return typeof parsed.analytics === "boolean" ? value : null;
  } catch {
    return null;
  }
}