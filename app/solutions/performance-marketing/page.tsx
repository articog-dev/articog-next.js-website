import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://articog.com/solutions/performance-marketing" },
  title: "Performance Marketing Creative | Articog",
  description: "High volume, testable creative for growth and performance teams who need constant new variants to beat ad fatigue.",
};
import { Container, Section, Heading, Button } from "@/components/ui";
import { Link } from "@/components/ui/Link";
import { RefreshCw, TrendingUp, Grid, ArrowRight } from "lucide-react";
import { SolutionDetails } from "@/components/sections/SolutionDetails";

export default function PerformanceMarketingPage() {
  const steps = [
    {
      title: "Continuous Variant Production",
      desc: "Fresh creative variants delivered on a rolling basis to prevent audience fatigue and maintain high performance.",
      icon: RefreshCw,
    },
    {
      title: "Performance-Informed Iteration",
      desc: "Creative direction shaped by campaign feedback, helping teams build on what works and refine what does not.",
      icon: TrendingUp,
    },
    {
      title: "Multi-Format Coverage",
      desc: "Comprehensive delivery of both video and static creative to cover every placement in your testing matrix.",
      icon: Grid,
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <Section size="lg" className="pt-32 md:pt-40">
        <Container>
          <div className="max-w-3xl">
            <Heading as="h1" size="hero" className="mb-6">
              Performance Marketing Creative
            </Heading>
          </div>
        </Container>
      </Section>

      {/* How It Works Section */}
      <Section className="py-20 bg-white/[0.02]">
        <Container>
          <div className="mb-12">
            <Heading as="h2" size="section" className="mb-4 text-white">How It Works</Heading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item) => (
              <div 
                key={item.title} 
                className="p-8 rounded-2xl border border-white/10"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="type-h4 text-white mb-2">{item.title}</h3>
                <p className="type-small text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <SolutionDetails category="performance" />

      {/* Specific Formats Section */}
      <Section className="py-20 border-t border-white/5">
        <Container>
          <div className="mb-12">
            <Heading as="h2" size="section" className="mb-4 text-white">Specific Formats Included</Heading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link 
              href="/services/ad-creative"
              className="group p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="type-h3 text-white">Performance Video Ads</h3>
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="font-sans text-white/50">High-converting video creative optimized for social and digital channels.</p>
            </Link>

            <Link 
              href="/services/ad-creative"
              className="group p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="type-h3 text-white">Static & Display Creative</h3>
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="font-sans text-white/50">Static assets and display banners built for continuous testing.</p>
            </Link>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-24 bg-white/[0.02]">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <Heading as="h2" size="section" className="mb-8 text-white">Scale your performance creative today</Heading>
            <Link href="/book-a-demo">
              <Button size="lg" className="rounded-full px-8 h-14">
                Scale Your Performance Creative
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
