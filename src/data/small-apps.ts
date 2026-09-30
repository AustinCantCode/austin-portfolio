/** Small apps, edited in the CMS (Work → Small apps). */
import raw from "./generated/small-apps.json";
import { opt, type Img } from "./cms";
import type { SmallApp } from "./types";

type RawSmallApp = {
  title: string;
  tech: string;
  year: string;
  text: string;
  image: Img;
  alt: string;
  video?: string | null;
};

export const smallApps: SmallApp[] = (raw as unknown as RawSmallApp[]).map(
  (r) => ({
    title: r.title,
    tech: r.tech,
    year: r.year,
    text: r.text,
    image: r.image
      ? { src: r.image, alt: r.alt || `${r.title} screenshot`, fit: "cover" }
      : undefined,
    video: opt(r.video),
  }),
);
