/** Homepage copy and structure, edited in the CMS (Site → Homepage). */
import type { StaticImageData } from "next/image";
import raw from "./generated/home.json";
import type { RawMedia } from "./cms";

type Raw = typeof raw;
type RawArea = Raw["whatIDo"]["areas"][number] & { photo: RawMedia };

const areas = raw.whatIDo.areas as unknown as RawArea[];

export const home = {
  journey: raw.journey,
  whatIDo: {
    title: raw.whatIDo.title,
    areas: areas.map((a) => {
      const { photo, photoHint, ...rest } = a;
      void photo;
      void photoHint;
      return rest;
    }),
  },
  tools: raw.tools,
  selectedWork: raw.selectedWork,
  kindWords: raw.kindWords,
  clients: {
    title: raw.clients.title,
    items: raw.clients.items as unknown as {
      name: string;
      project?: string | null;
      logo?: StaticImageData | null;
    }[],
  },
  events: raw.events,
  recognition: raw.recognition,
  numbers: {
    title: raw.numbers.title,
    // Plain numbers count up on the page; others ("10+") are shown as is.
    stats: raw.numbers.stats.map((s) => ({
      ...s,
      n: /^\d+$/.test(s.n) ? Number(s.n) : s.n,
    })),
  },
  contact: raw.contact,
};

/** Photos for the three "What I do" panels. */
export const whatIDoPhotos: Record<
  string,
  { src: StaticImageData; alt: string } | undefined
> = Object.fromEntries(
  areas.map((a) => [
    a.id,
    a.photo.image ? { src: a.photo.image, alt: a.photo.alt } : undefined,
  ]),
);

export const whatIDoPhotoHints: Record<string, string> = Object.fromEntries(
  areas.map((a) => [a.id, a.photoHint]),
);
