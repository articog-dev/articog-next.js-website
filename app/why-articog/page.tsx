import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://articog.com/why-articog" },
  title: "Why Articog | AI Native Film & Production Company",
  description: "See how Articog combines AI-native production, creative direction, and flexible delivery for growth-stage brands.",
};
import { ArrowRight } from "lucide-react";
import { Container, Section, Heading } from "@/components/ui";
import { Link } from "@/components/ui/Link";
import { Comparison } from "@/components/sections/Comparison";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function WhyArticogPage() {
  const comparisonRows = [
    {
      attribute: "Production approach",
      agency: "Traditional production",
      inhouse: "Internal workflow",
      articog: "AI-native production"
    },
    {
      attribute: "Engagement",
      agency: "Multi-stage production",
      inhouse: "Internal production",
      articog: "Project, ongoing or strategic"
    },
    {
      attribute: "Production capacity",
      agency: "Capacity tied to team and vendors",
      inhouse: "Capacity tied to headcount",
      articog: "Scales with campaign demand"
    },
    {
      attribute: "Brand consistency",
      agency: "Brief dependent",
      inhouse: "Manual controls",
      articog: "Structured brand controls"
    },
    {
      attribute: "Iteration",
      agency: "Slow feedback cycles",
      inhouse: "Moderate feedback cycles",
      articog: "Fast feedback and revision cycles"
    },
    {
      attribute: "Team",
      agency: "External production team",
      inhouse: "Internal creative team",
      articog: "Creative direction + AI production + post-production"
    }
  ];

  return (
    <div className="bg-black min-h-screen">
      <Section size="lg" className="pt-32 md:pt-40 pb-0">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-16">
            <Heading as="h1" size="hero" className="mb-6">
              More speed. More control.
            </Heading>
            <p className="mx-auto max-w-2xl type-body md:text-lg leading-relaxed mb-12" style={{ color: "rgba(255,255,255,0.65)" }}>
              A production partner built for campaign volume and brand consistency.
            </p>
          </div>
        </Container>
      </Section>

      <Comparison rows={comparisonRows} />

      <Section size="md" className="pt-0">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 mb-24">
            <Link
              href="/compare/vs-traditional-production"
              className="group rounded-2xl p-10 border border-white/[0.08] transition-all hover:border-white/20"
            >
              <Heading as="h3" size="card" className="mb-4 flex items-center justify-between text-white">
                Articog vs Traditional Production
                <ArrowRight size={20} className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
              </Heading>
              <p className="type-small leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>
                AI-native workflows vs. traditional production.
              </p>
            </Link>
            <Link
              href="/compare/vs-ai-tools"
              className="group rounded-2xl p-10 border border-white/[0.08] transition-all hover:border-white/20"
            >
              <Heading as="h3" size="card" className="mb-4 flex items-center justify-between text-white">
                Articog vs AI Tools Only
                <ArrowRight size={20} className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
              </Heading>
              <p className="type-small leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>
                Why tools alone aren't enough.
              </p>
            </Link>
          </div>

          <FinalCTA content={{ ctaHref: "/book-a-demo", ctaLabel: "Book a Demo" }} />
        </Container>
      </Section>
    </div>
  );
}
