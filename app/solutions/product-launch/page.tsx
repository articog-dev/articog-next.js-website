import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://articog.com/solutions/product-launch" },
  title: "Product Launch Campaigns | Articog",
  description: "Full creative support for your product launch, from strategy and timeline to every channel-specific asset.",
};
import { Container, Section, Heading, Button } from "@/components/ui";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Link } from "@/components/ui/Link";
import { Calendar, Layout, CheckCircle2, Globe, Share2, Info } from "lucide-react";
import { SolutionDetails } from "@/components/sections/SolutionDetails";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export default function ProductLaunchSolutionPage() {
  const howItWorks = [
    {
      title: "Launch Timeline",
      desc: "A full production schedule meticulously mapped to your specific launch date.",
      icon: Calendar,
    },
    {
      title: "Asset Matrix",
      desc: "Every asset needed across every channel, planned and sequenced upfront for efficiency.",
      icon: Layout,
    },
    {
      title: "Product Truth",
      desc: "Ensuring accurate and photorealistic representation of your product throughout every frame.",
      icon: CheckCircle2,
    },
    {
      title: "Localization",
      desc: "Market-specific versions and language adaptations where needed for global reach.",
      icon: Globe,
    },
    {
      title: "Channel Coverage",
      desc: "Assets delivered ready to post for paid media, organic social, and owned channels.",
      icon: Share2,
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <Section size="lg" className="pt-32 md:pt-40">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: "Product Launch Campaigns" }]} />
          <div className="text-center mb-16">
            <Heading as="h1" size="hero" className="mb-6 text-white">
              Every product needs a story. Build it once, scale it everywhere.
            </Heading>
          </div>
        </Container>
      </Section>

      <Section size="md" className="bg-white/[0.02]">
        <Container>
          <div className="mb-12">
            <Heading as="h2" size="section" className="mb-4 text-center text-white">How It Works</Heading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {howItWorks.map((item) => (
              <div 
                key={item.title} 
                className="p-8 rounded-2xl border border-white/10 flex flex-col gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="type-h3 text-white mb-2">{item.title}</h3>
                  <p className="type-small text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-xl border border-white/10 flex items-start gap-4 max-w-2xl mx-auto">
            <Info className="w-5 h-5 text-white/40 mt-0.5 flex-shrink-0" />
            <p className="type-small text-white/50 italic leading-relaxed">
              Looking for cinematic hero films? Check out our <Link href="/services/ai-video-production" className="text-white underline hover:text-white/80 transition-colors">AI Video Production service</Link>.
            </p>
          </div>
        </Container>
      </Section>

      <SolutionDetails category="launch" />

      <Section size="lg">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <FinalCTA content={{ ctaHref: "/book-a-demo", ctaLabel: "Book a Demo" }} />
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
