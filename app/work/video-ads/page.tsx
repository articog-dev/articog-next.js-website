import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Ad Creative | Articog",
  description: "High-volume video ads for every platform, developed for structured creative testing.",
  alternates: { canonical: "https://articog.com/work/video-ads" },
};
import { Link } from "@/components/ui/Link";
import { Container, Heading, Section } from '@/components/ui';
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
      <div className="flex-grow pt-32 md:pt-40 pb-20">
        <Container>
          <div className="max-w-6xl mx-auto">
            <Heading as="h1" size="hero" className="mb-6 text-white">Video Ad Gallery</Heading>
            <p className="type-h3 mb-16 max-w-2xl leading-relaxed text-white/60">
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
                    <Heading as="h2" size="card">{item.title}</Heading>
                    <span className="rounded bg-white/[0.03] px-2 py-0.5 text-[10px] font-bold uppercase text-white/60">
                      {item.type}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs text-white/40">{item.industry}</span>
                    <span className="text-xs text-white/40">•</span>
                    <span className="text-xs text-white/40">{item.format}</span>
                  </div>
                </div>
              ))}
            </div>

            <Section className="mt-20 border-t border-white/[0.08] py-12 text-center">
              <Heading as="h2" size="section" className="mb-8 text-white">Ready to transform your production?</Heading>
              <p className="type-small mb-8 italic text-white/40">All displayed work is used with appropriate permissions.</p>
              <Link to="/book-a-demo" className="text-sm font-medium leading-5 text-white hover:underline underline-offset-4">
                Book a Demo →
              </Link>
            </Section>
          </div>
        </Container>
      </div>
    </div>
  );
}
