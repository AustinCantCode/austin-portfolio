/** Copy for /about, /about/skills and /cv, edited in the CMS (About). */
import aboutRaw from "./generated/about.json";
import cvRaw from "./generated/cv.json";
import { toMedia, type Img, type RawMedia } from "./cms";

export const about = {
  intro: aboutRaw.intro,
  timeline: aboutRaw.timeline.map(({ now, ...t }) =>
    now ? { ...t, now: true as const } : t,
  ) as { date: string; title: string; sub: string; now?: true }[],
  more: aboutRaw.more,
  learnt: aboutRaw.learnt,
};

type RawPhoto = { image?: Img; year?: string; alt?: string };

/** Photos over the years for the stack on /about, oldest first. */
export const aboutPhotos = (
  ((aboutRaw as { photos?: RawPhoto[] }).photos ?? []) as RawPhoto[]
)
  .filter((p): p is RawPhoto & { image: NonNullable<Img> } => !!p.image)
  .map((p) => ({
    image: p.image,
    year: p.year ?? "",
    alt: p.alt || "Austin Sia",
  }));

/** The portrait on /about (also used in structured data). */
export const portrait = toMedia(aboutRaw.portrait as unknown as RawMedia);

export const cv = cvRaw;
