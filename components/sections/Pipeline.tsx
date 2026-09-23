"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Container, Section, Heading } from "@/components/ui";
import { ScrollReveal } from "@/components/animations";
import type { PipelineStep } from "@/types";
import { useBufferedAutoplay } from "@/hooks/use-buffered-autoplay";

interface PipelineProps {
  steps: PipelineStep[];
  align?: "left" | "center";
}

export function Pipeline({ steps, align = "left" }: PipelineProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useBufferedAutoplay(videoRef, {
    enabled: shouldLoad,
    waitForBuffer: false,
  });

  return (
    <Section id="pipeline" className="relative overflow-hidden" style={{ padding: 0 }}>
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-black">
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          controls={false}
          preload={shouldLoad ? "auto" : "none"}
          poster="/pipeline-poster.jpg"
          src={shouldLoad ? "/videos/pipeline.mp4" : undefined}
          className="h-full w-full object-cover"
          aria-hidden="true"
        />

        {/* Subtle base overlay */}
        <div className="absolute inset-0 z-10 bg-black/6" />
      </div>

      <Container className="relative z-20 py-16 md:py-24">
        {/* Header */}
        <ScrollReveal>
          <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-lg"}>
            <Heading
              as="h2"
              size="section"
              className="mb-0"
              style={{
                textShadow: "0 2px 8px rgba(0,0,0,0.9)",
              }}
            >
              From brief to live.
            </Heading>
          </div>
        </ScrollReveal>

        {/* Steps */}
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-white/[0.12] bg-transparent backdrop-blur-[2px] sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="group relative flex cursor-default flex-col items-center justify-center gap-4 border-b p-7 text-center transition-colors duration-200 last:border-b-0 hover:bg-white/[0.04] sm:border-b-0 sm:border-r sm:last:border-r-0 lg:border-r lg:last:border-r-0"
            >
              <ScrollReveal delay={index * 0.1}>
                <div className="flex flex-col items-center justify-center gap-4">
                  <div
                    className="absolute left-0 right-0 top-0 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                    style={{ background: "#ffffff" }}
                  />
                  <div className="absolute bottom-[-1.5rem] left-[2.15rem] top-14 w-px bg-white/[0.18] last:hidden sm:hidden" aria-hidden="true" />
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full font-display text-sm font-bold"
                    style={{
                      border: "1px solid rgba(255,255,255,0.20)",
                      color: "rgba(255,255,255,0.95)",
                      textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                    }}
                  >
                    {step.step}
                  </div>
                  <Heading
                    as="h3"
                    size="card"
                    className="text-base font-bold text-white"
                    style={{
                      textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                    }}
                  >
                    {step.title}
                  </Heading>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
