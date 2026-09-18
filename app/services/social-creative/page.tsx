import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://articog.com/services/social-creative" },
  title: "Social Creative Production | Articog",
  description: "Social creative for organic and paid campaigns, designed for brand consistency and fast iteration across platforms.",
};
import { Link } from "@/components/ui/Link";
import { Container, Section, Button } from "@/components/ui";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ServiceDetails } from "@/components/sections/ServiceDetails";

export default function SocialCreativePage() {
  return (
    <>
      <Section size="lg" className="pt-32 md:pt-40 pb-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="type-h1 mb-6 text-white">
              Social Creative
            </h1>
          </div>
        </Container>
      </Section>

      <Section className="py-20 border-t border-white/5">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="type-h2 mb-6 text-white">What We Deliver</h2>
            </div>
            <div>
              <h2 className="type-h2 mb-6 text-white">Applications</h2>
              <ul className="space-y-4">
                {[
                  "Organic social short form video",
                  "Reels & TikTok content series",
                  "Brand campaign social cutdowns",
                  "Always on social content calendars",
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

      <ServiceDetails category="social" />

      <Section className="py-32">
        <Container className="text-center">
          <h2 className="type-h2 mb-8 text-white">Ready to transform your production?</h2>
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
