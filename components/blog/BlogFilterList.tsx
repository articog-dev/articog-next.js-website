"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import { Link } from "@/components/ui/Link";
import { Heading } from "@/components/ui";
import type { BlogEntry } from "@/lib/blog";

export type BlogFilter = "all" | "articles" | "videos";

function formatDate(dateString: string) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));

  return new Date(dateString).getFullYear() < new Date().getFullYear()
    ? `Archive · ${formattedDate}`
    : formattedDate;
}

function BlogCard({ post }: { post: BlogEntry }) {
  const isNative = post.type === "articog";

  if (isNative) {
    return (
      <article className="group overflow-hidden rounded-3xl border border-white/[0.08] transition-colors hover:border-white/[0.14]">
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="relative h-56 overflow-hidden border-b border-white/[0.08]">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>

          <div className="p-6 md:p-7">
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                {post.category}
              </span>
              <span className="font-sans text-xs text-white/35">
                {formatDate(post.publishedAt)}
              </span>
            </div>

            <Heading as="h2" size="card" className="mb-4 text-white">
              {post.title}
            </Heading>

            <div className="flex items-center justify-between border-t border-white/[0.08] pt-4">
              <span className="type-label uppercase tracking-[0.18em] text-white/35">
                {post.readTime}
              </span>
              <span className="type-small text-white/70 group-hover:text-white">
                Read article →
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group overflow-hidden rounded-3xl border border-white/[0.08] transition-colors hover:border-white/[0.14]">
      <div className="relative h-56 overflow-hidden border-b border-white/[0.08]">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-56 items-center justify-center bg-white/[0.03] font-sans text-xs uppercase tracking-[0.2em] text-white/30">
            {post.sourceLabel}
          </div>
        )}
      </div>

      <div className="p-6 md:p-7">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
            {post.sourceLabel.toUpperCase()}
          </span>
          <span className="font-sans text-xs text-white/35">
            {formatDate(post.publishedAt)}
          </span>
        </div>

        <Heading as="h2" size="card" className="mb-4 text-white">
          {post.title}
        </Heading>

        <a
          href={post.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 type-small text-white/80 transition-colors hover:border-white/[0.14] hover:text-white"
        >
          {post.actionLabel}
        </a>
      </div>
    </article>
  );
}

const filterOptions: Array<{ id: BlogFilter; label: string }> = [
  { id: "all", label: "All" },
  { id: "articles", label: "Articles" },
  { id: "videos", label: "Videos" },
];

export function BlogFilterList({ posts }: { posts: BlogEntry[] }) {
  const [activeFilter, setActiveFilter] = useState<BlogFilter>("all");

  const visiblePosts = useMemo(() => {
    switch (activeFilter) {
      case "articles":
        return posts.filter(
          (post) => post.type === "articog" || post.type === "medium" || post.type === "substack"
        );
      case "videos":
        return posts.filter((post) => post.type === "youtube");
      case "all":
      default:
        return posts;
    }
  }, [activeFilter, posts]);

  return (
    <>
      <div className="mb-10 flex justify-center">
        <div className="flex w-full max-w-xl items-center gap-2 overflow-x-auto rounded-full border border-white/[0.08] bg-white/[0.02] p-1.5 scrollbar-none md:justify-center">
          {filterOptions.map((option) => {
            const isActive = activeFilter === option.id;

            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(option.id)}
                className={[
                  "relative inline-flex shrink-0 items-center justify-center rounded-full px-4 py-2 text-sm font-sans font-medium transition-all duration-200",
                  "min-w-[92px]",
                  isActive
                    ? "bg-white text-black shadow-sm"
                    : "text-white/60 hover:text-white hover:bg-white/[0.02]",
                ].join(" ")}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {visiblePosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}
