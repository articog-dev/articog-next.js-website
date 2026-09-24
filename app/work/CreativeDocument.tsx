"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./CreativeDocument.module.css";

type PortfolioProject = {
  title: string;
  category: string;
  filters: WorkFilter[];
  description: string;
  number: string;
  src: string;
  alt: string;
};

type WorkFilter = "Video" | "Product" | "Social" | "Industries";

const projects: PortfolioProject[] = [
  {
    title: "Product Film: Footwear",
    category: "AI product visualization · Cinematic product film · Post-production",
    filters: ["Video", "Product"],
    description: "Cinematic product storytelling shaped for premium positioning and campaign use.",
    number: "01",
    src: "https://media.articog.com/images/work/hf_20260819_002024_6e675e1e-9283-48e5-ab4e-c2a4abd3b20d.png",
    alt: "Articog product film visual study for footwear",
  },
  {
    title: "Beauty Campaign Visual",
    category: "Product fidelity · AI environment creation · Social adaptation",
    filters: ["Product", "Social"],
    description: "Product-focused campaign imagery developed for visual consistency across formats.",
    number: "02",
    src: "https://media.articog.com/images/work/hf_20260820_002828_19680ddc-75c5-40e3-a968-f11dfd4f0cdf.png",
    alt: "Articog beauty campaign visual study",
  },
  {
    title: "Real Estate Cinematic",
    category: "Architectural visualization · AI environments · Film finishing",
    filters: ["Video", "Industries"],
    description: "Architectural visualization with cinematic environments and a finished-film sensibility.",
    number: "03",
    src: "https://media.articog.com/images/work/hf_20260820_212101_1b0feafa-521a-438c-b845-04a078aaf4bc.png",
    alt: "Articog real estate cinematic visual study",
  },
  {
    title: "Fashion Film Study",
    category: "AI talent · Art direction · Styling · Motion",
    filters: ["Video", "Social"],
    description: "Fashion-led visual direction exploring styling, movement, and cinematic composition.",
    number: "04",
    src: "https://media.articog.com/images/work/hf_20260821_060749_04cf9ead-df82-4dad-b7f9-451505044554.png",
    alt: "Articog fashion film visual study",
  },
  {
    title: "Consumer Tech Product Film",
    category: "Product storytelling · AI production · Multi-format delivery",
    filters: ["Video", "Product"],
    description: "Product storytelling designed to carry a clear visual idea across campaign formats.",
    number: "05",
    src: "https://media.articog.com/images/work/hf_20260821_184517_d7cc6079-08da-4f26-a875-856a57a37e9f%20(1).png",
    alt: "Articog consumer technology product film study",
  },
  {
    title: "Articog Original",
    category: "Visual Study · Creative direction",
    filters: ["Video"],
    description: "An original visual study exploring art direction, depth, and campaign composition.",
    number: "06",
    src: "https://media.articog.com/images/work/hf_20260821_215341_1bb116bb-4c22-4a9e-ab3a-58b22905b47c.png",
    alt: "Articog original visual study",
  },
];

export function CreativeDocument() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const lastPointerX = useRef<number | null>(null);
  const pointerDistance = useRef(0);
  const activePointerId = useRef<number | null>(null);
  const didDrag = useRef(false);
  const lastWheelTime = useRef(0);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const moveProject = useCallback((direction: number) => {
    setActiveIndex((current) => (current + direction + projects.length) % projects.length);
  }, []);

  const startDragAt = (clientX: number, clientY: number) => {
    pointerStart.current = { x: clientX, y: clientY };
    lastPointerX.current = clientX;
    pointerDistance.current = 0;
    didDrag.current = false;
  };

  const updateDragAt = (clientX: number, clientY: number) => {
    if (activePointerId.current === null || !pointerStart.current || lastPointerX.current === null) return;

    const deltaX = clientX - lastPointerX.current;
    const totalX = clientX - pointerStart.current.x;
    const totalY = clientY - pointerStart.current.y;
    pointerDistance.current += deltaX;

    if (Math.abs(totalX) > 10 && Math.abs(totalX) > Math.abs(totalY)) {
      didDrag.current = true;
    }

    if (Math.abs(pointerDistance.current) >= 42 && Math.abs(totalX) > Math.abs(totalY)) {
      const direction = pointerDistance.current < 0 ? 1 : -1;
      moveProject(direction);
      pointerDistance.current -= pointerDistance.current < 0 ? -42 : 42;
    }
    lastPointerX.current = clientX;
  };

  const finishDrag = () => {
    if (activePointerId.current === null) return;

    pointerStart.current = null;
    lastPointerX.current = null;
    pointerDistance.current = 0;
    activePointerId.current = null;
  };

  const cancelDrag = () => {
    pointerStart.current = null;
    lastPointerX.current = null;
    pointerDistance.current = 0;
    activePointerId.current = null;
    didDrag.current = false;
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(delta) < 4) return;

    const now = performance.now();
    if (now - lastWheelTime.current < 220) return;

    lastWheelTime.current = now;
    moveProject(delta > 0 ? 1 : -1);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        moveProject(1);
      }
      if (event.key === "ArrowLeft") {
        moveProject(-1);
      }
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moveProject]);

  useEffect(() => {
    if (!selectedProject) return;

    const dialog = lightboxRef.current;
    if (!dialog) return;

    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ));
    focusable[0]?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleTab = (event: KeyboardEvent) => {
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

    document.addEventListener("keydown", handleTab);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleTab);
      triggerRef.current?.focus();
    };
  }, [selectedProject]);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!event.isPrimary) return;
      startDragAt(event.clientX, event.clientY);
      activePointerId.current = event.pointerId;
    };
    const handlePointerMove = (event: PointerEvent) => {
      if (activePointerId.current !== event.pointerId) return;
      updateDragAt(event.clientX, event.clientY);
      if (didDrag.current && !gallery.hasPointerCapture(event.pointerId)) {
        gallery.setPointerCapture(event.pointerId);
      }
    };
    const handlePointerUp = (event: PointerEvent) => {
      if (activePointerId.current !== event.pointerId) return;
      if (gallery.hasPointerCapture(event.pointerId)) gallery.releasePointerCapture(event.pointerId);
      finishDrag();
    };

    gallery.addEventListener("pointerdown", handlePointerDown);
    gallery.addEventListener("pointermove", handlePointerMove);
    gallery.addEventListener("pointerup", handlePointerUp);
    gallery.addEventListener("pointercancel", cancelDrag);
    return () => {
      gallery.removeEventListener("pointerdown", handlePointerDown);
      gallery.removeEventListener("pointermove", handlePointerMove);
      gallery.removeEventListener("pointerup", handlePointerUp);
      gallery.removeEventListener("pointercancel", cancelDrag);
    };
  });

  return (
    <section className={styles.showcase} aria-label="Portfolio showcase">
      <div
        className={styles.gallery}
        ref={galleryRef}
        aria-live="polite"
        onWheel={handleWheel}
      >
        {projects.map((project, index) => {
          const offset = ((index - activeIndex + projects.length) % projects.length);
          const normalizedOffset = offset > projects.length / 2 ? offset - projects.length : offset;
          const isActive = normalizedOffset === 0;
          const isNeighbor = Math.abs(normalizedOffset) === 1;
          const isHidden = Math.abs(normalizedOffset) > 1;

          const translateX = normalizedOffset * 260;
          const translateY = normalizedOffset * 26;
          const rotateY = normalizedOffset === 0 ? 0 : normalizedOffset * -18;
          const rotateZ = normalizedOffset === 0 ? 0 : normalizedOffset * 5;
          const scale = isActive ? 1 : isNeighbor ? 0.84 : 0.72;
          const opacity = isHidden ? 0 : isActive ? 1 : 0.78;
          const depth = isActive ? 70 : isNeighbor ? 10 : -30;

          return (
            <article
              key={project.title}
              className={`${styles.projectCard} ${isActive ? styles.active : ""} ${isNeighbor ? styles.neighbor : ""}`}
              style={{
                transform: `translate3d(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px), ${depth}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                opacity,
                zIndex: isActive ? 30 : isNeighbor ? 22 : 10,
              }}
              aria-current={isActive ? "true" : undefined}
            >
              <button
                type="button"
                className={styles.imageButton}
                onClick={(event) => {
                  if (didDrag.current) {
                    event.preventDefault();
                    didDrag.current = false;
                    return;
                  }
                  triggerRef.current = event.currentTarget;
                  setSelectedProject(project);
                }}
                aria-label={`Open ${project.alt} in a larger preview`}
              >
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 640px) 88vw, (max-width: 1024px) 72vw, 58vw"
                  priority={index === activeIndex}
                  quality={isActive ? 72 : 60}
                  loading={isActive ? "eager" : "lazy"}
                  className={styles.image}
                />
              </button>
            </article>
          );
        })}
      </div>

      <div className={styles.controlsWrap}>
        <div className={styles.controls}>
          <button type="button" onClick={() => moveProject(-1)} className={styles.arrow} aria-label="Previous portfolio project">
            <ArrowLeft size={16} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => moveProject(1)} className={styles.arrow} aria-label="Next portfolio project">
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      {selectedProject && (
        <div ref={lightboxRef} className={styles.modal} role="dialog" aria-modal="true" aria-label={selectedProject.alt} onClick={() => setSelectedProject(null)}>
          <button type="button" className={styles.close} onClick={() => setSelectedProject(null)} aria-label="Close portfolio preview">
            <X size={20} aria-hidden="true" />
          </button>
          <div className={styles.modalFrame}>
            <Image
              src={selectedProject.src}
              alt={selectedProject.alt}
              fill
              sizes="(max-width: 768px) 90vw, 70vw"
              quality={80}
              loading="eager"
              className={styles.modalImage}
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}
