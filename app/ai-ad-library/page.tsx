"use client";

import { Container, Section, Heading, PageHero } from "@/components/ui";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { useState } from "react";
import { YouTubeEmbed } from "@/components/blog/YouTubeEmbed";

export default function AdLibraryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const categories = ["All", "Video", "Static", "Audio"];
  const examples = [
    {
      title: "DTC Launch Creative",
      type: "Concept Piece",
      category: "Video",
      industry: "DTC & E-commerce",
    },
    {
      title: "Beauty Campaign Concept",
      type: "Concept Piece",
      category: "Static",
      industry: "Beauty & Skincare",
    },
    {
      title: "SaaS Product Story",
      type: "Concept Piece",
      category: "Video",
      industry: "SaaS & Technology",
    },
    {
      title: "Consumer Electronics Spot",
      type: "Concept Piece",
      category: "Audio",
      industry: "Consumer Electronics",
    },
    {
      title: "Real Estate Visual Set",
      type: "Concept Piece",
      category: "Static",
      industry: "Real Estate",
    },
    {
      title: "Performance Social Series",
      type: "Concept Piece",
      category: "Video",
      industry: "DTC & E-commerce",
    }
  ];

  const visibleExamples = activeCategory === "All"
    ? examples
    : examples.filter((example) => example.category === activeCategory);

  return (
    <div className="bg-black min-h-screen">
      <PageHero
        title="AI Ad Library"
        subtitle="A curated collection of AI-native creative examples across industries and formats."
      />
      <Section>
        <Container>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 py-6 border-y border-white/[0.08]">
            <div className="flex flex-wrap items-center gap-3" role="group" aria-label="Filter ad library by category">
              <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-muted-safe mr-2">Category:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full font-sans text-[11px] font-medium transition-all duration-200 border ${
                    activeCategory === cat 
                      ? "bg-white text-black border-white" 
                      : "bg-white/[0.03] text-white/50 border-white/10 hover:text-white hover:border-white/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>

          <div className="mb-16 grid gap-6 md:grid-cols-2">
            <YouTubeEmbed
              videoId="l5pReVGFVqs"
              title="These Actors Don’t Exist. This Entire Ad Was Made With AI | Articog"
            />
            <YouTubeEmbed
              url="https://www.youtube.com/watch?v=_0z-6bfJ0zI"
              title="Articog creative video showcase"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-20">
            {visibleExamples.map((item, index) => (
              <div 
                key={index}
                className="group relative rounded-2xl border border-white/[0.08] p-6"
              >
                <div className="mb-12 flex gap-2">
                  <span className={`text-[11px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                    item.type === 'Client Work' 
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                      : 'bg-white/10 text-white border-white/20'
                  }`}>
                    {item.type}
                  </span>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-[11px] font-sans font-bold uppercase tracking-[0.1em] text-muted-safe bg-white/[0.05] px-1.5 py-0.5 rounded">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-sans font-bold uppercase tracking-[0.1em] text-muted-safe bg-white/[0.05] px-1.5 py-0.5 rounded">
                      {item.industry}
                    </span>
                  </div>
                  <Heading as="h3" size="card" className="text-base font-medium text-white transition-colors group-hover:text-white/80">
                    {item.title}
                  </Heading>
                </div>

              </div>
            ))}
          </div>

          <div className="border border-white/[0.08] rounded-2xl p-6 mb-24 flex items-center justify-center gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <p className="font-sans text-[11px] text-muted-safe uppercase tracking-widest">
              All displayed work is used with appropriate permissions and authorization.
            </p>
          </div>

          <FinalCTA content={{ ctaHref: "/book-a-demo", ctaLabel: "Book a Demo" }} />
        </Container>
      </Section>
    </div>
  );
}
