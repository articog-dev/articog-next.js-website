"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/components/ui/Link";
import {
  ArrowUp,
  ChevronDown,
  Menu,
  MessageSquareText,
  MonitorSmartphone,
  MoonStar,
  SunMedium,
} from "lucide-react";
import { Button, Container } from "@/components/ui";
import { SearchCommand } from "@/components/search/SearchCommand";
import { MobileMenu } from "./MobileMenu";
import { ServiceMenuDesktop } from "./ServiceMenuCards";
import { MenuImagePreload } from "./MenuImagePreload";
import { topLevelServiceLinks } from "@/lib/service-navigation";
import { applyTheme, getStoredTheme, type ThemePreference } from "@/lib/theme";
import { captureFirstTouchUTM } from "@/lib/utm";

// ─── Navigation Data ─────────────────────────────────────────────────────────

export const menuGroups = [
  {
    label: "What We Do",
    links: [
      { label: "Overview", href: "/services" },
      ...topLevelServiceLinks.map(({ label, href }) => ({ label, href })),
      {
        label: "Monthly Subscription",
        href: "/solutions/monthly-creative-subscription",
      },
      {
        label: "Performance Marketing",
        href: "/solutions/performance-marketing",
      },
      {
        label: "Enterprise Solutions",
        href: "/solutions/enterprise",
      },
      {
        label: "Product Launch",
        href: "/solutions/product-launch",
      },
      {
        label: "Creative Team Extension",
        href: "/solutions/creative-team-overflow",
      },
    ],
  },
  {
    label: "Industries",
    links: [
      { label: "Overview", href: "/industries" },
      {
        label: "DTC & E-commerce",
        href: "/industries#dtc-ecommerce",
      },
      {
        label: "SaaS & Technology",
        href: "/industries#saas-technology",
      },
      {
        label: "Automotive & Mobility",
        href: "/industries#automotive-mobility",
      },
      {
        label: "Food & Beverage",
        href: "/industries#food-beverage",
      },
      {
        label: "Fashion & Lifestyle",
        href: "/industries#fashion-lifestyle",
      },
      {
        label: "Real Estate",
        href: "/industries#real-estate",
      },
      {
        label: "Consumer Electronics",
        href: "/industries#consumer-electronics",
      },
      {
        label: "Beauty & Skincare",
        href: "/industries#beauty-skincare",
      },
    ],
  },
  {
    label: "Work",
    links: [],
  },
  {
    label: "Why Articog",
    links: [],
  },
  {
    label: "Blog",
    links: [],
  },
  {
    label: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press & Media", href: "/press" },
      { label: "Help Center", href: "/help" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const groupHubHrefs: Record<string, string> = {
  "What We Do": "/services",
  Industries: "/industries",
  Work: "/work",
  "Why Articog": "/why-articog",
  Blog: "/blog",
  Company: "/about",
};

export const NO_DROPDOWN_GROUPS = ["Work", "Industries"];

// ─── Dropdown Panel ───────────────────────────────────────────────────────────

function DropdownPanel({
  group,
  onClose,
  isOpen,
  anchorElement,
}: {
  group:
    | (typeof menuGroups)[0]
    | {
        label: string;
        links: { label: string; href: string }[];
      };
  onClose: () => void;
  isOpen: boolean;
  anchorElement?: HTMLElement | null;
}) {
  const isServices = group.label === "What We Do";

  if (!isOpen) {
    return null;
  }

  const servicePanelStyle = {
    left: "calc(50% - 20px)",
    transform: "translateX(-50%)",
    top: "72px",
    width: "min(calc(100vw - 320px), 880px)",
    maxWidth: "calc(100vw - 320px)",
    paddingTop: "12px",
  } as const;

  const simplePanelStyle = (() => {
    if (typeof window === "undefined") {
      return {
        position: "fixed" as const,
        left: "16px",
        top: "72px",
        width: "320px",
        maxWidth: "calc(100vw - 32px)",
        paddingTop: "12px",
      };
    }

    const rect = anchorElement?.getBoundingClientRect();
    const panelWidth = Math.min(window.innerWidth - 32, 320);
    const left = rect
      ? Math.min(
          Math.max(rect.left, 16),
          window.innerWidth - panelWidth - 16,
        )
      : 16;
    const top = rect ? rect.bottom + 12 : 72;

    return {
      position: "fixed" as const,
      left: `${left}px`,
      top: `${top}px`,
      width: `${panelWidth}px`,
      maxWidth: "calc(100vw - 32px)",
      paddingTop: "0px",
    };
  })();

  return (
    <div
      className="z-[99999]"
      style={isServices ? { ...servicePanelStyle, position: "fixed" } : simplePanelStyle}
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={clearTimeoutOnMouseEnter}
    >
      <div
        className="w-full overflow-hidden rounded-2xl motion-safe:animate-[dropdownIn_200ms_ease-out_both]"
        style={{
          background: "rgba(6,6,6,1)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.05)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          padding: "1.5rem",
          maxHeight: "calc(100vh - 88px)",
          overflowY: "auto",
        }}
      >
        {isServices ? (
          <ServicesContent onClose={onClose} links={group.links} />
        ) : (
          <div className="flex flex-col gap-1">
            {group.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => onClose()}
                className="block rounded-lg px-3 py-2 type-nav text-white/60 transition-colors duration-150 hover:bg-white/[0.04] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function clearTimeoutOnMouseEnter() {
  // Keeps the dropdown open while moving the mouse into it.
}

// ─── Services Dropdown Content ────────────────────────────────────────────────

function ServicesContent({
  onClose,
  links,
}: {
  onClose: () => void;
  links: { label: string; href: string }[];
}) {
  return (
    <>
      <ServiceMenuDesktop onClose={onClose} />
      <div className="mt-3 border-t border-white/10 pt-3">
        <p className="px-3 pb-4 type-caption uppercase tracking-widest text-white/35">Solutions</p>
        <div className="grid gap-y-1 sm:grid-cols-2">
          {links.filter((link) => link.href.startsWith("/solutions/")).map((link) => (
            <Link key={link.href} href={link.href} onClick={onClose} className="block rounded-lg px-3 py-2.5 type-nav text-white/60 transition-colors hover:bg-white/[0.04] hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuImagePreload, setMenuImagePreload] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showFloatingContact, setShowFloatingContact] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [dropdownAnchor, setDropdownAnchor] = useState<HTMLElement | null>(null);
  const [theme, setTheme] = useState<ThemePreference>(() => getStoredTheme());

  const headerRef = useRef<HTMLElement | null>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const themeOptions: Array<{
    value: ThemePreference;
    label: string;
    Icon: typeof SunMedium;
  }> = [
    { value: "light", label: "Light theme", Icon: SunMedium },
    { value: "system", label: "System theme", Icon: MonitorSmartphone },
    { value: "dark", label: "Dark theme", Icon: MoonStar },
  ];

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    captureFirstTouchUTM();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const safeScrollY = window.scrollY || 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll > 0 ? Math.min(safeScrollY / maxScroll, 1) : 0;

      setScrolled(safeScrollY > 32);
      setShowBackToTop(safeScrollY > 400);
      setShowFloatingContact(
        safeScrollY > 240 && pathname !== "/book-a-demo" && pathname !== "/thank-you",
      );
      setShowProgressBar(maxScroll > window.innerHeight + 24);
      setScrollProgress(nextProgress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);

      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!activeGroup) {
        return;
      }

      const target = event.target as Node;

      if (
        headerRef.current &&
        !headerRef.current.contains(target)
      ) {
        setActiveGroup(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [activeGroup]);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openGroup = (label: string, element?: HTMLElement | null) => {
    clearCloseTimer();
    setDropdownAnchor(element ?? null);
    setActiveGroup(label);
  };

  const scheduleClose = () => {
    clearCloseTimer();

    closeTimer.current = setTimeout(() => {
      setActiveGroup(null);
      setDropdownAnchor(null);
    }, 250);
  };

  const toggleGroup = (label: string, element?: HTMLElement | null) => {
    clearCloseTimer();
    setDropdownAnchor(element ?? null);

    setActiveGroup((current) =>
      current === label ? null : label
    );
  };

  const closeDropdown = () => {
    clearCloseTimer();
    setActiveGroup(null);
    setDropdownAnchor(null);
  };

  useEffect(() => {
    if (!activeGroup) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (closeTimer.current) {
          clearTimeout(closeTimer.current);
          closeTimer.current = null;
        }
        setActiveGroup(null);
        setDropdownAnchor(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeGroup]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    requestAnimationFrame(() => mobileMenuButtonRef.current?.focus());
  };

  const updateTheme = (nextTheme: ThemePreference) => {
    setTheme(nextTheme);
    applyTheme(nextTheme);

    try {
      window.localStorage.setItem("articog-theme-preference", nextTheme);
    } catch {
      // Ignore storage failures gracefully.
    }
  };

  const handleBackToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const focusTarget = document.getElementById("main-content");

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    if (focusTarget) {
      focusTarget.focus();
    }
  };

  return (
    <>
      {showProgressBar ? (
        <div className="pointer-events-none fixed left-0 right-0 top-0 z-[1200] h-0.5 overflow-hidden bg-transparent" aria-hidden={!showProgressBar}>
          <div
            role="progressbar"
            aria-label="Reading progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(scrollProgress * 100)}
            className="h-full origin-left bg-[var(--brand-accent)]"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>
      ) : null}

      <header
        ref={headerRef}
        className={`fixed left-0 right-0 top-9 z-[1000] transition-all duration-300 ${
          mobileOpen ? "hidden lg:block" : ""
        }`}
        style={{
          background: scrolled
            ? "rgba(0,0,0,0.90)"
            : "transparent",
          backdropFilter: scrolled
            ? "blur(16px)"
            : "none",
          WebkitBackdropFilter: scrolled
            ? "blur(16px)"
            : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid transparent",
        }}
      >
        <Container className="relative flex h-16 items-center justify-between">

          {/* Logo */}

          <Link
            href="/"
            className="relative inline-flex h-6 w-20 overflow-hidden transition-opacity hover:opacity-75"
            onClick={closeDropdown}
          >
            <span className="font-display text-lg font-semibold tracking-[-0.02em] text-white">Articog</span>
          </Link>

          {/* Desktop Navigation */}

          <nav className="hidden items-center gap-0.5 lg:flex">
            {menuGroups.map((group) => {
              const isDirectGroup =
                group.links.length === 0 ||
                NO_DROPDOWN_GROUPS.includes(group.label);

              return (
              <div
                key={group.label}
                className="relative nav-group-container"
                onMouseEnter={isDirectGroup ? undefined : (event) => openGroup(group.label, event.currentTarget as HTMLElement)}
                onMouseLeave={isDirectGroup ? undefined : scheduleClose}
                onClick={(e) => e.stopPropagation()}
                style={{
                  zIndex:
                    activeGroup === group.label
                      ? 99999
                      : 1,
                }}
              >
                <div
                  className={`inline-flex items-center rounded-full px-2 py-2 transition-colors duration-150 xl:px-3 ${
                    activeGroup === group.label ? "bg-white/[0.06]" : "bg-transparent"
                  }`}
                >
                  <Link
                    href={groupHubHrefs[group.label]}
                    onClick={closeDropdown}
                    onPointerEnter={group.label === "What We Do" ? () => setMenuImagePreload(true) : undefined}
                    onFocus={group.label === "What We Do" ? () => setMenuImagePreload(true) : undefined}
                    className={`type-nav transition-colors duration-150 ${activeGroup === group.label ? "text-white" : "text-white/55"}`}
                  >
                    {group.label === "What We Do" ? "Services" : group.label}
                  </Link>
                  {!isDirectGroup && (
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-label={`Open ${group.label} menu`}
                      aria-expanded={activeGroup === group.label}
                      onMouseEnter={(event) => openGroup(group.label, event.currentTarget.parentElement?.parentElement ?? event.currentTarget)}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleGroup(group.label, e.currentTarget.parentElement?.parentElement ?? e.currentTarget);
                      }}
                      className="flex min-h-6 min-w-6 items-center justify-center"
                    >
                      <ChevronDown
                        size={11}
                        className="opacity-30 transition-transform duration-200"
                        style={{
                          transform:
                            activeGroup === group.label
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                        }}
                      />
                    </button>
                  )}
                </div>

                {!isDirectGroup && (
                  <DropdownPanel
                    group={group}
                    onClose={closeDropdown}
                    isOpen={activeGroup === group.label}
                    anchorElement={dropdownAnchor}
                  />
                )}
              </div>
              );
            })}
          </nav>

          {/* CTA */}

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/20 p-1 backdrop-blur-sm sm:flex">
              {themeOptions.map(({ value, label, Icon }) => (
                <button
                  key={value}
                  type="button"
                  aria-label={label}
                  aria-pressed={theme === value}
                  onClick={() => updateTheme(value)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                    theme === value ? "bg-white text-black" : "text-white/60 hover:text-white"
                  }`}
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>

            <SearchCommand />

            <Button
              asChild
              variant="primary"
              size="sm"
              className="flex px-4 text-[13px] sm:px-6 sm:text-sm"
            >
              <Link
                href="/book-a-demo"
                onClick={closeDropdown}
              >
                Book a Demo
              </Link>
            </Button>

            {/* Mobile hamburger */}

            <button
              type="button"
              ref={mobileMenuButtonRef}
              onClick={() => {
                setActiveGroup(null);
                setMobileOpen(true);
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.10] text-white/55 transition-colors hover:text-white/90 lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              <Menu size={17} />
            </button>
          </div>
        </Container>
      </header>

      {showBackToTop ? (
        <button
          type="button"
          onClick={handleBackToTop}
          className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-[1040] flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/80 text-white shadow-lg shadow-black/30 backdrop-blur-md transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
        </button>
      ) : null}

      {showFloatingContact ? (
        <Link
          href="/book-a-demo"
          className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-4 z-[1040] flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-black shadow-lg shadow-black/25 transition-opacity hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label="Book a demo"
        >
          <MessageSquareText size={15} />
          <span>Book a demo</span>
        </Link>
      ) : null}

      <MobileMenu
        isOpen={mobileOpen}
        onClose={closeMobileMenu}
      />
      <MenuImagePreload preload={menuImagePreload} />
    </>
  );
}