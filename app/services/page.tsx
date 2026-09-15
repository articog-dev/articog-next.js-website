import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://articog.com/services" },
  title: "Creative Services | Articog",
  description:
    "AI video production, ad creative, social creative, product visuals, creative strategy, and post-production for growth-stage brands.",
};

import { Link } from "@/components/ui/Link";
import { Container, Section, Button } from "@/components/ui";
import { ArrowRight } from "lucide-react";

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

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <Section
        size="lg"
        className="relative flex min-h-[60vh] items-center overflow-hidden pt-32 md:pt-40"
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

      {/* Categorized Services */}
      <div className="pb-24">
        {serviceGroups.map((group) => (
          <Section key={group.category} size="md" className="py-12">
            <Container>
              <h2 className="type-h2 mb-10 text-white">
                {group.category}
              </h2>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.filter((service, index, items) => items.findIndex((item) => item.href === service.href) === index).map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="group flex items-center justify-between rounded-xl p-5 transition-colors duration-200 hover:bg-white/[0.05]"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <h3 className="type-h3 text-white transition-colors duration-200 group-hover:text-white/90">
                      {service.title}
                    </h3>
                    <ArrowRight
                      size={14}
                      className="shrink-0 text-white/35 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white/70"
                    />
                  </Link>
                ))}
              </div>
            </Container>
          </Section>
        ))}
      </div>

      {/* CTA */}
      <Section size="lg" className="border-t border-white/[0.05]">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="type-h2 mb-6 text-white">
              Not sure where to start?
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