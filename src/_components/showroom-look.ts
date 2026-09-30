import type { Media, Project } from "@data/types";
import { PHONE_SIZES } from "./media";

/**
 * How a piece of work stands in the showroom (see client/showroom.tsx):
 * in a tablet or phone whose screen takes the screenshot's own shape, or
 * as the object itself (a mockup, a photo, an app icon). `ratio` is
 * width / height. Nothing is cropped.
 */
export type Look = (
  | { kind: "tablet" | "phone"; media?: Media; ratio: number }
  | { kind: "object"; media?: Media; ratio: number; photo: boolean }
  | { kind: "icon"; media: Media }
) & {
  /** Names the image in its placeholder until it's uploaded. */
  label?: string;
};

const shape = (m: Media) => m.src.width / m.src.height;
const within = (n: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, n));

/** A web screenshot in a landscape tablet (2:1 until there's an image). */
export const tabletLook = (media?: Media): Look => ({
  kind: "tablet",
  media,
  ratio: media ? within(shape(media), 1.2, 2.4) : 2,
});

/** An app screen in a phone. */
export const phoneLook = (media?: Media): Look => ({
  kind: "phone",
  media,
  ratio: media ? within(shape(media), 0.4, 0.62) : 0.46,
});

/** A photo standing as a print, with rounded corners. */
export const photoLook = (media?: Media): Look => ({
  kind: "object",
  media,
  ratio: media ? shape(media) : 4 / 3,
  photo: true,
});

export function lookOf(p: Project): Look {
  const cover = p.cover;
  if (p.screen) return phoneLook(p.screen);
  // A mockup already shows its own devices.
  if (cover?.bare)
    return { kind: "object", media: cover, ratio: shape(cover), photo: false };
  if (p.frame === "phone") {
    // A square image for an app is its icon, not a screen.
    if (cover && shape(cover) > 0.7) return { kind: "icon", media: cover };
    return phoneLook(cover);
  }
  if (p.frame === "none") return photoLook(cover);
  return tabletLook(cover);
}

/** Landscape things get the wider column when paired with a tall one. */
export const isWide = (look: Look) =>
  look.kind === "tablet" || (look.kind === "object" && look.ratio > 1.2);

export type Size = "lg" | "sm";

/** Phone frame size key per showroom size, and its bezel (PHONE_SIZES). */
export const PHONE = { lg: 240, sm: 160 } as const;
const BEZEL = "clamp(4px,0.45vw,6px)"; // TabletFrame's padding

/**
 * The device's width, so that its height is at most var(--stage) and it
 * never overflows its column.
 */
export function widthOf(look: Look, size: Size) {
  const r = "ratio" in look ? look.ratio.toFixed(4) : "1";
  switch (look.kind) {
    case "tablet":
      return `min(100%, calc((var(--stage) - 2 * ${BEZEL}) * ${r} + 2 * ${BEZEL}))`;
    case "phone": {
      const pad = PHONE_SIZES[PHONE[size]] * 2;
      return `min(100%, calc((var(--stage) - ${pad}px) * ${r} + ${pad}px))`;
    }
    case "object":
      return `min(100%, calc(var(--stage) * ${r}))`;
    case "icon":
      return "min(100%, calc(var(--stage) * 0.5))";
  }
}
