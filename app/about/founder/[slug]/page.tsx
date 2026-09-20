import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeroDetail } from "@/components/ui";
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
      <PageHeroDetail
        title={null}
        backLink={{ href: "/about", label: "Back to About" }}
        detail={<FounderProfile founder={founder} />}
      />
    </div>
  );
}
