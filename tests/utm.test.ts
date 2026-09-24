import { beforeEach, describe, expect, it } from "vitest";

import {
  buildAttributionObject,
  captureFirstTouchUTM,
  readSavedUTM,
  sanitizeUTMValue,
} from "../lib/utm";

describe("utm capture", () => {
  beforeEach(() => {
    globalThis.window = Object.assign(globalThis.window ?? {}, {
      localStorage: {
        getItem: () => null,
        setItem: () => undefined,
      },
    });
  });

  it("sanitizes utm values before storage", () => {
    expect(sanitizeUTMValue("https://articog.com/?x=1")).toBe("https://articog.com/?x=1");
    expect(sanitizeUTMValue("   ")).toBe("");
    expect(sanitizeUTMValue("<script>alert(1)</script>")).toBe("scriptalert(1)script");
  });

  it("builds attribution from current search params and referrer", () => {
    const attribution = buildAttributionObject(
      "?utm_source=google&utm_medium=cpc&utm_campaign=brand&utm_content=hero&utm_term=ai+production",
      "https://www.google.com/search?q=articog",
    );

    expect(attribution).toMatchObject({
      source: "google",
      medium: "cpc",
      campaign: "brand",
      content: "hero",
      term: "ai production",
      referrer: "https://www.google.com/search?q=articog",
    });
  });

  it("persists a 30 day first-touch utm capture", () => {
    const storage = new Map<string, string>();
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        localStorage: {
          getItem: (key: string) => storage.get(key) ?? null,
          setItem: (key: string, value: string) => storage.set(key, value),
        },
      },
    });

    captureFirstTouchUTM({
      source: "linkedin",
      medium: "social",
      campaign: "spring",
    });

    const saved = readSavedUTM();
    expect(saved?.source).toBe("linkedin");
    expect(saved?.medium).toBe("social");
    expect(saved?.campaign).toBe("spring");
  });
});
