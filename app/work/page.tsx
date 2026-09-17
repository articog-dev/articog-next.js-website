import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creative Production Work | Articog",
  description: "See AI-native creative production across video ads, social content, product visuals, and campaign storytelling for growth-stage brands.",
  alternates: { canonical: "https://articog.com/work" },
};
import { Container, Section, Heading } from "@/components/ui";
import { CreativeDocument } from "./CreativeDocument";
import { WorkVideoShowcase } from "@/components/sections/WorkVideoShowcase";

export default function WorkPage() {
  return (
    <div className="bg-black min-h-screen">
      <Section size="lg" className="pt-20 pb-16 md:pt-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-16">
            <Heading as="h1" size="hero" className="mb-6">
              Real outcomes. No composites.
            </Heading>
          </div>

          <WorkVideoShowcase />

          <CreativeDocument />
        </Container>
      </Section>
    </div>
  );
}
