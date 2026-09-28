/** Ventures, edited in the CMS (Work → Ventures). */
import raw from "./generated/ventures.json";
import type { Venture } from "./types";

type RawVenture = Omit<Venture, "id" | "name"> & {
  slug: string;
  name: string;
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
  }),
);
