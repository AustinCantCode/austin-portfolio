import type { Metadata } from "next";

const KEYWORDS = [
  "Austin Sia",
  "Software Developer",
  "Full-Stack Developer",
  "Web Developer",
  "Mobile App Developer",
  "UI/UX Designer",
  "StillGood",
  "Singapore",
  "Portfolio",
  "Next.js",
  "React",
];

/** Title, description, canonical URL and OpenGraph for a page. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = title === "Austin Sia" ? title : `${title} | Austin Sia`;
  return {
    title: fullTitle,
    description,
    keywords: KEYWORDS,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: "Austin Sia",
      type: "website",
      images: [
        { url: "/AS-Circle-Logo.png", width: 500, height: 500, alt: "AS logo" },
      ],
    },
    twitter: { card: "summary", title: fullTitle, description },
  };
}
