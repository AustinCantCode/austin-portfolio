/**
 * Small brand icons for skills, from Simple Icons (CC0). Built on the
 * server into plain SVG data, so the icon set never reaches the browser.
 * A skill added in the CMS gets its icon automatically when its name is
 * listed here; unknown names simply show no icon.
 */
import "server-only";
import { getIconData, iconToSVG } from "@iconify/utils";
import icons from "@iconify-json/simple-icons/icons.json";
import type { IconifyJSON } from "@iconify/types";

export type SkillIcon = { body: string; viewBox: string };

/** Skill name (lower-cased) → Simple Icons name. */
const NAMES: Record<string, string> = {
  "next.js": "nextdotjs",
  react: "react",
  "react.js": "react",
  "react native": "react",
  typescript: "typescript",
  "tailwind css": "tailwindcss",
  nativewind: "tailwindcss",
  html: "html5",
  css: "css",
  javascript: "javascript",
  motion: "framer",
  "framer motion": "framer",
  expo: "expo",
  "node.js": "nodedotjs",
  "express.js": "express",
  fastify: "fastify",
  "c#": "csharp",
  supabase: "supabase",
  postgresql: "postgresql",
  mysql: "mysql",
  mongodb: "mongodb",
  prisma: "prisma",
  graphql: "graphql",
  "strapi cms": "strapi",
  "claude code": "claude",
  posthog: "posthog",
  sentry: "sentry",
  docker: "docker",
  "github actions": "githubactions",
  "swagger ui": "swagger",
  figma: "figma",
  "adobe photoshop": "adobephotoshop",
  "adobe illustrator": "adobeillustrator",
  "adobe xd": "adobexd",
  tinkercad: "tinkercad",
};

// A plain database cylinder for tools without a brand mark (e.g. TablePlus).
const DATABASE: SkillIcon = {
  viewBox: "0 0 24 24",
  body: '<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></g>',
};
const FALLBACK: Record<string, SkillIcon> = { tableplus: DATABASE };

export function skillIcon(skill: string): SkillIcon | undefined {
  const key = skill.trim().toLowerCase();
  const name = NAMES[key];
  const data = name && getIconData(icons as IconifyJSON, name);
  if (!data) return FALLBACK[key];
  const svg = iconToSVG(data);
  return { body: svg.body, viewBox: svg.attributes.viewBox };
}

/** Icons for a list of skills, keyed by name, for passing to client code. */
export const skillIcons = (skills: string[]) =>
  Object.fromEntries(
    skills.flatMap((s) => {
      const i = skillIcon(s);
      return i ? [[s, i]] : [];
    }),
  ) as Record<string, SkillIcon>;
