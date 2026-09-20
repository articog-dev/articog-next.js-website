"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import NextImage from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Container, Section } from "@/components/ui";

const visuals = [
  { src: "https://media.articog.com/images/home/hf_20260819_130252_867ce98c-7c62-4093-aa2a-9940160ef6be.png", alt: "Articog creative visual study 01" },
  { src: "https://media.articog.com/images/home/hf_20260820_141918_ca92d85c-8d99-49d9-b1d3-8074f1781fe1.png", alt: "Articog creative visual study 02" },
  { src: "https://media.articog.com/images/home/hf_20260820_211043_2067285a-ec62-4784-bdfc-c4861f418d96.png", alt: "Articog creative visual study 03" },
  { src: "https://media.articog.com/images/home/hf_20260820_232841_55351427-e470-43bc-b674-3abedc6b19a7.png", alt: "Articog creative visual study 04" },
  { src: "https://media.articog.com/images/home/hf_20260821_083339_49c07db6-34ef-4c24-9479-eba4ece0cc6f.png", alt: "Articog creative visual study 05" },
  { src: "https://media.articog.com/images/home/hf_20260821_090327_a7cb6c2d-ed73-4de2-a1ff-498adbad1cf5.png", alt: "Articog creative visual study 06" },
  { src: "https://media.articog.com/images/home/hf_20260821_131535_0ae95932-a02b-4b7c-95b3-3e2675785418.png", alt: "Articog creative visual study 07" },
  { src: "https://media.articog.com/images/home/hf_20260821_192021_c1548334-e857-427a-987e-89212111b9b8.png", alt: "Articog creative visual study 08" },
  { src: "https://media.articog.com/images/home/hf_20260821_214952_8c65be78-37b4-4595-a53b-f90254d3cfbd.png", alt: "Articog creative visual study 09" },
];

type Visual = (typeof visuals)[number];
const START_INDEX = Math.floor(visuals.length / 2);
const NEAR_SPACING = 0.66;
const FAR_SPACING = 0.4;
const TILT_DEG = 44;
const DEPTH_NEAR = 120;
const DEPTH_FAR = 70;

export function HomeVisualShowcase() {
  const [selectedVisual, setSelectedVisual] = useState<Visual | null>(null);
  const [activeIndex, setActiveIndex] = useState(START_INDEX);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<Array<HTMLDivElement | null>>([]);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeRef = useRef(START_INDEX);
  const pendingTarget = useRef<{ index: number; at: number } | null>(null);
  const animationFrame = useRef<number | null>(null);
  const dragState = useRef({ active: false, startX: 0, startScrollLeft: 0, moved: false });

  const updateDepth = useCallback(() => {
    const scroller = scrollRef.current;
    const slots = slotRefs.current;
    const first = slots[0];
    if (!scroller || !first) return;
    const pitch = slots[1] ? slots[1].offsetLeft - first.offsetLeft : first.offsetWidth;
    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    slots.forEach((slot, index) => {
      const item = itemRefs.current[index];
      if (!slot || !item) return;
      const offset = (slot.offsetLeft + slot.offsetWidth / 2 - center) / pitch;
      const distance = Math.abs(offset);
      const side = offset < 0 ? -1 : 1;
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
      const near = Math.min(distance, 1);
      const far = Math.max(distance - 1, 0);
      const pull = side * (near * NEAR_SPACING + far * FAR_SPACING - distance) * pitch;
      const depth = -(near * DEPTH_NEAR + Math.min(far, 3) * DEPTH_FAR);
      const scale = 1 - near * 0.08 - Math.min(far, 3) * 0.04;
      item.style.transform = `translate3d(${pull}px, 0, ${depth}px) rotateY(${-side * near * TILT_DEG}deg) scale(${scale})`;
      slot.style.zIndex = String(Math.max(0, 100 - Math.round(distance * 10)));
      item.style.setProperty("--shade", String(Math.min(0.75, near * 0.34 + Math.min(far, 3) * 0.14)));
    });
    activeRef.current = nearestIndex;
    setActiveIndex((current) => (current === nearestIndex ? current : nearestIndex));
  }, []);

  const scheduleDepthUpdate = useCallback(() => {
    if (animationFrame.current !== null) return;
    animationFrame.current = window.requestAnimationFrame(() => {
      animationFrame.current = null;
      updateDepth();
    });
  }, [updateDepth]);

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const scroller = scrollRef.current;
    const slot = slotRefs.current[Math.min(Math.max(index, 0), visuals.length - 1)];
    if (!scroller || !slot) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scroller.scrollTo({ left: slot.offsetLeft - (scroller.clientWidth - slot.offsetWidth) / 2, behavior: reduceMotion ? "auto" : behavior });
  }, []);

  const goTo = useCallback((index: number) => {
    const clamped = Math.min(Math.max(index, 0), visuals.length - 1);
    pendingTarget.current = { index: clamped, at: Date.now() };
    scrollToIndex(clamped);
    return clamped;
  }, [scrollToIndex]);

  const currentIndex = () => {
    const pending = pendingTarget.current;
    return pending && Date.now() - pending.at < 800 ? pending.index : activeRef.current;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    let target: number;
    if (event.key === "ArrowRight") target = currentIndex() + 1;
    else if (event.key === "ArrowLeft") target = currentIndex() - 1;
    else if (event.key === "Home") target = 0;
    else if (event.key === "End") target = visuals.length - 1;
    else return;
    event.preventDefault();
    itemRefs.current[goTo(target)]?.focus({ preventScroll: true });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const scroller = scrollRef.current;
    if (!scroller || event.pointerType !== "mouse" || event.button !== 0) return;
    dragState.current = { active: true, startX: event.clientX, startScrollLeft: scroller.scrollLeft, moved: false };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    const scroller = scrollRef.current;
    if (!drag.active || !scroller) return;
    const distance = event.clientX - drag.startX;
    if (!drag.moved && Math.abs(distance) > 6) {
      drag.moved = true;
      scroller.setPointerCapture(event.pointerId);
      scroller.dataset.dragging = "true";
    }
    if (drag.moved) scroller.scrollLeft = drag.startScrollLeft - distance;
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    const scroller = scrollRef.current;
    if (!drag.active || !scroller) return;
    drag.active = false;
    if (!drag.moved) return;
    if (scroller.hasPointerCapture(event.pointerId)) scroller.releasePointerCapture(event.pointerId);
    delete scroller.dataset.dragging;
    scrollToIndex(activeRef.current);
  };

  useLayoutEffect(() => {
    const scroller = scrollRef.current;
    const start = slotRefs.current[START_INDEX];
    if (!scroller || !start) return;
    scroller.scrollLeft = start.offsetLeft - (scroller.clientWidth - start.offsetWidth) / 2;
    updateDepth();
  }, [updateDepth]);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const handleResize = () => { scrollToIndex(activeRef.current, "auto"); scheduleDepthUpdate(); };
    scroller.addEventListener("scroll", scheduleDepthUpdate, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      scroller.removeEventListener("scroll", scheduleDepthUpdate);
      window.removeEventListener("resize", handleResize);
      if (animationFrame.current !== null) window.cancelAnimationFrame(animationFrame.current);
    };
  }, [scheduleDepthUpdate, scrollToIndex]);

  useEffect(() => {
    if (!selectedVisual) return;
    const dialog = lightboxRef.current;
    if (!dialog) return;
    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
    focusable[0]?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setSelectedVisual(null); return; }
      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", handleKeyDown); triggerRef.current?.focus(); };
  }, [selectedVisual]);

  return (
    <>
      <Section className="overflow-hidden border-y border-white/[0.06] bg-[#080808] py-10 md:py-14">
        <div className="showcase-stage" role="group" aria-roledescription="carousel" aria-label="Selected Articog visual studies" tabIndex={0} onKeyDown={handleKeyDown}>
          <div ref={scrollRef} className="showcase-track" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerEnd} onPointerCancel={handlePointerEnd}>
            {visuals.map((visual, index) => {
              const isActive = index === activeIndex;
              return (
                <div key={visual.alt} ref={(slot) => { slotRefs.current[index] = slot; }} className="showcase-slot">
                  <button
                    ref={(item) => { itemRefs.current[index] = item; }}
                    type="button"
                    className="showcase-item"
                    tabIndex={isActive ? 0 : -1}
                    aria-current={isActive ? "true" : undefined}
                    aria-label={`Open ${visual.alt}`}
                    onClick={(event) => {
                      if (!isActive) goTo(index);
                      triggerRef.current = event.currentTarget;
                      setSelectedVisual(visual);
                    }}
                  >
                    <NextImage src={visual.src} sizes="(max-width: 640px) 66vw, (max-width: 1400px) 24vw, 336px" alt={visual.alt} width={1600} height={2133} quality={80} loading="lazy" decoding="async" draggable={false} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <Container>
          <div className="showcase-navigation" aria-label="Visual gallery navigation">
            <button type="button" onClick={() => goTo(currentIndex() - 1)} disabled={activeIndex === 0} aria-label="Previous image" className="showcase-navigation__button"><ChevronLeft size={18} strokeWidth={1.5} /></button>
            <button type="button" onClick={() => goTo(currentIndex() + 1)} disabled={activeIndex === visuals.length - 1} aria-label="Next image" className="showcase-navigation__button"><ChevronRight size={18} strokeWidth={1.5} /></button>
          </div>
          <p className="sr-only" aria-live="polite">Image {activeIndex + 1} of {visuals.length}</p>
        </Container>
      </Section>

      {selectedVisual && (
        <div ref={lightboxRef} className="showcase-lightbox" role="dialog" aria-modal="true" aria-label={selectedVisual.alt} onClick={() => setSelectedVisual(null)}>
          <button type="button" className="showcase-lightbox__close" onClick={() => setSelectedVisual(null)} aria-label="Close visual preview"><X size={20} /></button>
          <NextImage src={selectedVisual.src} alt={selectedVisual.alt} width={2400} height={3200} sizes="(max-width: 768px) 90vw, 70vw" quality={80} loading="lazy" decoding="async" onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </>
  );
}