import { Check } from "lucide-react";
import { Container, Section } from "@/components/ui";
import type { ComparisonRow } from "@/types";

interface ComparisonProps {
  rows: ComparisonRow[];
}

const columns = [
  { key: "agency", label: "Traditional Agency", highlight: false },
  { key: "inhouse", label: "In-house Team", highlight: false },
  { key: "articog", label: "Articog", highlight: true },
] as const;

export function Comparison({ rows }: ComparisonProps) {
  return (
    <Section id="why-articog" size="lg" className="relative overflow-hidden" style={{ background: "#000000" }}>
      {/* Background Video removed as requested */}


      <Container className="relative z-10">
        {/* Heading removed from comparison section to avoid duplication with hero */}


        <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
          <div className="overflow-x-auto">
            <div style={{ minWidth: "600px" }}>
              {/* Column headers */}
              <div className="grid grid-cols-4 border-b border-white/[0.08]">
                <div className="p-5" />
                {columns.map((col) => (
                  <div
                    key={col.key}
                    className={`p-5 text-center border-l ${
                      col.highlight
                        ? "border-white/20 bg-white/[0.06]"
                        : "border-white/[0.08]"
                    }`}
                  >
                    <p
                      className={`type-h4 ${
                        col.highlight ? "text-white" : "text-white/40"
                      }`}
                    >
                      {col.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Rows */}
              {rows.map((row, i) => (
                <div
                  key={row.attribute}
                  className={`grid grid-cols-4 ${i < rows.length - 1 ? "border-b border-white/[0.08]" : ""}`}
                >
                  <div className="flex items-center p-5">
                    <p className="type-small text-white/55">{row.attribute}</p>
                  </div>
                  <div className="flex items-center justify-center p-5 border-l border-white/[0.08]">
                    <p className="type-small text-center text-white/38">{row.agency}</p>
                  </div>
                  <div className="flex items-center justify-center p-5 border-l border-white/[0.08]">
                    <p className="type-small text-center text-white/38">{row.inhouse}</p>
                  </div>
                  <div className="flex items-center justify-center gap-2 p-5 border-l border-white/20 bg-white/[0.04]">
                    <Check size={12} strokeWidth={2.5} className="text-white shrink-0" />
                    <p className="type-small text-white text-center">{row.articog}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-5 text-center font-sans text-xs text-muted-safe">
          Engagement fit depends on scope, formats, and delivery requirements.
        </p>
      </Container>
    </Section>
  );
}
