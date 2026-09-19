import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const headerSource = readFileSync(path.join(process.cwd(), "components", "layout", "Header.tsx"), "utf8");
const mobileSource = readFileSync(path.join(process.cwd(), "components", "layout", "MobileMenu.tsx"), "utf8");
const serviceMenuSource = readFileSync(path.join(process.cwd(), "components", "layout", "service-menu-data.ts"), "utf8");
const homepageContentSource = readFileSync(path.join(process.cwd(), "lib", "content.ts"), "utf8");
const aiAdLibraryPagePath = path.join(process.cwd(), "app", "ai-ad-library", "page.tsx");
const normalizedHeaderSource = headerSource.replace(/\r\n/g, "\n");

describe("primary navigation", () => {
  it("keeps Industries as a direct link and merges What We Do navigation", () => {
    expect(headerSource).toContain('Industries: "/industries"');
    expect(headerSource).toContain('NO_DROPDOWN_GROUPS = ["Work", "Industries"]');
    expect(headerSource).toContain("const isDirectGroup =");
    expect(headerSource).toContain("!isDirectGroup && (");
    expect(mobileSource).toContain("NO_DROPDOWN_GROUPS.includes(group.label)");
    expect(mobileSource).toContain("if (isDirectGroup)");
    expect(headerSource).toContain('label: "What We Do"');
    expect(headerSource).toContain('label: "Industries"');
  });

  it("keeps the specification's parent labels directly linked", () => {
    const labels = ["What We Do", "Industries", "Work", "Why Articog", "Blog", "Company"];

    expect(labels.every((label) => headerSource.includes(`label: "${label}"`))).toBe(true);
    for (const label of labels) {
      expect(headerSource).toContain(
        label.includes(" ") ? `"${label}": "/` : `${label}: "/`,
      );
      expect(headerSource).toContain(`href={groupHubHrefs[group.label]}`);
    }
    expect(headerSource).toContain('NO_DROPDOWN_GROUPS = ["Work", "Industries"]');
  });

  it("makes Blog a direct link without the removed Resources or AI Ad Library navigation", () => {
    expect(normalizedHeaderSource).toContain('label: "Blog"');
    expect(normalizedHeaderSource).toContain('Blog: "/blog"');
    expect(normalizedHeaderSource).toContain('label: "Blog",\n    links: [],');
    expect(normalizedHeaderSource).not.toContain('label: "Resources"');
    expect(normalizedHeaderSource).not.toContain('label: "AI Ad Library"');
    expect(normalizedHeaderSource).not.toContain('href: "/ai-ad-library"');
    expect(normalizedHeaderSource).toContain('label: "What We Do"');
    expect(normalizedHeaderSource).toContain('label: "Why Articog"');
    expect(normalizedHeaderSource).toContain('label: "Company"');
    expect(existsSync(aiAdLibraryPagePath)).toBe(true);
  });

  it("keeps dropdown controls separate from clickable mobile parent links", () => {
    expect(mobileSource).toContain("href={groupHubHrefs[group.label]}");
    expect(mobileSource).toContain("aria-label={`Open ${group.label} menu`}");
    expect(mobileSource).toContain("aria-expanded={isGroupOpen}");
    expect(mobileSource).toContain("Escape");
    expect(mobileSource).toContain("Book a Demo");
  });

  it("uses direct canonical capability/service destinations", () => {
    expect(homepageContentSource).toContain('href: "/services/ai-video-production"');
    expect(homepageContentSource).toContain('href: "/services/product-visuals"');
    expect(homepageContentSource).not.toContain('title: "Brand Films",\n      href: "/services"');
    expect(serviceMenuSource).toContain('href: "/services/social-creative"');
    expect(serviceMenuSource).not.toContain('href: "/work/social"');
  });

  it("keeps the prominent demo entry point in desktop and mobile navigation", () => {
    expect(headerSource).toContain('href="/book-a-demo"');
    expect(mobileSource).toContain('href="/book-a-demo"');
  });
});