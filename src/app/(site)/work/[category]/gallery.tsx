"use client";

import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { Graphic } from "@data/types";
import { Icon } from "@components/icon";
import { Lightbox } from "@components/client/lightbox";

export function Gallery({ items }: { items: Graphic[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      {/* Masonry columns so every artwork shows whole, at its own shape. */}
      <div className="columns-[300px] gap-4">
        {items.map((g, i) => (
          <figure
            key={g.id}
            data-reveal=""
            className="m-0 mb-4 flex break-inside-avoid flex-col overflow-hidden rounded-[24px] bg-tile-alt"
          >
            <Image
              quality={100}
              src={g.image.src}
              alt={g.image.alt}
              sizes="(max-width: 768px) 100vw, 33vw"
              placeholder={g.image.src.blurDataURL ? "blur" : "empty"}
              className="block h-auto w-full bg-pill"
            />
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
      <AnimatePresence>
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
      </AnimatePresence>
    </>
  );
}
