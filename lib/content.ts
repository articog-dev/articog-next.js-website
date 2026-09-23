/**
 * Static site content single source of truth for all page data.
 * Import directly into pages and components.
 */
import type { SiteContent } from "@/types";

export const siteContent: SiteContent = {
  hero: {
    eyebrow: "AI NATIVE FILM & PRODUCTION",
    headline: "More brand content. Lower production cost. Faster with AI.",
    body: "Articog is an AI Native Film & Production Company for brands. We create stories around every product through AI-native production, reducing traditional production, production time and budget. One monthly subscription can cover brand films, commercials, social content, product visuals and audio.",
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
        "Brief: Share the product, brand story, goal and references.",
      tag: "Typical workflow",
    },
    {
      step: 2,
      title: "Generate",
      description:
        "Create: We build the story and produce faster with AI.",
      tag: "Typical workflow",
    },
    {
      step: 3,
      title: "Refine",
      description:
        "Refine: Human direction keeps the work on-brand.",
      tag: "Typical workflow",
    },
    {
      step: 4,
      title: "Deliver",
      description:
        "Deliver: Receive finished content for every required channel and format.",
      tag: "Typical workflow",
    },
  ],

  capabilities: [
    {
      title: "Brand Films & Storytelling",
      href: "/services/ai-video-production",
      useCase: "Brand identity, product launches, origin stories, investor reels",
      outcome: "Cinematic brand content in days, at a fraction of traditional production cost",
      icon: "film",
    },
    {
      title: "Commercials & Performance Ads",
      href: "/services/ad-creative",
      useCase: "TV, pre-roll, OOH, paid social, display, search creative testing",
      outcome: "Campaign-ready creative and iterative test variants without a traditional production crew",
      icon: "monitor",
    },
    {
      title: "Campaign Visuals & Product Imagery",
      href: "/services/product-visuals",
      useCase: "Campaign posters, banners, OOH creative, assets ready for print",
      outcome: "On-brand visuals at any scale with consistent brand fidelity",
      icon: "image",
    },
    {
      title: "Audio Ads",
      href: "/services/audio",
      useCase: "Podcast, radio, streaming audio, brand voice production",
      outcome: "Audio creative delivered with a clear production brief and finishing workflow",
      icon: "mic",
    },
    {
      title: "Creator-Style Social Content",
      href: "/services/social-creative",
      useCase: "Instagram, TikTok, YouTube Shorts, organic feeds",
      outcome: "Platform-native content built for the right channels and campaign rhythm",
      icon: "trending-up",
    },
    {
      title: "Creative Workflow Automation",
      href: "/how-it-works/ai-creative-pipeline",
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
      articog: "AI-native production",
      articogHighlight: true,
    },
    {
      attribute: "Engagement",
      agency: "Multi-stage production",
      inhouse: "Internal production",
      articog: "Project, ongoing or strategic",
      articogHighlight: true,
    },
    {
      attribute: "Production capacity",
      agency: "High retainer plus overages",
      inhouse: "Fixed headcount plus tools",
      articog: "Scales with demand",
      articogHighlight: true,
    },
    {
      attribute: "Brand consistency",
      agency: "Brief dependent",
      inhouse: "High",
      articog: "Structured brand controls",
      articogHighlight: true,
    },
    {
      attribute: "Iteration",
      agency: "Slow revision cycles",
      inhouse: "Moderate",
      articog: "Fast feedback and revision cycles",
      articogHighlight: true,
    },
    {
      attribute: "Team",
      agency: "External production team",
      inhouse: "Internal creative team",
      articog: "Creative direction + AI production + post-production",
      articogHighlight: true,
    },
  ],

  caseStudies: [],

  testimonials: [],

  cta: {
    headline: "Ready to transform your production?",
    ctaLabel: "Book a Demo",
    ctaHref: "/book-a-demo",
  },
};
