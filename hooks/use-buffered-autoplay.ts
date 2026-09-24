import { useEffect, type RefObject } from "react";

const FALLBACK_START_MS = 3_000;
const STALL_RETRY_MS = 800;

interface Options {
  enabled?: boolean;
  keepPlaying?: boolean;
  waitForBuffer?: boolean;
}

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
    let playPromise: Promise<void> | null = null;
    let fallbackTimer: number | undefined;
    let stallTimer: number | undefined;

    const play = () => {
      if (!video.paused || playPromise) return;
      playPromise = video.play().catch(() => undefined).finally(() => {
        playPromise = null;
      });
    };

    const start = () => {
      started = true;
      window.clearTimeout(fallbackTimer);
      play();
    };

    const clearStallTimer = () => window.clearTimeout(stallTimer);

    const handleStall = () => {
      clearStallTimer();
      stallTimer = window.setTimeout(() => {
        if (document.visibilityState !== "visible") return;
        // Nudge playback forward slightly to break out of a stuck buffer.
        try {
          video.currentTime = video.currentTime;
        } catch {
          // ignore
        }
        play();
      }, STALL_RETRY_MS);
    };

    const handleVisibilityChange = () => {
      if (started && document.visibilityState === "visible") play();
    };

    const handlePause = () => {
      if (keepPlaying && started && document.visibilityState === "visible") play();
    };

    const handlePlaybackReady = () => play();

    if (!waitForBuffer || video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      start();
    } else {
      video.addEventListener("canplay", start, { once: true });
      fallbackTimer = window.setTimeout(start, FALLBACK_START_MS);
    }

      video.addEventListener("loadedmetadata", handlePlaybackReady);
      video.addEventListener("loadeddata", handlePlaybackReady);
      video.addEventListener("canplay", handlePlaybackReady);
    video.addEventListener("pause", handlePause);
    video.addEventListener("waiting", handleStall);
    video.addEventListener("stalled", handleStall);
    video.addEventListener("playing", clearStallTimer);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearTimeout(fallbackTimer);
      clearStallTimer();
      video.removeEventListener("canplay", start);
      video.removeEventListener("loadedmetadata", handlePlaybackReady);
      video.removeEventListener("loadeddata", handlePlaybackReady);
      video.removeEventListener("canplay", handlePlaybackReady);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("waiting", handleStall);
      video.removeEventListener("stalled", handleStall);
      video.removeEventListener("playing", clearStallTimer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [videoRef, enabled, keepPlaying, waitForBuffer]);
}