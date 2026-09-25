export const primaryServiceCards = [
  {
    number: "01",
    title: "Brand Films & Commercials",
    description: "Cinematic stories, start to finish",
    href: "/services/ai-video-production",
    image: "https://media.articog.com/images/services/hf_20260824_090509_2e0e972f-465c-435c-8144-b01b1133427b.png",
    alt: "Cinematic brand film production",
    objectPosition: "center 60%",
    caption: "Cinematic brand films, delivered in days not months",
  },
  {
    number: "02",
    title: "Creator-Style Social Content",
    description: "Scroll-stopping video for every platform",
    href: "/services/social-creative",
    image: "https://media.articog.com/images/services/hf_20260821_215506_41068c08-3be5-4f02-bb81-9d5da0895c98.png",
    alt: "Creator-style social content production",
    objectPosition: "center 35%",
    caption: "Authentic creator-style video that does not look like an ad",
  },
  {
    number: "03",
    title: "Performance Creative Variants",
    description: "Data-driven cuts built for campaigns",
    href: "/services/ad-creative",
    image: "https://media.articog.com/images/services/hf_20260820_165439_f355b7b5-fc30-4852-9c69-cb8433145326.png",
    alt: "Performance creative production workspace",
    objectPosition: "center 30%",
    caption: "Dozens of tested variants from a single concept",
  },
  {
    number: "04",
    title: "Creative Workflow Automation",
    description: "Visuals, audio, strategy, post-production",
    href: "/how-it-works/ai-creative-pipeline",
    image: "https://media.articog.com/images/services/hf_20260821_183036_43b96b10-0fec-4954-94b8-316951e3b1a1.png",
    alt: "Creative workflow automation system",
    objectPosition: "center 50%",
    caption: "Every discipline under one roof, one team",
  },
] as const;

export type ServiceMenuItem = (typeof primaryServiceCards)[number];
