import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries We Serve | Articog",
  description: "Creative production for DTC, SaaS, beauty, automotive, real estate, fashion, and other growth-stage businesses.",
  alternates: { canonical: "https://www.articog.com/industries" },
};
import { Container, Section, Heading } from "@/components/ui";
import { IndustryDetails } from "@/components/sections/IndustryDetails";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function IndustriesPage() {
  return (
    <div className="bg-black min-h-screen">
      <Section size="md" className="pt-32 pb-10 md:pt-36 md:pb-12">
        <Container>
          <Heading as="h1" size="hero" className="text-center text-white">
            Industries We Serve
          </Heading>
        </Container>
      </Section>

      <IndustryDetails />

      <FinalCTA content={{ ctaHref: "/book-a-demo", ctaLabel: "Book a Demo" }} />
    </div>
  );
}