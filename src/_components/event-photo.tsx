import type { Media } from "@data/types";
import { ImageSlot } from "./media";

/**
 * An event card's photo in a frame of one shape, so every card lines up.
 * A photo of another shape is zoomed to fill the frame.
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
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-pill">
      <ImageSlot
        media={media}
        fit="cover"
        placeholder={`${title} photo`}
        sizes={sizes}
      />
    </div>
  );
}
