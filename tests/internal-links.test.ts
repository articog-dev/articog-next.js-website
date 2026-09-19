import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const read = (...segments: string[]) =>
  readFileSync(path.join(process.cwd(), ...segments), "utf8");

const routeExists = (route: string) => {
  const segments = route.replace(/^\//, "").split("/");
  return existsSync(path.join(process.cwd(), "app", ...segments, "page.tsx"));
};

describe("internal link architecture", () => {
  it("keeps homepage capability links on their intended canonical routes", () => {
    const source = read("lib", "content.ts");

    expect(source).toContain('href: "/services/ai-video-production"');
    expect(source).toContain('href: "/services/ad-creative"');
    expect(source).toContain('href: "/services/product-visuals"');
    expect(source).toContain('href: "/services/audio"');
    expect(source).toContain('href: "/services/social-creative"');
    expect(source).toContain('href: "/how-it-works/ai-creative-pipeline"');
  });

  it("keeps services hub items mapped to direct canonical destinations", () => {
    const source = read("app", "services", "page.tsx");

    expect(source).toMatch(/title: "Performance Ads",\s+href: "\/services\/ad-creative"/);
    expect(source).toMatch(/title: "Social & Reel Production",\s+href: "\/services\/social-creative"/);
    expect(source).not.toMatch(/title: "Performance Ads",\s+href: "\/services\/ai-video-production"/);
    expect(source).not.toMatch(/title: "Social & Reel Production",\s+href: "\/services\/ai-video-production"/);
  });

  it("keeps solution, industry, work, trust, and help destinations crawlable", () => {
    const canonicalRoutes = [
      "/solutions/performance-marketing",
      "/solutions/product-launch",
      "/industries",
      "/work/video-ads",
      "/work/social",
      "/trust/ai-and-ip",
      "/trust/security",
      "/help",
      "/blog",
    ];

    for (const route of canonicalRoutes) {
      expect(routeExists(route), `${route} should resolve to an app route`).toBe(true);
    }
  });

  it("does not use known redirect-only routes for normal hub navigation", () => {
    const workSource = read("app", "work", "page.tsx");
    const servicesSource = read("app", "services", "page.tsx");
    const homepageSource = read("lib", "content.ts");

    for (const source of [workSource, servicesSource, homepageSource]) {
      expect(source).not.toContain('"/work/industries"');
      expect(source).not.toContain('"/pricing/faq"');
    }
  });

  it("preserves the primary navigation's canonical parent routes", () => {
    const source = read("components", "layout", "Header.tsx");

    expect(source).toContain('"What We Do": "/services"');
    expect(source).not.toContain('Solutions: "/solutions"');
    expect(source).toContain('Industries: "/industries"');
    expect(source).toContain('Work: "/work"');
    expect(source).toContain('"Why Articog": "/why-articog"');
  });
});