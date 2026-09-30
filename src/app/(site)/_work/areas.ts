import { byYear, pickProjects } from "@data/projects";
import { smallApps } from "@data/small-apps";
import { graphics } from "@data/graphics";
import { categoryHref } from "@data/categories";
import type { WorkGroup } from "./area-view";

const tiles = (slugs: string[]) => byYear(pickProjects(slugs));

/** What each area's own page shows, group by group. */
export const areaGroups: Record<"dev" | "design", WorkGroup[]> = {
  dev: [
    {
      kind: "tiles",
      anchor: "client-work",
      label: "Client Work",
      href: categoryHref("client-work"),
      linkLabel: "See all ›",
      flex: "1 1 100%",
      projects: tiles([
        "calibrium",
        "ite",
        "ksp",
        "grx",
        "ac",
        "ial",
        "inlab",
        "jint",
      ]),
    },
    {
      kind: "tiles",
      anchor: "web-mobile",
      label: "Web & Mobile Apps",
      href: categoryHref("web-apps"),
      linkLabel: "See all ›",
      flex: "1 1 100%",
      projects: tiles(["port", "gowhere", "shoply"]),
    },
    {
      kind: "small",
      anchor: "small-apps",
      label: "Small Apps",
      href: categoryHref("small-apps"),
      linkLabel: "See all ›",
      flex: "1 1 100%",
      apps: smallApps,
    },
  ],
  design: [
    {
      kind: "thumbs",
      anchor: "ui-ux",
      label: "UI/UX",
      href: categoryHref("ui-ux"),
      linkLabel: "See all ›",
      flex: "1 1 100%",
      projects: tiles(["fresko", "quizzy", "hg", "sp"]),
    },
    {
      kind: "feature",
      anchor: "product-design",
      label: "Product Design",
      href: categoryHref("product-design"),
      linkLabel: "View ›",
      flex: "1 1 100%",
      projects: tiles(["lawks"]),
    },
    {
      kind: "art",
      anchor: "graphic-design",
      label: "Graphic Design",
      href: categoryHref("graphic-design"),
      linkLabel: "Open gallery ›",
      flex: "1 1 100%",
      art: graphics,
    },
  ],
};
