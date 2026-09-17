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
          <h2 className="type-h2 text-white">Creative production by industry</h2>
        </div>
        <div className="space-y-6">
          {industryDetails.map((industry) => (
            <section
              key={industry.id}
              id={industry.id}
              className="scroll-mt-28 rounded-2xl border border-white/[0.1] p-6 md:p-8"
            >
              <div className="max-w-3xl">
                <h3 className="type-h3 text-white">{industry.title}</h3>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {industry.considerations.map((consideration) => (
                  <div key={consideration.title}>
                    <h4 className="type-h4 text-white">{consideration.title}</h4>
                    <p className="mt-2 type-small leading-relaxed text-white/50">
                      {consideration.description}
                    </p>
                  </div>
                ))}
              </div>

              {industry.serviceLinks && (
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/[0.08] pt-5">
                  {industry.serviceLinks.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="type-small text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              )}

              {industry.faqs && (
                <div className="mt-8 border-t border-white/[0.08] pt-5">
                  <h4 className="type-label text-white/45">Frequently Asked Questions</h4>
                  <div className="mt-4 space-y-5">
                    {industry.faqs.map((faq) => (
                      <div key={faq.question}>
                        <h5 className="type-small font-semibold text-white/80">{faq.question}</h5>
                        <p className="mt-1 type-small leading-relaxed text-white/50">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>
      </Container>
    </Section>
  );
}
