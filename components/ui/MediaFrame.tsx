import Image from "next/image";
import { cn } from "@/lib/utils";

type MediaFrameProps = {
  src: string;
  alt: string;
  ratio?: "16/9" | "4/5" | "1/1" | "9/16";
  focalPosition?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  placeholder?: boolean;
  className?: string;
};

const ratioMap = {
  "16/9": "aspect-video",
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
  "9/16": "aspect-[9/16]",
};

export function MediaFrame({
  src,
  alt,
  ratio = "16/9",
  focalPosition = "center",
  priority = false,
  loading,
  placeholder = false,
  className,
}: MediaFrameProps) {
  return (
    <div className={cn("relative w-full overflow-hidden radius-lg bg-surface", ratioMap[ratio], className)}>
      {placeholder ? <div className="absolute inset-0 animate-pulse bg-surface-hover" aria-hidden="true" /> : null}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={loading}
        sizes="(max-width: 768px) 100vw, 800px"
        className="object-cover"
        style={{ objectPosition: focalPosition }}
      />
    </div>
  );
}
