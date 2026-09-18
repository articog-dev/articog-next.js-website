export type ServicePageDefinition = {
  slug: string;
  title: string;
  description?: string;
};

export const dedicatedServicePages: ServicePageDefinition[] = [
  {
    slug: "brand-films",
    title: "Brand Films",
    description: "Films with rich detail that define your brand identity.",
  },
  {
    slug: "product-commercials",
    title: "Product Commercials",
    description: "Product showcases built for conversion.",
  },
  {
    slug: "performance-ads",
    title: "Performance Ads",
    description: "Direct response video creative for cross channel ROI.",
  },
  {
    slug: "social-reel-production",
    title: "Social & Reel Production",
    description: "Fast, vertical content for modern platforms.",
  },
  {
    slug: "product-launch-videos",
    title: "Product Launch Videos",
    description: "Announcement films that build momentum.",
  },
  {
    slug: "localization-variants",
    title: "Localization & Variants",
    description: "Adapt campaigns for global markets with localized voice.",
  },
  {
    slug: "performance-video-ads",
    title: "Performance Video Ads",
    description: "Video testing and production for paid media.",
  },
  {
    slug: "testing-variants",
    title: "Testing & Variants",
    description: "Hypothesis-driven testing for paid campaigns.",
  },
  {
    slug: "campaign-key-visuals",
    title: "Campaign Key Visuals",
    description: "The core visual system for a campaign across channels.",
  },
  {
    slug: "monthly-social-content",
    title: "Monthly Social Content",
    description: "Consistent content cycles to maintain your brand presence.",
  },
  {
    slug: "creative-repurposing",
    title: "Creative Repurposing",
    description: "Turn existing content into new formats and channels intelligently.",
  },
  {
    slug: "product-visual-content",
    title: "Product Visual Content",
    description: "Dynamic product imagery for e-commerce and marketing.",
  },
  {
    slug: "ai-product-photography",
    title: "AI Product Photography",
    description: "Photorealistic product scenes without the physical studio.",
  },
  {
    slug: "custom-image-libraries",
    title: "Custom Image Libraries",
    description: "Build large, consistent libraries of on-brand product images.",
  },
  {
    slug: "ecommerce-visuals",
    title: "E-commerce Visuals",
    description: "Visuals built for conversion on your site and global marketplaces.",
  },
  {
    slug: "ai-voiceover",
    title: "AI Voiceover",
    description: "Hyper-realistic synthetic voice production with full rights clearance.",
  },
  {
    slug: "music-sound-design",
    title: "Music & Sound Design",
    description: "Custom scoring and immersive soundscapes for cinematic impact.",
  },
  {
    slug: "campaign-strategy",
    title: "Campaign Strategy",
    description: "Planning full campaign systems for cross channel impact.",
  },
  {
    slug: "concept-development",
    title: "Concept Development",
    description: "Exploring multiple creative directions before committing to production.",
  },
  {
    slug: "storyboarding-previs",
    title: "Storyboarding & Previs",
    description: "Visualizing and sequencing every shot before production begins.",
  },
  {
    slug: "motion-graphics",
    title: "Motion Graphics",
    description: "Animated titles, callouts, and branded elements for video.",
  },
  {
    slug: "ai-post-production",
    title: "AI Post-Production",
    description: "Professional editing, color grading, and technical finishing.",
  },
  {
    slug: "upscaling-mastering",
    title: "Upscaling & Mastering",
    description: "Technical mastering for high-resolution delivery.",
  },
  {
    slug: "ai-compositing",
    title: "AI Compositing",
    description: "Integrating assets seamlessly into complex cinematic scenes.",
  },
  {
    slug: "video-editing",
    title: "Video Editing",
    description: "Smart narrative assembly and sequence optimization.",
  },
  {
    slug: "commercials",
    title: "Commercials",
  },
  {
    slug: "product-films",
    title: "Product Films",
  },
  {
    slug: "explainers",
    title: "Explainers",
  },
  {
    slug: "paid-ads",
    title: "Paid Ads",
  },
  {
    slug: "ugc-style-creative",
    title: "UGC-style Creative",
  },
  {
    slug: "reels-short-form",
    title: "Reels / Short-form",
  },
  {
    slug: "creative-variants",
    title: "Creative Variants",
  },
  {
    slug: "campaign-imagery",
    title: "Campaign Imagery",
  },
  {
    slug: "ooh-display",
    title: "OOH / Display",
  },
  {
    slug: "social-assets",
    title: "Social Assets",
  },
  {
    slug: "creative-automation",
    title: "Creative Automation",
  },
  {
    slug: "multi-format-adaptation",
    title: "Multi-format Adaptation",
  },
];

export const dedicatedServicePageBySlug = Object.fromEntries(
  dedicatedServicePages.map((service) => [service.slug, service]),
) as Record<string, ServicePageDefinition>;
