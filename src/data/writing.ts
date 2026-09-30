/** Blog posts, edited in the CMS (Writing). */
import raw from "./generated/writing.json";

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  draft: boolean;
  body: string;
};

type RawPost = Partial<Post> & { slug: string; title: string };

/** Drafts show only in development (`pnpm dev`), never on the live site. */
const showDrafts = process.env.NODE_ENV !== "production";

export const allPosts: Post[] = (raw as unknown as RawPost[])
  .map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date ?? "",
    summary: p.summary ?? "",
    tags: p.tags ?? [],
    draft: p.draft ?? true,
    body: p.body ?? "",
  }))
  .sort((a, b) => b.date.localeCompare(a.date));

export const posts = allPosts.filter((p) => showDrafts || !p.draft);

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  iso
    ? new Date(`${iso}T00:00:00`).toLocaleDateString("en-SG", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";
