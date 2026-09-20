"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/components/ui/Link";
import { primaryServiceCards } from "./service-menu-data";

export { primaryServiceCards } from "./service-menu-data";
export type { ServiceMenuItem } from "./service-menu-data";

interface ServiceMenuProps {
  onClose: () => void;
}

export function ServiceMenuDesktop({ onClose }: ServiceMenuProps) {
  return (
    <div>
      <div className="grid grid-cols-4 gap-3">
        {primaryServiceCards.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            onClick={onClose}
            className="group relative isolate flex min-h-[220px] min-w-0 flex-col justify-end overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(max-width: 1024px) 25vw, 300px"
              className="absolute inset-0 -z-10 object-cover transition-transform duration-300 group-hover:scale-105"
              style={{ objectPosition: item.objectPosition }}
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/95 via-black/50 to-black/5" />
            <div className="relative z-10 mb-auto flex items-start justify-between">
              <span className="text-[11px] tabular-nums text-white/45">{item.number}</span>
              <ArrowUpRight
                size={15}
                className="text-white/35 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                aria-hidden="true"
              />
            </div>
            <div className="relative z-10">
              <h3 className="mb-1 min-h-[44px] text-[14.5px] font-medium leading-snug text-white line-clamp-2">
                {item.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-3 border-t border-white/10 pt-3">
        <Link
          href="/services"
          onClick={onClose}
          className="inline-flex items-center gap-2 text-[12px] text-white/55 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
        >
          See all services
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export function ServiceMenuMobile({ onClose }: ServiceMenuProps) {
  return (
    <div className="flex flex-col gap-1 pl-3 pb-4">
      {primaryServiceCards.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          onClick={onClose}
          className="flex min-h-11 items-center gap-3 rounded-lg px-2 py-2.5 transition-colors active:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
        >
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md">
            <Image
              src={item.image}
              alt={item.alt}
              fill
              loading="lazy"
              sizes="44px"
              className="object-cover"
              style={{ objectPosition: item.objectPosition }}
            />
          </span>
          <span className="min-w-0">
            <span className="block text-[13px] font-medium text-white/85">
              {item.title}
            </span>
            <span className="block truncate text-[11.5px] text-white/45">
              {item.description}
            </span>
          </span>
          <ArrowUpRight
            size={14}
            className="ml-auto shrink-0 text-white/25"
            aria-hidden="true"
          />
        </Link>
      ))}
      <Link
        href="/services"
        onClick={onClose}
        className="flex min-h-11 items-center px-2 py-2.5 text-[13px] text-white/55 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
      >
        See all services
        <ArrowRight size={14} className="ml-2" aria-hidden="true" />
      </Link>
    </div>
  );
}
