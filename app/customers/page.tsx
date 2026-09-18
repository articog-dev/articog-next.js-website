import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Stories | Articog",
  description: "Selected Articog work and client stories, with approved scope and outcome details added as available.",
  alternates: { canonical: "https://articog.com/customers" },
};
import { Container, Section, Heading, PageHero } from "@/components/ui";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { siteContent } from "@/lib/content";

export default function CustomersPage() {
  return (
    <div className="bg-black">
      <PageHero
        title="Production examples and client stories."
        subtitle="Client stories are published with approved scope, deliverables, timelines, channels, and outcomes."
      />

      {/* Stories Grid */}
      <Section size="md" className="border-t border-white/[0.05]">
        <Container>
          <div className="mx-auto max-w-2xl rounded-2xl border border-white/[0.08] p-10 text-center">
            <Heading as="h2" size="card" className="mb-3 text-white">Selected work is being prepared for publication.</Heading>
            <p className="type-body text-white/60">
              Approved client stories will include the brief, deliverables, channels, production window, and outcome.
            </p>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <FinalCTA 
        content={{
          headline: siteContent.cta.headline,
          ctaLabel: "Book a Demo",
          ctaHref: "/book-a-demo"
        }} 
      />
    </div>
  );
}
