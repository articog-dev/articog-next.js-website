import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const headerSource = readFileSync(path.join(process.cwd(), "components", "layout", "Header.tsx"), "utf8");
const mobileSource = readFileSync(path.join(process.cwd(), "components", "layout", "MobileMenu.tsx"), "utf8");
const serviceMenuSource = readFileSync(path.join(process.cwd(), "components", "layout", "service-menu-data.ts"), "utf8");
const homepageContentSource = readFileSync(path.join(process.cwd(), "lib", "content.ts"), "utf8");

describe("primary navigation", () => {
  it("keeps the specification's parent labels directly linked", () => {
    const labels = ["Services", "Solutions", "Industries", "Work", "Why Articog", "Resources", "Company"];

    expect(labels.every((label) => headerSource.includes(`label: "${label}"`))).toBe(true);
    for (const label of labels) {
      expect(headerSource).toContain(
        label.includes(" ") ? `"${label}": "/` : `${label}: "/`,
      );
      expect(headerSource).toContain(`href={groupHubHrefs[group.label]}`);
    }
    expect(headerSource).toContain('NO_DROPDOWN_GROUPS = ["Work"]');
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