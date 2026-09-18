import type { Metadata } from "next";

import { BlogFilterList } from "@/components/blog/BlogFilterList";
import { Container, Section, Heading } from "@/components/ui";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  alternates: { canonical: "https://articog.com/blog" },
  title: "AI-Native Production Insights | Articog",
  description: "Insights on AI-native production, creative strategy, brand storytelling, and growth marketing for modern teams.",
};

export default function BlogPage() {
  return (
    <div className="bg-black min-h-screen">
      <Section size="lg" className="pt-32 md:pt-40">
        <Container>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <Heading as="h1" size="hero" className="mb-0">
              Blog
            </Heading>
          </div>

          <BlogFilterList posts={blogPosts} />
        </Container>
      </Section>
    </div>
  );
}
