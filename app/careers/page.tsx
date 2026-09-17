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
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <Heading as="h1" size="hero" className="mb-6">
              Join the future of production
            </Heading>
          </div>

          <div className="max-w-4xl mx-auto mb-24">
            <h2 className="type-h2 mb-8 text-white">Open Roles</h2>

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