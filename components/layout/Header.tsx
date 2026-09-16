"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Link } from "@/components/ui/Link";
import {
  ChevronDown,
  Menu,
} from "lucide-react";
import { Button, Container } from "@/components/ui";
import { MobileMenu } from "./MobileMenu";

// ─── Navigation Data ─────────────────────────────────────────────────────────

export const menuGroups = [
  {
    label: "Services",
    links: [
      { label: "Overview", href: "/services" },
      {
        label: "AI Video Production",
        href: "/services/ai-video-production",
      },
      { label: "Ad Creative", href: "/services/ad-creative" },
      { label: "Social Creative", href: "/services/social-creative" },
      { label: "Product Visuals", href: "/services/product-visuals" },
      { label: "Audio & Sound", href: "/services/audio" },
      {
        label: "Creative Strategy",
        href: "/services/creative-strategy",
      },
      {
        label: "Post-Production",
        href: "/services/post-production",
      },
    ],
  },
  {
    label: "Solutions",
    links: [
      { label: "Overview", href: "/solutions" },
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
    links: [
      { label: "Portfolio Overview", href: "/work" },
    ],
  },
  {
    label: "Why Articog",
    links: [
      {
        label: "Production Economics",
        href: "/why-articog/production-economics",
      },
      {
        label: "How It Works",
        href: "/how-it-works",
      },
      {
        label: "AI Creative Pipeline",
        href: "/how-it-works/ai-creative-pipeline",
      },
      {
        label: "Trust Center",
        href: "/trust",
      },
      {
        label: "Responsible AI",
        href: "/trust/ai-and-ip",
      },
      {
        label: "Security & Data",
        href: "/trust/security",
      },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Help Center", href: "/help" },
      { label: "AI Ad Library", href: "/ai-ad-library" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press & Media", href: "/press" },
      { label: "Newsletter", href: "/newsletter" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

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
  const isServices = group.label === "Services";

  if (!isOpen) {
    return null;
  }

  const servicePanelStyle = {
    left: "50%",
    top: "72px",
    transform: "translateX(-50%)",
    width: "min(100vw - 64px, 1120px)",
    maxWidth: "1120px",
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
        className="w-full overflow-hidden rounded-2xl"
        style={{
          background: "rgba(6,6,6,0.98)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.05)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          padding: isServices ? "28px 28px 24px" : "12px",
          maxHeight: "calc(100vh - 88px)",
          overflowY: "auto",
        }}
      >
        {isServices ? (
          <ServicesContent onClose={onClose} />
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
}: {
  onClose: () => void;
}) {
  const columns = [
    {
      title: "By Service",
      links: [
        {
          label: "Brand Films",
          href: "/services/ai-video-production",
        },
        {
          label: "Brand Storytelling",
          href: "/services/creative-strategy",
        },
        {
          label: "Commercials & Ads",
          href: "/services/ad-creative",
        },
        {
          label: "Campaign Visuals & Product Imagery",
          href: "/services/product-visuals",
        },
        {
          label: "Audio Ads",
          href: "/services/audio",
        },
      ],
    },
    {
      title: "By Channel",
      links: [
        {
          label: "Social Media",
          href: "/work/social",
        },
        {
          label: "Paid Advertising",
          href: "/services/ad-creative",
        },
        {
          label: "Streaming Audio",
          href: "/services/audio",
        },
        {
          label: "OOH & Print",
          href: "/services/product-visuals",
        },
        {
          label: "YouTube & Video",
          href: "/services/ai-video-production",
        },
      ],
    },
    {
      title: "By Goal",
      links: [
        {
          label: "Brand Awareness",
          href: "/solutions/product-launch",
        },
        {
          label: "Performance Marketing",
          href: "/solutions/performance-marketing",
        },
        {
          label: "Product Launch",
          href: "/solutions/product-launch",
        },
        {
          label: "Content at Scale",
          href: "/solutions/monthly-creative-subscription",
        },
      ],
    },
    {
      title: "Quick Links",
      links: [
        {
          label: "View All Services",
          href: "/services",
        },
        {
          label: "How It Works",
          href: "/how-it-works",
        },
        {
          label: "Case Studies",
          href: "/work",
        },
        {
          label: "Book a Demo",
          href: "/book-a-demo",
        },
      ],
    },
  ];

  return (
    <>
      {/* Service Categories */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8">
        {columns.map((col) => (
          <div key={col.title} className="min-w-0">
            <h5 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500 sm:text-[11px]">
              {col.title}
            </h5>

            <div className="flex flex-col gap-3">
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="w-fit text-[13px] font-medium text-zinc-400 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [dropdownAnchor, setDropdownAnchor] = useState<HTMLElement | null>(null);

  const headerRef = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);

      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

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

  return (
    <>
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
            <Image
              src="/articog-logo-white.png"
              alt="Articog logo"
              width={2000}
              height={2000}
              className="absolute left-0 top-[-30px] h-20 w-20 max-w-none"
              priority
            />
          </Link>

          {/* Desktop Navigation */}

          <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1">
            {menuGroups.map((group) => (
              <div
                key={group.label}
                className="relative nav-group-container"
                onMouseEnter={(event) => openGroup(group.label, event.currentTarget as HTMLElement)}
                onMouseLeave={scheduleClose}
                onClick={(e) => e.stopPropagation()}
                style={{
                  zIndex:
                    activeGroup === group.label
                      ? 99999
                      : 1,
                }}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  onMouseEnter={(event) => openGroup(group.label, event.currentTarget.parentElement ?? event.currentTarget)}
                  aria-expanded={
                    activeGroup === group.label
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleGroup(group.label, e.currentTarget.parentElement ?? e.currentTarget);
                  }}
                  className="inline-flex items-center gap-1 rounded-full px-2 py-2 type-nav transition-colors duration-150 xl:px-3"
                  style={{
                    color:
                      activeGroup === group.label
                        ? "rgba(255,255,255,0.95)"
                        : "rgba(255,255,255,0.55)",
                  }}
                >
                  {group.label}

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

                <DropdownPanel
                  group={group}
                  onClose={closeDropdown}
                  isOpen={
                    activeGroup === group.label
                  }
                  anchorElement={dropdownAnchor}
                />
              </div>
            ))}
          </nav>

          {/* CTA */}

          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="primary"
              size="sm"
              className="hidden sm:flex"
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
              onClick={() => {
                setActiveGroup(null);
                setMobileOpen(true);
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.10] text-white/55 transition-colors hover:text-white/90 lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={17} />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}