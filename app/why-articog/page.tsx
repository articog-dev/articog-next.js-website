import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.articog.com/why-articog" },
  title: "Why Articog | AI Native Film & Production Company",
  description: "See how Articog combines AI-native production, creative direction, and flexible delivery for growth-stage brands.",
};
import { ArrowRight } from "lucide-react";
import { BarChart3, Clock, Zap } from "lucide-react";
import { Container, Section, Heading, Button, Card, CardContent } from "@/components/ui";
import { Link } from "@/components/ui/Link";
import { Comparison } from "@/components/sections/Comparison";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Pipeline } from "@/components/sections/Pipeline";

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

  const economics = [
    {
      title: "Traditional Cost Structure",
      icon: <BarChart3 className="h-6 w-6 text-white/40" />,
      description: "Labor and overhead scale with every project.",
    },
    {
      title: "Volume Economics",
      icon: <Zap className="h-6 w-6 text-white/40" />,
      description: "Cost per deliverable flexes with volume.",
    },
    {
      title: "Time-to-Market Value",
      icon: <Clock className="h-6 w-6 text-white/40" />,
      description: "Speed reduces the cost of delay.",
    },
  ];

  const pipelineSteps = [
    { step: 1, title: "Brief", description: "Share your goal and references. We align on-brand voice, visual direction, and performance objectives before production.", tag: "Day 1" },
    { step: 2, title: "Generate", description: "Our AI pipeline calibrated to the brand explores creative directions and delivers first outputs within hours.", tag: "Day 1 to 2" },
    { step: 3, title: "Refine", description: "Review a curated selection. Creative directors refine each asset through fast feedback cycles.", tag: "Day 2 to 3" },
    { step: 4, title: "Deliver", description: "Receive assets ready for production in the formats, aspect ratios, and language variants your campaign needs.", tag: "Day 3 to 4" },
  ];

  const trustLinks = [
    { title: "AI & Intellectual Property", href: "/trust/ai-and-ip" },
    { title: "Security & Confidentiality", href: "/trust/security" },
    { title: "Rights, Licensing & Ownership", href: "/trust/rights-licensing" },
    { title: "Data Handling & Retention", href: "/trust/data-handling" },
  ];

  return (
    <div className="bg-black min-h-screen">
      <Section id="overview" size="lg" className="pt-32 md:pt-40 pb-0">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-16">
            <Heading as="h1" size="hero" className="mb-6 text-white">
              More output. Less production cost. Faster production.
            </Heading>
            <p className="mx-auto max-w-2xl type-body md:text-lg leading-relaxed mb-12" style={{ color: "rgba(255,255,255,0.65)" }}>
              Articog uses AI-native production to reduce traditional shoots, production time and budget—helping brands create more content around every product without losing the story or brand direction.
            </p>
          </div>
        </Container>
      </Section>

      <nav aria-label="Why Articog sections" className="border-y border-white/[0.08]">
        <Container className="flex flex-wrap justify-center gap-x-6 gap-y-3 py-4 text-center">
          <Link href="#production-economics" className="type-small text-white/60 transition-colors hover:text-white">Production Economics</Link>
          <Link href="#how-it-works" className="type-small text-white/60 transition-colors hover:text-white">How It Works</Link>
          <Link href="#trust" className="type-small text-white/60 transition-colors hover:text-white">Trust &amp; Security</Link>
        </Container>
      </nav>

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

      <Section id="production-economics" size="lg" className="border-t border-white/[0.08]">
        <Container>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <Heading as="h2" size="section" className="mb-6 text-white">Production Cost &amp; ROI Guide</Heading>
            <p className="mx-auto max-w-2xl type-body md:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Understanding the potential cost and time considerations of AI-native production. Any engagement model depends on scope, cadence, and deliverables.
            </p>
          </div>

          <div className="mb-24 grid gap-12 md:grid-cols-3">
            {economics.map((item) => (
              <div key={item.title} className="flex flex-col">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">{item.icon}</div>
                <Heading as="h3" size="card" className="mb-4 text-white">{item.title}</Heading>
                <p className="type-small leading-relaxed text-white/50">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mb-24 max-w-4xl rounded-2xl border border-white/[0.08] p-10">
            <h3 className="mb-4 font-display text-lg font-semibold italic text-white">A Note on Performance</h3>
            <p className="type-small text-white/40">Results vary by project scope and complexity.</p>
          </div>
        </Container>
      </Section>

      <Section id="how-it-works" size="lg" className="border-t border-white/[0.08] p-0">
        <Pipeline steps={pipelineSteps} />
        <Container className="py-16 md:py-24">
          <div className="mb-10 text-center">
            <Heading as="h3" size="section" className="mb-4 text-white">Getting started and delivery</Heading>
          </div>
          <div className="mx-auto grid max-w-6xl gap-3 md:grid-cols-2">
            {[
              ["Brand Assets", "Collecting your logo, guidelines, and existing creative for reference to ensure brand consistency."],
              ["Stakeholders", "Identifying who's involved in review and approval to streamline the feedback loop."],
              ["Rights & Permissions", "Confirming usage rights and any necessary consents upfront to protect your brand."],
              ["Approval SLAs", "Agreeing on how fast reviews and feedback will happen to maintain production momentum."],
              ["First Project Roadmap", "A clear, milestone-driven timeline for your first deliverable and campaign launch."],
              ["Feedback Windows", "A defined period for review and feedback on each round to maintain production velocity."],
              ["Version Control", "Every revision clearly labeled and tracked so nothing gets lost and the latest version is always accessible."],
              ["Revision Policy", "A clear number of included revision rounds per project, with any additional disputes handled case by case."],
              ["Final Formats", "Assets delivered in every aspect ratio, file format, and technical spec your campaign requires."],
              ["Archive", "Delivered projects kept securely accessible for future reference and repurposing."],
            ].map(([title, description]) => (
              <div key={title} className="rounded-xl border border-white/10 p-5">
                <h4 className="mb-2 type-h4 text-white">{title}</h4>
                <p className="type-small leading-relaxed text-white/50">{description}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-16 max-w-2xl text-center">
            <Heading as="h3" size="section" className="mb-6 text-white">Human oversight, every step</Heading>
            <p className="type-body leading-relaxed text-white/60">A Creative Director reviews every project for brand safety, legal compliance, and quality.</p>
          </div>
          <Link href="/how-it-works/ai-creative-pipeline" className="group mx-auto mt-16 block max-w-2xl rounded-2xl border border-white/[0.08] p-6 text-center transition-all hover:border-white/20">
            <h3 className="mb-2 flex items-center justify-center gap-2 type-h3 text-white">
              AI Creative Pipeline
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </h3>
            <p className="type-small text-white/50">Take a deeper technical look at our internal creative engine.</p>
          </Link>
        </Container>
      </Section>

      <Section id="trust" size="lg" className="border-t border-white/[0.08]">
        <Container>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <Heading as="h2" size="section" className="mb-6 text-white">Built on trust and transparency</Heading>
          </div>
          <div className="mb-12 grid gap-3 md:grid-cols-2">
            {trustLinks.map((item) => (
              <Link key={item.href} href={item.href} className="group block">
                <Card className="flex-row items-center justify-between rounded-xl border-white/[0.08] bg-transparent p-0 transition-colors group-hover:border-white/20">
                  <CardContent className="flex w-full items-center justify-between p-5">
                    <Heading as="h3" size="card" className="text-white">{item.title}</Heading>
                    <ArrowRight size={18} className="ml-4 shrink-0 text-white/35 transition-transform group-hover:translate-x-0.5 group-hover:text-white/70" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mb-24 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-center">
            <Link href="/trust/ai-and-ip" className="type-small text-white/45 transition-colors hover:text-white">Responsible AI</Link>
            <Link href="/contact" className="type-small text-white/45 transition-colors hover:text-white">Vendor &amp; Tool Review</Link>
          </div>
          <div className="border-t border-white/10 pt-12 text-center">
            <p className="type-body mb-6 text-white/60">Have a question not covered here?</p>
            <Button asChild variant="primary" size="lg"><Link href="/contact">Contact Us</Link></Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
