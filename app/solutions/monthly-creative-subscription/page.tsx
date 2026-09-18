import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://articog.com/solutions/monthly-creative-subscription" },
  title: "Monthly Creative Subscription | Articog",
  description: "Steady, predictable creative delivered every month. Video, social, and visuals without the overhead of a full in-house team or agency retainer.",
};
import { Container, Section, Heading, Button } from "@/components/ui";
import { Link } from "@/components/ui/Link";
import { Layers, Calendar, UserCheck, ArrowRight } from "lucide-react";
import { SolutionDetails } from "@/components/sections/SolutionDetails";

export default function MonthlySubscriptionPage() {
  const steps = [
    {
      title: "Flexible Scope",
      desc: "A mix of formats video, social, and visual tailored specifically to your monthly needs and goals.",
      icon: Layers,
    },
    {
      title: "Consistent Cadence",
      desc: "Assets delivered on a predictable monthly schedule, ensuring your channels never go dark.",
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
      {/* Hero Section */}
      <Section size="lg" className="pt-32 md:pt-40">
        <Container>
          <div className="max-w-3xl">
            <Heading as="h1" size="hero" className="mb-6">
              Monthly Creative Subscription
            </Heading>
          </div>
        </Container>
      </Section>

      {/* How It Works Section */}
      <Section className="py-20 bg-white/[0.02]">
        <Container>
          <div className="mb-12">
            <h2 className="type-h2 mb-4 text-white">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item) => (
              <div 
                key={item.title} 
                className="p-8 rounded-2xl border border-white/10"
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
      <Section className="py-20 border-t border-white/5">
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
      <Section className="py-24 bg-white/[0.02]">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="type-h2 mb-8 text-white">Ready to transform your production?</h2>
            <Link href="/book-a-demo">
              <Button size="lg" className="rounded-full px-8 h-14">
                Book a Demo
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
