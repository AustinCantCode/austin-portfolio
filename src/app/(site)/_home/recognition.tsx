"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SectionHeader } from "@components/ui";
import { Lightbox } from "@components/client/lightbox";

type Award = {
  title: string;
  issuer: string;
  description: string;
  image: StaticImageData;
};

/**
 * "Recognition." The awards ticked "Show on the homepage" in the CMS,
 * each whole in the same certificate frame; each opens the certificate
 * viewer.
 */
export function Recognition({
  title,
  sub,
  link,
  items,
}: {
  title: string;
  sub?: string;
  link?: { label: string; href: string };
  items: Award[];
}) {
  const [open, setOpen] = useState<number | null>(null);
  if (!items.length) return null;
  return (
    <section aria-labelledby="recognition" className="gutter band-y">
      <div className="wrap flex flex-col gap-[clamp(40px,5vw,72px)]">
        <SectionHeader id="recognition" title={title} sub={sub} link={link} />
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] items-start gap-[clamp(20px,2.4vw,32px)] p-0">
          {items.map((a, i) => (
            <li key={a.title} data-reveal="">
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-haspopup="dialog"
                className="zoom-host press group flex w-full flex-col gap-4 border-0 bg-transparent p-0 text-left text-fg"
              >
                {/* The same frame as the certificates page: every award
                    sits whole on a mat of one shape. */}
                <span className="relative block aspect-[1.41/1] w-full overflow-hidden bg-pill">
                  <span data-zoom="" className="absolute inset-[7%] block">
                    <Image
                      quality={100}
                      src={a.image}
                      alt={`${a.title} certificate`}
                      fill
                      sizes="(max-width: 640px) 100vw, 380px"
                      placeholder={a.image.blurDataURL ? "blur" : "empty"}
                      className="object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.18)]"
                    />
                  </span>
                </span>
                <span className="flex flex-col gap-1 px-1">
                  <span className="text-[17px] leading-[1.35] font-semibold">
                    {a.title}
                  </span>
                  <span className="text-[14px] text-fg-2">{a.issuer}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <AnimatePresence>
        {open !== null && (
          <Lightbox
            variant="certificate"
            noun="certificate"
            items={items.map((a) => ({
              title: a.title,
              caption: `${a.issuer}. ${a.description}`,
              media: {
                src: a.image,
                alt: `${a.title} certificate`,
                fit: "contain",
              },
            }))}
            index={open}
            onIndex={setOpen}
            onClose={() => setOpen(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
