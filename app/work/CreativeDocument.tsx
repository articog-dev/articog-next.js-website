"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./CreativeDocument.module.css";

type PortfolioProject = {
  title: string;
  category: string;
  description: string;
  number: string;
  src: string;
  alt: string;
};

const projects: PortfolioProject[] = [
  {
    title: "Creative Visual 01",
    category: "Campaign Artwork",
    description: "Luxury launch storytelling built for premium positioning and performance-led creative.",
    number: "01",
    src: "https://res.cloudinary.com/hmy5ctzy/image/upload/v1788795062/hf_20260821_063718_d5d2aeb0-64d1-4655-ac8a-ba9e4f5e6c02.png",
    alt: "Articog creative visual study 01",
  },
  {
    title: "Creative Visual 02",
    category: "Brand System",
    description: "Editorial visual language refined for motion-first marketing and multi-format distribution.",
    number: "02",
    src: "https://res.cloudinary.com/hmy5ctzy/image/upload/v1788795062/hf_20260821_055524_1a0e7292-1148-46c0-a291-3d9e153b9bb0.png",
    alt: "Articog creative visual study 02",
  },
  {
    title: "Creative Visual 03",
    category: "Launch Assets",
    description: "High-contrast campaign imagery designed to hold attention across digital channels.",
    number: "03",
    src: "https://res.cloudinary.com/hmy5ctzy/image/upload/v1788795060/hf_20260821_075104_3836aa7f-4399-4256-9bc3-022992543e67.png",
    alt: "Articog creative visual study 03",
  },
  {
    title: "Creative Visual 04",
    category: "Product Storytelling",
    description: "Cinematic product presentation balancing sharp detail, atmosphere, and conversion intent.",
    number: "04",
    src: "https://res.cloudinary.com/hmy5ctzy/image/upload/v1788795060/hf_20260821_083052_c34ee14c-6e9a-4c17-8f3b-34e90869a8c4.png",
    alt: "Articog creative visual study 04",
  },
  {
    title: "Creative Visual 05",
    category: "Social Creative",
    description: "Platform-native motion concepts designed to feel premium while remaining instantly readable.",
    number: "05",
    src: "https://res.cloudinary.com/hmy5ctzy/image/upload/v1788795060/hf_20260821_081708_9bf57f26-425b-47f7-b199-bad796e7f256.png",
    alt: "Articog creative visual study 05",
  },
  {
    title: "Creative Visual 06",
    category: "Creative Direction",
    description: "Refined art direction and visual depth applied to campaign work for modern brands.",
    number: "06",
    src: "https://res.cloudinary.com/hmy5ctzy/image/upload/v1788795059/hf_20260821_083339_49c07db6-34ef-4c24-9479-eba4ece0cc6f.png",
    alt: "Articog creative visual study 06",
  },
];

const getCloudinaryUrl = (src: string, width: number) =>
  src.replace("/image/upload/", `/image/upload/f_auto,q_auto:good,dpr_auto,w_${width},c_limit/`);

export function CreativeDocument() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const activeProject = projects[activeIndex];

  const moveProject = (direction: number) => {
    setActiveIndex((current) => (current + direction + projects.length) % projects.length);
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
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProject]);

  return (
    <section className={styles.showcase} aria-label="Portfolio showcase">
      <div className={styles.headerRow}>
        <div>
          <p className={styles.kicker}>Selected work</p>
          <h2>Creative work built to feel premium on every screen.</h2>
        </div>
      </div>

      <div className={styles.gallery} aria-live="polite">
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
                onClick={() => setSelectedProject(project)}
                aria-label={`Open ${project.alt} in a larger preview`}
              >
                <Image
                  src={getCloudinaryUrl(project.src, 1200)}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 640px) 88vw, (max-width: 1024px) 72vw, 58vw"
                  priority={isActive}
                  quality={75}
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

      <div className={styles.metaRow}>
        <div className={styles.projectInfo}>
          <span className={styles.category}>{activeProject.category}</span>
          <h3>{activeProject.title}</h3>
          <p>{activeProject.description}</p>
          <a href="/work" className={styles.viewProject}>View Project</a>
        </div>
      </div>

      {selectedProject && (
        <div className={styles.modal} role="dialog" aria-modal="true" aria-label={selectedProject.alt} onClick={() => setSelectedProject(null)}>
          <button type="button" className={styles.close} onClick={() => setSelectedProject(null)} aria-label="Close portfolio preview">
            <X size={20} aria-hidden="true" />
          </button>
          <div className={styles.modalFrame}>
            <Image
              src={getCloudinaryUrl(selectedProject.src, 1800)}
              alt={selectedProject.alt}
              fill
              sizes="(max-width: 768px) 90vw, 70vw"
              quality={80}
              loading="lazy"
              className={styles.modalImage}
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}
