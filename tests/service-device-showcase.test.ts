import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

import { primaryServiceCards } from "../components/layout/service-menu-data";

const read = (...segments: string[]) =>
  readFileSync(path.join(process.cwd(), ...segments), "utf8");

const showcasePages = [
  { href: "/services/ai-video-production", file: ["app", "services", "ai-video-production", "page.tsx"] },
  { href: "/services/social-creative", file: ["app", "services", "social-creative", "page.tsx"] },
  { href: "/services/ad-creative", file: ["app", "services", "ad-creative", "page.tsx"] },
  { href: "/how-it-works/ai-creative-pipeline", file: ["app", "how-it-works", "ai-creative-pipeline", "page.tsx"] },
];

describe("service device showcase", () => {
  it("shows each service's menu image inside a device on its own page", () => {
    for (const { href, file } of showcasePages) {
      expect(primaryServiceCards.some((card) => card.href === href)).toBe(true);
      expect(read(...file)).toContain(`<ServiceDeviceShowcase href="${href}" />`);
    }
  });

  it("supports phone, landscape phone, tablet and laptop frames", () => {
    const frame = read("components", "ui", "DeviceFrame.tsx");

    for (const device of ["phone", "phone-landscape", "tablet", "laptop"]) {
      expect(frame).toContain(`"${device}"`);
    }
    // Hero picture loads immediately; frames are CSS only (no extra image files).
    expect(frame).toContain('loading={eager ? "eager" : "lazy"}');
    expect(frame.match(/<Image\b/g)).toHaveLength(1);
  });

  it("uses a different device for each of the four services", () => {
    const config = read("components", "sections", "ServiceDeviceShowcase.tsx");
    const devices = Array.from(config.matchAll(/device: "([^"]+)"/g), ([, device]) => device);

    expect(devices).toHaveLength(4);
    expect(new Set(devices).size).toBe(4);
  });
});
