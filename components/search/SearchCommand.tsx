"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

type SearchEntry = {
  title: string;
  href: string;
  description: string;
  keywords: string[];
};

export function SearchCommand() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [entries, setEntries] = useState<SearchEntry[]>([]);

  useEffect(() => {
    const loadIndex = async () => {
      try {
        const response = await fetch("/search-index.json", { cache: "force-cache" });
        if (!response.ok) return;
        const data = (await response.json()) as SearchEntry[];
        if (Array.isArray(data)) setEntries(data);
      } catch {
        setEntries([]);
      }
    };

    void loadIndex();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isSearchShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
      if (isSearchShortcut) {
        event.preventDefault();
        setOpen(true);
      }

      if (event.key === "Escape" && open) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return entries.slice(0, 8);
    }

    return entries.filter((entry) => {
      const haystack = [entry.title, entry.description, ...entry.keywords].join(" ").toLowerCase();
      return haystack.includes(normalizedQuery);
    }).slice(0, 8);
  }, [entries, query]);

  const selectEntry = (href: string) => {
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((current) => (current + 1) % results.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((current) => (current - 1 + results.length) % results.length);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const selected = results[selectedIndex];
      if (selected) selectEntry(selected.href);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search Articog"
        className="hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white/70 transition-colors hover:text-white lg:flex"
      >
        <Search size={15} />
      </button>

      {open ? (
        <div className="fixed inset-0 z-[1200] flex items-start justify-center bg-black/75 p-4 pt-24 backdrop-blur-sm">
          <div
            className="absolute inset-0"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-white/10 bg-[#111] shadow-2xl">
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <Search size={18} className="text-white/60" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Search services, industries, work, and resources"
                className="flex-1 bg-transparent py-2 text-base text-white placeholder:text-white/40 focus:outline-none"
                aria-label="Search the site"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Close search"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[420px] overflow-y-auto">
              {results.length ? (
                <ul className="p-2">
                  {results.map((entry, index) => (
                    <li key={`${entry.href}-${index}`}>
                      <button
                        type="button"
                        onClick={() => selectEntry(entry.href)}
                        className={`flex w-full flex-col items-start rounded-xl px-3 py-3 text-left transition-colors ${selectedIndex === index ? "bg-white/8" : "hover:bg-white/[0.04]"}`}
                      >
                        <span className="text-sm font-medium text-white">{entry.title}</span>
                        <span className="mt-1 text-sm text-white/60">{entry.description}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-8 text-sm text-white/60">
                  No results found. Try searching for “services”, “industries”, or “content strategy”.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
