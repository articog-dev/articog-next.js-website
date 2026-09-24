"use client";

import { useEffect, useState } from "react";

const clamp = (value: number) => Math.min(Math.max(value, 0), 100);

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateReducedMotion = () => {
      setReducedMotion(mediaQuery.matches);
    };

    const updateState = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;

      setProgress(clamp(nextProgress));
      setIsVisible(maxScroll > 24);
    };

    updateState();
    updateReducedMotion();

    let frameId: number | null = null;
    const handleScroll = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        updateState();
        frameId = null;
      });
    };

    const handleResize = () => {
      updateState();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateReducedMotion);
    } else {
      mediaQuery.addListener(updateReducedMotion);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", updateReducedMotion);
      } else {
        mediaQuery.removeListener(updateReducedMotion);
      }

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  if (!isVisible || reducedMotion) {
    return null;
  }

  return (
    <div
      aria-label="Scroll progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      className="fixed inset-x-0 top-0 z-[1001] h-0.5 w-full overflow-hidden"
    >
      <div
        className="h-full origin-left scale-x-0"
        style={{
          backgroundColor: "var(--brand-accent, #ffffff)",
          transform: `scaleX(${progress / 100})`,
          transition: reducedMotion ? "none" : "transform 120ms linear",
          transformOrigin: "left center",
        }}
      />
    </div>
  );
}
