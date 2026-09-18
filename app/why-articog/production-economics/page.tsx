import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://articog.com/why-articog/production-economics" },
  title: "Production Economics | Articog",
  description: "Understand the economics of AI-native creative production and how it compares to traditional models for growth-stage brands.",
};
import { Container, Section, Button, Heading } from "@/components/ui";
import { Link } from "@/components/ui/Link";
import { BarChart3, Clock, Zap } from "lucide-react";

export default function ProductionEconomicsPage() {
  const sections = [
    {
      title: "Traditional Cost Structure",
      icon: <BarChart3 className="w-6 h-6 text-white/40" />,
      description: "Traditional production is heavily weighted toward labor and physical overhead. Retainers, large crews, location fees, and extended post-production cycles create a high floor for project costs that scale linearly with volume.",
    },
    {
      title: "Volume Economics",
      icon: <Zap className="w-6 h-6 text-white/40" />,
      description: "With an AI-native workflow, the relationship between volume and cost changes. As production systems mature and asset libraries are reused, the cost per deliverable can become more flexible across campaign cycles and channel demands.",
    },
    {
      title: "Time-to-Market Value",
      icon: <Clock className="w-6 h-6 text-white/40" />,
      description: "Speed is a financial asset. Flexible campaign timelines help brands respond to changing priorities and reduce the opportunity cost of delayed creative testing.",
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <Section size="lg" className="pt-32 md:pt-40">
        <Container>
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
                <h3 className="text-xl font-display font-semibold text-white mb-4">{section.title}</h3>
                <p className="type-small leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>
                  {section.description}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto p-10 rounded-2xl border border-white/[0.08] mb-24">
            <h3 className="text-lg font-display font-semibold text-white mb-4 italic">A Note on Performance</h3>
            <p className="type-small leading-relaxed mb-0" style={{ color: "rgba(255,255,255,0.40)" }}>
              Disclaimer: Results vary significantly by project scope, complexity, and brand requirements. No specific savings percentage is guaranteed. Actual economic models and potential ROI should be discussed based on your specific use case and historical production benchmarks.
            </p>
          </div>

          <div className="text-center pt-16 border-t border-white/10">
            <Heading as="h2" size="section" className="mb-8">
              Ready to transform your production?
            </Heading>
            <Button asChild variant="primary" size="lg">
              <Link href="/book-a-demo">Book a Demo</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
