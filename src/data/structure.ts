/**
 * The parts of the site's structure that stay in code: category slugs
 * (they are URLs), which area each belongs to and how its page is laid
 * out. Labels, blurbs and search titles are edited in the CMS.
 * Imported by keystatic.config.ts, so it must not import content.
 */
import type { AreaId, CategoryLayout, CategorySlug } from "./types";

export const CATEGORY_STRUCTURE: {
  slug: CategorySlug;
  area: AreaId;
  layout: CategoryLayout;
  label: string;
}[] = [
  { slug: "web-apps", area: "dev", layout: "projects", label: "Web apps" },
  {
    slug: "mobile-apps",
    area: "dev",
    layout: "projects",
    label: "Mobile apps",
  },
  {
    slug: "client-work",
    area: "dev",
    layout: "projects",
    label: "Client work",
  },
  {
    slug: "school-projects",
    area: "dev",
    layout: "projects",
    label: "School projects",
  },
  {
    slug: "small-apps",
    area: "dev",
    layout: "small-apps",
    label: "Small apps",
  },
  { slug: "ui-ux", area: "design", layout: "projects", label: "UI/UX" },
  {
    slug: "product-design",
    area: "design",
    layout: "projects",
    label: "Product design",
  },
  {
    slug: "graphic-design",
    area: "design",
    layout: "gallery",
    label: "Graphic design",
  },
  {
    slug: "ventures",
    area: "ventures",
    layout: "ventures",
    label: "Ventures",
  },
];

export const AREA_IDS: AreaId[] = ["dev", "design", "ventures"];
