import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How AI-Native Production Works | Articog",
  description: "See how AI-native production combines creative direction, generation, review, and final delivery for growth-stage brands.",
  alternates: { canonical: "https://articog.com/how-it-works" },
};
import { Link } from "@/components/ui/Link";
import { ArrowRight } from "lucide-react";
import { Container, Section, Button, Heading } from "@/components/ui";
import { Pipeline } from "@/components/sections/Pipeline";

export default function HowItWorksPage() {
  const pipelineSteps = [
    {
      step: 1,
      title: "Brief",
      description: "Share your goal and references. We align on-brand voice, visual direction, and performance objectives before production.",
      tag: "Day 1",
    },
    {
      step: 2,
      title: "Generate",
      description: "Our AI pipeline calibrated to the brand explores creative directions and delivers first outputs within hours.",
      tag: "Day 1 to 2",
    },
    {
      step: 3,
      title: "Refine",
      description: "Review a curated selection. Creative directors refine each asset through fast feedback cycles.",
      tag: "Day 2 to 3",
    },
    {
      step: 4,
      title: "Deliver",
      description: "Receive assets ready for production in the formats, aspect ratios, and language variants your campaign needs.",
      tag: "Day 3 to 4",
    },
  ];

  const onboardingSteps = [
    ["Brand Assets", "Collecting your logo, guidelines, and existing creative for reference to ensure brand consistency."],
    ["Stakeholders", "Identifying who's involved in review and approval to streamline the feedback loop."],
    ["Rights & Permissions", "Confirming usage rights and any necessary consents upfront to protect your brand."],
    ["Approval SLAs", "Agreeing on how fast reviews and feedback will happen to maintain production momentum."],
    ["First Project Roadmap", "A clear, milestone-driven timeline for your first deliverable and campaign launch."],
  ];

  const deliverySteps = [
    ["Feedback Windows", "A defined period for review and feedback on each round to maintain production velocity."],
    ["Version Control", "Every revision clearly labeled and tracked so nothing gets lost and the latest version is always accessible."],
    ["Revision Policy", "A clear number of included revision rounds per project, with any additional disputes handled case by case."],
    ["Final Formats", "Assets delivered in every aspect ratio, file format, and technical spec your campaign requires."],
    ["Archive", "Delivered projects kept securely accessible for future reference and repurposing."],
  ];

  return (
    <div className="bg-black min-h-screen">
      <Section size="lg" className="pt-32 md:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-16">
            <span
              className="mb-5 inline-block type-label uppercase tracking-[0.18em]"
              style={{ color: "rgba(255,255,255,0.40)" }}
            >
              HOW IT WORKS
            </span>
            <Heading as="h1" size="hero" className="mb-6">
              From brief to live in days
            </Heading>
            <p className="mx-auto max-w-2xl type-body md:text-lg leading-relaxed mb-12" style={{ color: "rgba(255,255,255,0.65)" }}>
              We replace rigid timelines and overhead with a high velocity engine powered by AI and directed by humans.
            </p>
          </div>

        </Container>
      </Section>

      <Pipeline steps={pipelineSteps} />

      <Section className="pt-section-sm pb-0">
        <Container>
          <Link
            href="/how-it-works/ai-creative-pipeline"
            className="group mx-auto block max-w-2xl rounded-2xl border border-white/[0.08] p-6 text-center transition-all hover:border-white/20"
          >
            <h3 className="mb-2 flex items-center justify-center gap-2 type-h3 text-white">
              AI Creative Pipeline
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </h3>
            <p className="type-small" style={{ color: "rgba(255,255,255,0.50)" }}>
              Take a deeper technical look at our internal creative engine.
            </p>
          </Link>
        </Container>
      </Section>

      <Section size="md" className="pt-section-sm">
        <Container>
          <div className="mb-10 text-center">
            <Heading as="h2" size="section" className="mb-4">Getting started and delivery</Heading>
          </div>
          <div className="mx-auto grid max-w-6xl gap-3 md:grid-cols-2">
            {[...onboardingSteps, ...deliverySteps].map(([title, description]) => (
              <div key={title} className="rounded-xl border border-white/10 p-5">
                <h3 className="mb-2 type-h4 text-white">{title}</h3>
                <p className="type-small leading-relaxed text-white/50">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section size="md" className="pt-0">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Heading as="h2" size="section" className="mb-6">
              Human oversight, every step
            </Heading>
            <p className="type-body leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.60)" }}>
              A Creative Director reviews every project for brand safety, legal compliance, and quality.
            </p>
          </div>
        </Container>
      </Section>

      <Section size="lg" className="pb-32">
        <Container>
          <div className="text-center pt-16 border-t border-white/10">
            <Heading as="h2" size="section" className="mb-8">
              Ready to accelerate your production?
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
