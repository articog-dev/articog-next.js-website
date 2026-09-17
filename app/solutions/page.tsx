import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://articog.com/solutions" },
  title: "Creative Solutions for Growth-Stage Brands | Articog",
  description: "Flexible creative solutions for launches, performance marketing, subscriptions, and scalable production without the overhead of a large agency.",
};
import { ArrowRight } from "lucide-react";
import { Container, Section, Button, Heading } from "@/components/ui";
import { Link } from "@/components/ui/Link";

export default function SolutionsPage() {
  const cards = [
    {
      title: "Monthly Creative Subscription",
      description: "For teams that need steady creative every month.",
      href: "/solutions/monthly-creative-subscription",
    },
    {
      title: "Performance Marketing Creative",
      description: "For growth teams that need high volume, performance focused ad variants.",
      href: "/solutions/performance-marketing",
    },
    {
      title: "Product Launch Campaigns",
      description: "Creative support for your launch, from timeline to channel rollout.",
      href: "/solutions/product-launch",
    },
    {
      title: "In-House Creative Overflow",
      description: "Extend your internal team's capacity during peak demand without full-time hires.",
      href: "/solutions/creative-team-overflow",
    },
    {
      title: "Enterprise Creative Production",
      description: "Production for large organizations with strict security and governance needs.",
      href: "/solutions/enterprise",
    },
    {
      title: "Creative Team Extension",
      href: "/solutions/creative-team-overflow",
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <Section size="lg" className="pt-20 md:pt-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-16">
            <Heading as="h1" size="hero" className="mb-6">
              Solutions built around how you work
            </Heading>
          </div>

          <div className="grid gap-3 md:grid-cols-2 mb-24">
            {cards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group flex min-h-[96px] items-center justify-between rounded-xl border border-white/[0.08] px-5 py-4 transition-colors hover:border-white/20"
              >
                <div className="min-w-0">
                  <h2 className="type-h3 text-white">{card.title}</h2>
                </div>
                <ArrowRight size={18} className="ml-4 shrink-0 text-white/35 transition-transform group-hover:translate-x-0.5 group-hover:text-white/70" />
              </Link>
            ))}
          </div>

          <div className="text-center pt-12 border-t border-white/10">
            <p className="type-body mb-6 text-white/60">Not sure which fits?</p>
            <Button asChild variant="primary" size="lg">
              <Link href="/book-a-demo">Book a Demo</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
