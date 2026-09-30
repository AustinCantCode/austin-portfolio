import { portrait } from "@data/about";
import { site } from "@data/site";
import { skillGroups } from "@data/skills";
import type { Project } from "@data/types";

const url = (path: string) => `${site.url}${path === "/" ? "" : path}`;

export const PERSON_ID = `${site.url}/#person`;
export const WEBSITE_ID = `${site.url}/#website`;

/** Renders JSON-LD in the server HTML. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export const personLd = () => ({
  "@type": "Person",
  "@id": PERSON_ID,
  name: site.name,
  url: site.url,
  image: portrait ? `${site.url}${portrait.src.src}` : undefined,
  jobTitle: "Full-stack Software Developer and UI/UX Designer",
  description:
    "Full-stack Software Developer and UI/UX Designer in Singapore, building websites and mobile apps for companies and for himself.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "SG",
    addressLocality: "Singapore",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Singapore Polytechnic" },
    { "@type": "HighSchool", name: "Compassvale Secondary School" },
  ],
  knowsAbout: skillGroups.flatMap((g) => g.items),
  sameAs: [site.contact.linkedin, site.contact.github],
});

export const websiteLd = () => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: site.url,
  name: "Austin Sia",
  inLanguage: "en-SG",
  publisher: { "@id": PERSON_ID },
});

/** Breadcrumbs from the home page down to the current page. */
export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: url(it.path),
  })),
});

export const webPageLd = ({
  type = "WebPage",
  path,
  name,
  description,
}: {
  type?:
    | "WebPage"
    | "CollectionPage"
    | "ProfilePage"
    | "ContactPage"
    | "AboutPage";
  path: string;
  name: string;
  description: string;
}) => ({
  "@type": type,
  "@id": `${url(path)}#webpage`,
  url: url(path),
  name,
  description,
  isPartOf: { "@id": WEBSITE_ID },
  inLanguage: "en-SG",
  ...(type === "ProfilePage" || type === "AboutPage"
    ? { mainEntity: { "@id": PERSON_ID } }
    : {}),
});

/** A case study, marked up as a creative work by Austin. */
export const projectLd = (p: Project) => ({
  "@type": "CreativeWork",
  "@id": `${url(`/projects/${p.slug}`)}#work`,
  name: p.title,
  headline: `${p.title}: ${p.line}`,
  description: `${p.problem} ${p.did} ${p.outcome}`,
  url: url(`/projects/${p.slug}`),
  dateCreated: p.year,
  keywords: p.skills.join(", "),
  creator: { "@id": PERSON_ID },
  ...(p.cover ? { image: url(p.cover.src.src) } : {}),
  ...(p.links.filter((l) => /^https?:/.test(l.href)).length
    ? { sameAs: p.links.map((l) => l.href).filter((h) => /^https?:/.test(h)) }
    : {}),
});

/** A post in /writing. */
export const postLd = (p: {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
}) => ({
  "@type": "BlogPosting",
  "@id": `${url(`/writing/${p.slug}`)}#post`,
  headline: p.title,
  description: p.summary,
  url: url(`/writing/${p.slug}`),
  datePublished: p.date,
  keywords: p.tags.join(", "),
  author: { "@id": PERSON_ID },
  isPartOf: { "@id": WEBSITE_ID },
  inLanguage: "en-SG",
});

/** StillGood, marked up as the mobile app it is. No ratings are claimed. */
export const stillgoodAppLd = () => ({
  "@type": "MobileApplication",
  "@id": `${site.url}/stillgood#app`,
  name: "StillGood",
  url: site.stillgoodWebsiteUrl,
  downloadUrl: site.googlePlayUrl,
  installUrl: site.googlePlayUrl,
  operatingSystem: "Android",
  applicationCategory: "LifestyleApplication",
  description:
    "StillGood helps families reduce their food waste: snap your groceries, get reminded before they expire and find recipes to use them up.",
  datePublished: "2026-08-26",
  author: { "@id": PERSON_ID },
  offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" },
});

/** Wraps several nodes in one @graph document. */
export const graph = (...nodes: Record<string, unknown>[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});
