import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { dedicatedServicePageBySlug } from "../lib/service-pages";

const servicesPageSource = readFileSync(
  path.join(process.cwd(), "app", "services", "page.tsx"),
  "utf8",
);

const serviceGroupsSource = servicesPageSource.split(
  "const organizedServices =",
)[0];
const aiVideoProductionSource = readFileSync(
  path.join(process.cwd(), "app", "services", "ai-video-production", "page.tsx"),
  "utf8",
);
const deliverablesSource = aiVideoProductionSource.slice(
  aiVideoProductionSource.indexOf("const deliverables ="),
  aiVideoProductionSource.indexOf("const faqs ="),
);
const deliverablesRenderSource = aiVideoProductionSource.slice(
  aiVideoProductionSource.indexOf("const cardClassName"),
  aiVideoProductionSource.indexOf("          </Grid>"),
);

const serviceGroupHrefs = Array.from(
  serviceGroupsSource.matchAll(/href: "([^"]+)"/g),
  ([, href]) => href,
);

const existingRoutes = new Map([
  ["/services/ai-video-production", "AI Video Production"],
  ["/services/ad-creative", "Ad Creative"],
  ["/services/social-creative", "Social Creative"],
  ["/services/product-visuals", "Product Visual Content"],
  ["/services/audio", "Audio & Sound"],
  ["/services/creative-strategy", "Creative Strategy & Concepting"],
  ["/services/post-production", "Post-Production"],
  ["/how-it-works/ai-creative-pipeline", "AI Creative Pipeline"],
]);

function routeSourcePath(route: string) {
  const segments = route.replace(/^\//, "").split("/");
  return path.join(process.cwd(), "app", ...segments, "page.tsx");
}

function getRouteHeading(route: string) {
  const existingHeading = existingRoutes.get(route);
  if (existingHeading) {
    return existingHeading;
  }

  const slug = route.split("/").at(-1);
  return slug ? dedicatedServicePageBySlug[slug]?.title : undefined;
}

describe("Services page routing", () => {
  it("keeps the What We Deliver cards in the exact grid order", () => {
    const expectedCards = [
      ["Brand Films", null],
      ["Product Commercials", null],
      ["Performance Ads", "/services/ad-creative"],
      ["Social & Reels", "/services/social-creative"],
      ["Creator-Style Ads", "/services/ad-creative"],
      ["Product Launch", null],
      ["SaaS & Explainers", null],
      ["Real Estate Films", null],
      ["Corporate & Internal", null],
      ["Localization & Variants", null],
    ];
    const actualCards = Array.from(
      aiVideoProductionSource.matchAll(/\{ title: "([^"]+)", path: (null|"[^"]+")/g),
      ([, title, pathValue]) => [title, pathValue === "null" ? null : pathValue.slice(1, -1)],
    );

    expect(actualCards).toEqual(expectedCards);
    expect(actualCards).toHaveLength(10);
    expect(actualCards.filter(([, href]) => href !== null)).toHaveLength(3);
  });

  it("keeps arrows only on the three linked What We Deliver cards", () => {
    const expectedLinkedCards = [
      ["Performance Ads", "/services/ad-creative"],
      ["Social & Reels", "/services/social-creative"],
      ["Creator-Style Ads", "/services/ad-creative"],
    ];

    expect(deliverablesSource.match(/path: "[^"]+"/g)).toEqual([
      'path: "/services/ad-creative"',
      'path: "/services/social-creative"',
      'path: "/services/ad-creative"',
    ]);
    expect(deliverablesRenderSource).toContain("<div className=\"flex h-full w-full items-center justify-between gap-4\">");
    expect(deliverablesRenderSource).toContain(
      'const cardClassName = "group flex h-full w-full items-center radius-lg border border-white/10 bg-surface p-6 text-foreground transition-all duration-300 hover:border-white/20";',
    );
    expect(deliverablesRenderSource.match(/className=\{cardClassName\}/g)).toHaveLength(2);
    expect(deliverablesRenderSource).not.toContain("<Card");
    expect(deliverablesRenderSource.match(/<ArrowRight className/g)).toHaveLength(1);
    expect(deliverablesRenderSource).toContain("item.path &&");
    expect(deliverablesRenderSource).toContain("ml-auto flex shrink-0 items-center");
    expect(deliverablesRenderSource).not.toMatch(/ArrowRight[^\n]*top-/);

    for (const [title, href] of expectedLinkedCards) {
      expect(aiVideoProductionSource).toContain(`title: "${title}", path: "${href}"`);
    }
  });

  it("gives every service item a valid category destination", () => {
    const hrefs = serviceGroupHrefs;

    expect(hrefs.length).toBe(30);
    expect(new Set(hrefs).size).toBe(7);

    for (const href of hrefs) {
      const heading = getRouteHeading(href);
      const isDynamicService = href.startsWith("/services/") && !existsSync(routeSourcePath(href));

      expect(heading, `${href} should have a destination heading`).toBeTruthy();
      expect(
        isDynamicService || existsSync(routeSourcePath(href)),
        `${href} should resolve to a route page`,
      ).toBe(true);
    }
  });

  it("keeps each generated service destination tied to its service heading", () => {
    for (const service of Object.values(dedicatedServicePageBySlug)) {
      const source = readFileSync(
        path.join(process.cwd(), "app", "services", "[slug]", "page.tsx"),
        "utf8",
      );

      expect(source).toContain("service.title");
      expect(service.title).toBeTruthy();
    }
  });
});
