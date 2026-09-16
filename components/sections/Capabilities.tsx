import {
  AudioLines,
  BookOpen,
  Film,
  Image,
  Monitor,
  Smartphone,
  TestTube2,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Container, Section, Heading } from "@/components/ui";
import type { Capability } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  film: Film,
  "book-open": BookOpen,
  monitor: Monitor,
  image: Image,
  mic: AudioLines,
  "trending-up": Smartphone,
  zap: TestTube2,
  cpu: Workflow,
};

interface CapabilitiesProps {
  capabilities: Capability[];
}

export function Capabilities({ capabilities }: CapabilitiesProps) {
  return (
    <Section id="capabilities" className="relative overflow-hidden bg-[#0a0a0a] pb-24 pt-10 md:pt-20">
      <Container className="relative z-20">
        <div className="mb-8 max-w-lg md:mb-12">
          <Heading as="p" size="label" className="mb-4 uppercase tracking-[0.18em] text-white/45">Services</Heading>
          <Heading as="h2" size="section" className="mb-0 text-white">Every creative format,<br />delivered.</Heading>
        </div>

        <div className="overflow-hidden rounded-[18px] border border-white/[0.08] bg-black">
          {capabilities.map((cap) => {
            const Icon = iconMap[cap.icon] ?? Zap;
            return (
              <div
                key={cap.title}
                className="group grid grid-cols-1 border-b border-white/[0.08] last:border-b-0 transition-colors duration-200 hover:bg-white/[0.025] lg:grid-cols-12"
              >
                <div className="flex items-center gap-4 border-b border-white/[0.08] px-5 py-5 lg:col-span-3 lg:border-b-0 lg:border-r lg:p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] text-white/40 transition-colors duration-200 group-hover:text-white/70 lg:h-9 lg:w-9">
                    <Icon size={17} />
                  </div>
                  <h3 className="type-h3 text-white">
                    {cap.title}
                  </h3>
                </div>

                <div className="flex flex-col justify-center border-b border-white/[0.08] px-5 py-4 lg:col-span-4 lg:border-b-0 lg:border-r lg:p-6">
                  <p className="mb-1.5 hidden font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30 lg:block">
                    Use case
                  </p>
                  <p className="type-body leading-relaxed text-white/60">
                    {cap.useCase}
                  </p>
                </div>

                <div className="flex flex-col justify-center px-5 py-4 lg:col-span-5 lg:p-6">
                  <p className="mb-1.5 hidden font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70 lg:block">
                    Outcome
                  </p>
                  <p className="type-body leading-relaxed text-white/80">
                    {cap.outcome}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
