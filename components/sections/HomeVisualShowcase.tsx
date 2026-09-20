"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Container, Section } from "@/components/ui";

const visuals = [
  {
    src: "https://media.articog.com/images/home/hf_20260819_130252_867ce98c-7c62-4093-aa2a-9940160ef6be.png",
    alt: "Articog creative visual study 01",
    slot: "showcase-slot showcase-slot--left",
  },
  {
    src: "https://media.articog.com/images/home/hf_20260820_141918_ca92d85c-8d99-49d9-b1d3-8074f1781fe1.png",
    alt: "Articog creative visual study 02",
    slot: "showcase-slot showcase-slot--center",
  },
  {
    src: "https://media.articog.com/images/home/hf_20260820_211043_2067285a-ec62-4784-bdfc-c4861f418d96.png",
    alt: "Articog creative visual study 03",
    slot: "showcase-slot showcase-slot--right",
  },
  {
    src: "https://media.articog.com/images/home/hf_20260820_232841_55351427-e470-43bc-b674-3abedc6b19a7.png",
    alt: "Articog creative visual study 04",
    slot: "showcase-slot showcase-slot--left",
  },
  {
    src: "https://media.articog.com/images/home/hf_20260821_083339_49c07db6-34ef-4c24-9479-eba4ece0cc6f.png",
    alt: "Articog creative visual study 05",
    slot: "showcase-slot showcase-slot--center",
  },
  {
    src: "https://media.articog.com/images/home/hf_20260821_090327_a7cb6c2d-ed73-4de2-a1ff-498adbad1cf5.png",
    alt: "Articog creative visual study 06",
    slot: "showcase-slot showcase-slot--right",
  },
  {
    src: "https://media.articog.com/images/home/hf_20260821_131535_0ae95932-a02b-4b7c-95b3-3e2675785418.png",
    alt: "Articog creative visual study 07",
    slot: "showcase-slot showcase-slot--left-lower",
  },
  {
    src: "https://media.articog.com/images/home/hf_20260821_192021_c1548334-e857-427a-987e-89212111b9b8.png",
    alt: "Articog creative visual study 08",
    slot: "showcase-slot showcase-slot--center-lower",
  },
  {
    src: "https://media.articog.com/images/home/hf_20260821_214952_8c65be78-37b4-4595-a53b-f90254d3cfbd.png",
    alt: "Articog creative visual study 09",
    slot: "showcase-slot showcase-slot--right-lower",
  },
];

const LOOP_COPIES = 3;
const LOOP_START_INDEX = visuals.length;
const renderedVisuals = Array.from({ length: LOOP_COPIES }, (_, copyIndex) =>
  visuals.map((visual, visualIndex) => ({ visual, visualIndex, copyIndex })),
).flat();

export function HomeVisualShowcase() {
  const [selectedVisual, setSelectedVisual] = useState<(typeof visuals)[number] | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const renderedIndex = useRef(LOOP_START_INDEX);
  const animationFrame = useRef<number | null>(null);
  const dragState = useRef({ active: false, startX: 0, startScrollLeft: 0, moved: false });
  const suppressClick = useRef(false);
  const pendingVisual = useRef<(typeof visuals)[number] | null>(null);

  const updateDepth = useCallback(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const containerRect = scrollContainer.getBoundingClientRect();
    const center = containerRect.left + containerRect.width / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      const rect = item.getBoundingClientRect();
      const distance = (rect.left + rect.width / 2 - center) / Math.max(rect.width, 1);
      const absoluteDistance = Math.abs(distance);
      if (absoluteDistance < nearestDistance) {
        nearestDistance = absoluteDistance;
        nearestIndex = index;
      }

      const clamped = Math.min(3, absoluteDistance);
      item.style.setProperty("--visual-depth", `${Math.max(-160, 80 - clamped * 100)}px`);
      item.style.setProperty("--visual-rotation", `${Math.max(-12, Math.min(12, distance * -7))}deg`);
      item.style.setProperty("--visual-scale", `${1 - Math.min(0.16, clamped * 0.055)}`);
      item.style.setProperty("--visual-opacity", `${1 - Math.min(0.42, clamped * 0.14)}`);
      item.style.setProperty("--visual-focus", absoluteDistance < 0.45 ? "1" : "0");
      item.style.zIndex = String(1000 - Math.round(absoluteDistance * 100));
    });

    const normalizedIndex = nearestIndex < LOOP_START_INDEX
      ? nearestIndex + visuals.length
      : nearestIndex >= LOOP_START_INDEX + visuals.length
        ? nearestIndex - visuals.length
        : nearestIndex;

    if (normalizedIndex !== nearestIndex) {
      const currentItem = itemRefs.current[nearestIndex];
      const normalizedItem = itemRefs.current[normalizedIndex];
      if (currentItem && normalizedItem) {
        scrollContainer.scrollLeft += normalizedItem.offsetLeft - currentItem.offsetLeft;
      }
    }

    renderedIndex.current = normalizedIndex;
    const logicalIndex = normalizedIndex % visuals.length;
    setActiveIndex((current) => (current === logicalIndex ? current : logicalIndex));
  }, []);

  const scheduleDepthUpdate = useCallback(() => {
    if (animationFrame.current !== null) return;
    animationFrame.current = window.requestAnimationFrame(() => {
      animationFrame.current = null;
      updateDepth();
    });
  }, [updateDepth]);

  const scrollToIndex = useCallback((index: number, direction: -1 | 0 | 1) => {
    const logicalIndex = (index + visuals.length) % visuals.length;
    const targetIndex = direction === 0
      ? LOOP_START_INDEX + logicalIndex
      : renderedIndex.current + direction;
    const item = itemRefs.current[targetIndex];
    if (!item) return;
    renderedIndex.current = targetIndex;
    item.scrollIntoView({ behavior: direction === 0 ? "auto" : "smooth", block: "nearest", inline: "center" });
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    scrollToIndex(activeIndex + direction, direction);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    pendingVisual.current = itemRefs.current
      .map((item, index) => ({ item, visual: renderedVisuals[index].visual }))
      .filter(({ item }) => {
        if (!item) return false;
        const rect = item.getBoundingClientRect();
        return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      })
      .sort((first, second) => Number(second.item?.style.zIndex || 0) - Number(first.item?.style.zIndex || 0))[0]?.visual ?? null;
    dragState.current = {
      active: true,
      startX: event.clientX,
      startScrollLeft: scrollContainer.scrollLeft,
      moved: false,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    const scrollContainer = scrollRef.current;
    if (!drag.active || !scrollContainer) return;
    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 8) {
      if (!drag.moved) scrollContainer.setPointerCapture(event.pointerId);
      drag.moved = true;
    }
    scrollContainer.scrollLeft = drag.startScrollLeft - distance;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer?.hasPointerCapture(event.pointerId)) {
      scrollContainer.releasePointerCapture(event.pointerId);
    }
    suppressClick.current = dragState.current.moved;
    dragState.current.active = false;
    if (event.type !== "pointercancel" && !suppressClick.current && !(event.target as HTMLElement).closest("button")) {
      const visual = pendingVisual.current;
      if (visual) setSelectedVisual(visual);
    }
    pendingVisual.current = null;
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => scheduleDepthUpdate();
    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX) || Math.abs(event.deltaY) < 2) return;
      event.preventDefault();
      scrollContainer.scrollLeft += event.deltaY;
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", scheduleDepthUpdate);
    const initialFrame = window.requestAnimationFrame(() => {
      const initialItem = itemRefs.current[LOOP_START_INDEX];
      if (initialItem) {
        scrollContainer.scrollLeft = initialItem.offsetLeft - (scrollContainer.clientWidth - initialItem.offsetWidth) / 2;
      }
      updateDepth();
    });

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      scrollContainer.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", scheduleDepthUpdate);
      window.cancelAnimationFrame(initialFrame);
      if (animationFrame.current !== null) window.cancelAnimationFrame(animationFrame.current);
    };
  }, [scheduleDepthUpdate, scrollToIndex, updateDepth]);

  useEffect(() => {
    if (!selectedVisual) return;

    const dialog = lightboxRef.current;
    if (!dialog) return;

    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ));
    focusable[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedVisual(null);
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [selectedVisual]);

  return (
    <>
      <Section className="overflow-hidden border-y border-white/[0.06] bg-[#080808] py-12 md:py-16">
        <div onKeyDown={handleKeyDown}>
          <Container>
            <div
              className="showcase-stage"
              aria-label="Selected Articog visual studies"
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              <div
                ref={scrollRef}
                className="showcase-coverflow"
                aria-live="polite"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              >
                {renderedVisuals.map(({ visual, visualIndex, copyIndex }, index) => (
                  <button
                    key={`${copyIndex}-${visual.alt}`}
                    ref={(item) => { itemRefs.current[index] = item; }}
                    type="button"
                    className="showcase-coverflow__item"
                    onClick={(event) => {
                      if (suppressClick.current || dragState.current.moved) {
                        suppressClick.current = false;
                        dragState.current.moved = false;
                        return;
                      }
                      triggerRef.current = event.currentTarget;
                      setSelectedVisual(visual);
                    }}
                    aria-label={`Open ${visual.alt}`}
                    aria-current={activeIndex === visualIndex ? "true" : undefined}
                  >
                    <NextImage
                      src={visual.src}
                      sizes="(max-width: 640px) 68vw, (max-width: 1024px) 36vw, 25vw"
                      alt={visual.alt}
                      width={1600}
                      height={2133}
                      quality={80}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
            </div>

          <div className="showcase-navigation" aria-label="Visual gallery navigation">
            <div className="showcase-navigation__buttons">
              <button
                type="button"
                onClick={() => scrollToIndex(activeIndex - 1, -1)}
                aria-label="Previous image"
                className="showcase-navigation__button"
              >
                <ChevronLeft size={17} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => scrollToIndex(activeIndex + 1, 1)}
                aria-label="Next image"
                className="showcase-navigation__button"
              >
                <ChevronRight size={17} strokeWidth={1.5} />
              </button>
            </div>
          </div>
          </Container>
        </div>
      </Section>

      {selectedVisual && (
        <div
          ref={lightboxRef}
          className="showcase-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selectedVisual.alt}
          onClick={() => setSelectedVisual(null)}
        >
          <button
            type="button"
            className="showcase-lightbox__close"
            onClick={() => setSelectedVisual(null)}
            aria-label="Close visual preview"
          >
            <X size={20} />
          </button>
          <NextImage
            src={selectedVisual.src}
            alt={selectedVisual.alt}
            width={2400}
            height={3200}
            sizes="(max-width: 768px) 90vw, 70vw"
            quality={80}
            loading="lazy"
            decoding="async"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
