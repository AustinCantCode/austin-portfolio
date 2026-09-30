import type { MetadataRoute } from "next";
import { AREA_PATH, categories, categoryHref } from "@data/categories";
import { projects } from "@data/projects";
import { site } from "@data/site";
import { posts } from "@data/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    AREA_PATH.dev,
    AREA_PATH.design,
    AREA_PATH.ventures,
    ...categories
      .filter((c) => c.area !== "ventures")
      .map((c) => categoryHref(c.slug)),
    ...projects.map((p) => `/projects/${p.slug}`),
    "/stillgood",
    "/about",
    "/about/skills",
    "/about/certificates",
    "/about/events",
    "/cv",
    "/contact",
    // Published posts only (drafts never reach the live site).
    ...(posts.length
      ? ["/writing", ...posts.map((p) => `/writing/${p.slug}`)]
      : []),
  ];
  const lastModified = new Date();
  return paths.map((p) => ({
    url: `${site.url}${p === "/" ? "" : p}`,
    lastModified,
    changeFrequency: "monthly",
    priority:
      p === "/"
        ? 1
        : [AREA_PATH.dev, AREA_PATH.design, "/about"].includes(p)
          ? 0.8
          : 0.6,
  }));
}
