import type { Media, Project } from "@data/types";
import { PHONE_SIZES } from "./media";

/**
 * How a piece of work stands in the showroom (see client/showroom.tsx):
 * in a tablet or phone, or as the object itself (a mockup, a photo, an
 * app icon). `ratio` is width / height.
 *
 * Every kind has one fixed shape (SHAPES), so pieces of the same kind are
 * always the same size and a row of them lines up. Screenshots fill their
 * screen from the top (a taller one loses a little of its bottom, like a
 * browser window); photos fill their print; mockups sit whole in a square.
 */
export type Look = (
  | { kind: "tablet" | "phone"; media?: Media; ratio: number }
  | { kind: "object"; media?: Media; ratio: number; photo: boolean }
  | { kind: "icon"; media: Media }
) & {
  /** Names the image in its placeholder until it's uploaded. */
  label?: string;
};

/** The one shape of each kind (width / height). */
export const SHAPES = {
  /** Web screenshots are 1.8–2.1 wide; 2:1 crops only the odd bottom. */
  tablet: 2,
  /** A modern phone screen, 9:19.5 (app screens are about 0.45). */
  phone: 9 / 19.5,
  photo: 4 / 3,
  mockup: 1,
} as const;

const shape = (m: Media) => m.src.width / m.src.height;

/** A web screenshot in a landscape tablet. */
export const tabletLook = (media?: Media): Look => ({
  kind: "tablet",
  media,
  ratio: SHAPES.tablet,
});

/** An app screen in a phone. */
export const phoneLook = (media?: Media): Look => ({
  kind: "phone",
  media,
  ratio: SHAPES.phone,
});

/** A photo standing as a print, with rounded corners. */
export const photoLook = (media?: Media): Look => ({
  kind: "object",
  media,
  ratio: SHAPES.photo,
  photo: true,
});

export function lookOf(p: Project): Look {
  const cover = p.cover;
  if (p.screen) return phoneLook(p.screen);
  // A mockup already shows its own devices.
  if (cover?.bare)
    return { kind: "object", media: cover, ratio: SHAPES.mockup, photo: false };
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
