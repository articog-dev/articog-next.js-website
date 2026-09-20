"use client";

import { useEffect, useRef, useState } from "react";

type LazyVideoSource = {
  src: string;
  type: string;
  media?: string;
};

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  sources?: LazyVideoSource[];
}

export function LazyVideo({ sources, src, preload = "none", ...props }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
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

    const playVideo = () => {
      void video.play().catch(() => undefined);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") playVideo();
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
    <video
      ref={videoRef}
      {...props}
      preload={shouldLoad ? "auto" : preload}
      src={shouldLoad ? src : undefined}
    >
      {shouldLoad
        ? sources?.map((source) => <source key={`${source.src}-${source.media ?? "default"}`} {...source} />)
        : null}
    </video>
  );
}