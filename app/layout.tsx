// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import { Toaster } from "sonner";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteEntitySchema } from "@/lib/structured-data";
import "./globals.css";

const themeScript = `
  (function () {
    try {
      const key = "articog-theme-preference";
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const stored = (() => {
        try {
          return window.localStorage.getItem(key);
        } catch {
          return null;
        }
      })();
      const theme = stored === "light" || stored === "dark" || stored === "system"
        ? stored
        : "system";
      const resolved = theme === "light" ? "light" : theme === "dark" ? "dark" : (prefersDark ? "dark" : "light");
      document.documentElement.dataset.theme = resolved;
      document.documentElement.classList.toggle("dark", resolved === "dark");
      document.documentElement.classList.toggle("light", resolved === "light");
      document.documentElement.style.colorScheme = resolved;
    } catch (error) {
      document.documentElement.dataset.theme = "dark";
      document.documentElement.style.colorScheme = "dark";
    }
  })();
`;

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Articog | AI Native Film & Production Company",
  description:
    "Articog is an AI-native film and creative production company for growth-stage brands and modern marketing teams. We produce brand films, commercials, performance creative, product visuals, creator-style social content, audio, and campaign assets through human-directed AI production workflows.",
  metadataBase: new URL("https://www.articog.com"),
  manifest: "/manifest.webmanifest",
  verification: {
    google: "Td3Rl6_MP-F3VnYqsXt5T6M3IuO0OIlzz1tfWCQ5hTU",
  },
  openGraph: {
    type: "website",
    siteName: "Articog",
    title: "Articog | AI Native Film & Production Company",
    description:
      "Articog is an AI-native film and creative production company for growth-stage brands and modern marketing teams. We produce brand films, commercials, performance creative, product visuals, creator-style social content, audio, and campaign assets through human-directed AI production workflows.",
    url: "https://www.articog.com",
    images: [
      {
        url: "/og-image.png",
        width: 2400,
        height: 1260,
        alt: "Articog AI-native film and creative production",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Articog | AI Native Film & Production Company",
    description:
      "AI-native film and creative production for growth-stage brands and modern marketing teams.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sora.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://media.articog.com" crossOrigin="" />
      </head>
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <GoogleAnalytics />
        <AnnouncementBar />
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1">
          {/* Required landmark parity: <main className="flex-1"> */}
          {children}
        </main>
        <Footer />
        <CookieBanner />
        <Toaster richColors closeButton position="top-right" />
        <JsonLd data={siteEntitySchema} />
      </body>
    </html>
  );
}