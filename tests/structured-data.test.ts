import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

import {
  createFAQPageSchema,
  createVideoObjectSchema,
  organizationSchema,
  serializeJsonLd,
  siteEntitySchema,
  websiteSchema,
} from "../lib/structured-data";

const read = (...segments: string[]) =>
  readFileSync(path.join(process.cwd(), ...segments), "utf8");

describe("structured data and canonical metadata", () => {
  it("keeps Organization and WebSite schema on approved repository facts", () => {
    expect(siteEntitySchema["@graph"]).toEqual([organizationSchema, websiteSchema]);
    expect(organizationSchema.name).toBe("Articog");
    expect(organizationSchema.url).toBe("https://articog.com");
    expect(organizationSchema.sameAs).toContain("https://www.linkedin.com/company/articog/");
    expect(websiteSchema.publisher["@id"]).toBe("https://articog.com/#organization");
    expect(read("app", "layout.tsx")).toContain("<JsonLd data={siteEntitySchema} />");
  });

  it("does not emit breadcrumb UI or BreadcrumbList schema", () => {
    expect(read("components", "seo", "Breadcrumbs.tsx")).toContain("return null");
    expect(read("components", "seo", "Breadcrumbs.tsx")).not.toContain("createBreadcrumbSchema(items)");
  });

  it("generates FAQPage data from the same question and answer objects shown in the UI", () => {
    const faqs = [
      { q: "How long does a project take?", a: "Timelines depend on scope." },
      { q: "How do revisions work?", a: "Feedback is consolidated." },
    ];
    const schema = createFAQPageSchema(faqs);

    expect(schema.mainEntity).toEqual([
      {
        "@type": "Question",
        name: faqs[0].q,
        acceptedAnswer: { "@type": "Answer", text: faqs[0].a },
      },
      {
        "@type": "Question",
        name: faqs[1].q,
        acceptedAnswer: { "@type": "Answer", text: faqs[1].a },
      },
    ]);
    expect(read("app", "help", "page.tsx")).toContain("createFAQPageSchema(sections.flatMap((section) => section.faqs))");
    expect(read("app", "services", "ai-video-production", "page.tsx")).toContain("createFAQPageSchema(faqs)");
  });

  it("limits Article schema to editorial blog pages", () => {
    expect(read("app", "blog", "[slug]", "page.tsx")).toContain('"@type": "Article"');
    expect(read("app", "services", "page.tsx")).not.toContain('"@type": "Article"');
    expect(read("app", "work", "page.tsx")).not.toContain('"@type": "Article"');
  });

  it("does not emit VideoObject without verified required metadata", () => {
    expect(createVideoObjectSchema({
      name: "Known title",
      description: "Known description",
      thumbnailUrl: "https://example.com/thumbnail.jpg",
    })).toBeNull();
    expect(read("app", "work", "video-ads", "page.tsx")).not.toContain("VideoObject");
  });

  it("keeps canonical URLs absolute and avoids duplicate canonical declarations", () => {
    const files = [
      ["app", "page.tsx"],
      ["app", "services", "page.tsx"],
      ["app", "solutions", "performance-marketing", "page.tsx"],
      ["app", "work", "social", "page.tsx"],
      ["app", "privacy-choices", "layout.tsx"],
    ];

    for (const file of files) {
      const source = read(...file);
      const canonicals = source.match(/canonical:\s*"([^"]+)"/g) ?? [];
      expect(canonicals).toHaveLength(1);
      expect(canonicals[0]).toMatch(/https:\/\/articog\.com\//);
    }
  });

  it("keeps representative indexable pages populated with metadata and one H1", () => {
    const files = [
      ["app", "page.tsx"],
      ["app", "services", "page.tsx"],
      ["app", "solutions", "performance-marketing", "page.tsx"],
      ["app", "work", "social", "page.tsx"],
      ["app", "trust", "ai-and-ip", "page.tsx"],
    ];

    for (const file of files) {
      const source = read(...file);
      expect(source).toMatch(/title:\s*"[^"]+"/);
      expect(source).toMatch(/description:\s*"[^"]+"/);
      expect(
        source.includes('as="h1"') ||
        source.includes("<PageHero") ||
        source.includes("<Hero"),
      ).toBe(true);
    }
  });

  it("escapes unsafe JSON-LD characters before rendering", () => {
    expect(serializeJsonLd({ text: "</script>&" })).toBe('{"text":"\\u003c/script\\u003e\\u0026"}');
  });
});
