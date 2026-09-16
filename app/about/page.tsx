import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  alternates: { canonical: "https://articog.com/about" },
  title: "About Articog | AI Native Film & Production Company",
  description:
    "Articog is an AI Native Film & Production Company producing brand films, commercials, product visuals, creator-style social content, campaign creative, and audio for growth-stage brands and modern marketing teams, with a primary focus on the United States and select global markets.",
};
import { Link } from "@/components/ui/Link";
import { Container, Section, Button, Heading, Text } from "@/components/ui";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <Section size="lg" className="pt-32 md:pt-40">
        <Container>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-5 inline-block type-label uppercase tracking-[0.18em] text-white/40">
              ABOUT ARTICOG
            </span>
            <Heading as="h1" size="hero" className="mb-6">
              Production craft. Rebuilt for the AI era.
            </Heading>
            <Text as="p" size="lg" className="mx-auto max-w-2xl leading-relaxed text-white/65">
              Articog is an AI Native Film &amp; Production Company producing brand films, commercials, product visuals, creator-style social content, campaign creative, and audio for growth-stage brands and modern marketing teams, with a primary focus on the United States and select global markets.
            </Text>
          </div>
        </Container>
      </Section>

      <Section size="md" className="border-t border-white/[0.05]">
        <Container>
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 max-w-3xl">
              <span className="mb-4 inline-block type-label uppercase tracking-[0.18em] text-white/40">
                FOUNDER / LEADERSHIP
              </span>
              <Heading as="h2" size="section" className="mb-4">
                Sai Teja Inampudi
              </Heading>
              <p className="type-body-lg leading-relaxed text-white/60">
                CEO &amp; Founder, Articog, AI-Native Film &amp; Production Company
                <br />
                Co-Founder, AFIN (AI Film India Network)
              </p>
            </div>

            <div className="grid gap-10 lg:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)] lg:items-start lg:gap-14">
              <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
                <Image
                  src="/sai-teja-inampudi.png"
                  alt="Sai Teja Inampudi"
                  width={603}
                  height={603}
                  className="h-auto w-full"
                  sizes="(max-width: 1024px) 18rem, 22rem"
                />
              </div>

              <div className="space-y-8 text-[1.05rem] leading-[1.9] text-white/60">
                <p>
                  Sai Teja Inampudi is the CEO &amp; Founder of Articog, an AI-native film and production company building next-generation creative workflows for brands, agencies, and marketing teams. He is also the Co-Founder of AFIN (AI Film India Network), a community bringing together AI filmmakers and creative professionals. He works at the intersection of generative AI, filmmaking, creative direction, visual storytelling, and technology, with a focus on transforming how commercials, brand films, product content, and cinematic experiences are produced.
                </p>

                <div className="space-y-4">
                  <h3 className="type-h3 text-white">Experience &amp; Expertise</h3>
                  <p>
                    Sai Teja has a multidisciplinary background across AI filmmaking, creative technology, visual design, video production, editing, UI/UX, and entrepreneurship. At Articog, he leads the development of AI-native production pipelines combining generative AI with human creative direction, storytelling, editing, sound, and post-production. His experience also includes leadership in technology and creative communities, cultural production, startup projects, and team building.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="type-h3 text-white">Core Areas of Expertise</h3>
                  <p>
                    AI Filmmaking • Generative AI • Creative Direction • Brand &amp; Commercial Films • AI Video Production • Visual Storytelling • Creative Technology • Video Editing &amp; Post-Production • UI/UX &amp; Visual Design • Startup Leadership • Creative Production Workflows
                  </p>
                </div>

                <a
                  href="https://www.linkedin.com/in/-saitejainampudi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Sai Teja Inampudi on LinkedIn"
                  className="inline-flex text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section size="md" className="border-t border-white/[0.05]">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-8 lg:grid-cols-[0.9fr_1.8fr] lg:items-start">
            <div className="space-y-4 lg:pt-[0.25rem]">
              <span className="inline-block type-label uppercase tracking-[0.18em] text-white/40">
                WHO WE ARE
              </span>
              <Heading as="h2" size="section" className="max-w-[15rem] leading-[0.92] text-balance">
                A creative company
                <br />
                built for the age of AI.
              </Heading>
            </div>
            <div className="space-y-7 text-[1.05rem] leading-[1.9] text-white/60 lg:max-w-[54rem]">
              <p>
                <span className="font-bold text-white">Articog</span> is an AI Native Film &amp; Production Company. We produce brand films, commercials, product visuals, creator-style social content, campaign creative, and audio for growth-stage brands and modern marketing teams.
              </p>
              <p>
                The name says it all: <span className="font-bold text-white">Artificial + Cognition.</span>
              </p>
              <p>
                <span className="font-bold text-white">Articog</span> builds on production experience from <span className="font-bold text-white">Govada Creative Productions</span>, with a focus on craft, review discipline, finishing, rights, and delivery.
              </p>
              <p>
                Clients can engage Articog through project-based work, ongoing creative support, or strategic production partnerships, depending on scope, cadence, and volume. Our human-directed, AI-native workflow keeps creative direction, review, and delivery connected.
              </p>
              <p className="italic font-medium text-white/75">
                Ongoing creative support is one engagement option for brands with recurring demand. The model flexes around campaign scope, cadence, and volume while keeping one consistent production standard.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section size="md" className="border-t border-white/[0.05]">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-8 lg:grid-cols-[0.9fr_1.8fr] lg:items-center">
            <div className="space-y-3">
              <Heading as="p" size="label">
                OUR FOUNDATION
              </Heading>
              <Heading as="p" size="section">
                Production experience. Now AI-native.
              </Heading>
            </div>
            <p className="type-body-lg leading-relaxed text-white/60">
              Articog brings production experience into a human-directed, AI-native model, combining creative direction, generative workflows, editing, sound, and finishing in one integrated process.
            </p>
          </div>
        </Container>
      </Section>

      <Section size="md" className="border-t border-white/[0.05]">
        <Container>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <Heading as="h2" size="section" className="mb-6">
              Human-directed. AI-native.
            </Heading>
            <p
              className="type-body md:text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              AI expands what can be produced and how quickly it can move. Human creative direction decides what should be made, how it should feel, and whether it is right for the brand. Every project combines both.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            <ApproachItem
              title="Creative Direction First"
              description="Every project starts with the idea, audience, brand, visual language, and campaign objective. We set the direction before generation begins."
            />
            <ApproachItem
              title="AI-Native Production"
              description="Our production workflow uses generative tools to develop characters, environments, product shots, motion, and creative variations under human creative direction."
            />
            <ApproachItem
              title="Production Ready Finish"
              description="Creative directors and editors refine deliverables through compositing, editing, sound, quality control, and platform-specific finishing before delivery."
            />
          </div>
        </Container>
      </Section>

      <Section size="lg" className="border-t border-white/[0.05]">
        <Container>
          <div
            className="rounded-2xl border border-white/[0.08] p-12 text-center"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <Heading as="h2" size="section" className="mb-6">
              Ready to make your next campaign AI-native?
            </Heading>
            <Button asChild variant="primary" size="lg">
              <Link to="/book-a-demo">
                Book a Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}

function ApproachItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-4 rounded-xl border border-white/[0.05] bg-white/[0.02] p-6">
      <h3 className="type-h3 text-white">{title}</h3>
      <p className="type-small leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>
        {description}
      </p>
    </div>
  );
}
