import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://articog.com/services/product-visuals" },
  title: "Product Visual Content | Articog",
  description: "Product visual content for e-commerce, launch campaigns, and performance marketing created with speed and brand precision.",
};
import { Link } from "@/components/ui/Link";
import { Container, Section, Button, Heading } from "@/components/ui";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ServiceDetails } from "@/components/sections/ServiceDetails";

export default function ProductVisualsPage() {
  return (
    <>
      <Section size="lg" className="pt-32 md:pt-40 pb-20">
        <Container>
          <div className="max-w-3xl">
            <Heading as="h1" size="hero" className="mb-6 text-white">
              Product Visual Content
            </Heading>
          </div>
        </Container>
      </Section>

      <Section className="py-20 border-t border-white/5">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <Heading as="h2" size="section" className="mb-6 text-white">What We Deliver</Heading>
              <p className="text-white/60 leading-relaxed">
                Elevate your product presence without studio logistics. We combine precise rendering with AI environments for scalable visual content.
              </p>
            </div>
            <div>
              <Heading as="h2" size="section" className="mb-6 text-white">Applications</Heading>
              <ul className="space-y-4">
                {[
                  "E-commerce product imagery",
                  "Campaign hero assets",
                  "Product launch visual systems",
                  "Advertising creative assets",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/60">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <ServiceDetails category="product-visuals" />

      <Section className="py-32">
        <Container className="text-center">
          <Heading as="h2" size="section" className="mb-8 text-white">Ready to transform your production?</Heading>
          <Button asChild variant="primary" size="lg">
            <Link href="/book-a-demo">
              Book a Demo <ArrowRight size={15} className="ml-2" />
            </Link>
          </Button>
        </Container>
      </Section>
    </>
  );
}
