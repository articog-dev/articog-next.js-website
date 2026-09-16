import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://articog.com/careers" },
  title: "Careers | Articog",
  description: "Join Articog and help build AI-native film and creative production for ambitious growth-stage brands.",
};
import { Container, Section, Button, Heading } from "@/components/ui";
import { Link } from "@/components/ui/Link";
import { BreezyOpenings } from "@/components/careers/BreezyOpenings";

export default function CareersPage() {
  return (
    <div className="bg-black min-h-screen">
      <Section size="lg" className="pt-32 md:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-20">
            <span
              className="mb-5 inline-block type-label uppercase tracking-[0.18em]"
              style={{ color: "rgba(255,255,255,0.40)" }}
            >
              CAREERS
            </span>
            <Heading as="h1" size="hero" className="mb-6">
              Join the future of production
            </Heading>
            <p className="mx-auto max-w-2xl type-body md:text-lg leading-relaxed mb-12" style={{ color: "rgba(255,255,255,0.65)" }}>
              We're building the infrastructure for the next generation of creative work. At Articog, we combine creative excellence with cutting-edge technology to redefine what's possible.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-24">
            <h2 className="text-2xl font-display font-semibold text-white mb-8">Open Roles</h2>

            <BreezyOpenings />

            <p className="mt-8 text-center font-sans text-[12px] text-muted-safe">
              Note: Candidate information is handled according to our <Link href="/privacy-policy" className="underline hover:text-white/50">Privacy Policy</Link>.
            </p>
          </div>

          <div className="text-center pt-16 border-t border-white/10">
            <Heading as="h2" size="section" className="mb-8">
              Stay connected
            </Heading>
            <Button asChild variant="primary" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}