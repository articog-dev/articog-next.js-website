"use client";

import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Container, Section, Heading } from "@/components/ui";

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
  src.replace("/image/upload/", `/image/upload/f_auto,q_auto:good,dpr_auto,w_${width},c_limit/`);

const getModalImageUrl = (src: string) => getCloudinaryUrl(src, 2400);

const getRelativePosition = (index: number, activeIndex: number) => {
  const total = visuals.length;
  const delta = (index - activeIndex + total) % total;
  return delta > total / 2 ? delta - total : delta;
};

export function HomeVisualShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedVisual, setSelectedVisual] = useState<(typeof visuals)[number] | null>(null);
  const pointerStartX = useRef<number | null>(null);

  const moveActiveIndex = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + visuals.length) % visuals.length);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = event.clientX;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;
    const delta = event.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(delta) < 40) return;
    moveActiveIndex(delta > 0 ? -1 : 1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") moveActiveIndex(-1);
    if (event.key === "ArrowRight") moveActiveIndex(1);
  };

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
      <Section className="overflow-hidden border-y border-white/[0.06] bg-[#080808] py-24 md:py-32">
        <div onKeyDown={handleKeyDown} tabIndex={0}>
          <Container>
          <div className="mb-6 flex items-end justify-between gap-8 md:mb-8">
            <div className="max-w-xl">
              <Heading as="p" size="label" className="mb-4 text-white/45">
                Selected visual studies
              </Heading>
              <Heading as="h2" size="section" className="mb-0 text-white">
                Creative, built for your campaign.
              </Heading>
            </div>
          </div>

            <div className="showcase-stage" aria-label="Selected Articog visual studies" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>
            <div className="showcase-coverflow" aria-live="polite">
              {visuals.map((visual, index) => {
                const relativePosition = getRelativePosition(index, activeIndex);
                const absoluteOffset = Math.abs(relativePosition);
                const isActive = index === activeIndex;
                const depth = isActive ? 180 : -absoluteOffset * 120;
                const translateX = relativePosition * 200;
                const rotateY = isActive ? 0 : relativePosition > 0 ? -28 : 28;
                const scale = isActive ? 1 : 1 - absoluteOffset * 0.12;
                const opacity = isActive ? 1 : Math.max(0.18, 1 - absoluteOffset * 0.2);

                return (
                  <button
                    key={visual.alt}
                    type="button"
                    className={`showcase-coverflow__item ${isActive ? "showcase-coverflow__item--active" : ""}`}
                    style={{
                      transform: isActive
                        ? "translate3d(-50%, -50%, 180px) rotateY(0deg) scale(1)"
                        : `translate3d(calc(-50% + ${translateX}px), -50%, ${depth}px) rotateY(${rotateY}deg) scale(${scale})`,
                      opacity,
                      zIndex: 100 - absoluteOffset,
                      visibility: absoluteOffset > 3 ? "hidden" : "visible",
                    }}
                    onClick={() => setSelectedVisual(visual)}
                    aria-label={`Open ${visual.alt}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <NextImage
                      src={getCloudinaryUrl(visual.src, 1600)}
                      sizes="(max-width: 640px) 68vw, (max-width: 1024px) 36vw, 25vw"
                      alt={visual.alt}
                      width={1600}
                      height={2133}
                      priority={index === 0}
                      quality={75}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="showcase-navigation" aria-label="Visual gallery navigation">
            <div className="showcase-navigation__buttons">
              <button
                type="button"
                onClick={() => moveActiveIndex(-1)}
                aria-label="Previous image"
                className="showcase-navigation__button"
              >
                <ChevronLeft size={17} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => moveActiveIndex(1)}
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
