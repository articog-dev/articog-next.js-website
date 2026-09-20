import { useEffect, type RefObject } from "react";

/**
 * If the browser has not decided it can play through within this time, start
 * anyway so the visitor is never left looking at a still poster forever.
 */
const FALLBACK_START_MS = 10_000;

interface Options {
  /** Set to false until the video has a `src` (e.g. lazy-loaded videos). */
  enabled?: boolean;
  /** Restart playback if the browser pauses the video while the tab is visible. */
  keepPlaying?: boolean;
  /** false = start playing right away instead of waiting for canplaythrough. */
  waitForBuffer?: boolean;
}

/**
 * Autoplay for muted, looping background videos without mid-play stalls.
 *
 * The video keeps showing its poster until the browser reports it has buffered
 * enough to play through (`canplaythrough`), then starts. Because the video
 * loops, it then keeps playing from the buffer. Respects reduced motion.
 *
 * Do not put the `autoPlay` attribute on the <video>: it would start playback
 * immediately and bring the stalling back.
 */
export function useBufferedAutoplay(
  videoRef: RefObject<HTMLVideoElement | null>,
  { enabled = true, keepPlaying = false, waitForBuffer = true }: Options = {},
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !enabled) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");

    let started = false;
    let fallbackTimer: number | undefined;
    let retryTimer: number | undefined;
    let stallTimer: number | undefined;

    const play = (force = false) => {
      if (!force && !video.paused) return;
      void video.play().catch(() => {
        if (document.visibilityState !== "visible") return;
        retryTimer = window.setTimeout(() => {
          if (video.paused && document.visibilityState === "visible") {
            void video.play().catch(() => undefined);
          }
        }, 250);
      });
    };

    const start = () => {
      started = true;
      window.clearTimeout(fallbackTimer);
      play();
    };

    const handleVisibilityChange = () => {
      if (started && document.visibilityState === "visible") play();
    };

    const handlePause = () => {
      if (keepPlaying && started && document.visibilityState === "visible") play();
    };

    const handleStall = (event: Event) => {
      if (!started || document.visibilityState !== "visible") return;

      if (process.env.NODE_ENV !== "production") {
        console.warn(`[useBufferedAutoplay] video ${event.type}; attempting recovery`);
      }

      window.clearTimeout(stallTimer);
      stallTimer = window.setTimeout(() => {
        if (document.visibilityState !== "visible") return;
        video.load();
        play(true);
      }, 250);
    };

    if (!waitForBuffer || video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
      start();
    } else {
      video.addEventListener("canplaythrough", start, { once: true });
      fallbackTimer = window.setTimeout(start, FALLBACK_START_MS);
    }

    video.addEventListener("pause", handlePause);
    video.addEventListener("waiting", handleStall);
    video.addEventListener("stalled", handleStall);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(retryTimer);
      window.clearTimeout(stallTimer);
      video.removeEventListener("canplaythrough", start);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("waiting", handleStall);
      video.removeEventListener("stalled", handleStall);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [videoRef, enabled, keepPlaying, waitForBuffer]);
}