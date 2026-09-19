import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The AI Creative Pipeline | Articog",
  description: "Explore how our AI-native production pipeline moves from brief to generation, review, refinement, and final delivery.",
  alternates: { canonical: "https://articog.com/how-it-works/ai-creative-pipeline" },
};
import { Container, Section, Heading } from "@/components/ui";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Link } from "@/components/ui/Link";
import { ClipboardList, Cpu, UserCheck, RefreshCw, ShieldCheck, Type, FileSearch, HardDrive, Info } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export default function AICreativePipelinePage() {
  const stages = [
    {
      title: "Brief Intake & Direction Mapping",
      desc: "Creative direction is set before any generation begins. We translate your goals into a technical blueprint that guides the entire pipeline.",
      icon: ClipboardList,
    },
    {
      title: "Multi Model Generation",
      desc: "Our pipeline runs across multiple specialized AI models and iteration loops, selecting and blending the best outputs for your specific brand.",
      icon: Cpu,
    },
    {
      title: "Human Curation & Quality Review",
      desc: "Every output is reviewed by a human creative lead against your brand guidelines for fidelity, style, and quality before it ever reaches you.",
      icon: UserCheck,
    },
    {
      title: "Feedback Driven Refinement",
      desc: "Your feedback is incorporated in fast, automated iteration cycles, moving at the speed of software rather than slow, manual revision rounds.",
      icon: RefreshCw,
    },
  ];

  const qaStandards = [
    ["Product & Logo Integrity", "Accurate representation of your brand identity and product features in every asset we produce.", ShieldCheck],
    ["Text Accuracy", "Checking for legibility, spelling, and correctness of any on screen or on image text elements.", Type],
    ["Policy Review", "Verifying assets against platform specific advertising policies and legal requirements.", FileSearch],
    ["Final Technical QC", "Double checking resolution, frame rate, file format, and naming conventions before delivery.", HardDrive],
    ["Human Review", "Every AI generated asset is reviewed by a professional editor; we never ship automatically.", UserCheck],
  ] as const;

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <Section size="lg" className="pt-32 md:pt-40">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "How It Works", href: "/how-it-works" }, { label: "The AI Creative Pipeline" }]} />
          <div className="text-center mb-16">
            <Heading as="h1" size="hero" className="mb-6 text-white">
              The AI Creative Pipeline
            </Heading>
          </div>
        </Container>
      </Section>

      {/* Pipeline Stages Section */}
      <Section size="md" className="bg-white/[0.02]">
        <Container>
          <div className="mb-12">
            <Heading as="h2" size="section" className="mb-4 text-white">Pipeline Stages</Heading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stages.map((stage) => (
              <div 
                key={stage.title} 
                className="p-8 rounded-2xl border border-white/10"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                  <stage.icon className="w-5 h-5" />
                </div>
                <Heading as="h3" size="card" className="mb-3 text-white">{stage.title}</Heading>
                <p className="type-body text-white/50 leading-relaxed">{stage.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section size="md" className="bg-white/[0.02]">
        <Container>
          <div className="mb-12">
            <Heading as="h2" size="section" className="mb-4 text-center text-white">Our QA Standards</Heading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {qaStandards.map(([title, description, Icon]) => (
              <div key={title} className="p-8 rounded-2xl border border-white/10 flex flex-col gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <Heading as="h3" size="card" className="mb-2 text-white">{title}</Heading>
                  <p className="type-small text-white/50 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-xl border border-white/10 flex items-start gap-4 max-w-2xl mx-auto">
            <Info className="w-5 h-5 text-white/40 mt-0.5 flex-shrink-0" />
            <p className="type-small text-white/50 italic leading-relaxed">
              Learn more about our broader <Link href="/trust" className="text-white underline hover:text-white/80 transition-colors">Trust & Safety</Link> practices.
            </p>
          </div>
        </Container>
      </Section>

      {/* Calibration Note Section */}
      <Section size="md" className="border-t border-white/5">
        <Container>
          <div className="p-8 md:p-12 rounded-2xl border border-white/10 max-w-4xl">
            <Heading as="h3" size="section" className="mb-4 text-white">Custom Calibration</Heading>
            <p className="font-sans text-white/70 leading-relaxed max-w-2xl">
              It is important to note that the AI Creative Pipeline is not one size fits all. Every pipeline is calibrated per brand, incorporating your unique visual assets, tone of voice, and industry specific requirements to ensure every output is unmistakably yours.
            </p>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section size="lg" className="bg-white/[0.02]">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <FinalCTA content={{ ctaHref: "/book-a-demo", ctaLabel: "Book a Demo" }} />
          </div>
        </Container>
      </Section>
    </div>
  );
}
