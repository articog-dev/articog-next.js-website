import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://articog.com/services/ai-video-production" },
  title: "AI Video Production | Articog",
  description: "AI video production for brand films, product commercials, launch campaigns, and performance creative built for growth-stage brands.",
};
import { Container, Section, Heading, Grid, Card, PageHero } from "@/components/ui";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Link } from "@/components/ui/Link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldCheck, ArrowRight, Zap, Users } from "lucide-react";

export default function AIVideoProductionPage() {
  const deliverables = [
    { title: "Brand Films", path: null, desc: "Cinematic brand storytelling." },
    { title: "Product Commercials", path: null, desc: "Dynamic product commercial spots." },
    { title: "Performance Ads", path: "/services/ad-creative", desc: "Conversion-focused paid social creative." },
    { title: "Social & Reels", path: "/services/social-creative", desc: "Native vertical social content." },
    { title: "Creator-Style Ads", path: "/services/ad-creative", desc: "Platform-native creator advertising." },
    { title: "Product Launch", path: null, desc: "Complete product launch visuals." },
    { title: "SaaS & Explainers", path: null, desc: "Clear product explainer videos." },
    { title: "Real Estate Films", path: null, desc: "Cinematic property development films." },
    { title: "Corporate & Internal", path: null, desc: "Scalable internal communications video." },
    { title: "Localization & Variants", path: null, desc: "Localized global campaign variants." },
  ];

  const faqs = [
    {
      q: "How long does a project take?",
      a: "Timelines depend on scope, number of deliverables and review cycles. Articog defines an expected first-review and final-delivery timeline during scoping."
    },
    {
      q: "How do revisions work?",
      a: "Each engagement defines review stages and revision rounds. Feedback is consolidated and applied through the production workflow to maintain visual consistency."
    },
    {
      q: "Who owns the final content?",
      a: "Usage and ownership terms are defined in the signed project or service agreement, including any relevant third-party licensing conditions."
    },
    {
      q: "Will the creative be unique to our brand?",
      a: "Creative direction, prompts, production decisions and finishing are built around the approved brief and brand system rather than reused as a one-size-fits-all template."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHero title="AI Video Production" />

      {/* What We Deliver */}
      <Section className="py-20 bg-white/[0.02]">
        <Container>
          <div className="mb-12">
              <Heading as="h2" size="section" className="mb-4 text-white">What We Deliver</Heading>
          </div>
          <Grid variant="standard" columns="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((item) => {
              const card = (
                <>
                  <div>
                    <Heading as="h3" size="card" className="text-white transition-colors group-hover:text-white">{item.title}</Heading>
                  </div>
                  {item.path && (
                    <div className="flex items-center text-xs font-bold tracking-widest text-white/30 group-hover:text-white/60 transition-colors uppercase">
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </div>
                  )}
                </>
              );
              const className = "group radius-lg border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between";

              return item.path ? (
                <Link key={item.title} href={item.path} className={className}>
                  {card}
                </Link>
              ) : (
                <Card key={item.title} className={className}>
                  {card}
                </Card>
              );
            })}
          </Grid>
        </Container>
      </Section>

      {/* How It Works & Quality */}
      <Section className="py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <Heading as="h2" size="section" className="text-white">How It Works</Heading>
              <p className="type-body-lg text-white/60 leading-relaxed">
                Brief to delivery, built for speed.
              </p>
              <Link href="/how-it-works" className="inline-flex items-center text-sm font-bold tracking-widest text-white hover:opacity-70 transition-opacity uppercase">
                View the full pipeline <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-8">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <Heading as="h2" size="section" className="text-white">Human Oversight &amp; Quality</Heading>
              <p className="type-body-lg text-white/60 leading-relaxed">
                Every asset reviewed by a creative director.
              </p>
              <div className="flex items-center gap-4 text-white/40 type-small italic border-l-2 border-white/10 pl-6">
                <Users className="w-5 h-5 flex-shrink-0" />
                <span>"AI enables the speed, but human taste ensures the soul."</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="py-20 bg-white/[0.02]">
        <Container>
          <div className="max-w-3xl mx-auto">
              <Heading as="h2" size="section" className="mb-12 text-center text-white">Frequently Asked Questions</Heading>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-white/10 bg-black/40 rounded-xl px-6">
                  <AccordionTrigger className="text-white hover:no-underline font-display text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/60 font-sans leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-24">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <FinalCTA content={{ ctaHref: "/book-a-demo", ctaLabel: "Book a Demo" }} />
          </div>
        </Container>
      </Section>
    </div>
  );
}
