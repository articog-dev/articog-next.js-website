"use client";

import { Container, Section, Heading } from "@/components/ui";
import type { PipelineStep } from "@/types";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface PipelineProps {
  steps: PipelineStep[];
}

export function Pipeline({ steps }: PipelineProps) {
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
      { rootMargin: "200px" },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

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
  }, [shouldLoad]);

  return (
    <Section id="pipeline" className="relative overflow-hidden p-0">
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
          preload={shouldLoad ? "auto" : "none"}
          src={
            shouldLoad
              ? "https://res.cloudinary.com/hmy5ctzy/video/upload/f_mp4,vc_h264,q_auto:eco,w_1920/v1786976270/web_1_1_1_1.mp4"
              : undefined
          }
          poster="https://res.cloudinary.com/hmy5ctzy/video/upload/q_auto:eco,f_auto,w_1920,so_0/v1786976270/web_1_1_1_1.jpg"
          className="h-full w-full object-cover"
          aria-hidden="true"
        />

        {/* Subtle base overlay */}
        <div className="absolute inset-0 z-10 bg-black/6" />
      </div>

      <Container className="relative z-20 py-16 md:py-24">
        {/* Header */}
        <div className="mb-16 max-w-lg">
          <Heading
            as="p"
            size="label"
            className="mb-4"
            style={{
              textShadow: "0 2px 8px rgba(0,0,0,0.9)",
            }}
          >
            How It Works
          </Heading>

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

        {/* Steps */}
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-white/[0.12] bg-transparent backdrop-blur-[2px] sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.step}
              className="group relative flex cursor-default flex-col gap-5 border-b p-7 transition-colors duration-200 last:border-b-0 hover:bg-white/[0.04] sm:border-b-0 sm:border-r sm:last:border-r-0 lg:border-r lg:last:border-r-0"
            >
              {/* Hover accent top line */}
              <div
                className="absolute left-0 right-0 top-0 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                style={{ background: "#ffffff" }}
              />

              {/* Number + tag */}
              <div className="flex items-center justify-between">
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

                {step.tag && (
                  <span
                    className="font-sans text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      color: "rgba(255,255,255,0.85)",
                      textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                    }}
                  >
                    {step.tag}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <h3
                  className="font-display text-base font-bold text-white"
                  style={{
                    textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                  }}
                >
                  {step.title}
                </h3>

                <p
                  className="type-small leading-relaxed"
                  style={{
                    color: "#FFFFFF",
                    textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}