import { Container, Section, Heading } from "@/components/ui";
import type { Capability } from "@/types";
import Link from "next/link";

interface CapabilitiesProps {
  capabilities: Capability[];
}

export function Capabilities({ capabilities }: CapabilitiesProps) {
  return (
    <Section id="capabilities" className="relative overflow-hidden bg-[#000000] py-20 md:py-28">
      <Container className="relative z-20">
        <div className="mb-12 max-w-2xl md:mb-16">
          <Heading as="h2" size="section" className="mb-0 text-white">Every creative format,<br />delivered.</Heading>
        </div>

        <div className="border-t border-white/[0.14]">
          {capabilities.map((cap, index) => (
            <Link
              key={cap.title}
              href={cap.href}
              className="group grid grid-gap-card border-b border-white/[0.14] py-7 transition-colors duration-200 hover:border-white/30 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] md:items-start md:grid-gap-section md:py-9 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"
            >
              <div className="flex min-w-0 items-center gap-3 md:gap-5">
                <span className="w-7 shrink-0 font-sans text-xs tabular-nums text-white/35 md:w-9 md:text-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span aria-hidden="true" className="h-5 w-px bg-white/15" />
                <Heading as="h3" size="card" className="min-w-0 text-white transition-transform duration-200 group-hover:translate-x-1">
                  {cap.title}
                </Heading>
              </div>
              <span aria-hidden="true" className="justify-self-end text-lg text-white/40 transition-transform duration-200 group-hover:translate-x-1 md:self-center">
                →
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
