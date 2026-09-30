import type { NextConfig } from "next";
import { CATEGORY_STRUCTURE } from "./src/data/structure";

const AREA_PATH = {
  dev: "/development",
  design: "/design",
  ventures: "/ventures",
} as const;

const nextConfig: NextConfig = {
  // Images are served at full quality (see the quality prop in ImageSlot).
  images: { qualities: [75, 100] },
  // Old routes: the previous site, and the single Work page that each
  // area has since replaced with its own page.
  async redirects() {
    const byArea = (area: "design" | "ventures") => ({
      source: "/work",
      has: [{ type: "query" as const, key: "filter", value: area }],
      destination: AREA_PATH[area],
      permanent: true,
    });
    return [
      { source: "/homepage", destination: "/", permanent: true },
      { source: "/coding", destination: AREA_PATH.dev, permanent: true },
      { source: "/designing", destination: AREA_PATH.design, permanent: true },
      {
        source: "/achievements",
        destination: "/about/certificates",
        permanent: true,
      },
      {
        source: "/participation",
        destination: "/about/events",
        permanent: true,
      },
      byArea("design"),
      byArea("ventures"),
      { source: "/work", destination: AREA_PATH.dev, permanent: true },
      ...CATEGORY_STRUCTURE.map((c) => ({
        source: `/work/${c.slug}`,
        destination:
          c.area === "ventures"
            ? AREA_PATH.ventures
            : `${AREA_PATH[c.area]}/${c.slug}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
