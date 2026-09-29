"use client";

import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@lib/utils";
import type { Letter } from "@data/about";
import { Icon } from "@components/icon";
import { Lightbox } from "@components/client/lightbox";

const byline = (l: Letter) =>
  [l.role, [l.org, l.date].filter(Boolean).join(", ")]
    .filter(Boolean)
    .join(", ");

/**
 * Each letter as its scan beside a line from it. The scan opens full
 * screen; the typed-out text sits under a disclosure for screen readers
 * and anyone who'd rather read it than zoom in.
 */
export function Letters({ letters }: { letters: Letter[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="flex flex-col gap-[clamp(64px,8vw,112px)]">
        {letters.map((l, i) => (
          <article
            key={l.name}
            data-reveal=""
            className="grid items-center gap-x-[clamp(40px,6vw,96px)] gap-y-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Enlarge the letter from ${l.name}`}
              className={cn(
                "group relative block w-full max-w-[440px] cursor-zoom-in justify-self-center border-0 bg-transparent p-0",
                i % 2 === 1 && "md:order-2",
              )}
            >
              <Image
                quality={100}
                src={l.image}
                alt={`Letter of recommendation from ${l.name}`}
                sizes="(max-width: 768px) 90vw, 440px"
                className="block h-auto w-full bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,.35)] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.02]"
              />
              <span className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-black/70 text-white">
                <Icon name="maximize-2" size={16} />
              </span>
            </button>

            <figure className="m-0 flex min-w-0 flex-col gap-6">
              <blockquote className="m-0">
                <p className="font-display text-[clamp(24px,2.6vw,34px)] leading-[1.28] font-medium tracking-[-0.01em] text-pretty">
                  &ldquo;{l.excerpt}&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex flex-col gap-0.5">
                <span className="text-[17px] font-semibold">{l.name}</span>
                <span className="text-[15px] text-fg-2">{byline(l)}</span>
              </figcaption>
              {l.paragraphs.length > 0 && (
                <details className="group/letter">
                  <summary className="inline-flex h-10 cursor-pointer list-none items-center gap-2 rounded-full bg-pill px-4 text-[14px] font-medium text-fg [&::-webkit-details-marker]:hidden">
                    Read the Full Letter
                    <Icon
                      name="chevron-down"
                      size={16}
                      className="transition-transform group-open/letter:rotate-180"
                    />
                  </summary>
                  <div className="flex flex-col gap-4 pt-6">
                    {l.paragraphs.map((p, j) => (
                      <p
                        key={j}
                        className="text-[16px] leading-[1.65] whitespace-pre-line text-fg-2"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </details>
              )}
            </figure>
          </article>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <Lightbox
            variant="certificate"
            noun="letter"
            items={letters.map((l) => ({
              title: `Letter from ${l.name}`,
              caption: byline(l),
              media: {
                src: l.image,
                alt: `Letter of recommendation from ${l.name}`,
                fit: "contain",
              },
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
