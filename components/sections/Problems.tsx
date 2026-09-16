import { Container, Section, Heading } from "@/components/ui";
import type { Problem } from "@/types";

interface ProblemsProps {
  problems: Problem[];
}

export function Problems({ problems }: ProblemsProps) {
  return (
    <Section id="problems" style={{ background: 'linear-gradient(to bottom, #000000 0%, #0a0a0a 100%)' }}>
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">

          {/* Left label */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-3">
              <Heading as="p" size="label">The Problem</Heading>
              <Heading as="p" size="section">
                Why creative production is broken
              </Heading>
            </div>
          </div>

          {/* Problems list */}
          <div className="lg:col-span-8 divide-y divide-white/[0.04] lg:divide-white/[0.07]">
            {problems.map((p) => (
              <article key={p.number} className="flex gap-6 py-6">
                <span
                  className="font-display text-xs font-semibold shrink-0 pt-1 w-7 tabular-nums"
                  style={{ color: "rgba(255,255,255,0.50)" }}
                >
                  {p.number}
                </span>
                <div className="space-y-1.5">
                  <h3 className="type-h4 text-white">
                    {p.title}
                  </h3>
                  <p
                    className="type-small leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.50)" }}
                  >
                    {p.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
