import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const read = (...segments: string[]) =>
  readFileSync(path.join(process.cwd(), ...segments), "utf8");

describe("performance boundaries", () => {
  it("keeps Calendly route-scoped and analytics consent-gated", () => {
    const bookingPage = read("app", "book-a-demo", "page.tsx");
    const rootLayout = read("app", "layout.tsx");
    const analytics = read("components", "analytics", "GoogleAnalytics.tsx");

    expect(bookingPage).toContain("assets.calendly.com/assets/external/widget.css");
    expect(rootLayout).not.toContain("assets.calendly.com/assets/external/widget.css");
    expect(analytics).toContain("analyticsConsent !== true");
    expect(analytics).toContain('strategy="afterInteractive"');
  });

  it("keeps the poster-first hero and lazy below-fold gallery loading", () => {
    const hero = read("components", "sections", "Hero.tsx");
    const gallery = read("components", "sections", "HomeVisualShowcase.tsx");

    expect(hero).toContain('preload="auto"');
    expect(hero).toContain("poster=");
    expect(gallery).toContain('loading="lazy"');
    expect(gallery).not.toContain("priority={");
    expect(gallery).not.toContain("quality={100}");
  });

  it("keeps stable media sizing and avoids blanket showcase will-change", () => {
    const blog = read("app", "blog", "[slug]", "page.tsx");
    const styles = read("app", "globals.css");

    expect(styles).toContain("aspect-ratio: 3 / 4");
    expect(blog).toContain('sizes="(max-width: 768px) 100vw, 1200px"');
    expect(styles).not.toContain("will-change: transform, opacity");
  });

  it("removes hydration from stateless global layout components", () => {
    expect(read("components", "layout", "AnnouncementBar.tsx")).not.toContain('"use client"');
    expect(read("components", "layout", "FooterNavSections.tsx")).not.toContain('"use client"');
  });

  it("does not introduce master media or legacy media hosts", () => {
    const sources = [
      read("components", "sections", "Hero.tsx"),
      read("components", "sections", "HomeVisualShowcase.tsx"),
      read("components", "sections", "CaseStudies.tsx"),
      read("components", "sections", "Pipeline.tsx"),
    ];

    expect(sources.join("\n")).toContain("https://media.articog.com/");
    expect(sources.join("\n")).not.toMatch(/https:\/\/res\.[^/]+\.com\//);
    expect(sources.join("\n")).not.toMatch(/\b(?:4k|master|production-master)\b/i);
  });

  it("preserves critical SEO/schema output while optimizing media", () => {
    const layout = read("app", "layout.tsx");
    const home = read("app", "page.tsx");

    expect(layout).toContain("siteEntitySchema");
    expect(home).toContain('type="application/ld+json"');
    expect(home).toContain('canonical: "https://articog.com/"');
  });
});