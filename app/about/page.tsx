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
          <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-8 lg:grid-cols-[0.9fr_1.8fr] lg:items-start">
            <div className="space-y-4 lg:pt-[0.25rem]">
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
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-3xl">
              <Heading as="h2" size="section" className="mb-4">
                The people behind Articog
              </Heading>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FounderPreviewCard
                name="Sai Teja Inampudi"
                role="CEO & Founder"
                imageSrc="/sai-teja-inampudi.png"
                imageAlt="Sai Teja Inampudi"
                profileHref="/about/founder/sai-teja-inampudi"
              />
              <FounderPreviewCard
                name="Dr. Harika Govada"
                role="MD & Co-Founder"
                imageSrc="/harika-govada.png.png"
                imageAlt="Dr. Harika Govada"
                profileHref="/about/founder/dr-harika-govada"
                circular
              />
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
              Ready to transform your production?
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
    <div className="space-y-4 rounded-xl border border-white/[0.05] p-6">
      <Heading as="h3" size="card" className="text-white">{title}</Heading>
      <p className="type-small leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>
        {description}
      </p>
    </div>
  );
}

function FounderPreviewCard({
  name,
  role,
  imageSrc,
  imageAlt,
  profileHref = "/founder-leadership",
  circular = false,
}: {
  name: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
  profileHref?: string;
  circular?: boolean;
}) {
  return (
    <article className="rounded-2xl border border-white/[0.08] p-5 sm:p-6">
      <div className="grid grid-cols-[5.5rem_1fr] items-center gap-4 sm:grid-cols-[7rem_1fr] sm:gap-5">
        <div
          className={`aspect-square overflow-hidden border border-white/[0.08] bg-black ${circular ? "rounded-full" : "rounded-xl"}`}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={603}
            height={603}
            className={`h-full w-full object-cover ${circular ? "rounded-full" : ""}`}
            sizes="7rem"
          />
        </div>
        <div>
          <Heading as="h3" size="card" className="text-white">{name}</Heading>
          <p className="mt-2 type-body text-white/60">{role}</p>
          <Button asChild variant="outline" size="sm" className="mt-5">
            <Link to={profileHref}>
              View More
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
