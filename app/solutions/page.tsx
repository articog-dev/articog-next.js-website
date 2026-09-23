import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.articog.com/solutions" },
  title: "Creative Solutions for Growth-Stage Brands | Articog",
  description: "Flexible creative solutions for launches, performance marketing, subscriptions, and scalable production without the overhead of a large agency.",
};
import { ArrowRight } from "lucide-react";
import { Container, Section, Heading, PageHero } from "@/components/ui";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Link } from "@/components/ui/Link";

export default function SolutionsPage() {
  const cards = [
    {
      title: "Monthly Creative Subscription",
      description: "Ongoing film, video, image, social and audio production with lower production overhead.",
      href: "/solutions/monthly-creative-subscription",
    },
    {
      title: "Performance Marketing Creative",
      description: "Produce recurring video and static variants faster with AI through the same monthly production model.",
      href: "/solutions/performance-marketing",
    },
    {
      title: "Product Launch Campaigns",
      description: "Create the product story, then scale it into film, social, visuals, audio and campaign variations with AI-native production.",
      href: "/solutions/product-launch",
    },
    {
      title: "In-House Creative Overflow",
      description: "Extend your team with faster AI-native production without adding a larger traditional production setup.",
      href: "/solutions/creative-team-overflow",
    },
    {
      title: "Enterprise Creative Production",
      description: "Structured monthly or project-based production for teams that need more content, lower production overhead and consistent brand control.",
      href: "/solutions/enterprise",
    },
    {
      title: "Creative Team Extension",
      description: "Flexible creative support for agency and internal teams.",
      href: "/solutions/creative-team-overflow",
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <PageHero title="Production built around your monthly content needs.">
        <div className="grid gap-6 md:grid-cols-2">
            {cards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group flex min-h-[96px] items-center justify-between rounded-xl border border-white/[0.08] px-5 py-4 transition-colors hover:border-white/20"
              >
                <div className="min-w-0">
                  <Heading as="h2" size="card" className="text-white">{card.title}</Heading>
                </div>
                <ArrowRight size={18} className="ml-4 shrink-0 text-white/35 transition-transform group-hover:translate-x-0.5 group-hover:text-white/70" />
              </Link>
            ))}
        </div>
      </PageHero>
      <Section size="lg">
        <Container>
          <FinalCTA content={{ ctaHref: "/book-a-demo", ctaLabel: "Book a Demo" }} />
        </Container>
      </Section>
    </div>
  );
}
