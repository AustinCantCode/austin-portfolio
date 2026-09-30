import Image from "next/image";
import type { Media } from "@data/types";
import { ImageSlot } from "./media";

const PHOTO_RATIO = 4 / 3;

/**
 * An event card's photo in a frame of one shape, so every card lines up.
 * The photo is never cropped: one of another shape sits whole in the
 * frame, over a blurred copy of itself.
 */
export function EventPhoto({
  media,
  title,
  sizes = "(max-width: 768px) 100vw, 33vw",
}: {
  media?: Media;
  title: string;
  sizes?: string;
}) {
  const odd =
    media &&
    Math.abs(media.src.width / media.src.height / PHOTO_RATIO - 1) > 0.02;
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-pill">
      {odd && (
        <Image
          src={media.src}
          alt=""
          aria-hidden="true"
          fill
          quality={100}
          sizes={sizes}
          className="scale-110 object-cover opacity-70 blur-2xl"
        />
      )}
      <ImageSlot
        media={media ? { ...media, fit: "contain" } : undefined}
        placeholder={`${title} photo`}
        sizes={sizes}
      />
    </div>
  );
}
