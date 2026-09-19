export const topLevelServiceLinks = [
  {
    label: "AI Video Production",
    pageTitle: "AI Video Production",
    href: "/services/ai-video-production",
  },
  {
    label: "Ad Creative",
    pageTitle: "Ad Creative",
    href: "/services/ad-creative",
  },
  {
    label: "Social Creative",
    pageTitle: "Social Creative",
    href: "/services/social-creative",
  },
  {
    label: "Product Visuals",
    pageTitle: "Product Visual Content",
    href: "/services/product-visuals",
  },
  {
    label: "Audio & Sound",
    pageTitle: "Audio & Sound",
    href: "/services/audio",
  },
  {
    label: "Creative Strategy",
    pageTitle: "Creative Strategy & Concepting",
    href: "/services/creative-strategy",
  },
  {
    label: "Post-Production",
    pageTitle: "AI Post-Production",
    href: "/services/post-production",
  },
] as const;

export type TopLevelServiceLink = (typeof topLevelServiceLinks)[number];
