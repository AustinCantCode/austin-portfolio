/** Graphic design artwork, edited in the CMS (Work → Graphic design). */
import raw from "./generated/graphics.json";
import type { Img } from "./cms";
import type { Graphic } from "./types";

type RawGraphic = { slug: string; title: string; image: Img; alt: string };

export const graphics: Graphic[] = (raw as unknown as RawGraphic[])
  .filter((r) => r.image)
  .map((r) => ({
    id: r.slug,
    title: r.title,
    image: { src: r.image!, alt: r.alt || r.title, fit: "cover" },
  }));
