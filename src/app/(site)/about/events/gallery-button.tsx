"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@lib/utils";
import type { GalleryItem } from "@data/types";
import { Icon } from "@components/icon";
import { Lightbox } from "@components/client/lightbox";

/** Opens an event's photos and videos full screen. */
export function GalleryButton({
  title,
  items,
  className,
}: {
  title: string;
  items: GalleryItem[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const videos = items.filter((g) => g.video).length;
  const photos = items.length - videos;
  const label = [
    photos && `${photos} ${photos === 1 ? "Photo" : "Photos"}`,
    videos && `${videos} ${videos === 1 ? "Video" : "Videos"}`,
  ]
    .filter(Boolean)
    .join(" and ");

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(0)}
        className={cn(
          "inline-flex h-10 w-max items-center gap-2 rounded-full border-0 px-4 text-[14px] font-medium",
          className,
        )}
      >
        <Icon name={videos ? "play" : "image"} size={16} />
        View {label}
      </button>
      <AnimatePresence>
        {open !== null && (
          <Lightbox
            noun={videos ? "item" : "photo"}
            items={items.map((g) => ({
              title,
              caption: g.media?.alt,
              media: g.media,
              video: g.video,
            }))}
            index={open}
            onIndex={setOpen}
            onClose={() => setOpen(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
