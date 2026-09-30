import type { StaticImageData } from "next/image";

export type AreaId = "dev" | "design" | "ventures";

export type CategorySlug =
  | "web-apps"
  | "mobile-apps"
  | "client-work"
  | "school-projects"
  | "small-apps"
  | "ui-ux"
  | "product-design"
  | "graphic-design"
  | "ventures";

export type CategoryLayout = "projects" | "small-apps" | "gallery" | "ventures";

export type Category = {
  slug: CategorySlug;
  label: string;
  blurb: string;
  area: AreaId;
  layout: CategoryLayout;
};

export type Frame = "phone" | "laptop" | "none";

/** An image for a slot. `bare` shows a mockup image without a device frame. */
export type Media = {
  src: StaticImageData;
  alt: string;
  fit?: "cover" | "contain";
  position?: string;
  bare?: boolean;
};

export type Link = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  year: string;
  line: string;
  subtext: string;
  role: string;
  problem: string;
  did: string;
  outcome: string;
  ai?: string;
  skills: string[];
  links: Link[];
  categories: CategorySlug[];
  frame: Frame;
  cover?: Media;
  /** Square picture for small tiles (What I Do); falls back to the cover. */
  thumbnail?: Media;
  second?: Media;
  /** A single app screen, for device frames when `cover` is a mockup. */
  screen?: Media;
  /** Every image for the project's pop-up carousel. */
  gallery?: Media[];
  /** A demo video path under /public, shown in the pop-up. */
  video?: string;
  /** Long-form case study sections (replace problem/did/outcome). */
  story?: StorySection[];
  /** Big figures for the Results section. */
  results?: { value: string; label: string }[];
};

export type StorySection = {
  id: string;
  title: string;
  paragraphs: string[];
  image?: Media;
  callout?: string;
};

export type SmallApp = {
  title: string;
  tech: string;
  year: string;
  text: string;
  image?: Media;
  /** A demo video path under /public, shown in the pop-up. */
  video?: string;
};

export type Graphic = { id: string; title: string; image: Media };

export type Venture = {
  id: string;
  name: string;
  role: string;
  date: string;
  line: string;
  status: string;
  href: string;
  cta: string;
  /** A website screenshot, shown in a laptop frame when set. */
  screenshot?: Media;
};

export type EventItem = {
  /** The file name in content/events. */
  slug: string;
  title: string;
  date: string;
  role: string;
  text: string;
  image?: Media;
  link?: Link;
  /** Extra photos and videos, opened full screen from the card. */
  gallery: GalleryItem[];
};

/** A photo, or a video with an optional still. */
export type GalleryItem = { media?: Media; video?: string };

export type Certificate = {
  title: string;
  issuer: string;
  description: string;
  image?: StaticImageData;
};

export type CertificateGroup = {
  id: string;
  issuerGroup: string;
  items: Certificate[];
};

export type SkillGroup = { name: string; plain: string; items: string[] };
