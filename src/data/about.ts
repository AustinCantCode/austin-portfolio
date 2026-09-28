/** Copy for /about, /about/skills and /cv, edited in the CMS (About). */
import aboutRaw from "./generated/about.json";
import cvRaw from "./generated/cv.json";
import { toMedia, type RawMedia } from "./cms";

export const about = {
  intro: aboutRaw.intro,
  timeline: aboutRaw.timeline.map(({ now, ...t }) =>
    now ? { ...t, now: true as const } : t,
  ) as { date: string; title: string; sub: string; now?: true }[],
  more: aboutRaw.more,
  learnt: aboutRaw.learnt,
};

/** The portrait on /about (also used in structured data). */
export const portrait = toMedia(aboutRaw.portrait as unknown as RawMedia);

export const cv = cvRaw;
