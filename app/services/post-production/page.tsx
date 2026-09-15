import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://articog.com/services/post-production" },
  title: "Post-Production | Articog",
  description: "Post-production for video, motion, sound, and finishing, helping brands polish creative for launch and performance.",
};
import { Container, Section, Heading, Button } from "@/components/ui";
import { Link } from "@/components/ui/Link";
import { Scissors, Layers, Palette, Volume2, Sparkles, Info, ArrowRight } from "lucide-react";
import { ServiceDetails } from "@/components/sections/ServiceDetails";

export default function PostProductionPage() {
  const whatWeDeliver = [
    {
      title: "Editing",
      desc: "Precision narrative assembly and rhythm for maximum viewer retention.",
      icon: Scissors,
    },
    {
      title: "Compositing",
      desc: "Seamlessly blending elements to create impossible or perfect scenes.",
      icon: Layers,
    },
    {
      title: "Color",
      desc: "Cinematic grading that defines the emotional tone of your visuals.",
      icon: Palette,
    },
    {
      title: "Audio",
      desc: "Professional sound design, mixing, and mastering for any platform.",
      icon: Volume2,
    },
    {
      title: "Cleanup & Upscaling",
      desc: "Technical refinement and high-resolution finishing for premium output.",
      icon: Sparkles,
    },
  ];

  const subPages = [
    {
      title: "Video Editing",
      href: null,
      description: "Professional narrative and performance editing for all formats.",
    },
    {
      title: "AI Compositing & Cleanup",
      href: null,
      description: "Advanced visual refinement and element integration.",
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <Section size="lg" className="pt-32 md:pt-40">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 mb-6 border border-white/10">
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase">
                Services
              </span>
            </div>
            <Heading as="h1" size="hero" className="mb-6">
              Post-Production
            </Heading>
          </div>
        </Container>
      </Section>

      <Section className="py-20 bg-white/[0.02]">
        <Container>
          <div className="mb-12">
            <h2 className="type-h2 mb-4 text-center text-white">What We Deliver</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whatWeDeliver.map((item) => (
              <div 
                key={item.title} 
                className="p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4"
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

          <div className="mt-12 p-6 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4 max-w-2xl mx-auto">
            <Info className="w-5 h-5 text-white/40 mt-0.5 flex-shrink-0" />
            <p className="type-small text-white/50 italic leading-relaxed">
              Note: Final assets are formatted to your exact channel and platform delivery specifications.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {subPages.map((page) => {
              const card = (
                <>
                  <h3 className="type-h3 text-white mb-2">{page.title}</h3>
                  <p className="type-small text-white/50 mb-6">{page.description}</p>
                  {page.href && (
                    <span className="inline-flex items-center gap-2 text-sm text-white/80 font-medium group-hover:text-white transition-colors">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </>
              );
              const className = "group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all";

              return page.href ? (
                <Link key={page.title} href={page.href} className={className}>
                  {card}
                </Link>
              ) : (
                <div key={page.title} className={className}>
                  {card}
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <ServiceDetails category="post-production" />

      <Section className="py-24">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="type-h2 mb-8 text-white">Ready to finish your project?</h2>
            <Link href="/book-a-demo">
              <Button size="lg" className="rounded-full px-8 h-14 text-lg">
                Finish Your Project
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
