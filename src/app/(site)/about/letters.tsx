"use client";

import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@lib/utils";
import type { Letter } from "@data/about";
import { Icon } from "@components/icon";
import { Lightbox } from "@components/client/lightbox";
import { OrgLogo, PersonName } from "@components/person-name";

const byline = (l: Letter) =>
  [l.role, [l.org, l.date].filter(Boolean).join(", ")]
    .filter(Boolean)
    .join(", ");

/**
 * Each letter as its first page beside a line from it. The pages open
 * full screen, one after another; the typed-out text sits under a
 * disclosure for screen readers and anyone who'd rather read it than
 * zoom in. A letter whose scan isn't uploaded yet shows its text alone.
 */
export function Letters({ letters }: { letters: Letter[] }) {
  const [open, setOpen] = useState<number | null>(null);
  // Every page of every letter, in order, for the viewer.
  const pages = letters.flatMap((l) =>
    l.pages.map((src, j) => ({
      title:
        l.pages.length > 1
          ? `Letter from ${l.name}, page ${j + 1} of ${l.pages.length}`
          : `Letter from ${l.name}`,
      caption: byline(l),
      media: {
        src,
        alt: `Page ${j + 1} of the letter from ${l.name}`,
        fit: "contain" as const,
      },
    })),
  );
  const firstPage = (i: number) =>
    letters.slice(0, i).reduce((n, l) => n + l.pages.length, 0);

  return (
    <>
      <div className="flex flex-col gap-[clamp(64px,8vw,112px)]">
        {letters.map((l, i) => (
          <article
            key={l.name}
            data-reveal=""
            className={cn(
              "grid items-center gap-x-[clamp(40px,6vw,96px)] gap-y-8",
              l.pages.length > 0
                ? "md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
                : "max-w-[820px]",
            )}
          >
            {l.pages.length > 0 && (
              <button
                type="button"
                onClick={() => setOpen(firstPage(i))}
                aria-label={`Enlarge the letter from ${l.name}`}
                className={cn(
                  "group relative block w-full max-w-[440px] cursor-zoom-in justify-self-center border-0 bg-transparent p-0",
                  i % 2 === 1 && "md:order-2",
                )}
              >
                {/* Every letter in the same A4 page frame, shown whole. */}
                <span className="relative block aspect-[1/1.414] w-full bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,.35)] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.02]">
                  <Image
                    quality={100}
                    src={l.pages[0]}
                    alt={`Letter of recommendation from ${l.name}`}
                    fill
                    sizes="(max-width: 768px) 90vw, 440px"
                    className="object-contain"
                  />
                </span>
                <span className="absolute right-3 bottom-3 flex h-9 min-w-9 items-center justify-center gap-1.5 rounded-full bg-black/70 px-2.5 text-[13px] font-medium text-white">
                  {l.pages.length > 1 && `${l.pages.length} pages`}
                  <Icon name="maximize-2" size={16} />
                </span>
              </button>
            )}

            <figure className="m-0 flex min-w-0 flex-col gap-6">
              <blockquote className="m-0">
                <p className="font-display text-[clamp(21px,2vw,28px)] leading-[1.3] font-medium tracking-[-0.01em] text-pretty">
                  &ldquo;{l.excerpt}&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center gap-3.5">
                <OrgLogo
                  org={l.link && l.link !== l.orgLink ? l.org : l.name}
                  logo={l.orgLogo}
                  href={l.orgLink}
                  size={44}
                />
                <span className="flex min-w-0 flex-col gap-0.5">
                  <PersonName
                    name={l.name}
                    href={l.link ?? l.orgLink}
                    className="text-[17px] font-semibold"
                  />
                  <span className="text-[15px] text-fg-2">{byline(l)}</span>
                </span>
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
            items={pages}
            index={open}
            onIndex={setOpen}
            onClose={() => setOpen(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
