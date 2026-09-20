"use client";

import type { HeroContent } from "@/types";
import { useLayoutEffect, useRef } from "react";
import { Heading } from "@/components/ui";

interface HeroProps {
  content: HeroContent;
}

export function Hero({ content }: HeroProps) {
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
      if (video.paused && video.readyState >= HTMLMediaElement.HAVE_METADATA) {
        void video.play().catch(() => {
          if (document.visibilityState === "visible") {
            window.setTimeout(() => {
              if (video.paused && document.visibilityState === "visible") {
                void video.play().catch(() => undefined);
              }
            }, 250);
          }
        });
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        playVideo();
      }
    };

    playVideo();
    video.addEventListener("loadedmetadata", playVideo);
    video.addEventListener("loadeddata", playVideo);
    video.addEventListener("canplay", playVideo);
    video.addEventListener("pause", playVideo);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      video.removeEventListener("loadedmetadata", playVideo);
      video.removeEventListener("loadeddata", playVideo);
      video.removeEventListener("canplay", playVideo);
      video.removeEventListener("pause", playVideo);
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
          preload="metadata"
          poster="https://media.articog.com/images/home/hf_20260820_232841_55351427-e470-43bc-b674-3abedc6b19a7.png"
          className="h-full w-full object-contain"
          aria-hidden="true"
        >
          <source
            src="https://media.articog.com/videos/backgrounds/Web%203.mp4"
            type="video/mp4"
          />
        </video>

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