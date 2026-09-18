import { Link } from "@/components/ui/Link";
import {
  createBreadcrumbSchema,
  type BreadcrumbItem,
} from "@/lib/structured-data";
import { JsonLd } from "./JsonLd";

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6 type-small text-white/50">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {item.href ? (
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-white/75">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={createBreadcrumbSchema(items)} />
    </>
  );
}
