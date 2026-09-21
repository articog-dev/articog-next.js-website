const SITE_URL = "https://www.articog.com";

export const organizationSchema = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Articog",
  url: SITE_URL,
  logo: `${SITE_URL}/articog-logo-white.png`,
  sameAs: [
    "https://www.linkedin.com/company/articog/",
    "https://www.youtube.com/@articogcom",
    "https://x.com/articogcom",
    "https://www.instagram.com/articogcom/",
    "https://medium.com/@articog.com",
  ],
} as const;

export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Articog",
  publisher: { "@id": organizationSchema["@id"] },
  inLanguage: "en-US",
} as const;

export const siteEntitySchema = {
  "@context": "https://schema.org",
  "@graph": [organizationSchema, websiteSchema],
} as const;

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
}

export function createFAQPageSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export type VideoObjectInput = {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  contentUrl?: string;
  embedUrl?: string;
};

export function createVideoObjectSchema(video: Partial<VideoObjectInput>) {
  if (
    !video.name ||
    !video.description ||
    !video.thumbnailUrl ||
    !video.uploadDate ||
    !video.duration
  ) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    ...video,
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
