import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/components/ui/Link";
import { Container, Heading, Section } from "@/components/ui";
import { FounderProfile } from "@/components/sections/FounderProfile";
import { founders, getFounderBySlug } from "@/lib/founders";

export function generateStaticParams() {
  return founders.map((founder) => ({ slug: founder.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const founder = getFounderBySlug(slug);

  if (!founder) {
    return { title: "Founder | Articog" };
  }

  return {
    title: `${founder.name} | Articog`,
    description: `${founder.name}, ${founder.roleLines[0]}.`,
    alternates: { canonical: `https://articog.com/about/founder/${founder.slug}` },
  };
}

export default async function FounderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const founder = getFounderBySlug(slug);

  if (!founder) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black">
      <Section size="lg" className="pt-32 md:pt-40">
        <Container>
          <div className="mx-auto max-w-6xl">
            <Link
              href="/about"
              className="mb-10 inline-flex text-sm text-white/60 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Back to About
            </Link>
            <div className="mb-16 max-w-3xl">
              <span className="mb-5 inline-block type-label uppercase tracking-[0.18em] text-white/40">
                FOUNDER / LEADERSHIP
              </span>
              <Heading as="h1" size="hero" className="text-white">
                {founder.name}
              </Heading>
            </div>
            <FounderProfile founder={founder} />
          </div>
        </Container>
      </Section>
    </div>
  );
}
