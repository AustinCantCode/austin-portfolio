import type { MetadataRoute } from "next";
import { site } from "@data/site";

// Everything is public, including to AI search crawlers (OAI-SearchBot,
// Claude-SearchBot, PerplexityBot), so the portfolio can be cited. Only
// the CMS admin and its API are left out.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/keystatic", "/api/"] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
