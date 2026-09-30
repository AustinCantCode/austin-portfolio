/** Testimonials, edited in the CMS (About → Testimonials). */
import raw from "./generated/testimonials.json";
import type { Img } from "./cms";

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  org: string;
  orgLogo?: Img;
  orgLink?: string;
  /** Their website, which their name links to. */
  link?: string;
  project?: string;
  photo?: Img;
  lead: boolean;
};

type RawTestimonial = {
  slug: string;
  name: string;
  lead?: boolean;
  quote?: string;
  role?: string;
  org?: string;
  orgLogo?: Img;
  orgLink?: string;
  link?: string;
  project?: string | null;
  photo?: Img;
  permission?: boolean;
};

/** Only quotes the person agreed to share, in CMS order. */
export const testimonials: Testimonial[] = (raw as unknown as RawTestimonial[])
  .filter((t) => t.permission && t.quote?.trim())
  .map((t) => ({
    id: t.slug,
    quote: t.quote!.trim(),
    name: t.name,
    role: t.role ?? "",
    org: t.org ?? "",
    orgLogo: t.orgLogo || undefined,
    orgLink: t.orgLink?.trim() || undefined,
    link: t.link?.trim() || undefined,
    project: t.project || undefined,
    photo: t.photo || undefined,
    lead: !!t.lead,
  }));

export const testimonialFor = (slug: string) =>
  testimonials.find((t) => t.project === slug);
