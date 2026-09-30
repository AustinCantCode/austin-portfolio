import type { Metadata } from "next";

/**
 * Title, description, canonical URL, OpenGraph and Twitter tags for a page.
 * Every title starts with the name: "Austin Sia | <title>".
 * The share image defaults to the generated /opengraph-image card.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  image = "/opengraph-image",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
  /** Path of the share image; defaults to the site-wide card. */
  image?: string;
}): Metadata {
  const fullTitle = `Austin Sia | ${title.replace(/^Austin Sia\s*[|–:-]\s*/, "")}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: "Austin Sia",
      locale: "en_SG",
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Austin Sia, full-stack developer and UI/UX designer in Singapore",
        },
      ],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

/** Shortens text to at most `max` characters, ending on a whole word. */
export function clip(text: string, max = 158) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "")}…`;
}
