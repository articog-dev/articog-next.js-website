import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries We Serve | Articog",
  description: "Creative production for DTC, SaaS, beauty, automotive, real estate, fashion, and other growth-stage businesses.",
  alternates: { canonical: "https://articog.com/industries" },
};
import { Container, Section, Heading } from "@/components/ui";
import { IndustryDetails } from "@/components/sections/IndustryDetails";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function IndustriesPage() {
  return (
    <div className="bg-black min-h-screen">
      <Section size="lg" className="pt-32 pb-10 md:pt-36 md:pb-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <Heading as="h1" size="hero" className="text-white">
              Industries We Serve
            </Heading>
            <p className="max-w-2xl type-body-lg text-white/70 lg:pb-2">
              Every category has its own creative pressures, from product accuracy and compliance to seasonal speed. Choose an industry to see how we produce for it.
            </p>
          </div>
        </Container>
      </Section>

      <IndustryDetails />

      <FinalCTA content={{ ctaHref: "/book-a-demo", ctaLabel: "Book a Demo" }} />
    </div>
  );
}
