import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

describe("email preferences", () => {
  it("does not expose an unfinished public page or API", () => {
    expect(existsSync(path.join(process.cwd(), "app", "email-preferences", "page.tsx"))).toBe(false);
    expect(existsSync(path.join(process.cwd(), "app", "api", "email-preferences", "route.ts"))).toBe(false);
  });

  it("directs newsletter recipients to the provider-managed preference controls", () => {
    const source = readFileSync(path.join(process.cwd(), "app", "newsletter", "page.tsx"), "utf8");

    expect(source).toContain("Beehiiv link in any newsletter email");
    expect(source).not.toContain("manage marketing email preferences separately from this signup");
  });
});