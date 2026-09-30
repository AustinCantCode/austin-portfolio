/** Ventures, edited in the CMS (Work → Ventures). */
import raw from "./generated/ventures.json";
import { toMedia, type RawMedia } from "./cms";
import type { Venture } from "./types";

type RawVenture = Omit<Venture, "id" | "name" | "screenshot"> & {
  slug: string;
  name: string;
  screenshot?: RawMedia;
};

export const ventures: Venture[] = (raw as unknown as RawVenture[]).map(
  (r) => ({
    id: r.slug,
    name: r.name,
    role: r.role,
    date: r.date,
    line: r.line,
    status: r.status,
    href: r.href,
    cta: r.cta,
    screenshot: toMedia(r.screenshot),
  }),
);
