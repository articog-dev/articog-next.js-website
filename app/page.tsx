import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://articog.com/" },
  title: "Articog | AI Native Film & Production Company",
  description:
    "Articog is an AI-native film and creative production company for growth-stage brands and modern marketing teams. We produce brand films, commercials, performance creative, product visuals, creator-style social content, audio, and campaign assets through human-directed AI production workflows.",
};
import { siteContent } from "@/lib/content";
import {
  Hero,
  Pipeline,
  Capabilities,
  Comparison,
  CaseStudies,
  FinalCTA,
  HomeVisualShowcase,
  
} from "@/components/sections";

// ─── Metadata ────────────────────────────────────────────────────────────────

// ─── Structured data ─────────────────────────────────────────────────────────

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://articog.com/#service",
  name: "AI Native Film & Production Company",
  provider: {
    "@type": "Organization",
    "@id": "https://articog.com/#organization",
  },
  serviceType: "Creative Production",
  description:
    "Articog helps growth-stage brands and modern marketing teams produce brand films, commercials, performance creative, product visuals, creator-style social content, audio, and campaign assets through human-directed AI production workflows.",
  areaServed: { "@type": "Place", name: "Worldwide" },
  audience: {
    "@type": "Audience",
    audienceType:
      "Marketing Teams, Growth Teams, Brand Managers, DTC Brands, SaaS Companies, E-commerce Brands",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Creative Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Brand Films" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Brand Storytelling" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Commercials & Paid Ads" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Campaign Visuals & Product Imagery" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Audio Production" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Creator-Style Social Content" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Performance Creative Variants" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Creative Workflow Automation" },
      },
    ],
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://articog.com/#webpage",
  url: "https://articog.com",
  name: "Articog | AI Native Film & Production Company",
  isPartOf: { "@id": "https://articog.com/#website" },
  about: { "@id": "https://articog.com/#organization" },
  description:
    "AI-native film and creative production for growth-stage brands and modern marketing teams. Brand films, commercials, performance creative, product visuals, and social content produced through human-directed AI workflows.",
  inLanguage: "en-US",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const homepage = siteContent;

  return (
    <div className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <Hero content={homepage.hero} stats={homepage.proofStats} />
      <Capabilities capabilities={homepage.capabilities} />
      <HomeVisualShowcase />
      <Pipeline steps={homepage.pipeline} />
      <CaseStudies caseStudies={homepage.caseStudies} />
      <Comparison rows={homepage.comparison} />
      <FinalCTA content={homepage.cta} />
    </div>
  );
}
