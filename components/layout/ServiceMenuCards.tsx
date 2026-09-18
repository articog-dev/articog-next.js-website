"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/components/ui/Link";

export const primaryServiceCards = [
  {
    number: "01",
    title: "Brand Films & Commercials",
    description: "Cinematic stories that bring your brand to life.",
    href: "/services/ai-video-production",
    image: "/services/articog-service-01-brand-films-image-only.jpg",
    alt: "Cinematic brand film production",
    objectPosition: "center 48%",
  },
  {
    number: "02",
    title: "Creator-Style Social Content",
    description: "Authentic, scroll-stopping videos for today's platforms.",
    href: "/services/social-creative",
    image: "/services/articog-creator-social.jpg",
    alt: "Creator-style social content production",
    objectPosition: "center 42%",
  },
  {
    number: "03",
    title: "Performance Creative Variants",
    description: "Data-driven creative variations built for campaign performance.",
    href: "/services/ad-creative",
    image: "/services/articog-service-03-performance-creative-image-only.jpg",
    alt: "Performance creative production workspace",
    objectPosition: "center 44%",
  },
  {
    number: "04",
    title: "Every Service, One Team",
    description: "Product visuals, audio, strategy and post-production — all under one roof.",
    href: "/services",
    image: "/services/articog-creative-workflow.jpg",
    alt: "Creative workflow automation system",
    objectPosition: "center 50%",
  },
] as const;

export function ServiceMenuCards({ onClose }: { onClose: () => void }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {primaryServiceCards.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          className="group relative isolate flex min-h-[250px] min-w-0 flex-col justify-end overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:min-h-[200px] lg:p-4"
        >
          <Image
            src={item.image}
            alt={item.alt}
            fill
            loading="eager"
            unoptimized
            sizes="(max-width: 639px) calc(100vw - 96px), (max-width: 1279px) 50vw, 280px"
            className="-z-20 object-cover object-center transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            style={{ objectPosition: item.objectPosition }}
          />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-black/75 via-black/20 to-transparent" aria-hidden="true" />
          <div className="relative flex items-center justify-between text-[10px] font-medium tracking-[0.18em] text-white/60">
            <span>{item.number}</span>
            <ArrowUpRight size={16} className="text-white/70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" aria-hidden="true" />
          </div>
          <h4 className="relative mt-3 max-w-[15rem] text-lg font-semibold leading-tight text-white">
            {item.title}
          </h4>
          <p className="relative mt-2 max-w-[17rem] text-xs leading-relaxed text-white/65">
            {item.description}
          </p>
        </Link>
      ))}
    </div>
  );
}
