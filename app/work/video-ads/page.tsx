import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Ad Creative | Articog",
  description: "High-volume video ads for every platform, developed for structured creative testing.",
  alternates: { canonical: "https://articog.com/work/video-ads" },
};
import { Link } from "@/components/ui/Link";
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { YouTubeEmbed } from "@/components/blog/YouTubeEmbed";

export default function VideoAdsGalleryPage() {
  const examples = [
    { title: "DTC Lifestyle Reveal", type: "Client Work", industry: "Beauty", format: "9:16" },
    { title: "Automotive Cinematic", type: "Concept Piece", industry: "Automotive", format: "16:9" },
    { title: "SaaS Product Tour", type: "Client Work", industry: "Technology", format: "16:9" },
    { title: "Electronics Detail", type: "Concept Piece", industry: "Electronics", format: "1:1" },
    { title: "Fashion Seasonal", type: "Client Work", industry: "DTC", format: "9:16" },
    { title: "Real Estate Flythrough", type: "Concept Piece", industry: "Real Estate", format: "9:16" }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <div className="flex-grow pt-32 pb-20">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h1 className="type-h1 mb-6 text-white">Video Ad Gallery</h1>
            <p className="text-zinc-400 type-h3 mb-16 max-w-2xl leading-relaxed">
              Explore our latest AI generated video creative across industries and formats.
            </p>

            <div className="mb-16 max-w-3xl">
              <YouTubeEmbed
                videoId="l5pReVGFVqs"
                title="These Actors Don’t Exist. This Entire Ad Was Made With AI | Articog"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {examples.map((item, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="type-h3">{item.title}</h2>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      {item.type}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs text-zinc-500">{item.industry}</span>
                    <span className="text-xs text-zinc-500">•</span>
                    <span className="text-xs text-zinc-500">{item.format}</span>
                  </div>
                </div>
              ))}
            </div>

            <Section className="mt-20 py-12 border-t border-zinc-900 text-center">
              <p className="text-zinc-500 type-small mb-8 italic">All displayed work is used with appropriate permissions.</p>
              <Link to="/book-a-demo" className="text-white hover:underline underline-offset-4">
                Book a Demo →
              </Link>
            </Section>
          </div>
        </Container>
      </div>
    </div>
  );
}
