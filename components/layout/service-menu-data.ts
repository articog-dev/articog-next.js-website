export const primaryServiceCards = [
  {
    number: "01",
    title: "Brand Films & Commercials",
    description: "Cinematic stories, start to finish",
    href: "/services/ai-video-production",
    image: "/services/articog-service-01-brand-films.jpg",
    alt: "Cinematic brand film production",
    objectPosition: "center 60%",
    caption: "Cinematic brand films, delivered in days not months",
  },
  {
    number: "02",
    title: "Creator-Style Social Content",
    description: "Scroll-stopping video for every platform",
    href: "/work/social",
    image: "/services/articog-service-02-creator-social.jpg",
    alt: "Creator-style social content production",
    objectPosition: "center 35%",
    caption: "Authentic creator-style video that does not look like an ad",
  },
  {
    number: "03",
    title: "Performance Creative Variants",
    description: "Data-driven cuts built for campaigns",
    href: "/services/ad-creative",
    image: "/services/articog-service-03-performance-creative.jpg",
    alt: "Performance creative production workspace",
    objectPosition: "center 30%",
    caption: "Dozens of tested variants from a single concept",
  },
  {
    number: "04",
    title: "Creative Workflow Automation",
    description: "Visuals, audio, strategy, post-production",
    href: "/how-it-works/ai-creative-pipeline",
    image: "/services/articog-service-04-creative-workflow.jpg",
    alt: "Creative workflow automation system",
    objectPosition: "center 50%",
    caption: "Every discipline under one roof, one team",
  },
] as const;

export type ServiceMenuItem = (typeof primaryServiceCards)[number];
