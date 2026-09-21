export type BlogSourceType = "articog" | "medium" | "substack" | "youtube";

export interface NativeBlogArticle {
  type: "articog";
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  readTime: string;
  canonicalUrl: string;
  content: Array<
    | { type: "paragraph"; value: string }
    | { type: "heading"; value: string; level?: 2 | 3 }
    | { type: "quote"; value: string }
    | { type: "youtube"; youtubeUrl: string }
  >;
}

export interface ExternalBlogCard {
  type: "medium" | "substack" | "youtube";
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  featuredImage?: string;
  sourceLabel: "Medium" | "Substack" | "YouTube";
  sourceUrl: string;
  actionLabel: string;
}

export type BlogEntry = NativeBlogArticle | ExternalBlogCard;

export const blogPosts: BlogEntry[] = [
  {
    type: "articog",
    slug: "how-ai-creative-teams-ship-faster-without-sacrificing-brand-quality",
    title: "How AI creative teams ship faster without sacrificing brand quality",
    category: "Creative Operations",
    publishedAt: "2025-02-12",
    excerpt:
      "When creative volume spikes, the real bottleneck is not generation, it is decision quality, brand calibration, and feedback loops.",
    featuredImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
    author: "Articog Editorial",
    readTime: "6 min read",
    canonicalUrl:
      "https://www.articog.com/blog/how-ai-creative-teams-ship-faster-without-sacrificing-brand-quality",
    content: [
      {
        type: "paragraph",
        value:
          "The best AI creative teams do not chase more output for its own sake. They build a system that turns brand intent into repeatable production velocity while protecting quality at the point of decision.",
      },
      {
        type: "heading",
        value: "The hidden bottleneck is not speed",
        level: 2,
      },
      {
        type: "paragraph",
        value:
          "Most production teams think the friction is in rendering or editing. In practice, the bottleneck sits earlier: unclear briefs, weak creative feedback loops, and understaffed review stages.",
      },
      {
        type: "paragraph",
        value:
          "The brands that win are the ones that treat AI as a creative operating layer, not a shortcut. They create sharper feedback loops, choose a narrower set of usable references, and review work faster because the process is clearer from the beginning.",
      },

      // Articog YouTube video embedded directly inside the article
      {
        type: "youtube",
        youtubeUrl: "https://www.youtube.com/watch?v=l5pReVGFVqs",
      },

      {
        type: "heading",
        value: "Build a review system, not just a prompt library",
        level: 2,
      },
      {
        type: "paragraph",
        value:
          "Prompt quality matters, but campaign consistency matters more. Strong teams lock in core brand references, define a visual language, and set review criteria before creative generation begins. That prevents revisions from turning into a creative drift loop.",
      },
      {
        type: "quote",
        value:
          "The fastest teams do not generate more versions; they reduce ambiguity before a single frame is approved.",
      },
      {
        type: "paragraph",
        value:
          "When the process is documented, the output becomes more scalable, more repeatable, and easier to quality-check. That is the real unlock behind AI creative velocity.",
      },
    ],
  },

  {
    type: "articog",
    slug: "the-4-systems-behind-high-velocity-campaign-production",
    title: "The 4 systems behind high velocity campaign production",
    category: "AI Production",
    publishedAt: "2025-03-04",
    excerpt:
      "Production speed improves when a brand combines feedback loops, performance data, asset governance, and creative operating rhythm into a single system.",
    featuredImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80",
    author: "Articog Editorial",
    readTime: "5 min read",
    canonicalUrl:
      "https://www.articog.com/blog/the-4-systems-behind-high-velocity-campaign-production",
    content: [
      {
        type: "paragraph",
        value:
          "High velocity creative production is not a one off sprint. It is a system that coordinates generation, review, iteration, and delivery across channels.",
      },
      {
        type: "heading",
        value: "1. The brief system",
        level: 2,
      },
      {
        type: "paragraph",
        value:
          "Strong creative work begins with a better brief. Top-performing teams specify audience, offer, use case, visual references, and rejection criteria before they begin generating options.",
      },
      {
        type: "heading",
        value: "2. The review system",
        level: 2,
      },
      {
        type: "paragraph",
        value:
          "Fast review cycles depend on clear ownership. The faster a team can align on what is good, the faster that team can move to production at scale.",
      },
      {
        type: "heading",
        value: "3. The performance system",
        level: 2,
      },
      {
        type: "paragraph",
        value:
          "Creative velocity is magnified when performance data is fed back into the creative loop. This helps teams learn what actually converts rather than relying on aesthetic preference alone.",
      },
      {
        type: "heading",
        value: "4. The delivery system",
        level: 2,
      },
      {
        type: "paragraph",
        value:
          "The final stage matters just as much as the first. Versioning, platform sizing, and channel-specific delivery are what turn good creative into systematic output.",
      },
    ],
  },

  {
    type: "medium",
    slug: "afin-ai-film-india-network",
    title: "AFIN: AI Film India Network",
    excerpt: "",
    publishedAt: "2025-05-02",
    featuredImage:
      "https://miro.medium.com/v2/resize:fill:320:214/1*lfoc_k91bH_WF66Xwh3G-w.png",
    sourceLabel: "Medium",
    sourceUrl:
      "https://medium.com/@articog.com/afin-ai-film-india-network-186630001f83",
    actionLabel: "Read on Medium",
  },
  {
    type: "medium",
    slug: "articog-and-creative-ai-why-the-future-of-brand-films-ai-ads-and-ugc-video-starts-here",
    title: "Articog and Creative AI: Why the Future of Brand Films, AI Ads, and UGC Video Starts Here",
    excerpt: "",
    publishedAt: "2025-05-02",
    featuredImage:
      "https://miro.medium.com/v2/resize:fill:320:214/1*PKpohrAlzWckjL6iG5_Wug.png",
    sourceLabel: "Medium",
    sourceUrl:
      "https://medium.com/@articog.com/articog-and-creative-ai-why-the-future-of-brand-films-ai-ads-and-ugc-video-starts-here-531c88a1a5c2",
    actionLabel: "Read on Medium",
  },
  {
    type: "medium",
    slug: "how-articog-is-redefining-creative-ai-video-for-the-us-market",
    title: "How Articog Is Redefining Creative AI Video for the US Market",
    excerpt: "",
    publishedAt: "2025-04-30",
    featuredImage:
      "https://miro.medium.com/v2/resize:fill:320:214/1*8kP7rNw8HNSddrlWWpWZEw.png",
    sourceLabel: "Medium",
    sourceUrl:
      "https://medium.com/@articog.com/how-articog-is-redefining-creative-ai-video-for-the-us-market-9d6666958ec6",
    actionLabel: "Read on Medium",
  },
  {
    type: "medium",
    slug: "from-scroll-to-sale-how-ugc-videos-drive-revenue-for-startups",
    title: "From Scroll to Sale: How UGC Videos Drive Revenue for Startups",
    excerpt: "",
    publishedAt: "2025-04-28",
    featuredImage:
      "https://miro.medium.com/v2/resize:fill:320:214/1*Hexg7XaB3XWqPoUTZeSPOg.png",
    sourceLabel: "Medium",
    sourceUrl:
      "https://medium.com/@articog.com/from-scroll-to-sale-how-ugc-videos-drive-revenue-for-startups-deb10eb7461c",
    actionLabel: "Read on Medium",
  },

  {
    type: "youtube",
    slug: "these-actors-dont-exist-this-entire-ad-was-made-with-ai",
    title: "These Actors Don’t Exist. This Entire Ad Was Made With AI | Articog",
    excerpt:
      "An Articog AI-native production showcasing how an ad can be created using AI-generated actors and creative production workflows.",
    publishedAt: "2026-09-01",
    featuredImage:
      "https://img.youtube.com/vi/l5pReVGFVqs/hqdefault.jpg",
    sourceLabel: "YouTube",
    sourceUrl:
      "https://www.youtube.com/watch?v=l5pReVGFVqs",
    actionLabel: "Watch on YouTube",
  },
];

export function getNativeBlogPosts(): NativeBlogArticle[] {
  return blogPosts.filter(
    (post): post is NativeBlogArticle => post.type === "articog"
  );
}

export function getBlogPostBySlug(
  slug: string
): NativeBlogArticle | undefined {
  return getNativeBlogPosts().find((post) => post.slug === slug);
}

export function getBlogEntries() {
  return blogPosts;
}