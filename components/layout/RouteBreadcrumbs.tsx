"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const hiddenPrefixes = ["/api", "/thank-you"];

function formatSegment(segment: string) {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function RouteBreadcrumbs() {
  const pathname = usePathname();

  if (pathname === "/" || hiddenPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);
  const items = [
    { label: "Home", href: "/" },
    ...segments.map((segment, index) => ({
      label: formatSegment(segment),
      href: `/${segments.slice(0, index + 1).join("/")}`,
    })),
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `https://articog.com${item.href}`,
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-container px-6 pt-24 lg:px-8">
        <ol className="flex flex-wrap items-center gap-2 text-xs text-white/45">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {index === items.length - 1 ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}
