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

export function LazyVideo({
  sources,
  src,
  preload = "metadata",
  onError,
  ...props
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasFailed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "180px 0px", threshold: 0.01 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [hasFailed]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad || hasFailed) return;

    const playVideo = () => {
      if (!video.paused) return;
      void video.play().catch(() => undefined);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void video.play().catch(() => undefined);
      }
    };

    if (video.readyState >= 2) {
      playVideo();
    }

    video.addEventListener("canplay", playVideo, { once: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      video.removeEventListener("canplay", playVideo);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [shouldLoad, hasFailed]);

  const handleError: React.ReactEventHandler<HTMLVideoElement> = (event) => {
    setHasFailed(true);
    onError?.(event);
  };

  return (
    <video
      ref={videoRef}
      {...props}
      preload={shouldLoad ? preload : "none"}
      src={shouldLoad && !hasFailed ? src : undefined}
      onError={handleError}
    >
      {shouldLoad && !hasFailed
        ? sources?.map((source) => <source key={`${source.src}-${source.media ?? "default"}`} {...source} />)
        : null}
    </video>
  );
}