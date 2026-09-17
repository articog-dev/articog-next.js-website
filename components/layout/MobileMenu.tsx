"use client";
import { useState, useEffect, useRef } from "react";
import { Link } from "@/components/ui/Link";
import { X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui";
import { menuGroups } from "./Header";
import { ServiceMenuCards } from "./ServiceMenuCards";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (isOpen) closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleClose = () => {
    setOpenGroups([]);
    onClose();
  };

  const toggleGroup = (label: string) => {
    setOpenGroups(prev => 
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        ref={dialogRef}
        id="mobile-navigation"
        className="fixed right-0 top-0 z-50 h-full w-80 flex flex-col"
        style={{ background: "#060606", borderLeft: "1px solid rgba(255,255,255,0.08)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 shrink-0">
          <span className="type-h4 text-white">Articog</span>
          <button
            type="button"
            ref={closeButtonRef}
            onClick={handleClose}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.10] text-white/45 transition-colors hover:text-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 px-6 pb-4">
          <Link
            href="/work"
            onClick={handleClose}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            View Work
          </Link>
          <Link
            href="/book-a-demo"
            onClick={handleClose}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            Book a Demo
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex flex-col flex-1 overflow-y-auto px-4 pb-12">
          {menuGroups.map((group) => {
            const isGroupOpen = openGroups.includes(group.label);
            const isDirectGroup =
              group.label === "Solutions" ||
              group.label === "Work" ||
              group.label === "Industries";

            if (isDirectGroup) {
              return (
                <div key={group.label} className="border-b border-white/[0.04]">
                  <Link
                    href={
                      group.label === "Solutions"
                        ? "/solutions"
                        : group.label === "Industries"
                          ? "/industries"
                          : "/work"
                    }
                    onClick={handleClose}
                    className="flex w-full items-center rounded-full px-3 py-4 font-sans text-[14px] font-medium text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {group.label}
                  </Link>
                </div>
              );
            }

            return (
              <div key={group.label} className="border-b border-white/[0.04]">
                <button
                  type="button"
                  onClick={() => toggleGroup(group.label)}
                  aria-expanded={isGroupOpen}
                  aria-controls={`mobile-menu-${group.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="w-full flex items-center justify-between rounded-full px-3 py-4 font-sans text-[14px] font-medium text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>{group.label}</span>
                  <ChevronDown
                    size={14}
                    className="opacity-40 transition-transform duration-200"
                    style={{ transform: isGroupOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>

                {isGroupOpen && (
                  group.label === "Services" ? (
                    <div id="mobile-menu-services" className="pb-4">
                      <ServiceMenuCards onClose={handleClose} />
                    </div>
                  ) : (
                    <div id={`mobile-menu-${group.label.toLowerCase().replace(/\s+/g, "-")}`} className="flex flex-col gap-1 pb-4 pl-3">
                      {group.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={handleClose}
                          className="flex min-h-11 items-center rounded-lg px-3 py-2 font-sans text-[13px] text-white/50 transition-colors hover:text-white/85"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )
                )}
              </div>
            );
          })}

        </nav>

        {/* CTA */}
        <div className="px-6 pb-8 pt-6 shrink-0 bg-[#060606]">
          <Button asChild variant="primary" size="lg" className="w-full">
            <Link href="/book-a-demo" onClick={handleClose}>Book a Demo</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
