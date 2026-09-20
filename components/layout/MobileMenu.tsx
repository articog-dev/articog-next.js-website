"use client";
import { useState, useEffect, useRef } from "react";
import { Link } from "@/components/ui/Link";
import { Button } from "@/components/ui";
import { X, ChevronDown } from "lucide-react";
import { menuGroups, groupHubHrefs, NO_DROPDOWN_GROUPS } from "./Header";
import { ServiceMenuMobile } from "./ServiceMenuCards";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const [isRendered, setIsRendered] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

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

  useEffect(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    if (isOpen && !isRendered) {
      const openFrame = requestAnimationFrame(() => {
        setIsRendered(true);
        requestAnimationFrame(() => setIsDrawerVisible(true));
      });

      return () => cancelAnimationFrame(openFrame);
    } else if (!isOpen && isRendered) {
      const closeFrame = requestAnimationFrame(() => setIsDrawerVisible(false));
      closeTimeoutRef.current = setTimeout(() => {
        setIsRendered(false);
        closeTimeoutRef.current = null;
      }, 300);

      return () => {
        cancelAnimationFrame(closeFrame);
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = null;
        }
      };
    }

    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    };
  }, [isOpen, isRendered]);

  useEffect(() => {
    if (isOpen && isRendered) closeButtonRef.current?.focus();
  }, [isOpen, isRendered]);

  const handleClose = () => {
    setOpenGroups([]);
    onClose();
  };

  const toggleGroup = (label: string) => {
    setOpenGroups(prev => 
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  if (!isRendered) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[1050]"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        ref={dialogRef}
        id="mobile-navigation"
        className="fixed inset-x-0 top-0 z-[1100] flex h-[100dvh] w-[85%] max-w-[360px] flex-col overflow-hidden transition-[clip-path] duration-400 ease-out"
        style={{
          background: "#060606",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          clipPath: isDrawerVisible ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex h-16 shrink-0 items-center justify-between px-6 pt-[env(safe-area-inset-top)]">
          <Link
            href="/"
            onClick={handleClose}
            className="relative inline-flex h-6 w-20 overflow-hidden transition-opacity hover:opacity-75"
          >
            <span className="font-display text-lg font-semibold tracking-[-0.02em] text-white">Articog</span>
          </Link>
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

        {/* Nav */}
        <nav
          className="mobile-nav-scroll flex flex-1 min-h-0 flex-col overflow-y-auto px-4 pb-8"
          style={{ maxHeight: "calc(100dvh - 4rem)", scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.25) transparent" }}
        >
          {menuGroups.map((group) => {
            const isGroupOpen = openGroups.includes(group.label);
            const isDirectGroup =
              group.links.length === 0 ||
              NO_DROPDOWN_GROUPS.includes(group.label);

            if (isDirectGroup) {
              return (
                <div key={group.label} className="border-b border-white/[0.04]">
                  <Link
                    href={groupHubHrefs[group.label]}
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
                <div className="flex items-center">
                  <Link
                    href={groupHubHrefs[group.label]}
                    onClick={handleClose}
                    className="flex min-h-12 flex-1 items-center rounded-full px-3 py-4 font-sans text-[14px] font-medium text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {group.label}
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.label)}
                    aria-label={`Open ${group.label} menu`}
                    aria-expanded={isGroupOpen}
                    aria-controls={`mobile-menu-${group.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex min-h-12 min-w-12 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                  <ChevronDown
                    size={14}
                    className="opacity-40 transition-transform duration-200"
                    style={{ transform: isGroupOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                  </button>
                </div>

                {isGroupOpen && (
                  group.label === "What We Do" ? (
                    <div id="mobile-menu-what-we-do">
                      <ServiceMenuMobile onClose={handleClose} />
                      <div className="border-t border-white/10 pt-3">
                        <p className="px-3 pb-2 type-caption uppercase tracking-widest text-white/35">Solutions</p>
                        {group.links.filter((link) => link.href.startsWith("/solutions/")).map((link) => (
                          <Link key={link.href} href={link.href} onClick={handleClose} className="flex min-h-11 items-center rounded-lg px-3 py-2 font-sans text-[13px] text-white/50 transition-colors hover:text-white/85">
                            {link.label}
                          </Link>
                        ))}
                      </div>
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
          <div className="mt-4 border-t border-white/[0.08] pt-6">
            <Button asChild size="lg" className="w-full">
              <Link href="/book-a-demo" onClick={handleClose}>
                Book a Demo
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}