"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";

const defaultItems = [
  { id: "production-economics", label: "Production Economics" },
  { id: "how-it-works", label: "How It Works" },
  { id: "trust", label: "Trust & Security" },
];

interface SectionNavProps {
  items?: { id: string; label: string }[];
}

export function SectionNav({ items = defaultItems }: SectionNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!activeId) return;
    itemRefs.current[activeId]?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeId]);

  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector<HTMLElement>("header");
    const updateHeaderOffset = () => {
      const measuredOffset = header?.getBoundingClientRect().bottom ?? 100;
      root.style.setProperty("--header-offset", `${Math.round(measuredOffset)}px`);
    };
    const resizeObserver = header ? new ResizeObserver(updateHeaderOffset) : null;
    const hashTimers: number[] = [];

    updateHeaderOffset();
    if (header) resizeObserver?.observe(header);

    const getActiveId = () => {
      const headerOffset = Number.parseFloat(getComputedStyle(root).getPropertyValue("--header-offset")) || 100;
      const subnavHeight = navRef.current?.getBoundingClientRect().height ?? 56;
      const threshold = headerOffset + subnavHeight + 32;
      const trust = document.getElementById("trust");
      const finalCta = document.getElementById("why-articog-final-cta");

      if ((trust && trust.getBoundingClientRect().bottom <= threshold) || (finalCta && finalCta.getBoundingClientRect().top <= threshold)) {
        return null;
      }

      return items.reduce<string | null>((current, item) => {
        const section = document.getElementById(item.id);
        return section && section.getBoundingClientRect().top <= threshold ? item.id : current;
      }, null);
    };

    const scrollToSection = (id: string, behavior: ScrollBehavior) => {
      const section = document.getElementById(id);
      if (!section) return;
      const headerOffset = Number.parseFloat(getComputedStyle(root).getPropertyValue("--header-offset")) || 100;
      const subnavHeight = navRef.current?.getBoundingClientRect().height ?? 56;
      const top = window.scrollY + section.getBoundingClientRect().top - headerOffset - subnavHeight - 24;
      window.scrollTo({ top, behavior });
    };

    const updateActive = () => {
      frameRef.current = null;
      setActiveId(getActiveId());
    };
    const scheduleUpdate = () => {
      if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(updateActive);
    };

    const handleHashChange = () => {
      scheduleUpdate();
      const hashId = window.location.hash.slice(1);
      if (items.some((item) => item.id === hashId)) {
        window.requestAnimationFrame(() => scrollToSection(hashId, "auto"));
      }
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", handleHashChange);
    updateActive();

    const hashId = window.location.hash.slice(1);
    if (items.some((item) => item.id === hashId)) {
      hashTimers.push(window.setTimeout(() => scrollToSection(hashId, "auto"), 100));
      hashTimers.push(window.setTimeout(() => scrollToSection(hashId, "auto"), 700));
    }

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", handleHashChange);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      hashTimers.forEach((timer) => window.clearTimeout(timer));
      root.style.removeProperty("--header-offset");
    };
  }, [items]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const section = document.getElementById(id);
    if (!section) return;

    setActiveId(id);
    const root = document.documentElement;
    const headerOffset = Number.parseFloat(getComputedStyle(root).getPropertyValue("--header-offset")) || 100;
    const subnavHeight = navRef.current?.getBoundingClientRect().height ?? 56;
    const top = window.scrollY + section.getBoundingClientRect().top - headerOffset - subnavHeight - 24;
    window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav ref={navRef} aria-label="Why Articog sections" className="sticky top-[var(--header-offset)] z-30 h-[var(--subnav-height)] border-y border-white/[0.08] bg-black/80 backdrop-blur-md">
      <Container className="flex h-full items-center justify-center gap-2 overflow-x-auto px-page-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-sm:justify-start">
        {items.map((item) => {
          const active = activeId === item.id;
          return (
            <a
              key={item.id}
              ref={(element) => { itemRefs.current[item.id] = element; }}
              href={`#${item.id}`}
              aria-current={active ? "location" : undefined}
              onClick={(event) => handleClick(event, item.id)}
              className={cn(
                "relative shrink-0 rounded-full px-4 py-2 type-small font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                active && "bg-white/10 text-white",
              )}
            >
              {item.label}
              <span className={cn("absolute inset-x-4 -bottom-[1px] h-0.5 origin-center scale-x-0 bg-white transition-transform duration-200", active && "scale-x-100")} aria-hidden="true" />
            </a>
          );
        })}
      </Container>
    </nav>
  );
}