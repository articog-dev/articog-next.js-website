import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://articog.com/services" },
  title: "Creative Services | Articog",
  description:
    "AI video production, ad creative, social creative, product visuals, creative strategy, and post-production for growth-stage brands.",
};

import { Link } from "@/components/ui/Link";
import { Container, Section, Button } from "@/components/ui";
import { ArrowRight, Grid2X2, Instagram, Layers3, Smartphone } from "lucide-react";

const serviceDeliverables = [
  {
    title: "Feed Post",
    description: "High impact square and 4:5 assets built for the main feed.",
    Icon: Grid2X2,
  },
  {
    title: "Story Format",
    description: "Immersive 9:16 vertical content designed for mobile-first consumption.",
    Icon: Smartphone,
  },
  {
    title: "Reel Cover",
    description: "Custom-designed thumbnail covers that drive higher click-through rates.",
    Icon: Instagram,
  },
  {
    title: "Organized for Scale",
    description:
      "All content is intelligently grouped into thematic series to ensure cross channel consistency. Every asset is meticulously organized by campaign and format, making reference and implementation seamless for your team.",
    Icon: Layers3,
  },
];

const serviceGroups = [
  {
    category: "Video",
    items: [
      {
        title: "AI Video Production",
        href: "/services/ai-video-production",
        description:
          "Premium cinematic video produced with AI.",
      },
      {
        title: "Brand Films",
        href: "/services/ai-video-production",
        description:
          "Films with rich detail that define your brand identity.",
      },
      {
        title: "Product Commercials",
        href: "/services/ai-video-production",
        description:
          "Product showcases built for conversion.",
      },
      {
        title: "Performance Ads",
        href: "/services/ad-creative",
        description:
          "Direct response video creative for cross channel ROI.",
      },
      {
        title: "Social & Reel Production",
        href: "/services/social-creative",
        description:
          "Fast, vertical content for modern platforms.",
      },
      {
        title: "Product Launch Videos",
        href: "/services/ai-video-production",
        description:
          "Announcement films that build momentum.",
      },
      {
        title: "Localization & Variants",
        href: "/services/ai-video-production",
        description:
          "Adapt campaigns for global markets with localized voice.",
      },
    ],
  },
  {
    category: "Ad Creative",
    items: [
      {
        title: "Ad Creative",
        href: "/services/ad-creative",
        description:
          "Static and video assets for global performance marketing.",
      },
      {
        title: "Performance Video Ads",
        href: "/services/ad-creative",
        description:
          "Video testing and production for paid media.",
      },
      {
        title: "Testing & Variants",
        href: "/services/ad-creative",
        description:
          "Hypothesis-driven testing for paid campaigns.",
      },
      {
        title: "Campaign Key Visuals",
        href: "/services/ad-creative",
        description:
          "The core visual system for a campaign across channels.",
      },
    ],
  },
  {
    category: "Social",
    items: [
      {
        title: "Social Creative",
        href: "/services/social-creative",
        description:
          "Creative concepts driven by data and designed for platform engagement.",
      },
      {
        title: "Monthly Social Content",
        href: "/services/social-creative",
        description:
          "Consistent content cycles to maintain your brand presence.",
      },
      {
        title: "Creative Repurposing",
        href: "/services/social-creative",
        description:
          "Turn existing content into new formats and channels intelligently.",
      },
    ],
  },
  {
    category: "Product Visuals",
    items: [
      {
        title: "Product Visual Content",
        href: "/services/product-visuals",
        description:
          "Dynamic product imagery for e-commerce and marketing.",
      },
      {
        title: "AI Product Photography",
        href: "/services/product-visuals",
        description:
          "Photorealistic product scenes without the physical studio.",
      },
      {
        title: "Custom Image Libraries",
        href: "/services/product-visuals",
        description:
          "Build large, consistent libraries of on-brand product images.",
      },
      {
        title: "E-commerce Visuals",
        href: "/services/product-visuals",
        description:
          "Visuals built for conversion on your site and global marketplaces.",
      },
    ],
  },
  {
    category: "Audio",
    items: [
      {
        title: "Audio & Sound",
        href: "/services/audio",
        description:
          "Complete audio production, from cinematic scores to AI voiceover.",
      },
      {
        title: "AI Voiceover",
        href: "/services/audio",
        description:
          "Hyper-realistic synthetic voice production with full rights clearance.",
      },
      {
        title: "Music & Sound Design",
        href: "/services/audio",
        description:
          "Custom scoring and immersive soundscapes for cinematic impact.",
      },
    ],
  },
  {
    category: "Strategy",
    items: [
      {
        title: "Creative Strategy & Concepting",
        href: "/services/creative-strategy",
        description:
          "Strategic frameworks to guide your creative production engine.",
      },
      {
        title: "Campaign Strategy",
        href: "/services/creative-strategy",
        description:
          "Planning full campaign systems for cross channel impact.",
      },
      {
        title: "Concept Development",
        href: "/services/creative-strategy",
        description:
          "Exploring multiple creative directions before committing to production.",
      },
      {
        title: "Storyboarding & Previs",
        href: "/services/creative-strategy",
        description:
          "Visualizing and sequencing every shot before production begins.",
      },
    ],
  },
  {
    category: "Post-Production",
    items: [
      {
        title: "AI Post-Production",
        href: "/services/post-production",
        description:
          "Professional editing, color grading, and technical finishing.",
      },
      {
        title: "Motion Graphics",
        href: "/services/post-production",
        description:
          "Animated titles, callouts, and branded elements for video.",
      },
      {
        title: "Upscaling & Mastering",
        href: "/services/post-production",
        description:
          "Technical mastering for high-resolution delivery.",
      },
      {
        title: "AI Compositing",
        href: "/services/post-production",
        description:
          "Integrating assets seamlessly into complex cinematic scenes.",
      },
      {
        title: "Video Editing",
        href: "/services/post-production",
        description:
          "Smart narrative assembly and sequence optimization.",
      },
    ],
  },
];

const serviceModelGroups = [
  {
    title: "Film & Video",
    items: [
      ["Brand Films", "/services/ai-video-production"],
      ["Commercials", "/services/ai-video-production"],
      ["Product Films", "/services/ai-video-production"],
      ["Explainers", "/services/ai-video-production"],
    ],
  },
  {
    title: "Performance & Social",
    items: [
      ["Paid Ads", "/services/ad-creative"],
      ["UGC-style Creative", "/services/social-creative"],
      ["Reels / Short-form", "/services/social-creative"],
      ["Creative Variants", "/services/ad-creative"],
    ],
  },
  {
    title: "Visual Production",
    items: [
      ["Product Visuals", "/services/product-visuals"],
      ["Campaign Imagery", "/services/ad-creative"],
      ["OOH / Display", "/services/product-visuals"],
      ["Social Assets", "/services/social-creative"],
    ],
  },
  {
    title: "Production Systems",
    items: [
      ["Creative Automation", "/how-it-works/ai-creative-pipeline"],
      ["Localization", "/services/ai-video-production"],
      ["Post-production", "/services/post-production"],
      ["Multi-format Adaptation", "/services/post-production"],
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <Section
        size="lg"
        className="relative flex items-center overflow-hidden py-20 md:py-24"
      >
        {/* Optimized Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            playsInline
            loop
            controls={false}
            preload="metadata"
            poster="https://res.cloudinary.com/hmy5ctzy/video/upload/q_auto:good,f_auto,w_1600,so_0/v1786976270/web_1_1_1_1.jpg"
            className="h-full w-full object-cover"
            aria-hidden="true"
          >
            {/* Desktop */}
            <source
              src="https://res.cloudinary.com/hmy5ctzy/video/upload/f_mp4,vc_h264,q_auto:good,w_1600,dpr_auto,c_limit/v1786976270/web_1_1_1_1.mp4"
              type="video/mp4"
              media="(min-width: 769px)"
            />

            {/* Mobile */}
            <source
              src="https://res.cloudinary.com/hmy5ctzy/video/upload/f_mp4,vc_h264,q_auto:good,w_960,dpr_auto,c_limit/v1786976270/web_1_1_1_1.mp4"
              type="video/mp4"
            />
          </video>

          {/* Lightened overlay to preserve brightness while keeping text readable */}
          <div
            className="absolute inset-0 z-10"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.14)",
            }}
          />
        </div>

        <Container className="relative z-20">
          <div className="mx-auto max-w-3xl text-center">
            <span
              className="mb-5 inline-block type-label uppercase tracking-[0.18em]"
              style={{
                color: "rgba(255,255,255,0.40)",
              }}
            >
              Services
            </span>

            <h1 className="type-h1 text-white">
              Every creative format, delivered.
            </h1>

          </div>
        </Container>
      </Section>

      <Section className="border-t border-white/[0.05] py-20">
        <Container>
          <div className="mx-auto mb-10 max-w-3xl">
            <span className="mb-4 inline-block type-label uppercase tracking-[0.18em] text-white/40">
              WHAT WE PRODUCE
            </span>
            <h2 className="type-h2 text-white">One production partner. Every campaign format.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {serviceModelGroups.map((group) => (
              <div key={group.title} className="rounded-xl border border-white/[0.08] p-6">
                <h3 className="type-h3 mb-5 text-white">{group.title}</h3>
                <ul className="space-y-3">
                  {group.items.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} className="type-small text-white/60 transition-colors hover:text-white">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Categorized Services */}
      <div className="pb-24">
        {serviceGroups.map((group) => (
          <Section key={group.category} size="md" className="py-12">
            <Container>
              <h2 className="type-h2 mb-10 text-white">
                {group.category}
              </h2>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((service) => (
                  <Link
                    key={`${group.category}-${service.title}`}
                    href={service.href}
                    className="group block rounded-xl p-5 transition-colors duration-200 hover:border-white/[0.16]"
                    style={{
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div className="flex w-full min-w-0 items-center justify-between gap-4">
                      <h3 className="min-w-0 flex-1 type-h3 text-white transition-colors duration-200 group-hover:text-white/90">
                        {service.title}
                      </h3>
                      <ArrowRight
                        size={14}
                        className="shrink-0 text-white/35 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white/70"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </Container>
          </Section>
        ))}
      </div>

      {/* Service Deliverables */}
      <Section size="md" className="border-t border-white/[0.05]">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
            {serviceDeliverables.map(({ title, description, Icon }, index) => (
              <div
                key={title}
                className={`rounded-xl border border-white/[0.08] p-6 ${index === serviceDeliverables.length - 1 ? "sm:col-span-3" : ""}`}
              >
                <Icon className="mb-5 h-6 w-6 text-white/70" aria-hidden="true" />
                <h2 className="type-h3 mb-3 text-white">{title}</h2>
                <p className="type-small leading-relaxed text-white/60">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section size="lg" className="border-t border-white/[0.05]">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="type-h2 mb-6 text-white">
              Ready to transform your production?
            </h2>

            <Button asChild variant="primary" size="lg">
              <Link href="/book-a-demo">
                Book a Demo
                <ArrowRight size={15} />
              </Link>
            </Button>

            <p
              className="mt-8 font-sans text-xs"
              style={{
                color: "rgba(255,255,255,0.28)",
              }}
            >
              No commitment required. First conversation is free.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}