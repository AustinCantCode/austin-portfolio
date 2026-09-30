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
      {/* Masonry columns so every artwork shows whole, at its own shape.
          Each piece hangs on the page, its title set underneath. */}
      <div className="columns-[300px] gap-x-[clamp(20px,2.4vw,32px)]">
        {items.map((g, i) => (
          <div
            key={g.id}
            data-reveal=""
            className="mb-[clamp(28px,3vw,40px)] break-inside-avoid"
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-haspopup="dialog"
              aria-label={`View ${g.title} larger`}
              className="group zoom-host block w-full rounded-[16px] border-0 bg-transparent p-0 text-left text-fg outline-offset-6"
            >
              <span className="block overflow-hidden rounded-[16px] bg-pill">
                <Image
                  quality={100}
                  src={g.image.src}
                  // The title is set right below; don't read it twice.
                  alt={g.image.alt === g.title ? "" : g.image.alt}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  placeholder={g.image.src.blurDataURL ? "blur" : "empty"}
                  data-zoom=""
                  className="block h-auto w-full"
                />
              </span>
              <span className="flex items-center justify-between gap-3 pt-3.5">
                <span className="text-[16px] font-semibold transition-colors duration-300 group-hover:text-accent-text">
                  {g.title}
                </span>
                <Icon
                  name="maximize-2"
                  size={16}
                  className="flex-none text-fg-2 transition-colors duration-300 group-hover:text-accent-text"
                />
              </span>
            </button>
          </div>
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
