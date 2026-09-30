/** Copy for the /stillgood page, edited in the CMS (Work → StillGood page). */
import type { StaticImageData } from "next/image";
import raw from "./generated/stillgood.json";
import type { StillgoodScreen } from "./stillgood-screens";

type RawDemo = {
  video?: string | null;
  poster?: StaticImageData | null;
  alt?: string;
};

const demo = raw.demo as unknown as RawDemo;
const pick = (s: string) => s as StillgoodScreen;

export const stillgoodPage = {
  hero: {
    ...raw.hero,
    links: raw.hero.links.filter((l) => l.label && l.href),
    reel: raw.hero.reel.map(pick),
  },
  demo: {
    video: demo.video || undefined,
    poster: demo.poster ?? undefined,
    alt: demo.alt ?? "",
  },
  features: {
    title: raw.features.title,
    items: raw.features.items.map((f) => ({
      ...f,
      points: f.points.filter(Boolean),
      screen: pick(f.screen),
    })),
  },
  tiers: {
    ...raw.tiers,
    items: raw.tiers.items.map((t) => ({
      ...t,
      points: t.points.filter(Boolean),
      screen: pick(t.screen),
    })),
  },
  builtWith: raw.builtWith,
};
