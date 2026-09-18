import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, Section, Heading, Button } from "@/components/ui";
import { Link } from "@/components/ui/Link";
import {
  dedicatedServicePageBySlug,
  dedicatedServicePages,
} from "@/lib/service-pages";

export function generateStaticParams() {
  return dedicatedServicePages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = dedicatedServicePageBySlug[slug];

  if (!service) {
    return { title: "Service | Articog" };
  }

  return {
    title: `${service.title} | Articog`,
    description: service.description,
    alternates: { canonical: `https://articog.com/services/${service.slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = dedicatedServicePageBySlug[slug];

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black">
      <Section size="lg" className="pt-32 md:pt-40">
        <Container>
          <div className="max-w-3xl">
            <Heading as="h1" size="hero" className="mb-6">
              {service.title}
            </Heading>
            {service.description && (
              <p className="type-body-lg max-w-2xl text-white/60">
                {service.description}
              </p>
            )}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-white/5 bg-white/[0.02] py-20">
        <Container>
          <div className="max-w-3xl">
            <h2 className="type-h2 mb-4 text-white">What We Deliver</h2>
            <p className="type-body-lg text-white/60">
              {service.title}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="type-h2 mb-8 text-white">
              Ready to transform your production?
            </h2>
            <Link href="/book-a-demo">
              <Button size="lg" className="h-14 rounded-full px-8">
                Book a Demo
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
