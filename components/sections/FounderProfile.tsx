import Image from "next/image";
import { Heading } from "@/components/ui";
import type { FounderProfile as FounderProfileData } from "@/lib/founders";

export function FounderProfile({ founder }: { founder: FounderProfileData }) {
  return (
    <article className="grid gap-10 border-t border-white/[0.08] pt-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
      <div
        className={`mx-auto w-full max-w-xs overflow-hidden border border-white/[0.08] bg-white/[0.02] lg:mx-0 ${founder.circular ? "rounded-full bg-black" : "rounded-2xl"}`}
      >
        <Image
          src={founder.imageSrc}
          alt={founder.imageAlt}
          width={603}
          height={603}
          className={`h-auto w-full ${founder.circular ? "rounded-full" : ""}`}
          sizes="(max-width: 1024px) 16rem, 16rem"
        />
      </div>
      <div className="space-y-8 text-[1.05rem] leading-[1.9] text-white/60">
        <div>
          <Heading as="h2" size="section" className="mb-3 text-white">
            {founder.name}
          </Heading>
          <p>
            {founder.roleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          {founder.metaLines?.map((line) => (
            <p key={line} className="mt-2 text-base text-white/45">
              {line}
            </p>
          ))}
        </div>

        {founder.paragraphs.map((paragraph) => (
          <p key={paragraph} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}

        {founder.sections.map((section) => (
          <div key={section.title} className="space-y-4">
            <h3 className="type-h3 text-white">{section.title}</h3>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="whitespace-pre-line">
                {paragraph}
              </p>
            ))}
            {section.items && (
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <a
          href={founder.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${founder.name} on LinkedIn`}
          className="inline-flex text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          LinkedIn
        </a>
      </div>
    </article>
  );
}
