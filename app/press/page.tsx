import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Press & Media Kit | Articog",
  description: "Press resources, branding assets, and company information for Articog's AI-native film and creative production work.",
  alternates: { canonical: "https://articog.com/press" },
};

export default function PressPage() {
  const mediaAssets = [
    {
      title: "Articog Logo White",
      description:
        "Official Articog logo asset on black background for editorial and press use.",
      actionLabel: "Download Logo",
      href: "/articog-logo-white.png",
      asset: "/articog-logo-white.png",
      alt: "Articog white logo on black background",
    },
    {
      title: "Articog Logo Black",
      description:
        "Official Articog logo asset on white background for editorial and press use.",
      actionLabel: "Download Logo",
      href: "/articog-logo-black.png",
      asset: "/articog-logo-black.png",
      alt: "Articog black logo on white background",
    },
    {
      title: "Press Images / Approved Work",
      description:
        "Approved product and site screenshots are available on request for press use.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <div className="flex-grow pt-32 pb-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="type-h1 mb-6 text-white">
              Press & Media Kit
            </h1>

            <p className="text-zinc-400 type-h3 mb-12 max-w-2xl leading-relaxed">
              Resources and information for journalists and media covering
              Articog&apos;s mission to transform creative production with AI.
            </p>

            <Section className="py-12 border-t border-zinc-900">
              <h2 className="type-h2 mb-8 text-white">
                Media Kit
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mediaAssets.slice(0, 2).map((asset) => (
                  <div
                    key={asset.title}
                    className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 flex flex-col h-full"
                  >
                    <h3 className="type-h3 mb-3 text-white">
                      {asset.title}
                    </h3>

                    {asset.asset ? (
                      <div className="mb-4 flex items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-black p-6">
                        <Image
                          src={asset.asset}
                          alt={asset.alt}
                          width={400}
                          height={200}
                          className="h-auto w-full max-w-[360px] object-contain"
                        />
                      </div>
                    ) : null}

                    <p className="text-zinc-400 type-small leading-relaxed mb-6 flex-grow">
                      {asset.description}
                    </p>

                    {asset.href ? (
                      <a
                        href={asset.href}
                        download
                        aria-label={`Download ${asset.title}`}
                        className="mt-auto inline-flex items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-zinc-500 hover:bg-zinc-700"
                      >
                        {asset.actionLabel}
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {mediaAssets.slice(2).map((asset) => (
                  <div
                    key={asset.title}
                    className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 flex flex-col h-full"
                  >
                    <h3 className="type-h3 mb-3 text-white">
                      {asset.title}
                    </h3>

                    <p className="text-zinc-400 type-small leading-relaxed mb-6 flex-grow">
                      {asset.description}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            <Section className="py-12 border-t border-zinc-900">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h2 className="type-h2 mb-6 text-white">
                    Company Boilerplate
                  </h2>

                  <div className="bg-zinc-900/30 p-6 rounded-2xl border border-zinc-800 text-zinc-300 text-sm leading-relaxed">
                    Articog is an AI Native Film &amp; Production Company
                    producing brand films, commercials, performance creative,
                    creator-style social content, product visuals, and audio
                    for growth-stage brands and modern marketing teams.
                  </div>
                </div>

                <div>
                  <h2 className="type-h2 mb-6 text-white">
                    Media Contact
                  </h2>

                  <p className="text-zinc-400 mb-4">
                    For media inquiries, interviews, or additional assets,
                    please reach out to our communications team.
                  </p>

                  <a
                    href="mailto:info@articog.com"
                    className="text-white text-xl font-bold hover:underline tracking-tight"
                  >
                    info@articog.com
                  </a>
                </div>
              </div>
            </Section>

            <Section className="py-12 border-t border-zinc-900">
                  <h2 className="type-h2 mb-4 text-white">
                Usage Guidelines
              </h2>

              <p className="text-zinc-400 type-small leading-relaxed max-w-2xl">
                Articog logos and media materials may be used for editorial
                coverage according to our brand guidelines. For any other
                usage or specific permission questions, please contact us.
              </p>
            </Section>

          </div>
        </Container>
      </div>
    </div>
  );
}