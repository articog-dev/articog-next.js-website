import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const read = (...segments: string[]) =>
  readFileSync(path.join(process.cwd(), ...segments), "utf8");

describe("media SEO metadata", () => {
  it("keeps meaningful image alt text descriptive and avoids generic placeholders", () => {
    const showcaseSource = read("components", "sections", "HomeVisualShowcase.tsx");
    const industrySource = read("components", "sections", "IndustryDetails.tsx");
    const founderSource = read("components", "sections", "FounderProfile.tsx");

    expect(showcaseSource).toContain('alt: "Articog creative visual study 01"');
    expect(industrySource).toContain('imageAlt: "DTC and E-commerce creative production"');
    expect(founderSource).not.toMatch(/alt:\s*["'](?:image|photo|visual|banner|placeholder)["']/i);
    expect(showcaseSource).not.toMatch(/alt:\s*["'](?:image|photo|visual|banner|placeholder)["']/i);
  });

  it("uses empty alt text for the repeated decorative industry detail image", () => {
    const source = read("components", "sections", "IndustryDetails.tsx");

    expect(source).toMatch(/src=\{industry\.image\}\s+alt=""/);
  });

  it("keeps important video thumbnails and embeds accessible", () => {
    const showcaseSource = read("components", "sections", "WorkVideoShowcase.tsx");
    const embedSource = read("components", "blog", "YouTubeEmbed.tsx");

    expect(showcaseSource).toContain('alt={video.title}');
    expect(showcaseSource).toContain("aria-label={`Open ${video.title} on YouTube in a new tab`}");
    expect(embedSource).toContain("title={title}");
    expect(embedSource).toContain('loading="lazy"');
  });

  it("keeps decorative native videos poster-backed and explicitly hidden from assistive technology", () => {
    const files = [
      ["components", "sections", "Hero.tsx"],
      ["components", "sections", "Pipeline.tsx"],
      ["app", "industries", "page.tsx"],
      ["app", "services", "page.tsx"],
    ];

    for (const file of files) {
      const source = read(...file);
      expect(source).toContain("<video");
      expect(source).toContain("poster=");
      expect(source).toContain('aria-hidden="true"');
    }
  });

  it("uses Hostinger media without guessed or master URLs", () => {
    const sourceFiles = [
      ["components", "sections", "HomeVisualShowcase.tsx"],
      ["components", "sections", "Hero.tsx"],
      ["components", "sections", "Pipeline.tsx"],
    ];

    for (const file of sourceFiles) {
      const source = read(...file);
      expect(source).not.toMatch(/https:\/\/res\.[^/]+\.com\//);
      expect(source).not.toMatch(/\b(?:4k|master|production-master)\b/i);
    }

    expect(read("components", "sections", "HomeVisualShowcase.tsx")).toContain(
      "https://media.articog.com/images/home/",
    );
  });

  it("keeps Task 17 VideoObject generation guarded by complete known metadata", () => {
    const source = read("lib", "structured-data.ts");

    expect(source).toContain("createVideoObjectSchema");
    expect(source).toContain("!video.uploadDate");
    expect(source).toContain("!video.duration");
  });
});