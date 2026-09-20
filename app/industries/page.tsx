import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries We Serve | Articog",
  description: "Creative production for DTC, SaaS, beauty, automotive, real estate, fashion, and other growth-stage businesses.",
  alternates: { canonical: "https://articog.com/industries" },
};
import { Container, Section, Heading } from "@/components/ui";
import { IndustryDetails } from "@/components/sections/IndustryDetails";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LazyVideo } from "@/components/ui/LazyVideo";

export default function IndustriesPage() {
  return (
    <div className="bg-black min-h-screen">
      <Section size="lg" className="pt-32 md:pt-40 pb-24 text-center md:pb-32">
        <Container>
          <div className="text-center mb-16">
            <Heading as="h1" size="hero" className="mb-6 text-white">
              Industries We Serve
            </Heading>
          </div>

          <section className="relative mx-auto mb-20 min-h-[18rem] max-w-6xl overflow-hidden rounded-2xl border border-white/[0.08] text-left">
            <LazyVideo
              autoPlay
              muted
              playsInline
              loop
              controls={false}
              preload="metadata"
              poster="https://media.articog.com/images/industries/hf_20260821_145134_975711a2-9355-45d5-bee6-c98937fb8031.png"
              className="absolute inset-0 h-full w-full object-contain"
              aria-hidden="true"
              sources={[{ src: "https://media.articog.com/videos/Web%202.mp4", type: "video/mp4" }]}
            />
            <div className="absolute inset-0 bg-black/12" />
          </section>

          <IndustryDetails />

          <FinalCTA content={{ ctaHref: "/book-a-demo", ctaLabel: "Book a Demo" }} />
        </Container>
      </Section>
    </div>
  );
}
