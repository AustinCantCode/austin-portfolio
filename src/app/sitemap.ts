import type { MetadataRoute } from "next";
import { categories } from "@data/categories";
import { projects } from "@data/projects";
import { site } from "@data/site";
import { posts } from "@data/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/work",
    ...categories.map((c) => `/work/${c.slug}`),
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
    priority: p === "/" ? 1 : p === "/work" || p === "/about" ? 0.8 : 0.6,
  }));
}
