"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Container, Section, Heading } from "@/components/ui";
import type { CaseStudy } from "@/types";

const approachItems = [
  "01 — Human-Directed",
  "02 — AI-Native",
  "03 — Campaign-Ready",
];

export function CaseStudies({}: { caseStudies: CaseStudy[] }) {
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
      { rootMargin: "400px" },
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
    <Section
      id="approach"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      aria-labelledby="approach-heading"
    >
      <div className="absolute inset-0 z-0 h-full w-full">
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
          className="h-full w-full object-cover object-center"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 z-10"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.16)" }}
        />
      </div>

      <Container className="relative z-20">
        <Heading id="approach-heading" as="h2" size="section" className="mb-16">
          Our Approach
        </Heading>

        <ul className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {approachItems.map((item) => (
            <li key={item}>
              <h3 className="font-display text-lg font-medium text-white md:text-xl">
                {item}
              </h3>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}