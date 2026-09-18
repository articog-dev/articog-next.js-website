import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { dedicatedServicePageBySlug } from "../lib/service-pages";

const servicesPageSource = readFileSync(
  path.join(process.cwd(), "app", "services", "page.tsx"),
  "utf8",
);

const categorizedServicesSource = servicesPageSource.split(
  "export const serviceModelGroups =",
)[0];
const campaignFormatsSource = servicesPageSource.split(
  "export const serviceModelGroups =",
)[1];

const categorizedServiceHrefs = Array.from(
  categorizedServicesSource.matchAll(/href: "([^"]+)"/g),
  ([, href]) => href,
);
const campaignFormatHrefs = Array.from(
  campaignFormatsSource.matchAll(/\["[^"]+", "([^"]+)"\]/g),
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
  it("gives every categorized service row a distinct valid destination", () => {
    const hrefs = categorizedServiceHrefs;

    expect(hrefs.length).toBe(30);
    expect(new Set(hrefs).size).toBe(hrefs.length);

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

  it("gives every campaign-format link a valid service destination", () => {
    expect(campaignFormatHrefs.length).toBe(16);

    for (const href of campaignFormatHrefs) {
      const heading = getRouteHeading(href);
      const sourceExists = existsSync(routeSourcePath(href));
      const dynamicPageExists = href.startsWith("/services/") && Boolean(
        dedicatedServicePageBySlug[href.split("/").at(-1) ?? ""],
      );

      expect(heading, `${href} should have a destination heading`).toBeTruthy();
      expect(sourceExists || dynamicPageExists, `${href} should resolve to a route`).toBe(true);
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
