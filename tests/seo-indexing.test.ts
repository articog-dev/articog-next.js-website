import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

describe("technical SEO and indexing", () => {
  it("excludes noindex and utility routes from the XML sitemap", () => {
    const sitemapSource = readFileSync(path.join(process.cwd(), "app", "sitemap.ts"), "utf8");

    expect(sitemapSource).toContain('const EXCLUDED_ROUTES = new Set(["/thank-you", "/thank-you/demo", "/sitemap"]);');
    expect(sitemapSource).toContain('entry.name === "api"');
  });

  it("includes the expected canonical core marketing routes", () => {
    const homeSource = readFileSync(path.join(process.cwd(), "app", "page.tsx"), "utf8");
    const aboutSource = readFileSync(path.join(process.cwd(), "app", "about", "page.tsx"), "utf8");
    const servicesSource = readFileSync(path.join(process.cwd(), "app", "services", "page.tsx"), "utf8");
    const solutionsSource = readFileSync(path.join(process.cwd(), "app", "solutions", "page.tsx"), "utf8");
    const workSource = readFileSync(path.join(process.cwd(), "app", "work", "page.tsx"), "utf8");
    const blogSource = readFileSync(path.join(process.cwd(), "app", "blog", "page.tsx"), "utf8");

    expect(homeSource).toContain('canonical: "https://articog.com/"');
    expect(aboutSource).toContain('canonical: "https://articog.com/about"');
    expect(servicesSource).toContain('canonical: "https://articog.com/services"');
    expect(solutionsSource).toContain('canonical: "https://articog.com/solutions"');
    expect(workSource).toContain('canonical: "https://articog.com/work"');
    expect(blogSource).toContain('canonical: "https://articog.com/blog"');
  });

  it("keeps representative canonical URLs aligned with their public routes", () => {
    const homeSource = readFileSync(path.join(process.cwd(), "app", "page.tsx"), "utf8");
    const servicesSource = readFileSync(path.join(process.cwd(), "app", "services", "page.tsx"), "utf8");
    const privacySource = readFileSync(path.join(process.cwd(), "app", "privacy-policy", "page.tsx"), "utf8");

    expect(homeSource).toContain('canonical: "https://articog.com/"');
    expect(servicesSource).toContain('canonical: "https://articog.com/services"');
    expect(privacySource).toContain('canonical: "https://articog.com/privacy-policy"');
  });

  it("does not block essential crawlers or public route access in robots.txt", () => {
    const robotsSource = readFileSync(path.join(process.cwd(), "app", "robots.ts"), "utf8");

    expect(robotsSource).toContain('userAgent: "*"');
    expect(robotsSource).toContain('allow: ["/"]');
    expect(robotsSource).toContain('sitemap: "https://articog.com/sitemap.xml"');
    expect(robotsSource).not.toContain("disallow");
  });
});
