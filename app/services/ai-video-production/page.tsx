import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://articog.com/services/ai-video-production" },
  title: "AI Video Production | Articog",
  description: "AI video production for brand films, product commercials, launch campaigns, and performance creative built for growth-stage brands.",
};
import { Container, Section, Heading, Button } from "@/components/ui";
import { Link } from "@/components/ui/Link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldCheck, ArrowRight, Zap, Users } from "lucide-react";

export default function AIVideoProductionPage() {
  const deliverables = [
    { title: "Brand Films", path: null, desc: "High-concept films that tell your brand's story with cinematic quality." },
    { title: "Product Commercials", path: null, desc: "Dynamic commercial spots showcasing products in stunning environments." },
    { title: "Performance Ads", path: "/services/ad-creative", desc: "Data-driven creative optimized for conversion across paid social." },
    { title: "Social & Reels", path: "/services/social-creative", desc: "Fast-paced, native content designed for high engagement on vertical platforms." },
    { title: "Creator-Style Ads", path: "/services/ad-creative", desc: "Platform-aware content designed to support trust and action." },
    { title: "Product Launch", path: null, desc: "Complete visual packages to make your next launch unforgettable." },
    { title: "SaaS & Explainers", path: null, desc: "Clear, engaging product explainer videos built for high conversion." },
    { title: "Real Estate Films", path: null, desc: "Cinematic property and development films with responsible AI visualization." },
    { title: "Corporate & Internal", path: null, desc: "Scalable video for training, announcements, and executive communications." },
    { title: "Localization & Variants", path: null, desc: "Adapt campaigns for global markets with voice localization and cultural QA." },
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
      {/* Hero Section */}
      <Section size="lg" className="pt-32 md:pt-40">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 mb-6 border border-white/10">
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase">
                Services
              </span>
            </div>
            <Heading as="h1" size="hero" className="mb-6">
              AI Video Production
            </Heading>
          </div>
        </Container>
      </Section>

      {/* What We Deliver */}
      <Section className="py-20 bg-white/[0.02]">
        <Container>
          <div className="mb-12">
              <h2 className="type-h2 mb-4 text-white">What We Deliver</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((item) => {
              const card = (
                <>
                  <div>
                    <h3 className="type-h3 text-white group-hover:text-white transition-colors">{item.title}</h3>
                  </div>
                  {item.path && (
                    <div className="flex items-center text-xs font-bold tracking-widest text-white/30 group-hover:text-white/60 transition-colors uppercase">
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </div>
                  )}
                </>
              );
              const className = "group p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between";

              return item.path ? (
                <Link key={item.title} href={item.path} className={className}>
                  {card}
                </Link>
              ) : (
                <div key={item.title} className={className}>
                  {card}
                </div>
              );
            })}
          </div>
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
              <h2 className="type-h2 text-white">How It Works</h2>
              <p className="type-body-lg text-white/60 leading-relaxed">
                Our pipeline is designed for speed without compromising on creative integrity. From brief submission to final delivery, our process is streamlined to get your content live faster.
              </p>
              <Link href="/how-it-works" className="inline-flex items-center text-sm font-bold tracking-widest text-white hover:opacity-70 transition-opacity uppercase">
                View the full pipeline <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-8">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h2 className="type-h2 text-white">Human Oversight & Quality</h2>
              <p className="type-body-lg text-white/60 leading-relaxed">
                We don't just "hit generate." Every single asset produced by Articog goes through a rigorous human review process. Our creative directors ensure brand guidelines are met, quality is consistent, and the final output is ready for prime time.
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
              <h2 className="type-h2 mb-12 text-center text-white">Frequently Asked Questions</h2>
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
            <h2 className="type-h2 mb-8 text-white">Ready to transform your production?</h2>
            <Link href="/book-a-demo">
              <Button size="lg" className="rounded-full px-8 h-14 text-lg">
                Book a Demo
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
