import Image from "next/image";
import { Link } from "@/components/ui/Link";
import { Linkedin, Youtube, Instagram } from "lucide-react";
import { Container } from "@/components/ui";
import { FooterNavSections } from "./FooterNavSections";

const border = "rgba(255,255,255,0.08)";

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.963 6.817H1.684l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function MediumIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  );
}

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/articog/",
    Icon: Linkedin,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@articogcom",
    Icon: Youtube,
  },
  {
    label: "X",
    href: "https://x.com/articogcom",
    Icon: XIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/articogcom/",
    Icon: Instagram,
  },
  {
    label: "Medium",
    href: "https://medium.com/@articog.com",
    Icon: MediumIcon,
  },
];

const footerNavSections = [
  {
    title: "Services",
    links: [
      { label: "Services", href: "/services" },
      { label: "AI Video Production", href: "/services/ai-video-production" },
      { label: "Ad Creative", href: "/services/ad-creative" },
      { label: "Social Creative", href: "/services/social-creative" },
      { label: "Product Visuals", href: "/services/product-visuals" },
      { label: "Audio & Sound", href: "/services/audio" },
      { label: "Creative Strategy", href: "/services/creative-strategy" },
      { label: "Post-Production", href: "/services/post-production" },
    ],
  },
  {
    title: "Blog",
    links: [
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press & Media", href: "/press" },
      { label: "Pricing", href: "/pricing" },
      { label: "Book a Demo", href: "/book-a-demo" },
      { label: "Help Center", href: "/help" },
      { label: "Contact", href: "/contact" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
];

export function Footer() {
  return (
    /* Adapted from Tailark's Footer component published on 21st.dev:
       https://21st.dev/@meschacirung/components/footer */
    <footer
      style={{ background: "#000000" }}
      className="border-t border-white/5 pt-16"
    >
      <Container className="py-14">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-5">
          {/* Brand */}
          <div className="space-y-4 md:col-span-2">
            <Link
              href="/"
              className="relative inline-flex h-6 w-20 overflow-hidden transition-opacity hover:opacity-75"
            >
              <Image
                src="/articog-logo-white.png"
                alt="Articog logo"
                width={2000}
                height={2000}
                className="absolute left-0 top-[-30px] h-20 w-20 max-w-none"
              />
            </Link>

            <p className="type-small leading-relaxed max-w-xs text-white/60">
              AI-native film and creative production for brands and modern marketing teams.
            </p>

            <div className="flex items-center gap-3.5 pt-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <s.Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <FooterNavSections sections={footerNavSections} />
        </div>

        {/* Bottom */}
        <div
          className="mt-20 grid gap-6 pt-8 text-center md:grid-cols-[minmax(0,1fr)_auto_minmax(10rem,1fr)] md:items-center md:text-left"
          style={{ borderTop: `1px solid ${border}` }}
        >
          <div className="flex flex-col gap-1">
            <p className="font-sans text-xs text-white/60">
              &copy; {new Date().getFullYear()} Articog. All rights reserved.
            </p>

            <p className="font-sans text-[10px] text-white/55 uppercase tracking-widest">
              AI Native Film & Production Company
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:col-start-2 md:row-start-1">
            <Link
              href="/legal/terms-of-service"
              className="font-sans text-[10px] text-white/60 hover:text-white transition-colors uppercase tracking-[0.15em] md:text-[11px] md:text-white/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Terms
            </Link>

            <Link
              href="/privacy-policy"
              className="font-sans text-[10px] text-white/60 hover:text-white transition-colors uppercase tracking-[0.15em] md:text-[11px] md:text-white/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Privacy
            </Link>

            <Link
              href="/legal/accessibility"
              className="font-sans text-[10px] text-white/60 hover:text-white transition-colors uppercase tracking-[0.15em] md:text-[11px] md:text-white/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Accessibility
            </Link>

            <Link
              href="/copyright"
              className="font-sans text-[10px] text-white/60 hover:text-white transition-colors uppercase tracking-[0.15em] md:text-[11px] md:text-white/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Copyright
            </Link>

          </div>
        </div>
      </Container>
    </footer>
  );
}