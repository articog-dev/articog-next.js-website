import type { Metadata } from "next";
import { Link } from "@/components/ui/Link";
import { Container, Heading, Section } from "@/components/ui";
import { FounderProfile } from "@/components/sections/FounderProfile";
import { founders } from "@/lib/founders";

export const metadata: Metadata = {
  title: "Founder / Leadership | Articog",
  description: "Meet the founders and leadership behind Articog.",
  alternates: { canonical: "https://articog.com/founder-leadership" },
};

export default function FounderLeadershipPage() {
  return (
    <div className="bg-black">
      <Section size="lg" className="pt-32 md:pt-40">
        <Container>
          <div className="mx-auto max-w-6xl">
            <Link
              to="/about"
              className="mb-10 inline-flex text-sm text-white/60 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Back to About
            </Link>
            <div className="mb-16 max-w-3xl">
              <Heading as="h1" size="hero" className="text-white">
                FOUNDER / LEADERSHIP
              </Heading>
            </div>

            <div className="space-y-16">
              {founders.map((founder) => (
                <FounderProfile key={founder.slug} founder={founder} />
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
