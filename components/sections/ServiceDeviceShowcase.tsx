import { DeviceFrame, type DeviceType } from "@/components/ui/DeviceFrame";
import { primaryServiceCards } from "@/components/layout/service-menu-data";

/**
 * Which device each service's picture appears in, and how the portrait
 * (4:5) picture is cropped for that screen.
 */
const showcaseByHref = {
  "/services/ai-video-production": { device: "phone-landscape", objectPosition: "50% 74%" },
  "/services/social-creative": { device: "phone", objectPosition: "67% 50%" },
  "/services/ad-creative": { device: "laptop", objectPosition: "50% 12%" },
  "/how-it-works/ai-creative-pipeline": { device: "tablet", objectPosition: "50% 50%" },
} as const satisfies Record<string, { device: DeviceType; objectPosition: string }>;

export type ServiceShowcaseHref = keyof typeof showcaseByHref;

export function ServiceDeviceShowcase({ href }: { href: ServiceShowcaseHref }) {
  const service = primaryServiceCards.find((card) => card.href === href);
  if (!service) return null;

  const { device, objectPosition } = showcaseByHref[href];

  return (
    <DeviceFrame
      device={device}
      src={service.image}
      alt={service.alt}
      objectPosition={objectPosition}
    />
  );
}
