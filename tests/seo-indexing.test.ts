import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

import sitemap from "../app/sitemap";

describe("technical SEO and indexing", () => {
  it("excludes noindex and utility routes from the XML sitemap", () => {
    const sitemapSource = readFileSync(path.join(process.cwd(), "app", "sitemap.ts"), "utf8");

    expect(sitemapSource).toContain('const EXCLUDED_ROUTES = new Set(["/thank-you", "/thank-you/demo", "/sitemap"]);');
    expect(sitemapSource).toContain('entry.name === "api"');
  });

  it("emits unique production URLs for indexable founder profiles", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every((url) => url.startsWith("https://www.articog.com/"))).toBe(true);
    expect(urls).toContain("https://www.articog.com/about/founder/sai-teja-inampudi");
    expect(urls).toContain("https://www.articog.com/about/founder/dr-harika-govada");
    expect(urls).not.toContain("https://www.articog.com/thank-you");
    expect(urls).not.toContain("https://www.articog.com/thank-you/demo");
    expect(urls).not.toContain("https://www.articog.com/sitemap");
  });

  it("includes the expected canonical core marketing routes", () => {
    const homeSource = readFileSync(path.join(process.cwd(), "app", "page.tsx"), "utf8");
    const aboutSource = readFileSync(path.join(process.cwd(), "app", "about", "page.tsx"), "utf8");
    const servicesSource = readFileSync(path.join(process.cwd(), "app", "services", "page.tsx"), "utf8");
    const solutionsSource = readFileSync(path.join(process.cwd(), "app", "solutions", "page.tsx"), "utf8");
    const workSource = readFileSync(path.join(process.cwd(), "app", "work", "page.tsx"), "utf8");
    const blogSource = readFileSync(path.join(process.cwd(), "app", "blog", "page.tsx"), "utf8");

    expect(homeSource).toContain('canonical: "https://www.articog.com/"');
    expect(aboutSource).toContain('canonical: "https://www.articog.com/about"');
    expect(servicesSource).toContain('canonical: "https://www.articog.com/services"');
    expect(solutionsSource).toContain('canonical: "https://www.articog.com/solutions"');
    expect(workSource).toContain('canonical: "https://www.articog.com/work"');
    expect(blogSource).toContain('canonical: "https://www.articog.com/blog"');
  });

  it("keeps representative canonical URLs aligned with their public routes", () => {
    const homeSource = readFileSync(path.join(process.cwd(), "app", "page.tsx"), "utf8");
    const servicesSource = readFileSync(path.join(process.cwd(), "app", "services", "page.tsx"), "utf8");
    const privacySource = readFileSync(path.join(process.cwd(), "app", "privacy-policy", "page.tsx"), "utf8");

    expect(homeSource).toContain('canonical: "https://www.articog.com/"');
    expect(servicesSource).toContain('canonical: "https://www.articog.com/services"');
    expect(privacySource).toContain('canonical: "https://www.articog.com/privacy-policy"');
  });

  it("does not block essential crawlers or public route access in robots.txt", () => {
    const robotsSource = readFileSync(path.join(process.cwd(), "app", "robots.ts"), "utf8");

    expect(robotsSource).toContain('userAgent: "*"');
    expect(robotsSource).toContain('allow: ["/"]');
    expect(robotsSource).toContain('sitemap: "https://www.articog.com/sitemap.xml"');
    expect(robotsSource).not.toContain("disallow");
  });
});
