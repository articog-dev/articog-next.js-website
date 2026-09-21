# Articog Typography Audit

## Scope

Repository-wide review of `app/`, `components/`, `lib/`, and the styling/font configuration. The audit covers fonts, typography utilities, shared primitives, route pages, heading elements, body/UI text, and responsive type behavior.

## Current System

- **Display font:** Sora, loaded in `app/layout.tsx` through `next/font/google` and exposed as `--font-sora`.
- **Body/UI font:** Inter, loaded in `app/layout.tsx` through `next/font/google` and exposed as `--font-inter`.
- **Global tokens:** `--font-sans` maps to Inter; `--font-display` maps to Sora in `app/globals.css`.
- **Existing shared primitives:** `components/ui/Heading.tsx`, `components/ui/Text.tsx`, and `components/ui/Button.tsx`.
- **Existing responsive tokens:** `--text-hero` and `--text-section` use `clamp()`, but most page-level typography uses independent Tailwind utilities.

## Baseline Type Inventory

### H1

The shared hero token is `clamp(2.2rem, 8vw, 4rem)`, approximately 35px to 64px depending on viewport. Raw page H1s also use `text-4xl md:text-5xl`, `text-4xl md:text-6xl`, and custom clamps from approximately 32px to 67px. Weights are usually `font-semibold`, but raw pages vary.

### H2

The shared section token is `clamp(1.6rem, 5vw, 2.4rem)`, approximately 26px to 38px. Raw H2s range from `text-3xl` to `text-5xl`, with several inline clamp values. Weight and tracking are generally Sora/semibold but are not enforced centrally.

### H3

Card and feature H3s range from `text-base` through `text-2xl`. Most use Sora and semibold, with `leading-snug` or no explicit line-height. There is no reusable H3 scale.

### Body and Supporting Text

Body text is predominantly Inter and ranges from `text-sm` through `text-xl`, most often with `leading-relaxed`. The stylesheet changes Tailwind `--text-sm` and `--text-xs` at desktop, which makes small text context-dependent. Eyebrows and metadata commonly use `text-[10px]`/`text-[11px]`, uppercase, and wide tracking. Navigation commonly uses 13px to 14px. Buttons use the shared primitive in many places but also have manually styled variants.

## Inconsistencies Found

1. Shared typography tokens coexist with many raw sizes and custom `clamp()` values for equivalent semantic levels.
2. H1/H2/H3 sizes, tracking, and line-height are not centrally enforced across legacy/raw pages.
3. `Heading` couples visual variants to semantic tags, and `size="label"` is sometimes rendered as `h2` even when it is an eyebrow rather than a document section.
4. Several index/card pages use H3 card titles without a preceding H2 section heading.
5. Some pages use raw headings that bypass `Heading`, including Book a Demo, Contact, Copyright, Email Preferences, Newsletter, Press, Privacy Request, service detail pages, Thank You pages, Sitemap, and Video Ads.
6. Responsive sizing is inconsistent across 390px, 768px, 1024px, and 1440px because pages use unrelated `md:` utilities and custom clamps.
7. There is no single reusable body/supporting-text scale for page copy, labels, metadata, or navigation.

## Heading Structure Findings

- The home page H1 is supplied by the shared `Hero` component rather than `app/page.tsx`.
- Eyebrow labels in shared sections such as `Capabilities`, `Problems`, `CaseStudies`, and `HomeVisualShowcase` are visual labels and should not create extra H2s.
- Card grids on Industries, Solutions, Trust, Work, and Video Ads need section context so card titles do not appear as orphaned H3s.
- The How It Works feature card and Blog related-content block require careful semantic treatment because their source order can place H3 content before the main section H2.
- Existing copy and content hierarchy should remain unchanged; fixes should use the correct semantic element or configurable heading level.

## Files Requiring Modification

### Typography foundation

- `app/globals.css`
- `components/ui/Heading.tsx`
- `components/ui/Text.tsx`
- `components/ui/Button.tsx`
- `components/sections/Hero.tsx`

### Shared layout and repeated sections

- `components/layout/Header.tsx`
- `components/layout/MobileMenu.tsx`
- `components/layout/Footer.tsx`
- `components/sections/Capabilities.tsx`
- `components/sections/Problems.tsx`
- `components/sections/CaseStudies.tsx`
- `components/sections/HomeVisualShowcase.tsx`

### Raw page typography and heading context

- `app/book-a-demo/page.tsx`
- `app/contact/page.tsx`
- `app/copyright/page.tsx`
- `app/email-preferences/page.tsx`
- `app/newsletter/page.tsx`
- `app/press/page.tsx`
- `app/privacy/request/page.tsx`
- `app/services/page.tsx`
- `app/services/product-visuals/page.tsx`
- `app/services/social-creative/page.tsx`
- `app/sitemap/page.tsx`
- `app/thank-you/page.tsx`
- `app/thank-you/demo/page.tsx`
- `app/work/video-ads/page.tsx`
- additional route files where raw heading utilities bypass the shared primitive

## Recommended Unified System

Use the existing Inter/Sora pairing and preserve the Articog visual identity.

- **H1:** Sora, semibold, fluid `clamp(2.25rem, 5vw, 4rem)`, line-height 1.08, tight tracking.
- **H2:** Sora, semibold, fluid `clamp(1.875rem, 3.5vw, 3rem)`, line-height 1.14, tight tracking.
- **H3:** Sora, semibold, fluid `clamp(1.375rem, 2vw, 1.75rem)`, line-height 1.24, tight tracking.
- **Body:** Inter, 1rem base with 1.6 line-height; large introductory copy 1.125rem on tablet/desktop.
- **Small/supporting:** Inter, 0.875rem with 1.5 line-height.
- **Labels:** Inter, 0.6875rem, semibold, uppercase, 0.16em tracking.
- **Responsive checkpoints:** fluid tokens cover 390px mobile through 1440px desktop; no viewport-specific one-off heading scales are needed.
