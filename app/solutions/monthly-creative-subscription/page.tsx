import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.articog.com/solutions/monthly-creative-subscription" },
  title: "Monthly Creative Subscription | Articog",
  description: "Steady, predictable creative delivered every month. Video, social, and visuals without the overhead of a full in-house team or agency retainer.",
};
import { Container, Section, Heading, PageHero } from "@/components/ui";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Link } from "@/components/ui/Link";
import { Layers, Calendar, UserCheck, ArrowRight } from "lucide-react";
import { SolutionDetails } from "@/components/sections/SolutionDetails";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export default function MonthlySubscriptionPage() {
  const steps = [
    {
      title: "Flexible Mix",
      desc: "Use the monthly scope across products, campaigns and formats.",
      icon: Layers,
    },
    {
      title: "Scalable Output",
      desc: "Create more content without scaling traditional production every time.",
      icon: Calendar,
    },
    {
      title: "Dedicated Creative Direction",
      desc: "A consistent point of contact who understands your brand's voice and visual identity inside out.",
      icon: UserCheck,
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: "Monthly Creative Subscription" }]} />}
        title="Your monthly AI-native production partner."
      />

      {/* How It Works Section */}
      <Section size="md" className="bg-white/[0.02]">
        <Container>
          <div className="mb-[var(--gap-header-to-content)]">
            <Heading as="h2" size="section" className="text-white">How It Works</Heading>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((item) => (
              <div 
                key={item.title} 
                className="rounded-2xl border border-white/10 p-6 md:p-8"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="type-h4 text-white mb-2">{item.title}</h3>
                <p className="type-small text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <SolutionDetails category="monthly" />

      {/* CTA Section */}
      <Section size="md" className="border-t border-white/5">
        <Container>
          <Link 
            href="/book-a-demo"
            className="group flex items-center justify-between p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 max-w-2xl"
          >
            <div>
              <h3 className="type-h3 text-white mb-2">Plan your next creative cycle</h3>
              <p className="font-sans text-white/50">Talk with our team about the scope, speed, and delivery model that fits your goals.</p>
            </div>
            <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
          </Link>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section size="lg" className="bg-white/[0.02]">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <FinalCTA content={{ ctaHref: "/book-a-demo", ctaLabel: "Book a Demo" }} />
          </div>
        </Container>
      </Section>
    </div>
  );
}
