"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";

const targetSelector = "h1, h2, h3, h4, p, blockquote, figcaption, dt, dd, li";
const excludedSelector = "header, nav, [role=dialog], [data-radix-popper-content-wrapper], form, video, picture, svg, iframe, canvas, [aria-hidden=true], [data-no-reveal], .motion-load, article, .prose, [data-reveal-block]";

function isEligible(element: Element) {
  if (element.closest(excludedSelector)) return false;
  const styles = getComputedStyle(element);
  if (styles.transform !== "none" || styles.position === "fixed" || styles.position === "sticky") return false;
  return true;
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isLongForm = pathname.startsWith("/legal/") || pathname.startsWith("/privacy") || pathname.startsWith("/terms") || pathname.startsWith("/blog/");
    if (prefersReducedMotion || isLongForm || !window.IntersectionObserver) return;

    const candidates = Array.from(document.querySelectorAll<HTMLElement>(`main ${targetSelector}, footer ${targetSelector}`))
      .filter(isEligible)
      .filter((element) => !Array.from(element.querySelectorAll(targetSelector)).some((descendant) => isEligible(descendant)));
    const tagged = candidates.filter((element) => element.getBoundingClientRect().top > window.innerHeight);
    const taggedSet = new Set(tagged);
    let scrollFrame: number | null = null;
    const revealVisible = () => {
      scrollFrame = null;
      tagged.forEach((element) => {
        if (element.dataset.reveal !== "pending") return;
        const top = element.getBoundingClientRect().top;
        if (top <= window.innerHeight) {
          element.style.removeProperty("--reveal-delay");
          element.setAttribute("data-reveal", "in");
          observer.unobserve(element);
        }
      });
    };
    const scheduleVisibleCheck = () => {
      if (scrollFrame === null) scrollFrame = window.requestAnimationFrame(revealVisible);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top >= 0) return;
        const element = entry.target as HTMLElement;
        const delayIndex = Math.min(Array.from(element.parentElement?.children ?? []).filter((child) => taggedSet.has(child as HTMLElement)).indexOf(element), 5);
        if (entry.boundingClientRect.top < 0) element.style.removeProperty("--reveal-delay");
        else element.style.setProperty("--reveal-delay", `${Math.max(delayIndex, 0) * 70}ms`);
        element.setAttribute("data-reveal", "in");
        observer.unobserve(element);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

    tagged.forEach((element) => {
      element.setAttribute("data-reveal", "pending");
      observer.observe(element);
    });
    window.addEventListener("scroll", scheduleVisibleCheck, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleVisibleCheck);
      if (scrollFrame !== null) window.cancelAnimationFrame(scrollFrame);
      tagged.forEach((element) => {
        element.removeAttribute("data-reveal");
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);

  return children;
}