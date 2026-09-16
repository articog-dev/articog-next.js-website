import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://articog.com/services/audio" },
  title: "Audio & Sound Production | Articog",
  description: "Audio and sound production for video campaigns, ads, and brand storytelling, including voice, music, and finishing.",
};
import { Container, Section, Heading, Button } from "@/components/ui";
import { Link } from "@/components/ui/Link";
import { Mic2, Music, Waves, Speaker, Info, ArrowRight, AudioLines } from "lucide-react";
import { ServiceDetails } from "@/components/sections/ServiceDetails";

export default function AudioPage() {
  const deliverables = [
    {
      title: "Voiceover",
      desc: "Professional vocal performances matched to your brand tone, available in multiple languages.",
      icon: Mic2,
    },
    {
      title: "Music",
      desc: "Custom scores and licensed tracks curated to enhance the emotional impact of your creative.",
      icon: Music,
    },
    {
      title: "Sound Design",
      desc: "Atmospheric textures, foley, and interface sounds that bring your visuals to life.",
      icon: Waves,
    },
    {
      title: "Mix & Master",
      desc: "Technical finishing to ensure your audio sounds perfect across all playback devices and platforms.",
      icon: Speaker,
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
              Audio & Sound
            </Heading>
          </div>
        </Container>
      </Section>

      <Section className="py-20 bg-white/[0.02]">
        <Container>
          <div>
            <h2 className="type-h2 mb-4 text-white">What We Deliver</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map((item) => (
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

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <Mic2 className="w-6 h-6" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              <h3 className="type-h2 text-white mb-2">AI Voiceover</h3>
              <p className="type-small text-white/50 leading-relaxed">
                Hyper-realistic synthetic voice production for localization and rapid iteration.
              </p>
            </div>

            <div className="group p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <AudioLines className="w-6 h-6" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              <h3 className="type-h2 text-white mb-2">Music & Sound Design</h3>
              <p className="type-small text-white/50 leading-relaxed">
                Custom scoring and immersive soundscapes for cinematic impact.
              </p>
            </div>
          </div>

          <div className="mt-12 p-6 rounded-xl border border-white/10 flex items-start gap-4 max-w-2xl">
            <Info className="w-5 h-5 text-white/40 mt-0.5 flex-shrink-0" />
            <p className="type-small text-white/50 italic leading-relaxed">
              Note: All synthetic voice use requires proper consent and rights clearance. Licensing terms and usage rights are confirmed per project as part of scope.
            </p>
          </div>
        </Container>
      </Section>

      <ServiceDetails category="audio" />

      <Section className="py-24">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="type-h2 mb-8 text-white">Elevate your project's sound</h2>
            <Link href="/book-a-demo">
              <Button size="lg" className="rounded-full px-8 h-14 text-lg">
                Add Audio Production
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
