"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Container, Section } from "@/components/ui";

const visuals = [
  {
    src: "https://res.cloudinary.com/hmy5ctzy/image/upload/v1788789713/hf_20260821_065643_6976e0a6-c34e-406a-bd95-c7e797053c7f.png",
    alt: "Articog creative visual study 01",
    slot: "showcase-slot showcase-slot--left",
  },
  {
    src: "https://res.cloudinary.com/hmy5ctzy/image/upload/v1788789712/hf_20260821_084936_75678ff3-a64b-4a52-8282-9f4ba50ff8ee.png",
    alt: "Articog creative visual study 02",
    slot: "showcase-slot showcase-slot--center",
  },
  {
    src: "https://res.cloudinary.com/hmy5ctzy/image/upload/v1788789712/hf_20260821_143722_0fdbe9fd-0d85-40e9-a33a-08a4801eb7bf.png",
    alt: "Articog creative visual study 03",
    slot: "showcase-slot showcase-slot--right",
  },
  {
    src: "https://res.cloudinary.com/hmy5ctzy/image/upload/v1788789710/hf_20260824_074433_da1464ea-2e00-45ae-bf12-e5590296e0b4.png",
    alt: "Articog creative visual study 04",
    slot: "showcase-slot showcase-slot--left",
  },
  {
    src: "https://res.cloudinary.com/hmy5ctzy/image/upload/v1788789709/hf_20260824_093120_776966e5-5a3b-42f8-91b7-f4a8644b915b.png",
    alt: "Articog creative visual study 05",
    slot: "showcase-slot showcase-slot--center",
  },
  {
    src: "https://res.cloudinary.com/hmy5ctzy/image/upload/v1788789708/hf_20260824_092558_3f5c4ba3-c830-439e-8eb4-dbd9f6a85296.png",
    alt: "Articog creative visual study 06",
    slot: "showcase-slot showcase-slot--right",
  },
  {
    src: "https://res.cloudinary.com/hmy5ctzy/image/upload/v1788789708/hf_20260824_093331_32e45f5b-915d-4fa8-850b-6d53f87f3d3d.png",
    alt: "Articog creative visual study 07",
    slot: "showcase-slot showcase-slot--left-lower",
  },
  {
    src: "https://res.cloudinary.com/hmy5ctzy/image/upload/v1788789710/hf_20260824_075254_b3fcf38d-1bc9-463d-9a13-2aaf2ceeed8e.png",
    alt: "Articog creative visual study 08",
    slot: "showcase-slot showcase-slot--center-lower",
  },
  {
    src: "https://res.cloudinary.com/hmy5ctzy/image/upload/v1788789718/hf_20260821_140321_73af4c8f-f252-4c41-8f83-de3d906fbcba.png",
    alt: "Articog creative visual study 09",
    slot: "showcase-slot showcase-slot--right-lower",
  },
];

const getCloudinaryUrl = (src: string, width: number) =>
  src.replace("/image/upload/", `/image/upload/f_auto,dpr_auto,w_${width},c_limit/`);

const getModalImageUrl = (src: string) => getCloudinaryUrl(src, 2400);

const LOOP_COPIES = 3;
const LOOP_START_INDEX = visuals.length;
const renderedVisuals = Array.from({ length: LOOP_COPIES }, (_, copyIndex) =>
  visuals.map((visual, visualIndex) => ({ visual, visualIndex, copyIndex })),
).flat();

export function HomeVisualShowcase() {
  const [selectedVisual, setSelectedVisual] = useState<(typeof visuals)[number] | null>(null);
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

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedVisual(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
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
                    onClick={() => {
                      if (suppressClick.current || dragState.current.moved) {
                        suppressClick.current = false;
                        dragState.current.moved = false;
                        return;
                      }
                      setSelectedVisual(visual);
                    }}
                    aria-label={`Open ${visual.alt}`}
                    aria-current={activeIndex === visualIndex ? "true" : undefined}
                  >
                    <NextImage
                      src={getCloudinaryUrl(visual.src, 1600)}
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
            src={getModalImageUrl(selectedVisual.src)}
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
