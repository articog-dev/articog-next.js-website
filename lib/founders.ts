export type FounderProfile = {
  slug: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  circular?: boolean;
  roleLines: string[];
  metaLines?: string[];
  paragraphs: string[];
  sections: {
    title: string;
    paragraphs?: string[];
    items?: string[];
  }[];
  linkedin: string;
};

export const founders: FounderProfile[] = [
  {
    slug: "sai-teja-inampudi",
    name: "Sai Teja Inampudi",
    imageSrc: "/sai-teja-inampudi.png",
    imageAlt: "Sai Teja Inampudi",
    roleLines: [
      "CEO & Founder, Articog, AI-Native Film & Production Company",
      "Co-Founder, AFIN (AI Film India Network)",
    ],
    paragraphs: [
      "Sai Teja Inampudi is the CEO & Founder of Articog, an AI-native film and production company building next-generation creative workflows for brands, agencies, and marketing teams. He is also the Co-Founder of AFIN (AI Film India Network), a community bringing together AI filmmakers and creative professionals. He works at the intersection of generative AI, filmmaking, creative direction, visual storytelling, and technology, with a focus on transforming how commercials, brand films, product content, and cinematic experiences are produced.",
    ],
    sections: [
      {
        title: "Experience",
        paragraphs: [
          "Sai Teja has a multidisciplinary background across AI filmmaking, creative technology, visual design, video production, editing, UI/UX, and entrepreneurship. At Articog, he leads the development of AI-native production pipelines combining generative AI with human creative direction, storytelling, editing, sound, and post-production. His experience also includes leadership in technology and creative communities, cultural production, startup projects, and team building.",
        ],
      },
      {
        title: "Core Areas",
        paragraphs: [
          "AI Filmmaking • Generative AI • Creative Direction • Brand & Commercial Films • AI Video Production • Visual Storytelling • Creative Technology • Video Editing & Post-Production • UI/UX & Visual Design • Startup Leadership • Creative Production Workflows",
        ],
      },
    ],
    linkedin: "https://www.linkedin.com/in/-saitejainampudi/",
  },
  {
    slug: "dr-harika-govada",
    name: "Dr. Harika Govada",
    imageSrc: "/harika-govada.png.png",
    imageAlt: "Dr. Harika Govada",
    circular: true,
    roleLines: ["MD & Co-Founder, Articog"],
    metaLines: [
      "MD & Co-founder | Creative AI Production | Brand Storytelling | Video Production, Creative automation",
      "Hyderabad, Telangana, India",
    ],
    paragraphs: [
      "Building AI-led creative production systems at Articog | MD & Co-founder",
      "Background in the creative field through Govada Creations, growing from intern to leadership over the years. Focused on execution, scale, and keeping things simple and sharp.",
    ],
    sections: [
      {
        title: "Experience",
        items: [
          "Articog, Co-Founder, Mar 2025 to Present",
          "Govada Creations, Vice President, Oct 2022 to Present",
          "Govada Creations, Social Media Director, Mar 2020 to Present",
          "Govada Creations, Activities Coordinator, Feb 2014 to Present",
          "Govada Creations, Intern, 2013 to 2014",
          "Clinical Observer, Chelsea and Westminster Hospital NHS Foundation Trust, Jun 2025 to Jul 2025",
          "Duty Medical Officer, Sri Sai Balaji Hospital, Nov 2022 to Mar 2023",
          "Clinical Observer, Mid and South Essex NHS Foundation Trust, Jun 2025 to Jul 2025",
        ],
      },
      {
        title: "Education",
        paragraphs: [
          "Kamineni Academy of Medical Sciences and Research Centre\nBachelor of Medicine, Bachelor of Surgery (MBBS), 2016 to 2022",
        ],
      },
      {
        title: "Skills",
        paragraphs: ["Video Production • Analytic Problem Solving"],
      },
    ],
    linkedin: "https://www.linkedin.com/in/dr-harika-govada/",
  },
];

export function getFounderBySlug(slug: string) {
  return founders.find((founder) => founder.slug === slug);
}
