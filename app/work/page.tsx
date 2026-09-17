import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creative Production Work | Articog",
  description: "See AI-native creative production across video ads, social content, product visuals, and campaign storytelling for growth-stage brands.",
  alternates: { canonical: "https://articog.com/work" },
};
import { ArrowRight } from "lucide-react";
import { Container, Section, Button, Heading } from "@/components/ui";
import { Link } from "@/components/ui/Link";
import { CreativeDocument } from "./CreativeDocument";
import { WorkVideoShowcase } from "@/components/sections/WorkVideoShowcase";

export default function WorkPage() {
  const categories = [
    {
      title: "Video Ads",
      href: "/work/video-ads",
    },
    {
      title: "Creator-Style Social Content",
      href: "/work/social",
    },
    {
      title: "Product Visuals",
      href: "/work/product-visuals",
    },
    {
      title: "Work by Industry",
      href: "/work/industries",
    },
    {
      title: "AI Ad Library",
      href: "/ai-ad-library",
    },
    {
      title: "Customer Stories",
      href: "/customers",
    },
  ];

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

          <div className="grid gap-6 md:grid-cols-2 mb-20">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group rounded-2xl p-8 border border-white/[0.08] transition-all hover:border-white/20"
              >
                <h2 className="type-h3 mb-2 text-white flex items-center justify-between">
                  {cat.title}
                  <ArrowRight size={20} className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                </h2>
              </Link>
            ))}
          </div>

          <div className="text-center pt-16 border-t border-white/10">
            <p className="type-body-lg mb-8 text-white/60">Want work like this for your brand?</p>
            <Button asChild variant="primary" size="lg">
              <Link href="/book-a-demo">Book a Demo</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
