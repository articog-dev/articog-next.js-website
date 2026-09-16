import { Link } from "@/components/ui/Link";

export function AnnouncementBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-[1100] min-h-9 border-b border-white/10 bg-[#111] px-4 py-2 text-center text-xs font-medium text-white/80">
          <span>NOW OPEN: Articog is open for pilot collaborations. </span>
      <Link href="/book-a-demo" className="text-white underline underline-offset-4 transition hover:text-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
        Book a Demo →
      </Link>
    </div>
  );
}