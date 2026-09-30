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

type RawLetter = {
  image?: Img;
  pages?: Img[];
  name?: string;
  role?: string;
  org?: string;
  link?: string;
  date?: string;
  excerpt?: string;
  text?: string;
};

export type Letter = {
  /** The scanned pages, first page first; none until one is uploaded. */
  pages: NonNullable<Img>[];
  name: string;
  role: string;
  org: string;
  /** Their website, which their name links to. */
  link?: string;
  date: string;
  excerpt: string;
  /** The full letter, one string per paragraph. */
  paragraphs: string[];
};

/** Letters of recommendation on /about, in the CMS order. */
export const letters: Letter[] = (
  ((aboutRaw as { recommendations?: RawLetter[] }).recommendations ??
    []) as RawLetter[]
)
  .filter((l) => l.image || l.excerpt?.trim() || l.text?.trim())
  .map((l) => ({
    pages: [l.image, ...(l.pages ?? [])].filter(
      (p): p is NonNullable<Img> => !!p,
    ),
    name: l.name ?? "",
    role: l.role ?? "",
    org: l.org ?? "",
    link: l.link?.trim() || undefined,
    date: l.date ?? "",
    excerpt: l.excerpt ?? "",
    paragraphs: (l.text ?? "")
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean),
  }));

/** The portrait on /about (also used in structured data). */
export const portrait = toMedia(aboutRaw.portrait as unknown as RawMedia);

export const cv = cvRaw;
