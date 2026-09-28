import type { MetadataRoute } from "next";
import { categories } from "@data/categories";
import { projects } from "@data/projects";
import { site } from "@data/site";

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
  ];
  return paths.map((p) => ({ url: `${site.url}${p === "/" ? "" : p}` }));
}
