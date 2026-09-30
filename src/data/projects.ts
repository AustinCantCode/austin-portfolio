/** Projects, edited in the CMS (Work → Projects). */
import raw from "./generated/projects.json";
import { opt, toMedia, type RawLink, type RawMedia } from "./cms";
import type { CategorySlug, Frame, Media, Project } from "./types";

type RawProject = {
  slug: string;
  title: string;
  year: string;
  line: string;
  subtext: string;
  role: string;
  problem: string;
  did: string;
  outcome: string;
  ai: string;
  skills: string[];
  links: RawLink[];
  categories: CategorySlug[];
  frame: Frame;
  cover: RawMedia;
  thumbnail?: RawMedia;
  second: RawMedia;
  screen: RawMedia;
  gallery: RawMedia[];
  video?: string | null;
  story?: {
    title?: string;
    body?: string;
    image?: RawMedia;
    callout?: string;
  }[];
  results?: { value?: string; label?: string }[];
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const projects: Project[] = (raw as unknown as RawProject[]).map((r) => {
  const p: Project = {
    slug: r.slug,
    title: r.title,
    year: r.year,
    line: r.line,
    subtext: r.subtext,
    role: r.role,
    problem: r.problem,
    did: r.did,
    outcome: r.outcome,
    skills: r.skills,
    links: r.links,
    categories: r.categories,
    frame: r.frame,
  };
  const ai = opt(r.ai);
  if (ai) p.ai = ai;
  const cover = toMedia(r.cover);
  const second = toMedia(r.second);
  const screen = toMedia(r.screen);
  if (cover) p.cover = cover;
  const thumbnail = toMedia(r.thumbnail);
  if (thumbnail) p.thumbnail = thumbnail;
  if (second) p.second = second;
  if (screen) p.screen = screen;
  // Pop-up carousels: every image for a project, in order. An empty
  // gallery falls back to the cover and second image.
  const gallery = r.gallery.map(toMedia).filter((m): m is Media => !!m);
  p.gallery = gallery.length
    ? gallery
    : [cover, second].filter((m): m is Media => !!m);
  p.video = opt(r.video);
  const story = (r.story ?? [])
    .filter((x) => x.title && x.body)
    .map((x, i) => ({
      id: slugify(x.title!) || `section-${i + 1}`,
      title: x.title!,
      paragraphs: x
        .body!.split(/\n\s*\n/)
        .map((t) => t.trim())
        .filter(Boolean),
      image: toMedia(x.image),
      callout: opt(x.callout),
    }));
  if (story.length) p.story = story;
  const results = (r.results ?? []).filter((x) => x.value && x.label) as {
    value: string;
    label: string;
  }[];
  if (results.length) p.results = results;
  return p;
});

export const projectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);

/** Projects in data order, newest year first. */
export const byYear = (list: Project[]) =>
  list
    .map((p, i) => ({ p, i }))
    .sort((a, b) => Number(b.p.year) - Number(a.p.year) || a.i - b.i)
    .map(({ p }) => p);

export const pickProjects = (slugs: string[]) =>
  slugs.map(projectBySlug).filter((p): p is Project => Boolean(p));
