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
