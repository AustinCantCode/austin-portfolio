import type { AreaId, Category, CategorySlug } from "./types";
import { projects } from "./projects";
import { smallApps } from "./small-apps";
import { graphics } from "./graphics";
import { ventures } from "./ventures";

export const categories: Category[] = [
  {
    slug: "web-apps",
    label: "Web apps",
    blurb: "Sites and platforms, from storefronts to school systems.",
    area: "dev",
    layout: "projects",
  },
  {
    slug: "mobile-apps",
    label: "Mobile apps",
    blurb: "Apps built and designed for the phone.",
    area: "dev",
    layout: "projects",
  },
  {
    slug: "client-work",
    label: "Client work",
    blurb: "Built for real clients and live today.",
    area: "dev",
    layout: "projects",
  },
  {
    slug: "school-projects",
    label: "School projects",
    blurb: "Made at Singapore Polytechnic.",
    area: "dev",
    layout: "projects",
  },
  {
    slug: "small-apps",
    label: "Small apps",
    blurb: "Tiny apps I built while learning.",
    area: "dev",
    layout: "small-apps",
  },
  {
    slug: "ui-ux",
    label: "UI/UX",
    blurb: "Research, flows and prototypes.",
    area: "design",
    layout: "projects",
  },
  {
    slug: "product-design",
    label: "Product design",
    blurb: "Physical things, modelled and printed.",
    area: "design",
    layout: "projects",
  },
  {
    slug: "graphic-design",
    label: "Graphic design",
    blurb: "Posters, ads and artwork.",
    area: "design",
    layout: "gallery",
  },
  {
    slug: "ventures",
    label: "Ventures",
    blurb: "Things I started.",
    area: "ventures",
    layout: "ventures",
  },
];

export type NavSection = {
  id: AreaId;
  label: string;
  icon: "code-xml" | "pen-tool" | "rocket";
  categories: CategorySlug[];
};

export const navSections: NavSection[] = [
  {
    id: "dev",
    label: "Development",
    icon: "code-xml",
    categories: [
      "web-apps",
      "mobile-apps",
      "client-work",
      "school-projects",
      "small-apps",
    ],
  },
  {
    id: "design",
    label: "Design",
    icon: "pen-tool",
    categories: ["ui-ux", "product-design", "graphic-design"],
  },
  {
    id: "ventures",
    label: "Entrepreneurship",
    icon: "rocket",
    categories: ["ventures"],
  },
];

/** Search titles for each category page (kept under 50 characters). */
export const categorySeoTitle: Record<CategorySlug, string> = {
  "web-apps": "Web App Projects: Storefronts to School Systems",
  "mobile-apps": "Mobile App Projects and App Designs",
  "client-work": "Client Work: Live Websites and Platforms",
  "school-projects": "School Projects from Singapore Polytechnic",
  "small-apps": "Small Apps Built While Learning to Code",
  "ui-ux": "UI/UX Design Projects and Prototypes",
  "product-design": "Product Design: 3D-Printed Prototypes",
  "graphic-design": "Graphic Design Gallery: Posters and Ads",
  ventures: "Ventures: A Hackathon Team, Freelance and an App",
};

export const categoryHref = (slug: CategorySlug) => `/work/${slug}`;

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
