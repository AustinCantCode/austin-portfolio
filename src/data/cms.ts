/**
 * Shapes shared by the CMS-backed data modules. The raw types mirror
 * keystatic.config.ts after scripts/content.mjs has turned image paths
 * into image objects.
 */
import type { StaticImageData } from "next/image";
import type { Media } from "./types";

/** An image from src/data/generated, or null when none is set. */
export type Img = StaticImageData | null;

/** Keystatic leaves empty text fields out of the file, hence the "?". */
export type RawMedia = {
  image?: Img;
  alt?: string;
  fit?: "" | "cover" | "contain";
  position?: string;
  bare?: boolean;
};

export type RawLink = { label: string; href: string };

/** A CMS image field with its settings, or undefined when it has no image. */
export function toMedia(m?: RawMedia | null): Media | undefined {
  if (!m?.image) return undefined;
  const out: Media = { src: m.image, alt: m.alt ?? "" };
  if (m.fit) out.fit = m.fit;
  if (m.position) out.position = m.position;
  if (m.bare) out.bare = true;
  return out;
}

/** Empty CMS text fields mean "not set". */
export const opt = (s?: string | null) => (s ? s : undefined);
