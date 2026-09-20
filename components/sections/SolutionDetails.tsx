import { Container, Section, Heading } from "@/components/ui";

type SolutionCategory = "monthly" | "performance" | "launch" | "overflow";

type DetailGroup = {
  title: string;
  description: string;
  items: Array<{ title: string; description: string }>;
};

const detailGroups: Record<SolutionCategory, DetailGroup[]> = {
  monthly: [
    {
      title: "Always On Content",
      description: "Ongoing film, video, image, social and audio production with lower production overhead.",
      items: [
        { title: "Continuous Production", description: "An ongoing content engine that keeps video, social, and visual channels active across campaign cycles." },
        { title: "Scalable Volume", description: "Output can flex with your needs while maintaining a consistent brand system and delivery cadence." },
        { title: "Subscription vs Infrastructure", description: "The subscription provides a predictable monthly package; broader always on infrastructure supports variable output across channels." },
      ],
    },
  ],
  performance: [
    {
      title: "Testing & Optimization",
      description: "Produce recurring video and static variants faster with AI through the same monthly production model.",
      items: [
        { title: "Testing Hypotheses", description: "Each test begins with a clear question rather than random variation." },
        { title: "Variant Matrices", description: "Organize hooks, visual changes, copy, and CTAs so each result is actionable." },
        { title: "Asset Naming & Learning Loops", description: "Consistent naming keeps results readable and feeds the next round of production." },
      ],
    },
    {
      title: "Performance Formats",
      description: "High volume creative for paid social and performance teams that need constant refreshes.",
      items: [
        { title: "Paid Social Scale", description: "High volume production, iterative testing, platform optimization, and regular creative refreshes." },
        { title: "Dynamic Creative", description: "Modular creative layers and audience driven variants optimized for Meta, TikTok, and YouTube." },
        { title: "Creator-Style Content", description: "Creator-style aesthetics, production without a shoot, rapid trend response, and conversion-focused hooks." },
      ],
    },
    {
      title: "Workflow & Automation",
      description: "Production systems designed to connect high volume creative with existing marketing workflows.",
      items: [
        { title: "Creative Workflow", description: "API-first workflows, variation, and rule-based branding for repeatable production." },
        { title: "Workflow Integration", description: "DAM and product feed integrations can connect brief to delivery production to existing systems." },
        { title: "Rapid Iteration", description: "Review feedback guides visual iteration across the testing matrix." },
      ],
    },
  ],
  launch: [
    {
      title: "Multi-Format Campaigns",
      description: "Create the product story, then scale it into film, social, visuals, audio and campaign variations with AI-native production.",
      items: [
        { title: "Modular Concept", description: "Build a campaign idea that can flex across video, static, audio, and social outputs." },
        { title: "Asset Map", description: "Plan every required asset and its destination before production begins." },
        { title: "Channel Specifications", description: "Adapt each deliverable to the technical and creative requirements of its channel." },
        { title: "Approvals & Coordination", description: "Use clear approval points and coordinated delivery to keep the campaign moving together." },
      ],
    },
    {
      title: "Global & Localized Launches",
      description: "Adapt campaign ideas for new markets while maintaining visual consistency and local relevance.",
      items: [
        { title: "Visual Translation", description: "Adapt visual language and messaging for each market rather than relying on literal translation alone." },
        { title: "Native Audio", description: "Use localized voice and audio treatments suited to the target market." },
        { title: "Regional Formats", description: "Prepare creative for regional platform specifications, including Kakao, WeChat, and Line where relevant." },
        { title: "Compliance Review", description: "Review localized claims and representations before distribution." },
      ],
    },
    {
      title: "Brand Films & Audio Campaigns",
      description: "Support launch moments with cinematic storytelling and channel-ready audio production.",
      items: [
        { title: "Cinematic Storytelling", description: "Explore visual direction at scale while maintaining consistent brand and product identity." },
        { title: "Emotional Resonance", description: "Use pacing, tone, and visual exploration to build a stronger connection with the audience." },
        { title: "Audio Ads & Streaming", description: "Produce radio, streaming, and podcast deliverables with dynamic insertion, voice options, and compliant mastering." },
      ],
    },
  ],
  overflow: [
    {
      title: "Creative Team Extension",
      description: "Extend your team with faster AI-native production without adding a larger traditional production setup.",
      items: [
        { title: "Confidentiality", description: "NDA-backed collaboration and confidential handling of agency and client materials." },
        { title: "White-Label Communication", description: "Work can be delivered under the agency's brand and communication model." },
        { title: "Rights Transfer", description: "Clear rights transfer supports the agency's client delivery requirements." },
        { title: "Agency-Speed Turnaround", description: "Flexible production capacity designed to match agency timelines and campaign demands." },
      ],
    },
  ],
};

export function SolutionDetails({ category }: { category: SolutionCategory }) {
  return (
    <Section size="md" className="border-t border-white/5">
      <Container>
        <div className="mb-12 max-w-3xl">
          <Heading as="h2" size="section" className="mb-4 text-white">
            Capabilities
          </Heading>
        </div>
        <div className="space-y-3">
          {detailGroups[category].map((group) => (
            <details key={group.title} className="group rounded-2xl border border-white/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-5 marker:hidden md:p-6">
                <div className="max-w-3xl">
                  <Heading as="h3" size="card" className="text-white">{group.title}</Heading>
                  <p className="mt-2 type-small leading-relaxed text-white/50">{group.description}</p>
                </div>
                <span className="shrink-0 type-h2 font-light text-white/40 transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="border-t border-white/10 p-5 md:p-6">
                <div className="grid grid-cols-1 grid-gap-card md:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item) => (
                    <div key={item.title} className="rounded-xl border border-white/10 p-5">
                      <Heading as="h4" size="subsection" className="mb-2 text-white">{item.title}</Heading>
                      <p className="type-small leading-relaxed text-white/50">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}