import { Container, Section } from "@/components/ui";
import type { ComparisonRow } from "@/types";

interface ComparisonProps {
  rows: ComparisonRow[];
}

export function Comparison({ rows }: ComparisonProps) {
  return (
    <Section id="why-articog" size="lg" className="relative overflow-hidden" style={{ background: "#000000" }}>
      {/* Background Video removed as requested */}


      <Container className="relative z-10">
        {/* Heading removed from comparison section to avoid duplication with hero */}


        <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
          <div className="hidden overflow-x-auto sm:block">
            <div>
              <div className="grid grid-cols-1 border-b border-white/[0.08] sm:grid-cols-2">
                <div className="p-5"><p className="type-h4 text-white/40">The old way</p></div>
                <div className="border-l border-white/20 bg-white/[0.06] p-5 text-center"><p className="type-h4 text-white">Articog</p></div>
              </div>

              {/* Rows */}
              {rows.map((row, i) => (
                <div
                  key={row.attribute}
                  className={`grid grid-cols-1 sm:grid-cols-2 ${i < rows.length - 1 ? "border-b border-white/[0.08]" : ""}`}
                >
                  <div className="flex items-center p-5">
                    <p className="type-small text-white/55">{row.attribute}</p>
                  </div>
                  <div className="flex items-center justify-center gap-2 border-l border-white/20 bg-white/[0.04] p-5">
                    <p className="type-small text-white text-center">{row.articog}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sm:hidden">
            {rows.map((row) => (
              <div key={row.attribute} className="border-b border-white/[0.08] p-5 last:border-b-0">
                <p className="type-h4 mb-4 text-white">{row.attribute}</p>
                <div className="flex items-center justify-between border-t border-white/[0.08] py-3">
                  <span className="type-small uppercase tracking-wide text-white/40">The Old Way</span>
                  <span className="type-small text-right text-white/60">{row.agency} / {row.inhouse}</span>
                </div>
                <div className="flex items-center justify-between border-t border-white/[0.08] py-3">
                  <span className="type-small uppercase tracking-wide text-white">Articog</span>
                  <span className="type-small text-right font-semibold text-white">{row.articog}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-5 text-center font-sans text-xs text-muted-safe">
          Engagement fit depends on scope, formats, and delivery requirements.
        </p>
      </Container>
    </Section>
  );
}
