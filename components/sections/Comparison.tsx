import { Container, Section } from "@/components/ui";
import { ScrollReveal } from "@/components/animations";
import { Check, X } from "lucide-react";
import type { ComparisonRow } from "@/types";

interface ComparisonProps {
  rows: ComparisonRow[];
  size?: "md" | "lg";
}

export function Comparison({ rows, size = "lg" }: ComparisonProps) {
  return (
    <Section id="why-articog" size={size} className="relative overflow-hidden border-t border-white/[0.08] pt-[var(--spacing-section-sm)]">
      <Container className="relative z-10">
        <ScrollReveal>
          <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
          <div className="hidden overflow-x-auto sm:block">
            <div>
              <div className="grid grid-cols-[1.1fr_1.2fr_1.2fr] border-b border-white/[0.08]">
                <div aria-label="Comparison categories" className="p-5" />
                <div className="p-5"><p className="type-h4 text-white/55">The old way</p></div>
                <div className="border-x border-white/20 bg-white/[0.06] p-5"><p className="type-h4 text-white">Articog</p></div>
              </div>

              {/* Rows */}
              {rows.map((row, i) => (
                <div
                  key={row.attribute}
                  className={`grid grid-cols-[1.1fr_1.2fr_1.2fr] ${i < rows.length - 1 ? "border-b border-white/[0.08]" : ""}`}
                >
                  <div className="flex items-center p-5">
                    <p className="type-small font-medium text-white/70">{row.attribute}</p>
                  </div>
                  <div className="flex flex-col justify-center gap-2 p-5">
                    <p className="type-small text-white/60"><span className="mr-2 inline-block h-1 w-1 rounded-full bg-white/60 align-middle" />{row.agency}</p>
                    <p className="type-small text-white/60"><span className="mr-2 inline-block h-1 w-1 rounded-full bg-white/60 align-middle" />{row.inhouse}</p>
                  </div>
                  <div className="flex items-center gap-2 border-x border-white/20 bg-white/[0.06] p-5">
                    <Check size={14} className="shrink-0 text-white" />
                    <p className="type-small text-white">{row.articog}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sm:hidden">
            {rows.map((row) => (
              <div key={row.attribute} className="border-b border-white/[0.08] p-6 last:border-b-0 sm:hidden">
                <p className="type-h4 mb-5 text-white">{row.attribute}</p>

                <div className="mb-4 flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/20">
                    <X size={11} className="text-white/55" />
                  </div>
                  <div>
                    <p className="type-small mb-1 uppercase tracking-wide text-white/55">The Old Way</p>
                    <p className="type-body text-white/60">{row.agency}<br />{row.inhouse}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white">
                    <Check size={11} className="text-black" />
                  </div>
                  <div>
                    <p className="type-small mb-1 uppercase tracking-wide text-white">Articog</p>
                    <p className="type-body font-semibold text-white">{row.articog}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </ScrollReveal>

        <p className="mt-5 text-center font-sans text-xs text-white/55">
          Engagement fit depends on scope, formats, and delivery requirements.
        </p>
      </Container>
    </Section>
  );
}
