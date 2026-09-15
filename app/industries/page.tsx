import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries We Serve | Articog",
  description: "Creative production for DTC, SaaS, beauty, automotive, real estate, fashion, and other growth-stage businesses.",
  alternates: { canonical: "https://articog.com/industries" },
};
import { Container, Section, Heading, Button } from "@/components/ui";
import { Link } from "@/components/ui/Link";
import { ArrowRight, ShoppingBag, Laptop, Home, Smartphone, Sparkles, Car, Coffee, Shirt } from "lucide-react";
import { IndustryDetails } from "@/components/sections/IndustryDetails";

export default function IndustriesPage() {
  const industries = [
    {
      title: "DTC & E-commerce",
      description: "Performance driven creative for brands that need to convert.",
      href: "/industries#dtc-ecommerce",
      icon: ShoppingBag,
    },
    {
      title: "SaaS & Technology",
      description: "Accurate UI and clear storytelling for complex software.",
      href: "/industries#saas-technology",
      icon: Laptop,
    },
    {
      title: "Real Estate",
      description: "Immersive visuals for listings, developments, and investors.",
      href: "/industries#real-estate",
      icon: Home,
    },
    {
      title: "Consumer Electronics",
      description: "Product visuals that highlight technical precision and design.",
      href: "/industries#consumer-electronics",
      icon: Smartphone,
    },
    {
      title: "Beauty & Skincare",
      description: "Lifestyle creative that emphasizes product benefits.",
      href: "/industries#beauty-skincare",
      icon: Sparkles,
    },
    {
      title: "Automotive & Mobility",
      description: "Cinematic vehicle films and marketing visuals produced with AI.",
      href: "/industries#automotive-mobility",
      icon: Car,
    },
    {
      title: "Food & Beverage",
      description: "Product visuals and seasonal campaigns for food and beverage brands.",
      href: "/industries#food-beverage",
      icon: Coffee,
    },
    {
      title: "Fashion & Lifestyle",
      description: "Campaign visuals and social content for fashion brands.",
      href: "/industries#fashion-lifestyle",
      icon: Shirt,
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <Section size="lg" className="pt-32 pb-24 md:pt-40 md:pb-32 text-center">
        <Container>
          <div className="max-w-3xl mx-auto">
            <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase mb-6 inline-block">
              Industries
            </span>
            <Heading as="h1" size="hero" className="mb-6">
              Industries We Serve
            </Heading>
          </div>

          <div className="mx-auto mb-24 grid max-w-5xl gap-px overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.1] text-left sm:grid-cols-2">
            {industries.map((industry) => (
              <Link
                key={industry.title}
                href={industry.href}
                className="group flex min-h-32 flex-col justify-between bg-black p-5 transition-colors hover:bg-white/[0.04] md:min-h-36 md:p-6"
              >
                <div className="flex items-center justify-between">
                  <industry.icon className="h-4 w-4 text-white/50" />
                  <ArrowRight size={15} className="text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:text-white/70" />
                </div>
                <div className="mt-8">
                    <h2 className="type-h3 text-white">{industry.title}</h2>
                  <p className="mt-2 max-w-sm font-sans text-xs leading-relaxed text-white/50">{industry.description}</p>
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
