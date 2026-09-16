import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://articog.com/services/ad-creative" },
  title: "Ad Creative Production | Articog",
  description: "Ad creative built for paid social, display, search, and campaign testing across channels and growth-stage teams.",
};
import { Container, Section, Heading, Button } from "@/components/ui";
import { Link } from "@/components/ui/Link";
import { Share2, Monitor, Search, ArrowRight } from "lucide-react";
import { ServiceDetails } from "@/components/sections/ServiceDetails";
import { YouTubeEmbed } from "@/components/blog/YouTubeEmbed";

export default function AdCreativePage() {
  const deliverables = [
    {
      title: "Paid Social",
      desc: "Native feed and story formats for Meta, TikTok, LinkedIn, and more. Optimized for how users actually scroll.",
      icon: Share2,
    },
    {
      title: "Display",
      desc: "Clean banner ads with high fidelity sized for every placement and programmatic network requirements.",
      icon: Monitor,
    },
    {
      title: "Search",
      desc: "Creative assets built specifically for search and shopping campaigns to maximize click-through rates.",
      icon: Search,
    },
  ];

  const subServices = [
    {
      title: "Static Ad Creative",
      href: null,
      description: "High volume static creative for paid social and display networks.",
    },
    {
      title: "Testing & Variants",
      href: null,
      description: "Structured, hypothesis-driven creative testing for paid campaigns.",
    },
    {
      title: "Campaign Key Visuals",
      href: null,
      description: "Developing the core visual system that anchors a campaign across channels.",
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <Section size="lg" className="pt-32 md:pt-40">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 mb-6 border border-white/10">
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase">
                Services
              </span>
            </div>
            <Heading as="h1" size="hero" className="mb-6">
              Ad Creative
            </Heading>
          </div>
        </Container>
      </Section>

      {/* What We Deliver Section */}
      <Section className="py-20 bg-white/[0.02]">
        <Container>
          <div className="mb-12">
              <h2 className="type-h2 mb-4 text-white">What We Deliver</h2>
            <p className="font-sans text-white/50 max-w-2xl">
              From social feeds to global display, we build assets for each channel.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deliverables.map((item) => (
              <div 
                key={item.title} 
                className="p-8 rounded-2xl border border-white/10"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="type-h3 text-white mb-3">{item.title}</h3>
                <p className="type-small text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            {subServices.map((service) => {
              const card = (
                <>
                  <div>
                    <h3 className="type-h3 text-white mb-3">{service.title}</h3>
                    <p className="type-small text-white/50 leading-relaxed mb-6">{service.description}</p>
                  </div>
                  {service.href && (
                    <div className="flex items-center text-xs font-bold tracking-widest text-white/30 group-hover:text-white/60 transition-colors uppercase">
                      Learn More <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </>
              );
              const className = "group p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between";

              return service.href ? (
                <Link key={service.title} href={service.href} className={className}>
                  {card}
                </Link>
              ) : (
                <div key={service.title} className={className}>
                  {card}
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <ServiceDetails category="ad-creative" />

      {/* Built to Test Section */}
      <Section className="py-24 border-t border-white/5">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="type-h2 mb-6 text-white">Built to Test</h2>
              <p className="type-body-lg text-white/60 leading-relaxed mb-6">
                Stop relying on best guesses. We develop on-brand creative variants for structured campaign testing.
              </p>
              <div className="space-y-4">
                {[
                  "Dynamic multivariate testing",
                  "Performance driven iteration",
                  "Rapid creative refreshes",
                  "Brand safe experimentation"
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-white/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    <span className="type-small">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <YouTubeEmbed
                videoId="l5pReVGFVqs"
                title="These Actors Don’t Exist. This Entire Ad Was Made With AI | Articog"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-24 bg-white/[0.02]">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="type-h2 mb-8 text-white">Ready to scale your performance?</h2>
            <Link href="/book-a-demo">
              <Button size="lg" className="rounded-full px-8 h-14 text-lg">
                Scale Your Ad Creative
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
