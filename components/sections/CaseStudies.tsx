"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Container, Section, Heading } from "@/components/ui";
import type { CaseStudy } from "@/types";

interface CaseStudiesProps {
  caseStudies: CaseStudy[];
}

export function CaseStudies({ caseStudies }: CaseStudiesProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "400px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

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
  }, [shouldLoad]);

  return (
    <Section className="relative overflow-hidden">
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
              ? "https://res.cloudinary.com/hmy5ctzy/video/upload/f_mp4,vc_h264,q_auto:good,w_1600,dpr_auto,c_limit/v1786974706/Web_2.mp4"
              : undefined
          }
          poster="https://res.cloudinary.com/hmy5ctzy/video/upload/q_auto:good,f_auto,w_1600,so_0/v1786974706/Web_2.jpg"
          className="h-full w-full object-cover"
          aria-hidden="true"
        />

        {/* Dark Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.16)",
          }}
        />
      </div>

      <Container className="relative z-20">
        <div className="mb-16 max-w-lg">
          <Heading as="p" size="label" className="mb-4">
            Proof
          </Heading>

          <Heading as="h2" size="section" className="mb-0">
            Selected production examples.
          </Heading>
        </div>

        {caseStudies.length === 0 ? (
          <div className="max-w-2xl rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8">
            <h3 className="type-h3 mb-3 text-white">Selected work is being prepared for publication.</h3>
            <p className="type-body text-white/60">
              Approved client stories will include the brief, deliverables, channels, production window, and outcome.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs) => (
            <article
              key={cs.client}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] transition-colors duration-200 hover:border-white/[0.14]"
            >
              {/* Metric */}
              <div className="order-2 border-b border-white/[0.08] px-6 pb-5 pt-6 md:order-1">
                <p
                  className="font-display font-semibold text-white"
                  style={{
                    fontSize: "2.8rem",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {cs.metric}
                </p>

                <p className="mt-1 font-sans text-[11px] uppercase tracking-wider text-muted-safe">
                  {cs.metricLabel}
                </p>
              </div>

              {/* Body */}
              <div className="order-1 flex flex-1 flex-col gap-5 p-6 md:order-2">
                <div className="flex-1">
                  <h3 className="type-h3 text-white">
                    {cs.outcome}
                  </h3>
                </div>

                <div className="flex items-end justify-between border-t border-white/[0.08] pt-4">
                  <div>
                    <p className="type-h4 text-white/75">
                      {cs.client}
                    </p>

                    <p className="font-sans text-[11px] text-muted-safe">
                      {cs.industry}
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-end gap-1.5">
                    {cs.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.08] px-2 py-0.5 font-sans text-[11px] text-muted-safe"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}