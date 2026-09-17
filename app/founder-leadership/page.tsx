import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/components/ui/Link";
import { Container, Heading, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Founder / Leadership | Articog",
  description: "Meet the founders and leadership behind Articog.",
  alternates: { canonical: "https://articog.com/founder-leadership" },
};

export default function FounderLeadershipPage() {
  return (
    <div className="bg-black">
      <Section size="lg" className="pt-32 md:pt-40">
        <Container>
          <div className="mx-auto max-w-6xl">
            <Link
              to="/about"
              className="mb-10 inline-flex text-sm text-white/60 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Back to About
            </Link>
            <div className="mb-16 max-w-3xl">
              <span className="mb-5 inline-block type-label uppercase tracking-[0.18em] text-white/40">
                FOUNDER / LEADERSHIP
              </span>
              <Heading as="h1" size="hero" className="text-white">
                FOUNDER / LEADERSHIP
              </Heading>
            </div>

            <div className="space-y-16">
              <SaiTejaProfile />
              <HarikaGovadaProfile />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

function SaiTejaProfile() {
  return (
    <article className="grid gap-10 border-t border-white/[0.08] pt-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
      <div className="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] lg:mx-0">
        <Image
          src="/sai-teja-inampudi.png"
          alt="Sai Teja Inampudi"
          width={603}
          height={603}
          className="h-auto w-full"
          sizes="(max-width: 1024px) 16rem, 16rem"
        />
      </div>
      <div className="space-y-8 text-[1.05rem] leading-[1.9] text-white/60">
        <div>
          <Heading as="h2" size="section" className="mb-3 text-white">
            Sai Teja Inampudi
          </Heading>
          <p>
            CEO &amp; Founder, Articog, AI-Native Film &amp; Production Company
            <br />
            Co-Founder, AFIN (AI Film India Network)
          </p>
        </div>
        <p>
          Sai Teja Inampudi is the CEO &amp; Founder of Articog, an AI-native film and production company building next-generation creative workflows for brands, agencies, and marketing teams. He is also the Co-Founder of AFIN (AI Film India Network), a community bringing together AI filmmakers and creative professionals. He works at the intersection of generative AI, filmmaking, creative direction, visual storytelling, and technology, with a focus on transforming how commercials, brand films, product content, and cinematic experiences are produced.
        </p>
        <div className="space-y-4">
          <h3 className="type-h3 text-white">Experience</h3>
          <p>
            Sai Teja has a multidisciplinary background across AI filmmaking, creative technology, visual design, video production, editing, UI/UX, and entrepreneurship. At Articog, he leads the development of AI-native production pipelines combining generative AI with human creative direction, storytelling, editing, sound, and post-production. His experience also includes leadership in technology and creative communities, cultural production, startup projects, and team building.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="type-h3 text-white">Core Areas</h3>
          <p>
            AI Filmmaking • Generative AI • Creative Direction • Brand &amp; Commercial Films • AI Video Production • Visual Storytelling • Creative Technology • Video Editing &amp; Post-Production • UI/UX &amp; Visual Design • Startup Leadership • Creative Production Workflows
          </p>
        </div>
        <LinkedInLink href="https://www.linkedin.com/in/-saitejainampudi/" label="Sai Teja Inampudi" />
      </div>
    </article>
  );
}

function HarikaGovadaProfile() {
  return (
    <article id="harika-govada" className="scroll-mt-28 grid gap-10 border-t border-white/[0.08] pt-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
      <div className="w-full max-w-xs overflow-hidden rounded-full border border-white/[0.08] bg-black">
        <Image
          src="/harika-govada.png.png"
          alt="Dr. Harika Govada"
          width={603}
          height={603}
          className="h-auto w-full rounded-full"
          sizes="(max-width: 1024px) 16rem, 16rem"
        />
      </div>
      <div className="space-y-8 text-[1.05rem] leading-[1.9] text-white/60">
        <div>
          <Heading as="h2" size="section" className="mb-3 text-white">
            Dr. Harika Govada
          </Heading>
          <p>MD &amp; Co-Founder, Articog</p>
          <p className="mt-2 text-base text-white/45">
            MD &amp; Co-founder | Creative AI Production | Brand Storytelling | Video Production, Creative automation
            <br />
            Hyderabad, Telangana, India
          </p>
        </div>
        <p>
          Building AI-led creative production systems at Articog | MD &amp; Co-founder
        </p>
        <p>
          Background in the creative field through Govada Creations, growing from intern to leadership over the years. Focused on execution, scale, and keeping things simple and sharp.
        </p>
        <div className="space-y-4">
          <h3 className="type-h3 text-white">Experience</h3>
          <ul className="space-y-2">
            <li>Articog, Co-Founder, Mar 2025 – Present</li>
            <li>Govada Creations, Vice President, Oct 2022 – Present</li>
            <li>Govada Creations, Social Media Director, Mar 2020 – Present</li>
            <li>Govada Creations, Activities Coordinator, Feb 2014 – Present</li>
            <li>Govada Creations, Intern, 2013 – 2014</li>
            <li>Clinical Observer, Chelsea and Westminster Hospital NHS Foundation Trust, Jun 2025 – Jul 2025</li>
            <li>Duty Medical Officer, Sri Sai Balaji Hospital, Nov 2022 – Mar 2023</li>
            <li>Clinical Observer, Mid and South Essex NHS Foundation Trust, Jun 2025 – Jul 2025</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="type-h3 text-white">Education</h3>
          <p>
            Kamineni Academy of Medical Sciences and Research Centre
            <br />
            Bachelor of Medicine, Bachelor of Surgery (MBBS), 2016 – 2022
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="type-h3 text-white">Skills</h3>
          <p>Video Production • Analytic Problem Solving</p>
        </div>
        <LinkedInLink href="https://www.linkedin.com/in/dr-harika-govada/" label="Dr. Harika Govada" />
      </div>
    </article>
  );
}

function LinkedInLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${label} on LinkedIn`}
      className="inline-flex text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      LinkedIn
    </a>
  );
}