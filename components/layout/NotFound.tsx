import { Link } from "@/components/ui/Link";

export function NotFound() {
  return (
    <div
      className="min-h-[80vh] flex items-center justify-center px-6"
      style={{ background: "#000000" }}
    >
      <div className="text-center space-y-12 max-w-2xl">
        <p
          className="font-display font-semibold"
          style={{
            fontSize: "clamp(6rem, 15vw, 12rem)",
            lineHeight: 1,
            letterSpacing: "-0.05em",
            color: "rgba(255,255,255,0.06)",
          }}
        >
          404
        </p>

        <div className="space-y-4">
          <h1 className="type-h1 text-white">
            Looks like this page didn't make the cut
          </h1>
          <p className="type-body-lg" style={{ color: "rgba(255,255,255,0.42)" }}>
            The page you're looking for doesn't exist or has moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-white px-8 h-12 type-small text-black transition-all hover:bg-white/90 active:scale-95"
          >
            Back to Home
          </Link>
          <Link
            href="/work"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 h-12 type-small text-white transition-all hover:bg-white/10 active:scale-95"
          >
            See Our Work
          </Link>
          <Link
            href="/book-a-demo"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-white px-8 h-12 type-small text-black transition-all hover:bg-zinc-200 active:scale-95"
          >
            Book a Demo
          </Link>
        </div>
      </div>
    </div>
  );
}

