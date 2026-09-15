import { Container, Section } from "@/components/ui";
import { Link } from "@/components/ui/Link";

type IndustryDetail = {
  id: string;
  title: string;
  positioning: string;
  considerations: Array<{ title: string; description: string }>;
  serviceLinks?: Array<{ label: string; href: string }>;
  faqs?: Array<{ question: string; answer: string }>;
};

const industryDetails: IndustryDetail[] = [
  {
    id: "dtc-ecommerce",
    title: "DTC & E-commerce",
    positioning: "Performance driven creative for brands that need to convert across crowded digital storefronts.",
    considerations: [
      { title: "Creative Fatigue", description: "Keep fresh variants moving through the funnel so audiences do not see the same creative for too long." },
      { title: "Production Pressure", description: "Scale output without letting production costs and studio logistics constrain campaign velocity." },
      { title: "Platform Saturation", description: "Adapt assets to the formats and placements where shoppers discover and compare products." },
      { title: "Performance Focus", description: "Use structured iteration and conversion-informed creative to improve the next round of assets." },
    ],
    serviceLinks: [
      { label: "Ad Creative", href: "/services/ad-creative" },
      { label: "Product Visuals", href: "/services/product-visuals" },
    ],
  },
  {
    id: "saas-technology",
    title: "SaaS & Technology",
    positioning: "Accurate UI and clear storytelling for products whose value can be difficult to explain at a glance.",
    considerations: [
      { title: "Abstract Value Propositions", description: "Turn complex software benefits into clear stories that prospects can understand quickly." },
      { title: "Product Updates", description: "Keep launch, feature, and release communications aligned with the product as it evolves." },
      { title: "UI Accuracy", description: "Represent the actual product interface rather than relying on generic mockups." },
      { title: "Acquisition Costs", description: "Create more testable, channel-ready creative for acquisition and conversion campaigns." },
    ],
    serviceLinks: [
      { label: "AI Video Production", href: "/services/ai-video-production" },
      { label: "Performance Marketing", href: "/solutions/performance-marketing" },
    ],
  },
  {
    id: "consumer-electronics",
    title: "Consumer Electronics",
    positioning: "Product visuals that highlight technical precision, design, and the details customers need to evaluate.",
    considerations: [
      { title: "Product Accuracy", description: "Keep form, materials, color, labeling, and technical details faithful to the real product." },
      { title: "Feature Complexity", description: "Show how features work through clear product storytelling and visual explanation." },
      { title: "Beyond Studio Photography", description: "Create controlled product and lifestyle scenes without relying on a physical set for every variation." },
      { title: "Iteration Speed", description: "Update visual systems quickly as products, configurations, and campaigns change." },
    ],
    serviceLinks: [{ label: "Product Visuals", href: "/services/product-visuals" }],
  },
  {
    id: "beauty-skincare",
    title: "Beauty & Skincare",
    positioning: "Premium lifestyle creative that keeps product benefits, visual identity, and market variation consistent.",
    considerations: [
      { title: "Premium Positioning", description: "Build polished visual worlds that support the tone and aspiration of the brand." },
      { title: "Scalable Production", description: "Extend product and campaign imagery across a larger content calendar without repeating one treatment." },
      { title: "Rapid Iteration", description: "Move quickly through concepts, formats, and seasonal creative as the market changes." },
      { title: "Localization", description: "Adapt messaging and visual treatments for new markets while protecting the core brand system." },
    ],
    serviceLinks: [
      { label: "Product Visuals", href: "/services/product-visuals" },
      { label: "Social Creative", href: "/services/social-creative" },
    ],
  },
  {
    id: "automotive-mobility",
    title: "Automotive & Mobility",
    positioning: "Cinematic vehicle films and marketing visuals produced with careful attention to accuracy and compliance.",
    considerations: [
      { title: "Vehicle Fidelity", description: "Represent the actual model, color, trim, badging, and features accurately." },
      { title: "Regional Variants", description: "Match local specifications and market requirements across vehicle and campaign versions." },
      { title: "Safety & Compliance", description: "Avoid unsafe driving depictions and review performance claims against approved documentation." },
      { title: "Launch & Retail Use Cases", description: "Create launch films, feature showcases, and localized dealership marketing assets." },
    ],
    serviceLinks: [{ label: "AI Video Production", href: "/services/ai-video-production" }],
    faqs: [
      { question: "Can vehicle details be reviewed before delivery?", answer: "Yes. Vehicle model, color, features, regional specifications, and performance claims should be reviewed against approved documentation before delivery." },
      { question: "How are safety concerns handled?", answer: "The production approach avoids unsafe driving behavior and traffic-law violations in the creative." },
    ],
  },
  {
    id: "food-beverage",
    title: "Food & Beverage",
    positioning: "Product visuals and seasonal campaigns that make food and beverage products consistent, appetizing, and ready to scale.",
    considerations: [
      { title: "Visual Variation", description: "Explore appetizing scenes, serving moments, and campaign treatments without repeating one setup." },
      { title: "Seasonal Speed", description: "Move from brief to timely seasonal and promotional creative with less production overhead." },
      { title: "SKU Consistency", description: "Keep packaging, product identity, and variants consistent across a campaign system." },
      { title: "Channel-Ready Assets", description: "Prepare product visuals and video for paid, organic, retail, and launch channels." },
    ],
    serviceLinks: [
      { label: "Product Visuals", href: "/services/product-visuals" },
      { label: "AI Video Production", href: "/services/ai-video-production" },
    ],
    faqs: [
      { question: "Can seasonal campaigns be produced quickly?", answer: "The AI-native workflow supports seasonal and promotional iteration while preserving product consistency." },
      { question: "How is packaging accuracy handled?", answer: "Actual product references are used to maintain accurate packaging, product identity, and SKU representation." },
    ],
  },
  {
    id: "fashion-lifestyle",
    title: "Fashion & Lifestyle",
    positioning: "Campaign visuals and social content for brands balancing trend speed, volume, and a consistent aesthetic.",
    considerations: [
      { title: "Trend Speed", description: "Respond to cultural and platform moments without rebuilding every campaign from scratch." },
      { title: "Content Volume", description: "Keep social and campaign channels active with a repeatable stream of relevant creative." },
      { title: "Aesthetic Consistency", description: "Protect the visual language of the brand across changing concepts, formats, and collections." },
      { title: "Product & Talent Fidelity", description: "Maintain product detail and responsible rights handling for generated talent and environments." },
    ],
    serviceLinks: [
      { label: "Social Creative", href: "/services/social-creative" },
      { label: "Product Visuals", href: "/services/product-visuals" },
    ],
    faqs: [
      { question: "Can content be adapted for social platforms?", answer: "Yes. Campaign visuals can be translated into platform specific social formats, including short form video and cutdowns." },
      { question: "How is brand consistency maintained?", answer: "Creative direction, product references, and visual systems are carried through each concept and delivery format." },
    ],
  },
  {
    id: "real-estate",
    title: "Real Estate",
    positioning: "Immersive visuals for listings, developments, and investors while keeping property representation factual.",
    considerations: [
      { title: "Asset Scarcity", description: "Build compelling property narratives when photography, footage, or finished spaces are limited." },
      { title: "Geographic Constraints", description: "Create visual coverage for properties and developments that are difficult to access or not yet complete." },
      { title: "Emotional Selling", description: "Use cinematic storytelling to communicate lifestyle, atmosphere, and the experience of a place." },
      { title: "Property Accuracy", description: "Disclose conceptual visualization and review location, project, and marketing claims for accuracy." },
    ],
    serviceLinks: [{ label: "AI Video Production", href: "/services/ai-video-production" }],
  },
  {
    id: "additional-applications",
    title: "Additional Industry Applications",
    positioning: "Additional vertical considerations can shape production, from product fidelity to localization and booking-focused assets.",
    considerations: [
      { title: "Consumer Goods", description: "Photorealistic product rendering, SKU-scale output, seasonal pivots, and performance-focused testing." },
      { title: "Gaming & Apps", description: "Cinematic teasers, creator-style user acquisition ads, rapid hook and visual testing, and multi-platform mastering." },
      { title: "Luxury Fashion", description: "Cinematic lookbooks, product and textile fidelity, synthetic-talent rights policy, and high-end visual standards." },
      { title: "Travel & Hospitality", description: "Destination content, property tours, multilingual adaptation, and booking-focused advertising." },
    ],
  },
];

export function IndustryDetails() {
  return (
    <Section className="border-t border-white/10 py-20 text-left md:py-24">
      <Container>
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="mb-3 type-label uppercase tracking-[0.2em] text-white/40">Explore by industry</p>
          <h2 className="type-h2 text-white">Creative production by industry</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {industryDetails.map((industry) => (
            <details key={industry.id} id={industry.id} className="group self-start scroll-mt-24 overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.02] transition-colors open:border-white/[0.2]">
              <summary className="flex min-h-52 cursor-pointer list-none flex-col justify-between gap-6 p-6 marker:hidden md:min-h-56 md:p-8">
                <div className="flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <h3 className="type-h3 text-white">{industry.title}</h3>
                    <p className="mt-4 max-w-xl type-small leading-relaxed text-white/60">{industry.positioning}</p>
                  </div>
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-lg font-light leading-none text-white/50 transition-transform group-open:rotate-45">+</span>
                </div>
                <div>
                  <p className="mb-3 type-label uppercase tracking-[0.2em] text-white/35">Key focus</p>
                  <p className="max-w-xl type-small leading-relaxed text-white/80">{industry.considerations[0].title}</p>
                  {industry.serviceLinks && (
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium">
                      {industry.serviceLinks.map((link) => (
                        <span key={link.href} className="text-white/70">{link.label}</span>
                      ))}
                    </div>
                  )}
                </div>
              </summary>
              <div className="border-t border-white/[0.08] px-6 pb-6 pt-6 md:px-8 md:pb-8">
                <p className="mb-4 type-label uppercase tracking-[0.2em] text-white/35">Additional details</p>
                <div className="grid gap-3 md:grid-cols-3">
                  {industry.considerations.slice(0, 3).map((item) => (
                    <div key={item.title} className="rounded-xl border border-white/[0.08] bg-black/10 p-4">
                      <h4 className="mb-2 type-h4 text-white">{item.title}</h4>
                      <p className="font-sans text-xs leading-relaxed text-white/50">{item.description}</p>
                    </div>
                  ))}
                </div>
                {industry.serviceLinks && (
                  <div className="mt-5 flex flex-wrap gap-4 text-sm font-medium">
                    {industry.serviceLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="text-white underline underline-offset-4 hover:text-white/70">{link.label}</Link>
                    ))}
                  </div>
                )}
                {industry.faqs && (
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {industry.faqs.map((faq) => (
                      <div key={faq.question} className="border-l border-white/20 pl-5">
                        <h4 className="mb-2 type-h4 text-white">{faq.question}</h4>
                        <p className="type-small leading-relaxed text-white/50">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
