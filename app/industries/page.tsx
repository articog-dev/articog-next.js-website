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
      <Section size="lg" className="pt-32 pb-24 text-center md:pt-40 md:pb-32">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Heading as="h1" size="hero" className="mb-6">
              Industries We Serve
            </Heading>
          </div>

          <section className="relative mx-auto mb-20 min-h-[18rem] max-w-6xl overflow-hidden rounded-2xl border border-white/[0.08] text-left">
            <video
              autoPlay
              muted
              playsInline
              loop
              controls={false}
              preload="metadata"
              poster="https://res.cloudinary.com/hmy5ctzy/video/upload/q_auto:good,f_auto,w_1600,so_0/v1786974706/Web_2.jpg"
              className="absolute inset-0 h-full w-full object-cover"
              aria-hidden="true"
            >
              <source
                src="https://res.cloudinary.com/hmy5ctzy/video/upload/f_mp4,vc_h264,q_auto:good,w_1600,dpr_auto,c_limit/v1786974706/Web_2.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-black/12" />
          </section>

          <IndustryDetails />

          <FinalCTA content={{ ctaHref: "/book-a-demo", ctaLabel: "Book a Demo" }} />
        </Container>
      </Section>
    </div>
  );
}
