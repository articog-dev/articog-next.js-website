"use client";

import { useRef, useEffect, type ReactNode } from "react";

export function ScrollReveal({
  children,
  delay = 0,
  yOffset = 40,
}: {
  children: ReactNode;
  delay?: number;
  yOffset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reveal = () => el.setAttribute("data-reveal", "in");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delayMs = Math.min(Math.max(delay * 1000, 0), 500);
    el.style.setProperty("--reveal-delay", `${delayMs}ms`);

    if (reducedMotion || !window.IntersectionObserver || el.getBoundingClientRect().top <= window.innerHeight) {
      reveal();
      return () => {
        el.removeAttribute("data-reveal");
        el.style.removeProperty("--reveal-delay");
      };
    }

    el.setAttribute("data-reveal", "pending");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
        reveal();
        observer.disconnect();
      }
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    observer.observe(el);

    return () => {
      observer.disconnect();
      el.removeAttribute("data-reveal");
      el.style.removeProperty("--reveal-delay");
    };
  }, [delay, yOffset]);

  return <div ref={ref} data-reveal-block>{children}</div>;
}
