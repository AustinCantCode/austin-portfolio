/** Events, edited in the CMS (About → Events). */
import raw from "./generated/events.json";
import { opt, toMedia, type Img, type RawLink, type RawMedia } from "./cms";
import type { EventItem, GalleryItem } from "./types";

type RawEvent = {
  slug: string;
  title: string;
  featured: boolean;
  date: string;
  role: string;
  text: string;
  photo: RawMedia;
  link?: Partial<RawLink>;
  gallery?: { image?: Img; video?: string | null; alt?: string }[];
};

const rows = raw as unknown as RawEvent[];

export const events: EventItem[] = rows.map((r) => ({
  slug: r.slug,
  title: r.title,
  date: r.date,
  role: r.role,
  text: r.text,
  image: toMedia(r.photo),
  ...(r.link?.label && r.link.href
    ? { link: { label: r.link.label, href: r.link.href } }
    : {}),
  // A video without a still is kept too: the player shows its first frame.
  gallery: (r.gallery ?? []).flatMap((g): GalleryItem[] => {
    const video = opt(g.video);
    const media = g.image
      ? { src: g.image, alt: g.alt || `${r.title} photo` }
      : undefined;
    return media || video ? [{ media, video }] : [];
  }),
}));

/** The event ticked "Feature this event" (the first one if none is). */
export const FEATURED_EVENT_INDEX = Math.max(
  0,
  rows.findIndex((r) => r.featured),
);

export const eventBySlug = (slug: string) =>
  events.find((e) => e.slug === slug);
