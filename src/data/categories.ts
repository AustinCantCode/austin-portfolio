import catRaw from "./generated/categories.json";
import navRaw from "./generated/navigation.json";
import type { AreaId, Category, CategorySlug } from "./types";
import { CATEGORY_STRUCTURE } from "./structure";
import { projects } from "./projects";
import { smallApps } from "./small-apps";
import { graphics } from "./graphics";
import { ventures } from "./ventures";

type RawCategory = {
  slug: CategorySlug;
  label: string;
  blurb: string;
  seoTitle: string;
};
const text = new Map(
  (catRaw.items as RawCategory[]).map((c) => [c.slug, c] as const),
);

/**
 * Work categories. Their slugs, areas and layouts are fixed in code
 * (structure.ts); labels, blurbs and search titles come from the CMS
 * (Site → Work categories).
 */
export const categories: Category[] = CATEGORY_STRUCTURE.map((c) => ({
  slug: c.slug,
  label: text.get(c.slug)?.label || c.label,
  blurb: text.get(c.slug)?.blurb ?? "",
  area: c.area,
  layout: c.layout,
}));

export type NavSection = {
  id: AreaId;
  label: string;
  icon: "code-xml" | "pen-tool" | "rocket";
  categories: CategorySlug[];
};

const ICONS: Record<AreaId, NavSection["icon"]> = {
  dev: "code-xml",
  design: "pen-tool",
  ventures: "rocket",
};

type RawArea = { id: AreaId; label: string; line: string };
const navAreas = navRaw.areas as RawArea[];

/** The three areas of work, as shown in the nav, footer and Work page. */
export const navSections: NavSection[] = navAreas.map((a) => ({
  id: a.id,
  label: a.label,
  icon: ICONS[a.id],
  categories: CATEGORY_STRUCTURE.filter((c) => c.area === a.id).map(
    (c) => c.slug,
  ),
}));

/** A line under each area's name, used as its page intro (CMS → Work areas). */
export const areaLine: Partial<Record<AreaId, string>> = Object.fromEntries(
  navAreas.map((a) => [a.id, a.line]),
);

/** Each area has its own page: /development, /design and /ventures. */
export const AREA_PATH: Record<AreaId, string> = {
  dev: "/development",
  design: "/design",
  ventures: "/ventures",
};

/** Search titles for each category page (kept under 50 characters). */
export const categorySeoTitle = Object.fromEntries(
  CATEGORY_STRUCTURE.map((c) => [
    c.slug,
    text.get(c.slug)?.seoTitle || `${c.label} projects`,
  ]),
) as Record<CategorySlug, string>;

/** A category's page, under its area (Ventures is the area page itself). */
export const categoryHref = (slug: CategorySlug) => {
  const area = CATEGORY_STRUCTURE.find((c) => c.slug === slug)!.area;
  return area === "ventures"
    ? AREA_PATH.ventures
    : `${AREA_PATH[area]}/${slug}`;
};

/** The categories of one area, in order. */
export const categoriesIn = (area: AreaId) =>
  categories.filter((c) => c.area === area);

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);

export const projectsInCategory = (slug: CategorySlug) =>
  projects.filter((p) => p.categories.includes(slug));

export const categoryCount = (slug: CategorySlug) =>
  slug === "small-apps"
    ? smallApps.length
    : slug === "graphic-design"
      ? graphics.length
      : slug === "ventures"
        ? ventures.length
        : projectsInCategory(slug).length;
