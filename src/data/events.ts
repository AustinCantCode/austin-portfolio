/** Events, edited in the CMS (About → Events). */
import raw from "./generated/events.json";
import { toMedia, type RawMedia } from "./cms";
import type { EventItem } from "./types";

type RawEvent = {
  title: string;
  featured: boolean;
  date: string;
  role: string;
  text: string;
  photo: RawMedia;
};

const rows = raw as unknown as RawEvent[];

export const events: EventItem[] = rows.map((r) => ({
  title: r.title,
  date: r.date,
  role: r.role,
  text: r.text,
  image: toMedia(r.photo),
}));

/** The event ticked "Feature this event" (the first one if none is). */
export const FEATURED_EVENT_INDEX = Math.max(
  0,
  rows.findIndex((r) => r.featured),
);
