import { beforeEach, describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

import {
  hasGlobalPrivacyControl,
  readCookieConsent,
  saveCookieConsent,
} from "../lib/cookie-consent";

function installBrowserStorage() {
  const storage = new Map<string, string>();
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      localStorage: {
        getItem: (key: string) => storage.get(key) ?? null,
        setItem: (key: string, value: string) => storage.set(key, value),
      },
      dispatchEvent: () => true,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    },
  });
  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    value: { globalPrivacyControl: false },
  });
  return storage;
}

describe("cookie consent", () => {
  beforeEach(() => {
    installBrowserStorage();
  });

  it("saves analytics preferences for the privacy controls", () => {
    expect(saveCookieConsent(true).analytics).toBe(true);
    expect(readCookieConsent()?.analytics).toBe(true);
    expect(saveCookieConsent(false).analytics).toBe(false);
    expect(readCookieConsent()?.analytics).toBe(false);
  });

  it("forces analytics off when GPC is enabled", () => {
    saveCookieConsent(true);
    Object.defineProperty(globalThis.navigator, "globalPrivacyControl", { value: true });

    expect(hasGlobalPrivacyControl()).toBe(true);
    expect(readCookieConsent()?.analytics).toBe(false);
    expect(saveCookieConsent(true).analytics).toBe(false);
  });

  it("exposes both consent actions in the privacy choices UI", () => {
    const source = readFileSync(path.join(process.cwd(), "app", "privacy-choices", "page.tsx"), "utf8");

    expect(source).toContain("updateAnalyticsConsent(true)");
    expect(source).toContain("updateAnalyticsConsent(false)");
  });
});
