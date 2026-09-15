"use client";

import { BrainCircuit, Sparkle, Star, Waves } from "lucide-react";

export function AiSummary() {
  return (
    <section className="border-t border-white/[0.06] bg-[#080808] py-20 md:py-28" aria-labelledby="summarize-articog-title">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 id="summarize-articog-title" className="type-h2 text-white">Summarize Articog with AI</h2>
        <div className="mt-10 flex items-center justify-center gap-4 sm:gap-8" aria-label="AI tool concepts">
          <span title="AI assistant" aria-label="AI assistant"><BrainCircuit className="h-8 w-8 text-white/80" /></span>
          <span title="AI research tool" aria-label="AI research tool"><Waves className="h-8 w-8 text-cyan-300/80" /></span>
          <span title="AI reasoning tool" aria-label="AI reasoning tool"><Star className="h-8 w-8 text-white/80" /></span>
          <span title="AI creative tool" aria-label="AI creative tool"><Sparkle className="h-8 w-8 text-blue-300/80" /></span>
        </div>
        <div className="mx-auto mt-6 h-1 w-28 rounded-full bg-red-400/75" aria-hidden="true" />
      </div>
    </section>
  );
}