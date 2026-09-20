import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const contentSource = readFileSync(path.join(process.cwd(), "lib", "content.ts"), "utf8");

describe("content reduction regression checks", () => {
  it("keeps the homepage hero copy aligned with the ICP wording", () => {
    const heroMatch = contentSource.match(/body:\s*"([^"]+)"/);
    expect(heroMatch).not.toBeNull();

    const body = heroMatch?.[1] ?? "";
    expect(body).toBe(
      "Articog is an AI Native Film & Production Company for brands. We create stories around every product through AI-native production—reducing traditional production, production time and budget. One monthly subscription can cover brand films, commercials, social content, product visuals and audio.",
    );
  });
});
