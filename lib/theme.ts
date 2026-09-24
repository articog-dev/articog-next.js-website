export type ThemePreference = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "articog-theme-preference";

export function resolveThemePreference(
  theme: ThemePreference | string | null | undefined,
): "light" | "dark" {
  if (theme === "light" || theme === "dark") {
    return theme;
  }

  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "light";
}

export function getStoredTheme(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }

  return "system";
}

export function applyTheme(theme: ThemePreference | string | null | undefined) {
  const resolved = resolveThemePreference(theme);
  const root = document.documentElement;

  root.dataset.theme = resolved;
  root.classList.toggle("dark", resolved === "dark");
  root.classList.toggle("light", resolved === "light");
  root.style.colorScheme = resolved;

  return resolved;
}
