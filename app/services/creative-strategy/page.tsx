import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://articog.com/services/creative-strategy" },
  title: "Creative Strategy & Concepting | Articog",
  description: "Creative strategy and concepting for growth-stage brands that need sharper positioning, stronger ideas, and campaign clarity.",
};
import { Container, Section, Heading, Button } from "@/components/ui";
import { Link } from "@/components/ui/Link";
import { Lightbulb, Palette, LayoutGrid, MessageSquare } from "lucide-react";
import { ServiceDetails } from "@/components/sections/ServiceDetails";

export default function CreativeStrategyPage() {
  const capabilities = [
    {
      title: "Concept Development",
      desc: "Translating your brief into a clear, high impact creative direction that sets the stage for production.",
      icon: Lightbulb,
    },
    {
      title: "Brand Direction",
      desc: "Ensuring every AI generated asset reflects your brand's unique voice, tone, and visual identity perfectly.",
      icon: Palette,
    },
    {
      title: "Campaign Architecture",
      desc: "Mapping how creative flows seamlessly across formats and channels for a cohesive, single-campaign experience.",
      icon: LayoutGrid,
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
              Creative Strategy & Concepting
            </Heading>
          </div>
        </Container>
      </Section>

      {/* What We Do Section */}
      <Section className="py-20 bg-white/[0.02]">
        <Container>
          <div className="mb-12">
            <h2 className="type-h2 mb-4 text-white">What We Do</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {capabilities.map((item) => (
              <div 
                key={item.title} 
                className="p-8 rounded-2xl border border-white/10"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="type-h4 text-white">{item.title}</h3>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Engagement Note Section */}
      <Section className="py-20 border-t border-white/5">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 mb-8 mx-auto">
              <MessageSquare className="w-4 h-4 text-white/40" />
              <span className="type-label">Strategic Engagement</span>
            </div>
            <p className="type-h2 text-white/70 leading-relaxed italic">
              "Creative strategy and concepting can be scoped as part of an engagement when the brief requires it, from a flagship film to an ongoing content program."
            </p>
          </div>
        </Container>
      </Section>

      <ServiceDetails category="strategy" />

      {/* CTA Section */}
      <Section className="py-24 bg-white/[0.02]">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="type-h2 mb-8 text-white">Ready to transform your production?</h2>
            <Link href="/book-a-demo">
              <Button size="lg" className="rounded-full px-8 h-14">
                Book a Demo
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
