import { Container, Section, Heading } from "@/components/ui";

type ServiceCategory =
  | "ai-video"
  | "ad-creative"
  | "social"
  | "product-visuals"
  | "strategy"
  | "post-production"
  | "audio";

type ServiceGroup = {
  title: string;
  description: string;
  items: Array<{ title: string; description: string }>;
};

const serviceGroups: Record<ServiceCategory, ServiceGroup[]> = {
  "ai-video": [
    {
      title: "Brand Films & Storytelling",
      description: "Create brand stories, commercials, product videos, launches and social content faster, with lower production overhead and less dependence on traditional shoots.",
      items: [
        { title: "Story Development", description: "Concept and narrative direction aligned to your brand voice and goals." },
        { title: "Cinematic Direction", description: "Visual style, pacing, and emotional tone curated to match your aesthetic." },
        { title: "AI Environments & Talent", description: "Responsible use of AI generated environments and talent to create impossible worlds." },
        { title: "Finishing & Rights", description: "Professional color grading, sound design, final delivery, and transfer of commercial ownership for final delivered assets." },
      ],
    },
    {
      title: "Product Commercials",
      description: "Premium commercials built around your real product inside AI generated worlds.",
      items: [
        { title: "Product Fidelity", description: "Your actual product is captured and represented accurately, never fabricated by AI." },
        { title: "Packshots & Claims", description: "Accurate product close-ups and approved product claims reviewed before delivery." },
        { title: "Channel Outputs", description: "Outputs for TV and streaming, YouTube pre-roll, social and performance, and digital OOH." },
      ],
    },
    {
      title: "Product Launch Videos",
      description: "One hero film that scales into every channel asset needed for a high impact launch.",
      items: [
        { title: "Hero + Derivatives", description: "One core film cut down and adapted into every format and length the launch requires." },
        { title: "Launch Timeline", description: "A delivery schedule aligned to launch dates and milestones." },
        { title: "Approved Claims", description: "Product messaging reviewed against approved claims before final delivery." },
        { title: "Channel Asset Map", description: "Assets pre-sized for paid social, web hero, email content, and retailer channels." },
      ],
    },
    {
      title: "Explainers & Internal Video",
      description: "Clear video for software products, training, onboarding, announcements, and executive communications.",
      items: [
        { title: "SaaS & Explainers", description: "Accurate UI representation, motion graphics, professional voiceover, and long-form plus paid/social cuts." },
        { title: "Training & Onboarding", description: "High-quality training modules and onboarding videos produced at scale." },
        { title: "Internal Announcements", description: "Engaging video announcements and professional executive messages for town halls and strategic updates." },
        { title: "Confidential Delivery", description: "Confidential handling and delivery practices can be agreed for internal assets." },
      ],
    },
    {
      title: "Specialist Video Production",
      description: "Purpose-built production for automotive, real estate, and global video campaigns.",
      items: [
        { title: "Automotive Films", description: "Vehicle reference fidelity, regional specifications, safe-driving review, and performance claim review." },
        { title: "Real Estate Films", description: "Property and development films with transparent visualization, factual representation, and compliance review." },
        { title: "Localization & Variants", description: "Voice localization, accurate subtitles, cultural QA, and organized version control for global markets." },
      ],
    },
  ],
  "ad-creative": [
    {
      title: "Static Ads & Key Visuals",
      description: "Video and static ad creative for every product, produced faster with AI for recurring testing and campaigns.",
      items: [
        { title: "Platform Coverage", description: "Optimized creative for Meta, LinkedIn, and display network formats." },
        { title: "Templates + Net-New", description: "A strategic mix of fast template variants and net-new custom concepts." },
        { title: "Campaign Key Visuals", description: "Concept routes, a refined hero visual, and a scalable visual system across formats and channels." },
        { title: "Claim QA & Image Rights", description: "Accurate, substantiated claims and clear usage rights on delivered creative." },
      ],
    },
    {
      title: "Testing & Performance Variants",
      description: "Structured creative testing that moves beyond guesswork with clear hypotheses and actionable iteration.",
      items: [
        { title: "Test Hypothesis", description: "Each round starts with a clear question and isolates variables to find what moves the needle." },
        { title: "Variant Taxonomy", description: "A structured system for organizing what changed between variants." },
        { title: "Asset Naming & Export Specs", description: "Consistent naming and export formats for clean tracking across the funnel." },
        { title: "Performance Video Ads", description: "Hooks, modular variants, platform aspect ratios, and a test matrix mapped to the marketing funnel." },
      ],
    },
    {
      title: "Creator-Style Ad Content",
      description: "Creator-style ad content with the familiar feel of social creative and the reliability of a human-directed, AI-powered production engine.",
      items: [
        { title: "Native Scripts & Hooks", description: "Platform tailored scripts and thumb stopping hooks designed to blend into the feed." },
        { title: "Testing Variants", description: "Multiple visual and audio variants provided for each concept." },
        { title: "Brand Safety Review", description: "Human review against brand safety standards before delivery." },
        { title: "Rights & Consent", description: "Synthetic voice or likeness is subject to proper consent and strict rights clearance." },
      ],
    },
  ],
  social: [
    {
      title: "Monthly Social Content",
      description: "Recurring reels, short-form video, creator-style content and social assets through one monthly subscription.",
      items: [
        { title: "Calendar Tailored Posts", description: "Posts and graphics planned around your content calendar and priorities." },
        { title: "Consistent Brand Voice", description: "Every asset matches your brand voice and visual identity." },
        { title: "Platform-Specific Formatting", description: "Content formatted for the exact specifications and style of each channel." },
      ],
    },
    {
      title: "Creative Repurposing",
      description: "Turn existing content into new formats and channels without reshooting from scratch.",
      items: [
        { title: "Input-to-Output Mapping", description: "Long-form video becomes cutdowns, and hero imagery becomes a full social set." },
        { title: "Channel Mapping", description: "Outputs are sized and optimized from TikTok 9:16 to LinkedIn carousels." },
        { title: "Version Control", description: "Organized delivery so your team knows which asset is current and ready for deployment." },
      ],
    },
    {
      title: "Short Form Video",
      description: "Fast-paced, native content for high engagement on vertical platforms.",
      items: [
        { title: "Reels & TikTok Series", description: "Always on Instagram, TikTok, and YouTube Shorts production." },
        { title: "Captions & Cutdowns", description: "Platform-native edits, captions, and campaign cutdowns built for sound-off viewing." },
        { title: "Series Consistency", description: "A repeatable visual and editorial system that keeps recurring content on-brand." },
      ],
    },
  ],
  "product-visuals": [
    {
      title: "AI Product Photography",
      description: "Create product imagery, campaign visuals and e-commerce content faster with AI, reducing repeated studio production while protecting product and brand accuracy.",
      items: [
        { title: "E-commerce Listings", description: "Clean, consistent catalog imagery for Shopify, Amazon, and your own store." },
        { title: "Lifestyle Shots", description: "Products placed in on-brand interiors and outdoor environments." },
        { title: "Seasonal Campaigns", description: "Fast-turnaround visuals for seasonal and promotional moments." },
        { title: "Product Fidelity", description: "Texture, color, form, and labeling represented accurately in every shot." },
      ],
    },
    {
      title: "Custom Image Libraries",
      description: "Large, consistent libraries of on-brand product images delivered in organized batches.",
      items: [
        { title: "Style System", description: "A defined visual style applied consistently across the library." },
        { title: "Consistent Visual Systems", description: "Product and campaign images developed with consistent light, shadow, and color direction." },
        { title: "Usage Rights & Governance", description: "Clear rights and a documented production process across the library." },
        { title: "Batch Delivery", description: "Bulk delivery ready for catalog or CMS use with consistent metadata and naming." },
      ],
    },
    {
      title: "E-commerce Visuals",
      description: "Product visuals built for online selling across your site and marketplaces.",
      items: [
        { title: "PDP-Safe Output", description: "Clean backgrounds, accurate representation, and technical fidelity for product detail pages." },
        { title: "Marketplace Specs", description: "Output formatted to platform size and content rules." },
        { title: "Detail Views", description: "Close-ups highlighting product features, textures, and materials." },
        { title: "Promotional Variants", description: "Sale badges, seasonal treatments, and campaign overlays for digital storefronts." },
      ],
    },
  ],
  strategy: [
    {
      title: "Campaign Creative Strategy",
      description: "Concepts, scripts, storyboards and visual direction built around the product and brand before AI production begins.",
      items: [
        { title: "Campaign Idea", description: "A unifying creative idea that ties the campaign across touchpoints." },
        { title: "Audience & Message", description: "Clear definition of who the campaign speaks to and what it says." },
        { title: "Channels", description: "Mapping where the campaign will live and how it adapts per channel." },
        { title: "Hero, Derivatives & Roadmap", description: "One core asset scaled into channel-specific pieces with a clear delivery timeline." },
      ],
    },
    {
      title: "Concept Development",
      description: "Explore multiple creative directions before committing to production.",
      items: [
        { title: "Multiple Routes", description: "3-5 distinct creative concepts developed per brief." },
        { title: "Rationale & Moodboards", description: "Each concept tied to business goals, audience, aesthetic, and emotional tone." },
        { title: "Script & Visual Direction", description: "Early direction for tone, pacing, and look." },
        { title: "Feasibility Review", description: "Concepts checked against timeline and budget constraints before selection." },
      ],
    },
    {
      title: "Storyboarding & Previsualization",
      description: "Plan every shot before production begins with a clear visual roadmap.",
      items: [
        { title: "Shot List & Storyboard", description: "Every shot sequenced with composition and lighting established early." },
        { title: "Animatic", description: "A rough timed cut showing pacing before final production." },
        { title: "Continuity", description: "Consistency checks across every shot and scene." },
        { title: "Approval Gates", description: "Clear checkpoints for sign-off before full-scale production." },
      ],
    },
  ],
  "post-production": [
    {
      title: "Video Editing",
      description: "Editing, motion, compositing, cleanup, sound and mastering for the final brand-ready output.",
      items: [
        { title: "Editorial Assembly", description: "Structure raw footage into a compelling, high-retention narrative cut." },
        { title: "Multiple Versions", description: "Cutdowns and alternate lengths for different platform requirements." },
        { title: "Captions & Graphics", description: "Accurate captions, titles, lower thirds, and on-brand motion graphics." },
      ],
    },
    {
      title: "Motion Graphics",
      description: "Animated titles, callouts, and branded motion elements that drive engagement and clarity.",
      items: [
        { title: "Titles & Lower-Thirds", description: "Animated text matched to brand typography and visual identity." },
        { title: "UI Motion & Product Callouts", description: "Animated interfaces and markers highlighting features and technical details." },
        { title: "End Cards", description: "Branded closing frames with logos, social handles, and calls to action." },
      ],
    },
    {
      title: "AI Compositing & Cleanup",
      description: "Fix, enhance, and clean up existing footage without the need for a full reshoot.",
      items: [
        { title: "Before/After Proof", description: "Transparent results showing exactly what changed." },
        { title: "Product & Logo Integrity", description: "Careful preservation of brand and product accuracy." },
        { title: "Artifact Cleanup", description: "Remove visual noise, glitches, or unwanted elements." },
        { title: "Human QA", description: "Every AI-assisted edit reviewed by a human finishing artist." },
      ],
    },
    {
      title: "Upscaling & Mastering",
      description: "The final technical pass for delivery-ready creative across every platform and channel.",
      items: [
        { title: "Master Specs & Aspect Ratios", description: "High-resolution files in 9:16, 4:5, 1:1, and 16:9 as required." },
        { title: "Codec, Bitrate & Captions", description: "Platform codecs, bitrates, and burned-in or sidecar SRT/VTT captions." },
        { title: "Audio Loudness & Archive", description: "Platform specific LUFS mastering and secure archiving of final masters." },
      ],
    },
  ],
  audio: [
    {
      title: "AI Voiceover",
      description: "Audio for films, ads, social and campaigns, produced as part of the same ongoing brand content system.",
      items: [
        { title: "Voice Rights & Consent", description: "Synthetic voices are properly licensed or consented to and never unauthorized clones." },
        { title: "No Impersonation", description: "We do not produce content that impersonates a real individual without authorization." },
        { title: "Pronunciation Approvals", description: "Product names, brand terms, and technical language reviewed before final delivery." },
        { title: "Territory", description: "Voice and language options matched to the target market." },
      ],
    },
    {
      title: "Audio Ads",
      description: "Audio ads for radio, podcasts, and streaming services, finished to agreed delivery specifications.",
      items: [
        { title: "Standard Lengths", description: "Professionally produced 15s, 30s, and 60s cuts for radio and digital streaming." },
        { title: "Scriptwriting & Professional Voice", description: "Copy refined to the brand voice and delivered with usage rights cleared." },
        { title: "Music, Legal Reads & Mastering", description: "Licensed or custom music, required disclaimer language, and professional loudness standards." },
      ],
    },
    {
      title: "Music & Sound Design",
      description: "Original scoring, sound design, and finishing for video and audio projects.",
      items: [
        { title: "Music", description: "Custom or licensed scoring matched to your brand's tone." },
        { title: "Stems & SFX", description: "Organized audio stems, sound effects, and design elements for future edits." },
        { title: "Loudness & Mastering", description: "Final mix delivered to broadcast and platform loudness standards." },
        { title: "Licensing", description: "Music and sound licensing terms confirmed per project." },
      ],
    },
  ],
};

export function ServiceDetails({ category }: { category: ServiceCategory }) {
  return (
    <Section size="md" className="border-t border-white/5">
      <Container>
        <div className="mb-12 max-w-3xl">
          <Heading as="h2" size="section" className="mb-4 text-white">
            Capabilities
          </Heading>
        </div>
        <div className="space-y-3">
          {serviceGroups[category].map((group) => (
            <details key={group.title} className="group rounded-2xl border border-white/10 transition-transform duration-200 hover:-translate-y-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-5 marker:hidden md:p-6">
                <div className="max-w-3xl">
                  <Heading as="h3" size="card" className="text-white">{group.title}</Heading>
                  <p className="mt-2 type-small leading-relaxed text-white/50">{group.description}</p>
                </div>
                <span className="shrink-0 type-h2 font-light text-white/40 transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="border-t border-white/10 p-5 md:p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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