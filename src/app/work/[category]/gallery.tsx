"use client";

import { useState } from "react";
import type { Graphic } from "@data/types";
import { Icon } from "@components/icon";
import { ImageSlot } from "@components/media";
import { Lightbox } from "@components/client/lightbox";

export function Gallery({ items }: { items: Graphic[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-4">
        {items.map((g, i) => (
          <figure
            key={g.id}
            data-reveal=""
            className="m-0 flex flex-col overflow-hidden rounded-[24px] bg-tile-alt"
          >
            <div className="relative aspect-[4/5] bg-pill">
              <ImageSlot
                media={g.image}
                placeholder={g.title}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <figcaption className="flex items-center justify-between gap-3 py-3.5 pr-4 pl-5">
              <span className="text-[16px] font-semibold">{g.title}</span>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`View ${g.title} larger`}
                className="grid size-9 flex-none place-items-center rounded-full bg-pill text-fg"
              >
                <Icon name="maximize-2" size={16} />
              </button>
            </figcaption>
          </figure>
        ))}
      </div>
      {open !== null && (
        <Lightbox
          items={items.map((g) => ({
            title: g.title,
            media: { ...g.image, fit: "contain" },
          }))}
          index={open}
          onIndex={setOpen}
          onClose={() => setOpen(null)}
          noun="artwork"
        />
      )}
    </>
  );
}
