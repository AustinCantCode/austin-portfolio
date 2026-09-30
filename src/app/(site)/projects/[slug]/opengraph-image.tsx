import { projectBySlug, projects } from "@data/projects";
import { OG_SIZE, ogCard } from "@lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Case study by Austin Sia";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = projectBySlug((await params).slug);
  return ogCard({
    eyebrow: p ? `Case Study: ${p.subtext}` : "Case Study",
    title: p?.title ?? "Austin Sia",
    line:
      p?.line ??
      "Full-stack Software Developer and UI/UX Designer in Singapore.",
  });
}
