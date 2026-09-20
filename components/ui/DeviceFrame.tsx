import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type DeviceType = "phone" | "phone-landscape" | "tablet" | "laptop";

type DeviceFrameProps = {
  device: DeviceType;
  src: string;
  alt: string;
  /** CSS object-position for the picture inside the screen, e.g. "50% 74%". */
  objectPosition?: string;
  /** Above-the-fold image: load immediately. */
  eager?: boolean;
  className?: string;
};

type ScreenProps = {
  src: string;
  alt: string;
  sizes: string;
  objectPosition: string;
  eager: boolean;
  className?: string;
  children?: ReactNode;
};

const SIZES: Record<DeviceType, string> = {
  phone: "(min-width: 1024px) 280px, 66vw",
  "phone-landscape": "(min-width: 768px) 736px, 92vw",
  tablet: "(min-width: 768px) 416px, 78vw",
  laptop: "(min-width: 768px) 736px, 84vw",
};

/** Brushed dark-metal edge shared by every device. */
const metalEdge =
  "bg-[linear-gradient(145deg,#6d6d72_0%,#2b2b2f_35%,#161618_60%,#55555a_100%)]";
const deviceShadow = "shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95)]";
const sideButton = "absolute bg-[#3b3b40]";

function Screen({ src, alt, sizes, objectPosition, eager, className, children }: ScreenProps) {
  return (
    <div className={cn("relative overflow-hidden bg-neutral-900", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        className="object-cover"
        style={{ objectPosition }}
      />
      {/* soft glass reflection */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.07] to-white/0"
      />
      {children}
    </div>
  );
}

function Phone({ landscape, ...screen }: Omit<ScreenProps, "className" | "children"> & { landscape: boolean }) {
  const radius = landscape ? "clamp(1.5rem,6vw,3.4rem)" : "clamp(2.2rem,11vw,3.2rem)";

  return (
    <div
      className={cn("relative", landscape ? "w-[min(92vw,46rem)]" : "w-[min(66vw,17.5rem)]")}
      style={{ "--r": radius } as CSSProperties}
    >
      {/* side buttons */}
      {landscape ? (
        <>
          <span aria-hidden="true" className={cn(sideButton, "-top-[3px] left-[16%] h-[4px] w-[3.5%] rounded-t-sm")} />
          <span aria-hidden="true" className={cn(sideButton, "-top-[3px] left-[22%] h-[4px] w-[7%] rounded-t-sm")} />
          <span aria-hidden="true" className={cn(sideButton, "-top-[3px] left-[31%] h-[4px] w-[7%] rounded-t-sm")} />
          <span aria-hidden="true" className={cn(sideButton, "-bottom-[3px] left-[68%] h-[4px] w-[9%] rounded-b-sm")} />
        </>
      ) : (
        <>
          <span aria-hidden="true" className={cn(sideButton, "-left-[3px] top-[16%] h-[3.5%] w-[4px] rounded-l-sm")} />
          <span aria-hidden="true" className={cn(sideButton, "-left-[3px] top-[23%] h-[7%] w-[4px] rounded-l-sm")} />
          <span aria-hidden="true" className={cn(sideButton, "-left-[3px] top-[32%] h-[7%] w-[4px] rounded-l-sm")} />
          <span aria-hidden="true" className={cn(sideButton, "-right-[3px] top-[27%] h-[9%] w-[4px] rounded-r-sm")} />
        </>
      )}

      <div className={cn("rounded-[var(--r)] p-[3px]", metalEdge, deviceShadow)}>
        <div className="rounded-[calc(var(--r)_-_3px)] bg-black p-[9px]">
          <Screen
            {...screen}
            className={cn(
              "rounded-[calc(var(--r)_-_12px)]",
              landscape ? "aspect-[19.5/9]" : "aspect-[9/19.5]",
            )}
          >
            {/* Dynamic Island */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute rounded-full bg-black",
                landscape
                  ? "right-[1.4%] top-1/2 h-[28%] w-[3.4%] -translate-y-1/2"
                  : "left-1/2 top-[1.5%] h-[3.6%] w-[28%] -translate-x-1/2",
              )}
            />
          </Screen>
        </div>
      </div>
    </div>
  );
}

function Tablet(screen: Omit<ScreenProps, "className" | "children">) {
  return (
    <div
      className="relative w-[min(78vw,26rem)]"
      style={{ "--r": "clamp(1.4rem,4vw,2.2rem)" } as CSSProperties}
    >
      <div className={cn("rounded-[var(--r)] p-[3px]", metalEdge, deviceShadow)}>
        <div className="relative rounded-[calc(var(--r)_-_3px)] bg-black p-[clamp(10px,2.2vw,16px)]">
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[clamp(3px,0.8vw,6px)] size-1.5 -translate-x-1/2 rounded-full bg-[#1b1b1f] ring-1 ring-white/10"
          />
          <Screen {...screen} className="aspect-[3/4] rounded-[calc(var(--r)_-_16px)]" />
        </div>
      </div>
    </div>
  );
}

function Laptop(screen: Omit<ScreenProps, "className" | "children">) {
  const lidRadius = "clamp(0.8rem,1.8vw,1.3rem)";

  return (
    <div className="relative w-[min(84vw,46rem)]">
      {/* lid */}
      <div
        className={cn("rounded-b-[4px] p-[3px]", metalEdge, deviceShadow)}
        style={{ borderTopLeftRadius: lidRadius, borderTopRightRadius: lidRadius }}
      >
        <div
          className="relative bg-black px-[clamp(6px,1.2vw,12px)] pb-[clamp(6px,1.2vw,12px)] pt-[clamp(12px,2vw,20px)]"
          style={{ borderTopLeftRadius: lidRadius, borderTopRightRadius: lidRadius }}
        >
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[clamp(5px,0.9vw,8px)] size-1.5 -translate-x-1/2 rounded-full bg-[#1b1b1f] ring-1 ring-white/10"
          />
          <Screen {...screen} className="aspect-[16/10] rounded-[3px]" />
        </div>
      </div>
      {/* base */}
      <div className="relative left-1/2 h-[clamp(8px,1.5vw,14px)] w-[116%] -translate-x-1/2 rounded-b-[1.2rem] bg-[linear-gradient(180deg,#4b4b50,#1a1a1d)]">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-[45%] w-[16%] -translate-x-1/2 rounded-b-lg bg-[#0e0e10]"
        />
      </div>
    </div>
  );
}

/**
 * Shows an image inside a device mockup (phone, landscape phone, tablet or
 * laptop). Built with CSS only, so it adds no image weight: the only download
 * is the picture on the screen.
 */
export function DeviceFrame({
  device,
  src,
  alt,
  objectPosition = "center",
  eager = true,
  className,
}: DeviceFrameProps) {
  const screen = { src, alt, sizes: SIZES[device], objectPosition, eager };

  return (
    <figure className={cn("relative isolate mx-auto w-fit", className)}>
      {/* faint spotlight so the dark device separates from the black page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[140%] w-[min(150%,100vw)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(255,255,255,0.07),transparent)]"
      />
      {device === "phone" && <Phone landscape={false} {...screen} />}
      {device === "phone-landscape" && <Phone landscape {...screen} />}
      {device === "tablet" && <Tablet {...screen} />}
      {device === "laptop" && <Laptop {...screen} />}
    </figure>
  );
}
