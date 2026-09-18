import { Play } from "lucide-react";
import Image from "next/image";

const videoCards = [
  {
    title: "Articog creative production showcase",
    url: "https://www.youtube.com/watch?v=l5pReVGFVqs",
  },
  {
    title: "Articog creative video showcase",
    url: "https://www.youtube.com/watch?v=_0z-6bfJ0zI",
  },
] as const;

function getYouTubeId(url: string) {
  return new URL(url).searchParams.get("v");
}

export function WorkVideoShowcase() {
  return (
    <section className="mb-16" aria-label="Video showcases">
      <div className="grid grid-gap-section md:grid-cols-2">
        {videoCards.map((video) => {
          const videoId = video.url ? getYouTubeId(video.url) : null;
          const card = (
            <div className="group relative aspect-video overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03]">
              {videoId ? (
                <Image
                  src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                  alt={video.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] group-hover:brightness-110"
                />
              ) : (
                <div className="flex h-full items-center justify-center px-6 text-center type-small text-white/40">
                  Second video URL pending
                </div>
              )}
              <span className="absolute inset-0 bg-black/10 transition group-hover:bg-black/0" aria-hidden="true" />
              <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-black/70 text-white transition group-hover:scale-105 group-hover:bg-black/80" aria-hidden="true">
                <Play size={18} fill="currentColor" />
              </span>
            </div>
          );

          return (
            <a
              key={video.title}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${video.title} on YouTube in a new tab`}
            >
              {card}
            </a>
          );
        })}
      </div>
    </section>
  );
}
