/**
 * Search titles, descriptions and headings for each page, edited in the
 * CMS (Site → Pages & SEO). Titles stay under about 60 characters and
 * descriptions under about 160 so search results show them whole.
 */
import raw from "./generated/pages.json";

type PageCopy = {
  title: string;
  description: string;
  heading?: string;
  intro?: string;
  formTitle?: string;
  formLine?: string;
};

export const pageCopy = raw as Record<
  | "home"
  | "work"
  | "about"
  | "skills"
  | "certificates"
  | "events"
  | "cv"
  | "contact"
  | "stillgood"
  | "writing",
  PageCopy
>;
