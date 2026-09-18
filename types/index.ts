// ─── Core content types ───────────────────────────────────────────────────────

export interface HeroContent {
  eyebrow: string;
  headline: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

export interface ProofStat {
  value: string;
  label: string;
}

export interface Problem {
  number: string;
  title: string;
  description: string;
}

export interface PipelineStep {
  step: number;
  title: string;
  description: string;
  tag?: string;
}

export interface Capability {
  title: string;
  href: string;
  useCase: string;
  outcome: string;
  icon: string;
}

export interface ComparisonRow {
  attribute: string;
  agency: string;
  inhouse: string;
  articog: string;
  articogHighlight?: boolean;
}

export interface CaseStudy {
  client: string;
  industry: string;
  outcome: string;
  metric: string;
  metricLabel: string;
  tags: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface CTAContent {
  headline: string;
  ctaLabel: string;
  ctaHref: string;
}

// ─── Aggregated data shapes ───────────────────────────────────────────────────

/**
 * Data shape for the homepage   everything except case studies,
 * which are fetched separately with a longer cache TTL.
 */
export interface HomepageData {
  hero: HeroContent;
  proofStats: ProofStat[];
  problems: Problem[];
  pipeline: PipelineStep[];
  capabilities: Capability[];
  comparison: ComparisonRow[];
  testimonials: Testimonial[];
  cta: CTAContent;
}

/**
 * Full site content shape   used by seed data and Sanity schema compatibility.
 */
export interface SiteContent extends HomepageData {
  caseStudies: CaseStudy[];
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  contactEmail: string;
  socialLinks: Array<{ platform: string; url: string }>;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}

// ─── Contact API ──────────────────────────────────────────────────────────────

export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactApiResponse {
  success: boolean;
  error?: string;
  issues?: Record<string, string[]>;
}
