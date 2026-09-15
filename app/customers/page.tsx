import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Stories | Articog",
  description: "Selected Articog work and client stories, with approved scope and outcome details added as available.",
  alternates: { canonical: "https://articog.com/customers" },
};
import { Container, Section, Heading } from "@/components/ui";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function CustomersPage() {
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <Section size="lg" className="pt-32 md:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span
              className="mb-5 inline-block type-label uppercase tracking-[0.18em]"
              style={{ color: "rgba(255,255,255,0.40)" }}
            >
              SELECTED WORK
            </span>
            <Heading as="h1" size="hero" className="mb-6">
              Production examples and client stories.
            </Heading>
            <p
              className="mx-auto max-w-2xl type-body-lg md:text-xl leading-relaxed"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Client stories are published with approved scope, deliverables, timelines, channels, and outcomes.
            </p>
          </div>
        </Container>
      </Section>

      {/* Stories Grid */}
      <Section size="md" className="border-t border-white/[0.05]">
        <Container>
          <div className="mx-auto max-w-2xl rounded-2xl border border-white/[0.08] bg-white/[0.02] p-10 text-center">
            <h2 className="type-h3 mb-3 text-white">Selected work is being prepared for publication.</h2>
            <p className="type-body text-white/60">
              Approved client stories will include the brief, deliverables, channels, production window, and outcome.
            </p>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <FinalCTA 
        content={{
          headline: "Ready to be our next\nsuccess story?",
          ctaLabel: "Book a Demo",
          ctaHref: "/book-a-demo"
        }} 
      />
    </div>
  );
}
