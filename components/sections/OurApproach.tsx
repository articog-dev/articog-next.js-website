import { Container, Section, Heading } from "@/components/ui";
import { LazyVideo } from "@/components/ui/LazyVideo";

const approachItems = [
  {
    title: "Creative Direction First",
    description:
      "Every project starts with the idea, audience, brand, visual language, and campaign objective. We set the direction before generation begins.",
  },
  {
    title: "AI-Native Production",
    description:
      "Our production workflow uses generative tools to develop characters, environments, product shots, motion, and creative variations under human creative direction.",
  },
  {
    title: "Production Ready Finish",
    description:
      "Creative directors and editors refine deliverables through compositing, editing, sound, quality control, and platform-specific finishing before delivery.",
  },
];

export function OurApproach() {
  return (
    <Section size="md" className="border-t border-white/[0.05]">
      <Container>
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Heading as="h2" size="section" className="mb-6">
            Human-directed. AI-native.
          </Heading>
          <p
            className="type-body md:text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            AI expands what can be produced and how quickly it can move. Human creative direction decides what should be made, how it should feel, and whether it is right for the brand. Every project combines both.
          </p>
        </div>

        <div className="relative mb-16 aspect-video w-full overflow-hidden rounded-2xl border border-white/[0.08]">
          <LazyVideo
            autoPlay
            muted
            playsInline
            loop
            controls={false}
            preload="metadata"
            src="https://media.articog.com/videos/backgrounds/Web%202.mp4"
            className="h-full w-full object-contain"
            aria-hidden="true"
          />
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {approachItems.map((item) => (
            <div key={item.title} className="space-y-4 rounded-xl border border-white/[0.05] p-6">
              <Heading as="h3" size="card" className="text-white">
                {item.title}
              </Heading>
              <p className="type-small leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}