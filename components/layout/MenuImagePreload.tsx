"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { primaryServiceCards } from "./service-menu-data";

type MenuImagePreloadProps = {
  preload?: boolean;
};

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export function MenuImagePreload({ preload = false }: MenuImagePreloadProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    if (!mediaQuery.matches) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let idleId: number | null = null;
    const idleWindow = window as IdleWindow;
    const reveal = () => setReady(true);
    const schedule = () => {
      if (idleWindow.requestIdleCallback) {
        idleId = idleWindow.requestIdleCallback(reveal, { timeout: 800 });
      } else {
        timeoutId = setTimeout(reveal, 800);
      }
    };

    if (preload) {
      reveal();
    } else if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
    }

    return () => {
      window.removeEventListener("load", schedule);
      if (timeoutId) clearTimeout(timeoutId);
      if (idleId !== null) idleWindow.cancelIdleCallback?.(idleId);
    };
  }, [preload]);

  if (!ready) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed h-px w-px overflow-hidden opacity-0">
      {primaryServiceCards.map((item) => (
        <Image
          key={item.title}
          src={item.image}
          alt=""
          fill
          sizes="(max-width: 1024px) 25vw, 300px"
          loading="eager"
          className="absolute inset-0 -z-10 object-cover"
          style={{ objectPosition: item.objectPosition }}
        />
      ))}
    </div>
  );
}
