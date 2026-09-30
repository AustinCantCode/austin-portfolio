/** Copy for the /stillgood page, edited in the CMS (Work → StillGood page). */
import type { StaticImageData } from "next/image";
import raw from "./generated/stillgood.json";
import type { StillgoodScreen } from "./stillgood-screens";

type RawDemo = Omit<typeof raw.demo, "poster" | "video"> & {
  poster?: StaticImageData | null;
  video?: string | null;
};

const demo = raw.demo as unknown as RawDemo;

export const stillgoodPage = {
  hero: {
    ...raw.hero,
    site:
      raw.hero.site?.label && raw.hero.site.href ? raw.hero.site : undefined,
  },
  problem: {
    ...raw.problem,
    stats: raw.problem.stats.filter((s) => s.value),
  },
  demo: {
    ...demo,
    poster: demo.poster ?? undefined,
    video: demo.video || undefined,
    points: demo.points.filter(Boolean),
  },
  features: {
    title: raw.features.title,
    items: raw.features.items.map((f) => ({
      ...f,
      screen: f.screen as StillgoodScreen,
    })),
  },
  plans: {
    ...raw.plans,
    items: raw.plans.items.map((p) => ({
      ...p,
      points: p.points.filter(Boolean),
    })),
  },
  story: raw.story,
  builtWith: raw.builtWith,
  cta: raw.cta,
};
