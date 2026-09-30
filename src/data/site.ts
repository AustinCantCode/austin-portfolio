/** Site-wide details, edited in the CMS (Site → Site & contact). */
import raw from "./generated/site.json";

const contact = raw.contact;

export const site = {
  name: raw.name,
  url: raw.url,
  location: raw.location,
  heroHeadline: raw.heroHeadline,
  heroTitles: (raw.heroTitles ?? []) as string[],
  heroLine: raw.heroLine,
  contact: {
    email: contact.email,
    mailto: `mailto:${contact.email}`,
    phone: contact.phone,
    tel: contact.tel,
    whatsapp: contact.whatsapp,
    linkedin: contact.linkedin,
    linkedinLabel: contact.linkedinLabel,
    github: contact.github,
    githubLabel: contact.githubLabel,
    githubUser: contact.githubUser,
    cvPdf: contact.cvPdf,
  },
  googlePlayUrl: raw.googlePlayUrl,
  stillgoodWebsiteUrl: raw.stillgoodWebsiteUrl,
  calibriumUrl: raw.calibriumUrl,
};

/** True for links that are still placeholders. */
export const isPlaceholderLink = (href: string) =>
  href === "#" || href === "" || href === "TODO";
