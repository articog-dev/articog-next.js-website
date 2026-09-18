import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const contentSource = readFileSync(path.join(process.cwd(), "lib", "content.ts"), "utf8");

describe("content reduction regression checks", () => {
  it("keeps the homepage hero copy concise and clear", () => {
    const heroMatch = contentSource.match(/body:\s*"([^"]+)"/);
    expect(heroMatch).not.toBeNull();

    const body = heroMatch?.[1] ?? "";
    expect(body.length).toBeLessThan(180);
    expect(body.toLowerCase()).toMatch(/brand|social|product|campaign/);
  });
});
