"use client";

import { Bookmark, BrainCircuit, Linkedin, Sparkle, Star, Waves, Youtube } from "lucide-react";

const socialLinks = [
  { label: "Bookmark this page", Icon: Bookmark, href: null },
  { label: "Articog on YouTube", Icon: Youtube, href: "https://www.youtube.com/@articogcom" },
  { label: "Articog on X", Icon: null, href: "https://x.com/articogcom" },
  { label: "Articog on LinkedIn", Icon: Linkedin, href: "https://www.linkedin.com/company/articog/" },
];

function XIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.963 6.817H1.684l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" /></svg>;
}

export function AiSummary() {
  const handleBookmark = () => {
    if (typeof window !== "undefined" && "print" in window) window.print();
  };

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
        <div className="mt-8 flex items-center justify-center gap-3 sm:gap-5">
          {socialLinks.map(({ label, Icon, href }) => href ? (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/75 transition hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {Icon ? <Icon className="h-5 w-5" aria-hidden="true" /> : <XIcon />}
            </a>
          ) : (
            <button
              key={label}
              type="button"
              aria-label={label}
              onClick={handleBookmark}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/75 transition hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Bookmark className="h-5 w-5" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}