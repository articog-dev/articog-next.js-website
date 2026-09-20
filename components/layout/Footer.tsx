import Image from "next/image";
import { Link } from "@/components/ui/Link";
import { Linkedin, Youtube, Instagram } from "lucide-react";
import { Container } from "@/components/ui";
import { FooterNavSections } from "./FooterNavSections";

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

function OpenAIIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.28 9.82a5.98 5.98 0 00-.52-4.91 6.05 6.05 0 00-6.51-2.9A6.07 6.07 0 0010.85 0a6.05 6.05 0 00-5.78 4.2 6.02 6.02 0 00-4.02 2.92 6.07 6.07 0 00.74 7.12 5.98 5.98 0 00.52 4.91 6.05 6.05 0 006.51 2.9A6.02 6.02 0 0013.15 24a6.05 6.05 0 005.78-4.2 6.02 6.02 0 004.02-2.92 6.07 6.07 0 00-.67-7.06zm-9.13 12.76a4.47 4.47 0 01-2.87-1.04l.14-.08 4.77-2.75a.78.78 0 00.39-.68v-6.72l2.02 1.16a.07.07 0 01.04.06v5.57a4.5 4.5 0 01-4.49 4.48zM4.06 18a4.46 4.46 0 01-.54-3l.14.08 4.77 2.75a.77.77 0 00.78 0l5.82-3.36v2.33a.08.08 0 01-.03.07l-4.82 2.78A4.5 4.5 0 014.06 18zM2.87 7.68a4.48 4.48 0 012.34-1.97v5.68a.76.76 0 00.39.67l5.82 3.36-2.02 1.17a.07.07 0 01-.07 0L3.84 13.8a4.5 4.5 0 01-.97-6.12zm16.55 3.85l-5.82-3.37 2.02-1.16a.07.07 0 01.07 0l4.66 2.69a4.49 4.49 0 01-.68 8.1v-5.68a.77.77 0 00-.25-.58zm2.01-3.02l-.14-.09-4.77-2.76a.78.78 0 00-.78 0l-5.82 3.36V6.7a.07.07 0 01.03-.06l4.82-2.78a4.5 4.5 0 016.66 4.65zm-12.6 4.15l-2.02-1.16a.08.08 0 01-.04-.06V5.87a4.5 4.5 0 017.38-3.45l-.14.08-4.77 2.75a.78.78 0 00-.39.68zm1.1-2.35l2.6-1.5 2.6 1.5v3l-2.6 1.5-2.6-1.5z" />
    </svg>
  );
}

function ClaudeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2c.8 2.8 2.2 4.2 5 5-2.8.8-4.2 2.2-5 5-.8-2.8-2.2-4.2-5-5 2.8-.8 4.2-2.2 5-5z" transform="rotate(0 12 12)" />
      <path d="M12 2c.8 2.8 2.2 4.2 5 5-2.8.8-4.2 2.2-5 5-.8-2.8-2.2-4.2-5-5 2.8-.8 4.2-2.2 5-5z" transform="rotate(90 12 12)" />
    </svg>
  );
}

function GrokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {Array.from({ length: 10 }).map((_, i) => (
        <path
          key={i}
          d="M12 12L12.6 2.2c-.2-.3-1-.3-1.2 0z"
          transform={`rotate(${i * 36} 12 12)`}
        />
      ))}
    </svg>
  );
}

function GeminiIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3c0 4.97 4.03 9 9 9-4.97 0-9 4.03-9 9 0-4.97-4.03-9-9-9 4.97 0 9-4.03 9-9z" />
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

const aiLinks = [
  {
    label: "ChatGPT",
    href: "https://chat.openai.com/?q=" + encodeURIComponent("Tell me about Articog, an AI-native film and production company: https://articog.com"),
    Icon: OpenAIIcon,
  },
  {
    label: "Claude",
    href: "https://claude.ai/new?q=" + encodeURIComponent("Tell me about Articog, an AI-native film and production company: https://articog.com"),
    Icon: ClaudeIcon,
  },
  {
    label: "Grok",
    href: "https://grok.com/?q=" + encodeURIComponent("Tell me about Articog, an AI-native film and production company: https://articog.com"),
    Icon: GrokIcon,
  },
  {
    label: "Gemini",
    href: "https://gemini.google.com/app?q=" + encodeURIComponent("Tell me about Articog, an AI-native film and production company: https://articog.com"),
    Icon: GeminiIcon,
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
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "What We Do", href: "/services" },
      { label: "Industries", href: "/industries" },
      { label: "Work", href: "/work" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "Why Articog", href: "/why-articog" },
    ],
  },
];

export function Footer() {
  return (
    /* Adapted from Tailark's Footer component published on 21st.dev:
       https://21st.dev/@meschacirung/components/footer */
    <footer
      className="bg-black border-t border-white/[0.08] pt-16"
    >
      <Container className="py-14">
        <div className="grid gap-12 md:grid-cols-[minmax(15rem,0.8fr)_minmax(0,2.4fr)] md:items-start">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="relative inline-flex h-6 w-20 overflow-hidden transition-opacity hover:opacity-75"
            >
              <Image
                src="/articog-logo-white.png"
                alt="Articog logo"
                width={2000}
                height={2000}
                sizes="80px"
                className="absolute left-0 top-[-30px] h-20 w-20 max-w-none"
              />
            </Link>

            <p className="type-small leading-relaxed max-w-xs text-white/60">
              AI-native film and creative production for brands and modern marketing teams.
            </p>

            <p className="type-small mb-2 text-white/40">Ask AI about Articog</p>
            <div className="relative z-10 mb-4 flex gap-2">
              {aiLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.06] text-white transition-colors hover:bg-white/[0.12]"
                >
                  <s.Icon size={16} />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3.5 pt-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.06] text-white transition-colors hover:bg-white/[0.12]"
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
          className="mt-16 grid gap-6 border-t border-white/[0.08] pt-8 text-center md:grid-cols-[minmax(0,1fr)_auto_minmax(10rem,1fr)] md:items-center md:text-left"
        >
          <div className="flex flex-col gap-1">
            <p className="font-sans text-xs text-white/60">
              &copy; {new Date().getFullYear()} Articog. All rights reserved.
            </p>

            <p className="type-small mb-2 text-white/55 uppercase tracking-widest">
              AI Native Film & Production Company
            </p>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-x-2 gap-y-2 md:col-start-3 md:row-start-1 md:mt-0 md:justify-end">
            <Link
              href="/legal/terms-of-service"
              className="text-[9px] sm:type-small text-white/40 hover:text-white transition-colors uppercase tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:text-sm md:tracking-wide"
            >
              Terms
            </Link>

            <Link
              href="/privacy-policy"
              className="text-[9px] sm:type-small text-white/40 hover:text-white transition-colors uppercase tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:text-sm md:tracking-wide"
            >
              Privacy
            </Link>

            <Link
              href="/legal/accessibility"
              className="text-[9px] sm:type-small text-white/40 hover:text-white transition-colors uppercase tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:text-sm md:tracking-wide"
            >
              Accessibility
            </Link>

            <Link
              href="/copyright"
              className="text-[9px] sm:type-small text-white/40 hover:text-white transition-colors uppercase tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:text-sm md:tracking-wide"
            >
              Copyright
            </Link>

            <Link
              href="/legal/cookie-policy"
              className="text-[9px] sm:type-small text-white/40 hover:text-white transition-colors uppercase tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:text-sm md:tracking-wide"
            >
              Cookie Policy
            </Link>

          </div>
        </div>
      </Container>
    </footer>
  );
}