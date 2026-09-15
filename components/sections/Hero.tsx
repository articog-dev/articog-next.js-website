"use client";

import type { HeroContent, ProofStat } from "@/types";
import { ArrowRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";

interface HeroProps {
  content: HeroContent;
  stats: ProofStat[];
}

export function Hero({ content }: HeroProps) {
  const lines = content.headline.split("\n");
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      video.pause();
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.autoplay = true;
    video.setAttribute("muted", "");

    const playVideo = () => {
      if (video.paused && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        void video.play().catch(() => undefined);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        playVideo();
      }
    };

    playVideo();
    video.addEventListener("canplay", playVideo, { once: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      video.removeEventListener("canplay", playVideo);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <section
      className="relative flex min-h-svh flex-col overflow-hidden"
      style={{
        background: "#000000",
      }}
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={(video) => {
            videoRef.current = video;
            if (video) {
              video.defaultMuted = true;
              video.muted = true;
            }
          }}
          autoPlay
          muted
          playsInline
          loop
          controls={false}
          preload="auto"
          src="https://res.cloudinary.com/hmy5ctzy/video/upload/f_mp4,vc_h264,q_auto:good,w_1280,dpr_auto,c_limit/v1786961383/Web_3.mp4"
          poster="https://res.cloudinary.com/hmy5ctzy/video/upload/q_auto:good,f_auto,w_1280,so_0/v1786961383/Web_3.jpg"
          className="h-full w-full object-cover"
          aria-hidden="true"
        />

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
          backgroundImage:
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
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <p className="mb-6 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40 sm:mb-8 sm:text-xs">
            {content.eyebrow}
          </p>

          {/* Headline */}
          <h1 className="hero-heading type-h1 text-white">
            {lines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mx-auto mt-6 max-w-[46rem] text-base leading-relaxed text-white/70 sm:text-lg">
            {content.body}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={content.ctaHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {content.ctaLabel}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            {content.secondaryCtaHref && content.secondaryCtaLabel ? (
              <a
                href={content.secondaryCtaHref}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {content.secondaryCtaLabel}
              </a>
            ) : null}
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            Human-directed. AI-native.
          </p>
        </div>
      </div>
    </section>
  );
}