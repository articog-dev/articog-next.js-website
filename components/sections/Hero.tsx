"use client";

import Image from "next/image";
import type { HeroContent } from "@/types";
import { useLayoutEffect, useRef, useState } from "react";
import { Heading } from "@/components/ui";
import { useBufferedAutoplay } from "@/hooks/use-buffered-autoplay";

interface HeroProps {
  content: HeroContent;
}

export function Hero({ content }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);
    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  useBufferedAutoplay(videoRef, {
    enabled: isMobile === false,
    keepPlaying: true,
    waitForBuffer: false,
  });

  return (
    <section
      className="relative flex min-h-svh flex-col overflow-hidden"
      style={{
        background: "#000000",
      }}
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-black">
        {isMobile === false ? (
          <video
            ref={(video) => {
              videoRef.current = video;
              if (video) {
                video.defaultMuted = true;
                video.muted = true;
              }
            }}
            muted
            playsInline
            loop
            controls={false}
            preload="auto"
            poster="/hero-poster.jpg"
            src="/videos/hero.mp4"
            className="absolute inset-0 h-full w-full object-cover object-center"
            aria-hidden="true"
          />
        ) : (
          <Image
            src="/hero-poster.jpg"
            alt=""
            fill
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover object-center"
            aria-hidden="true"
          />
        )}

        {/* Light vignette for text readability without washing out the video */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.18) 100%)",
            backgroundColor: "transparent",
          }}
        />
      </div>

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 z-1"
        style={{
          background:
            "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4">
        <div className="mx-auto max-w-5xl text-center">
          <p className="type-small mb-4 tracking-[0.2em] text-white/55 uppercase">
            {content.eyebrow}
          </p>
          {/* Headline */}
          <Heading as="h1" size="hero" className="hero-heading text-white">
            {content.headline.split("\n").map((line, i, lines) => (
              <span key={i} className="block">
                {line}{i < lines.length - 1 ? " " : ""}
              </span>
            ))}
          </Heading>

        </div>
      </div>
    </section>
  );
}