"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Container, Section, Heading } from "@/components/ui";
import { useBufferedAutoplay } from "@/hooks/use-buffered-autoplay";

const approachItems = [
  {
    title: "AI-native production",
    description:
      "Less shooting, less production time and lower production budget where suitable.",
  },
  {
    title: "AI-Native Production",
    description:
      "Our production workflow uses generative tools to develop characters, environments, product shots, motion, and creative variations under human creative direction.",
  },
  {
    title: "Production Ready Finish",
    description:
      "Creative directors and editors refine deliverables through compositing, editing, sound, quality control, and platform-specific finishing before delivery.",
  },
];

export function OurApproach() {
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

  useBufferedAutoplay(videoRef, { enabled: shouldLoad });

  return (
    <Section size="md" className="border-t border-white/[0.05]">
      <Container>
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Heading as="h2" size="section" className="mb-6">
            Brand storytelling
          </Heading>
          <p
            className="type-body md:text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            AI speeds up production; people protect the brand, story and final quality.
          </p>
        </div>

      </Container>

      {/* Edge-to-edge video: full width, no rounded corners, no border */}
      <div className="relative mb-16 h-[70vh] w-full overflow-hidden bg-black sm:h-[min(100svh,56.25vw)]">
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
          preload={shouldLoad ? "auto" : "none"}
          src={shouldLoad ? "https://media.articog.com/videos/backgrounds/Web%202.mp4" : undefined}
          className="absolute inset-0 h-full w-full object-cover object-center"
          aria-hidden="true"
        />
      </div>

      <Container>
        <div className="grid gap-10 md:grid-cols-3">
          {approachItems.map((item) => (
            <div key={item.title} className="space-y-4 rounded-xl border border-white/[0.05] p-6">
              <Heading as="h3" size="card" className="text-white">
                {item.title}
              </Heading>
              <p className="type-small leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}