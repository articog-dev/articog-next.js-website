"use client";

import { Link } from "@/components/ui/Link";

type FooterSection = {
  title: string;
  links: { label: string; href: string }[];
};

export function FooterNavSections({ sections }: { sections: FooterSection[] }) {
  return (
    <>
      <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2 md:col-span-3 md:grid-cols-[repeat(3,minmax(0,1fr))]">
        {sections.map((section) => (
          <div key={section.title} className="hidden min-w-0 space-y-4 md:block">
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-safe">
              {section.title}
            </p>
            <nav className="flex flex-col gap-2">
              {section.links.map((item) => (
                <Link key={item.href} href={item.href} className="type-small w-fit text-muted-safe transition-colors hover:text-white/80">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      <div className="col-span-full flex flex-col md:hidden">
        {sections.map((section) => (
          <details key={section.title} className="border-t border-white/10 py-4 last:border-b">
            <summary className="flex cursor-pointer list-none items-center justify-between font-display text-xs font-semibold uppercase tracking-widest text-muted-safe marker:hidden">
              {section.title}
              <span aria-hidden="true" className="text-base font-normal">+</span>
            </summary>
            <nav className="flex flex-col gap-3 pt-4">
              {section.links.map((item) => (
                <Link key={item.href} href={item.href} className="type-small w-fit text-muted-safe transition-colors hover:text-white/80">
                  {item.label}
                </Link>
              ))}
            </nav>
          </details>
        ))}
      </div>
    </>
  );
}
