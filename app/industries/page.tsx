import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries We Serve | Articog",
  description: "Creative production for DTC, SaaS, beauty, automotive, real estate, fashion, and other growth-stage businesses.",
  alternates: { canonical: "https://articog.com/industries" },
};
import { Container, Section, Heading, Button } from "@/components/ui";
import { Link } from "@/components/ui/Link";
import { ArrowRight } from "lucide-react";
import { IndustryDetails } from "@/components/sections/IndustryDetails";

export default function IndustriesPage() {
  const industries = [
    {
      title: "DTC & E-commerce",
      href: "/industries#dtc-ecommerce",
    },
    {
      title: "SaaS & Technology",
      href: "/industries#saas-technology",
    },
    {
      title: "Real Estate",
      href: "/industries#real-estate",
    },
    {
      title: "Consumer Electronics",
      href: "/industries#consumer-electronics",
    },
    {
      title: "Beauty & Skincare",
      href: "/industries#beauty-skincare",
    },
    {
      title: "Automotive & Mobility",
      href: "/industries#automotive-mobility",
    },
    {
      title: "Food & Beverage",
      href: "/industries#food-beverage",
    },
    {
      title: "Fashion & Lifestyle",
      href: "/industries#fashion-lifestyle",
    },
    {
      title: "Additional Industry Applications",
      href: "/industries#additional-applications",
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <Section size="lg" className="pt-20 pb-24 text-center md:pt-24 md:pb-32">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Heading as="h1" size="hero" className="mb-6">
              Industries We Serve
            </Heading>
          </div>

          <div className="mx-auto mb-16 grid max-w-5xl gap-3 overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.1] text-left sm:grid-cols-2">
            {industries.map((industry) => (
              <Link
                key={industry.title}
                href={industry.href}
                className="group flex min-h-[88px] items-center border border-white/[0.08] px-5 py-4 transition-colors hover:border-white/[0.16] sm:min-h-[96px] sm:px-6 md:min-h-[112px]"
              >
                <div className="flex w-full items-center justify-between gap-6">
                  <h2 className="type-h3 text-white">{industry.title}</h2>
                  <ArrowRight size={18} className="shrink-0 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:text-white/80" aria-hidden="true" />
                </div>
              </Link>
            ))}
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
            <div className="relative flex min-h-[18rem] items-end p-6 md:p-8">
              <p className="type-label uppercase tracking-[0.2em] text-white/60">
                Selected work
              </p>
            </div>
          </section>

          <IndustryDetails />

          <div className="text-center pt-12 border-t border-white/10">
            <p className="type-body mb-6 text-white/60">Ready to build for your industry?</p>
            <Link href="/book-a-demo">
              <Button size="lg" className="rounded-full px-8 h-14 text-lg">
                Book a Demo
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
