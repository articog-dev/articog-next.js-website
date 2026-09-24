import { beforeEach, describe, expect, it, vi } from "vitest";
import { applyTheme, getStoredTheme, resolveThemePreference } from "../lib/theme";

describe("theme preference helpers", () => {
  beforeEach(() => {
    const storage = new Map<string, string>();
    const classList = { toggle: vi.fn() };
    const dataset: Record<string, string> = {};

    vi.stubGlobal("window", {
      matchMedia: vi.fn().mockReturnValue({ matches: false }),
      localStorage: {
        getItem: (key: string) => storage.get(key) ?? null,
        setItem: (key: string, value: string) => {
          storage.set(key, String(value));
        },
        clear: () => storage.clear(),
      },
    });

    vi.stubGlobal("document", {
      documentElement: {
        dataset,
        classList,
        style: {},
      },
    });
  });

  it("resolves the system preference to dark when the user prefers dark mode", () => {
    const matchMedia = vi.fn().mockReturnValue({ matches: true });
    vi.stubGlobal("window", {
      matchMedia,
      localStorage: {
        getItem: () => null,
        setItem: () => undefined,
        clear: () => undefined,
      },
    });

    expect(resolveThemePreference("system")).toBe("dark");
  });

  it("falls back to light when the system prefers light mode", () => {
    const matchMedia = vi.fn().mockReturnValue({ matches: false });
    vi.stubGlobal("window", {
      matchMedia,
      localStorage: {
        getItem: () => null,
        setItem: () => undefined,
        clear: () => undefined,
      },
    });

    expect(resolveThemePreference("system")).toBe("light");
  });

  it("reads and applies the saved preference", () => {
    const localStorage = window.localStorage as Storage;
    localStorage.setItem("articog-theme-preference", "dark");

    expect(getStoredTheme()).toBe("dark");
    applyTheme("dark");

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(document.documentElement.classList.toggle).toHaveBeenCalledWith("dark", true);
    expect(document.documentElement.classList.toggle).toHaveBeenCalledWith("light", false);
  });
});
