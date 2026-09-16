import { Container, Section, Heading } from "@/components/ui";
import type { Capability } from "@/types";

interface CapabilitiesProps {
  capabilities: Capability[];
}

export function Capabilities({ capabilities }: CapabilitiesProps) {
  return (
    <Section id="capabilities" className="relative overflow-hidden bg-[#0a0a0a] py-20 md:py-28">
      <Container className="relative z-20">
        <div className="mb-12 max-w-2xl md:mb-16">
          <Heading as="h2" size="section" className="mb-0 text-white">Every creative format,<br />delivered.</Heading>
        </div>

        <div className="border-t border-white/[0.14]">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="group grid gap-3 border-b border-white/[0.14] py-7 transition-colors duration-200 hover:border-white/30 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] md:items-start md:gap-10 md:py-9 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16"
            >
              <h3 className="type-h3 text-white transition-transform duration-200 group-hover:translate-x-1">
                {cap.title}
              </h3>
              <p className="type-body max-w-2xl leading-relaxed text-white/60">
                {cap.useCase}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
