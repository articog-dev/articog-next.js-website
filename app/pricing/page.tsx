"use client";

import { Link } from "@/components/ui/Link";
import { Container, Section, Button, Heading } from "@/components/ui";

export default function PricingPage() {
  const engagementOptions = [
    {
      title: "Project-Based Work",
      description: "For launches, campaigns, and one-off creative needs with a defined scope and delivery plan.",
    },
    {
      title: "Ongoing creative support",
      description: "For teams that need a steady stream of assets, fast iterations, and a consistent production partner.",
    },
    {
      title: "Strategic Production Partnerships",
      description: "For multi-brand or high-volume creative programs that need hands-on planning and platform support.",
    },
  ];

  return (
    <Section size="lg" className="pt-32 md:pt-40">
      <Container>
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span
            className="mb-5 inline-block type-label uppercase tracking-[0.18em]"
            style={{ color: "rgba(255,255,255,0.40)" }}
          >
            WORK WITH US
          </span>

          <Heading as="h1" size="hero" className="mb-6">
            Let’s plan your next creative sprint.
          </Heading>

          <p
            className="mx-auto max-w-2xl type-body md:text-lg"
            style={{
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.65,
            }}
          >
            Tell us what you are building, how fast you need it, and what success looks like.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-16">
          {engagementOptions.map((option) => (
            <div
              key={option.title}
              className="rounded-2xl border border-white/[0.08] p-8"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <h2 className="mb-4 type-h2 text-white">{option.title}</h2>
              <p className="type-small leading-relaxed text-white/50">{option.description}</p>
            </div>
          ))}
        </div>

        <div className="mb-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8">
            <h2 className="mb-4 type-h3 text-white">Typical budget range</h2>
            <p className="mb-5 type-small leading-relaxed text-white/60">
              Final quotes depend on scope, formats, review cycles, and production requirements.
            </p>
            <ul className="space-y-3 type-small text-white/75">
              <li>$5k-$15k</li>
              <li>$15k-$50k</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8">
            <h2 className="mb-4 type-h3 text-white">Typical planning horizon</h2>
            <p className="mb-5 type-small leading-relaxed text-white/60">
              We confirm timing after understanding the brief, approvals, formats, and launch requirements.
            </p>
            <ul className="space-y-3 type-small text-white/75">
              <li>1-3 months</li>
              <li>Planning for the future</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-10 text-center">
          <h2 className="mb-4 type-h2 text-white">Start with a quick discovery call</h2>
          <p className="mx-auto mb-8 max-w-2xl type-small leading-relaxed text-white/50">
            We will review your goals, production needs, timeline, and creative output so we can recommend the best engagement for your team.
          </p>
          <Button asChild variant="primary" size="lg">
            <Link href="/book-a-demo">Book a Demo</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}