import type { Metadata } from "next";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  alternates: { canonical: "https://articog.com/why-articog/production-economics" },
  title: "Production Economics | Articog",
  description: "Understand the economics of AI-native creative production and how it compares to traditional models for growth-stage brands.",
};
import { Container, Section, Button, Heading } from "@/components/ui";
import { Link } from "@/components/ui/Link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BarChart3, Clock, Zap } from "lucide-react";

export default function ProductionEconomicsPage() {
  const sections = [
    {
      title: "Traditional Cost Structure",
      icon: <BarChart3 className="w-6 h-6 text-white/40" />,
      description: "Labor and overhead scale with every project.",
    },
    {
      title: "Volume Economics",
      icon: <Zap className="w-6 h-6 text-white/40" />,
      description: "Cost per deliverable flexes with volume.",
    },
    {
      title: "Time-to-Market Value",
      icon: <Clock className="w-6 h-6 text-white/40" />,
      description: "Speed reduces the cost of delay.",
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <Section size="lg" className="pt-32 md:pt-40">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Why Articog", href: "/why-articog" }, { label: "Production Cost & ROI Guide" }]} />
          <div className="mx-auto max-w-3xl text-center mb-20">
            <Heading as="h1" size="hero" className="mb-6">
              Production Cost & ROI Guide
            </Heading>
            <p className="mx-auto max-w-2xl type-body md:text-lg leading-relaxed mb-12" style={{ color: "rgba(255,255,255,0.65)" }}>
              Understanding the potential cost and time considerations of AI-native production. Any engagement model depends on scope, cadence, and deliverables.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3 mb-24">
            {sections.map((section) => (
              <div key={section.title} className="flex flex-col">
                <div className="mb-6 w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                  {section.icon}
                </div>
                  <Heading as="h3" size="card" className="text-xl font-semibold text-white mb-4">{section.title}</Heading>
                <p className="type-small leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>
                  {section.description}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto p-10 rounded-2xl border border-white/[0.08] mb-24">
            <h3 className="text-lg font-display font-semibold text-white mb-4 italic">A Note on Performance</h3>
            <p className="type-small leading-relaxed mb-0" style={{ color: "rgba(255,255,255,0.40)" }}>
              Results vary by project scope and complexity.
            </p>
          </div>

          <FinalCTA content={{ ctaHref: "/book-a-demo", ctaLabel: "Book a Demo" }} />
        </Container>
      </Section>
    </div>
  );
}
