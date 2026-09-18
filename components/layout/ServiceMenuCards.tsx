"use client";

import { useState } from "react";
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
  const [active, setActive] = useState(0);
  const activeItem = primaryServiceCards[active];

  return (
    <div className="grid grid-cols-[1.15fr_1fr] gap-5">
      <div className="flex min-w-0 flex-col">
        <div className="flex flex-col gap-1">
          {primaryServiceCards.map((item, index) => {
            const isActive = active === index;

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={(event) => {
                  event.stopPropagation();
                  onClose();
                }}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className={`group flex items-center gap-3.5 rounded-lg px-3 py-3 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 ${
                  isActive ? "bg-white/[0.06]" : "bg-transparent"
                }`}
              >
                <span className="w-5 shrink-0 tabular-nums text-[11px] text-white/35">
                  {item.number}
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-medium text-white">
                    {item.title}
                  </span>
                  <span className="block text-[12.5px] leading-relaxed text-white/50">
                    {item.description}
                  </span>
                </span>
                <ArrowUpRight
                  size={16}
                  className={`ml-auto shrink-0 transition-colors duration-150 motion-reduce:transition-none ${
                    isActive ? "text-white/60" : "text-white/20"
                  }`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
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

      <div className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
          {primaryServiceCards.map((item, index) => (
            <Image
              key={item.image}
              src={item.image}
              alt={item.alt}
              fill
              priority={index === 0}
              loading={index === 0 ? undefined : "eager"}
              sizes="380px"
              className={`absolute inset-0 object-cover transition-opacity duration-[250ms] motion-reduce:transition-none ${
                active === index ? "opacity-100" : "opacity-0"
              }`}
              style={{ objectPosition: item.objectPosition }}
            />
          ))}
        </div>
        <div className="mt-3">
          <span className="inline-flex rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-white/60">
            Featured work
          </span>
          <p className="mt-2 text-[13px] leading-relaxed text-white">
            {activeItem.caption}
          </p>
        </div>
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
