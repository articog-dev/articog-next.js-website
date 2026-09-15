/**
 * Static site content single source of truth for all page data.
 * Import directly into pages and components.
 */
import type { SiteContent } from "@/types";

export const siteContent: SiteContent = {
  hero: {
    eyebrow: "AI NATIVE FILM & PRODUCTION",
    headline: "High-quality campaign creative.\nProduced at AI speed.",
    body: "Articog helps marketing teams produce brand films, paid ads, product visuals and social creative through human-directed AI production workflows — without traditional production bottlenecks.",
    ctaLabel: "Book a Demo",
    ctaHref: "/book-a-demo",
    secondaryCtaLabel: "View Work",
    secondaryCtaHref: "/work",
  },

  proofStats: [],

  problems: [
    {
      number: "01",
      title: "Your creative team is the bottleneck",
      description:
        "Content demand scales, but headcount doesn't. Campaigns slip and assets get recycled.",
    },
    {
      number: "02",
      title: "Agencies move too slowly",
      description:
        "Four-week turnarounds and retainers that don't flex with demand.",
    },
    {
      number: "03",
      title: "Spend scales. Creative doesn't.",
      description:
        "Spend grows, but creative volume stays flat and audiences saturate.",
    },
  ],

  pipeline: [
    {
      step: 1,
      title: "Brief",
      description:
        "Share your goal and references. We set direction first.",
      tag: "Typical workflow",
    },
    {
      step: 2,
      title: "Generate",
      description:
        "Our production team uses brand references and AI workflows to create a curated first round for review.",
      tag: "Typical workflow",
    },
    {
      step: 3,
      title: "Refine",
      description:
        "Review a curated selection. We refine it from your feedback in fast, low-overhead cycles.",
      tag: "Typical workflow",
    },
    {
      step: 4,
      title: "Deliver",
      description:
        "Receive launch-ready masters and platform versions, organized for your campaign.",
      tag: "Typical workflow",
    },
  ],

  capabilities: [
    {
      title: "Brand Films",
      useCase: "Brand identity, product launches, investor reels",
      outcome: "Brand films in days, at a fraction of traditional production cost",
      icon: "film",
    },
    {
      title: "Brand Storytelling",
      useCase: "Origin stories, mission narratives, documentary-style content",
      outcome: "Consistent brand voice across every format and channel",
      icon: "book-open",
    },
    {
      title: "Commercials & Paid Ads",
      useCase: "TV, pre-roll, OOH, performance video ads",
      outcome: "Campaign-ready creative delivered without a traditional production crew",
      icon: "monitor",
    },
    {
      title: "Campaign Visuals & Product Imagery",
      useCase: "Campaign posters, banners, OOH creative, assets ready for print",
      outcome: "On-brand visuals at any scale with consistent brand fidelity",
      icon: "image",
    },
    {
      title: "Audio Ads",
      useCase: "Podcast, radio, streaming audio, brand voice production",
      outcome: "Audio creative delivered with a clear production brief and finishing workflow",
      icon: "mic",
    },
    {
      title: "Creator-Style Social Content",
      useCase: "Instagram, TikTok, YouTube Shorts, organic feeds",
      outcome: "Platform-native content built for the right channels and campaign rhythm",
      icon: "trending-up",
    },
    {
      title: "Performance Creative Variants",
      useCase: "Paid social, display, search creative testing",
      outcome: "Iterative campaign variants designed for testing and optimization",
      icon: "zap",
    },
    {
      title: "Creative Workflow Automation",
      useCase: "Workflow integration from brief to delivery",
      outcome: "A structured production workflow that keeps review cycles efficient and organized.",
      icon: "cpu",
    },
  ],

  comparison: [
    {
      attribute: "Production approach",
      agency: "Traditional production",
      inhouse: "Internal workflow",
      articog: "AI-native workflow",
      articogHighlight: true,
    },
    {
      attribute: "Delivery model",
      agency: "Multi-stage production",
      inhouse: "Internal production",
      articog: "Streamlined production workflow",
      articogHighlight: true,
    },
    {
      attribute: "Cost structure",
      agency: "High retainer plus overages",
      inhouse: "Fixed headcount plus tools",
      articog: "Scales with volume",
      articogHighlight: true,
    },
    {
      attribute: "Volume flexibility",
      agency: "Limited by team size",
      inhouse: "Capped by headcount",
      articog: "Scales with demand",
      articogHighlight: true,
    },
    {
      attribute: "Brand consistency",
      agency: "Brief dependent",
      inhouse: "High",
      articog: "Systematic",
      articogHighlight: true,
    },
    {
      attribute: "Iteration speed",
      agency: "Slow revision cycles",
      inhouse: "Moderate",
      articog: "Reduced production bottlenecks",
      articogHighlight: true,
    },
  ],

  caseStudies: [],

  testimonials: [],

  cta: {
    headline: "Your next campaign.\nDelivered in days.",
    ctaLabel: "Book a Demo",
    ctaHref: "/book-a-demo",
  },
};
