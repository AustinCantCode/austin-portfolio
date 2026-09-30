/** Homepage copy and structure, edited in the CMS (Site → Homepage). */
import type { StaticImageData } from "next/image";
import raw from "./generated/home.json";
import type { RawMedia } from "./cms";

type Raw = typeof raw;
type RawArea = Raw["whatIDo"]["areas"][number] & { photo: RawMedia };

const areas = raw.whatIDo.areas as unknown as RawArea[];

type RawJourneyItem = {
  date: string;
  title: string;
  sub: string;
  now?: boolean;
  logo?: StaticImageData | null;
  icon?: string;
  links?: { label: string; href: string }[];
};

export const home = {
  journey: {
    ...raw.journey,
    items: (raw.journey.items as unknown as RawJourneyItem[]).map((t) => ({
      date: t.date,
      title: t.title,
      sub: t.sub,
      now: !!t.now,
      logo: t.logo ?? undefined,
      icon: t.icon || undefined,
      links: (t.links ?? []).filter((l) => l.label && l.href),
    })),
  },
  whatIDo: {
    title: raw.whatIDo.title,
    // Each area keeps its own photo. Areas are told apart by their place
    // in the list (`key`), never by a field that two entries could share.
    areas: areas.map(({ photo, photoHint, ...rest }, i) => {
      const { id, ...area } = rest as typeof rest & { id?: string };
      void id;
      return {
        ...area,
        key: `a${i}`,
        photo: photo?.image
          ? { src: photo.image as StaticImageData, alt: photo.alt ?? "" }
          : undefined,
        photoHint: photoHint ?? "",
      };
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
