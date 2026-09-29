"use client";

import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import type { Graphic, Project, SmallApp } from "@data/types";
import { NaturalImage } from "@components/media";
import { ShowroomGrid, SmallAppItem } from "@components/client/showroom";
import { Carousel } from "@components/client/carousel";
import { Lightbox } from "@components/client/lightbox";

type Base = {
  anchor: string;
  label: string;
  href: string;
  linkLabel: string;
  flex: string;
};

export type WorkGroup =
  | (Base & { kind: "tiles"; projects: Project[] })
  | (Base & { kind: "small"; apps: SmallApp[] })
  | (Base & { kind: "art"; art: Graphic[] });

const groupCount = (g: WorkGroup) =>
  g.kind === "tiles"
    ? g.projects.length
    : g.kind === "small"
      ? g.apps.length
      : g.art.length;

/** An area's page: each group of its work, with a link to see it all. */
export function AreaView({ groups }: { groups: WorkGroup[] }) {
  return (
    <div className="gutter pt-[clamp(8px,1vw,16px)] pb-[clamp(72px,min(9vw,13vh),136px)]">
      <div className="wrap flex flex-wrap gap-x-[clamp(16px,2vw,24px)] gap-y-[clamp(56px,6vw,96px)]">
        {groups.map((g) => (
          <section
            key={g.anchor}
            id={g.anchor}
            aria-labelledby={`${g.anchor}-title`}
            className="flex min-w-0 scroll-mt-32 flex-col gap-[clamp(20px,2.4vw,32px)]"
            style={{ flex: g.flex }}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h2
                id={`${g.anchor}-title`}
                className="flex items-baseline gap-2.5 text-[clamp(22px,2.2vw,28px)] font-bold tracking-[-0.02em]"
              >
                {g.label}
                <span className="text-[15px] font-medium tracking-normal text-fg-2">
                  {groupCount(g)}
                </span>
              </h2>
              <Link href={g.href} className="py-1 text-[15px]">
                {g.linkLabel}
              </Link>
            </div>
            <GroupBody group={g} />
          </section>
        ))}
      </div>
    </div>
  );
}

function GroupBody({ group: g }: { group: WorkGroup }) {
  const [art, setArt] = useState<number | null>(null);
  if (g.kind === "tiles") return <ShowroomGrid projects={g.projects} />;
  if (g.kind === "small") {
    return (
      <Carousel label="small apps">
        {g.apps.map((a) => (
          <div
            key={a.title}
            className="w-[clamp(210px,19vw,250px)] flex-none snap-start"
          >
            <SmallAppItem app={a} size="sm" />
          </div>
        ))}
      </Carousel>
    );
  }
  if (g.kind === "art") {
    return (
      <>
        <div className="flex-1 columns-3 gap-3">
          {g.art.map((a, i) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setArt(i)}
              aria-haspopup="dialog"
              aria-label={`View ${a.title} larger`}
              className="mb-3 block w-full break-inside-avoid overflow-hidden rounded-[14px] border-0 bg-transparent p-0 lift [--hover-scale:1.02]"
            >
              <NaturalImage
                media={a.image}
                placeholder={a.title}
                sizes="(max-width: 768px) 33vw, 20vw"
              />
            </button>
          ))}
        </div>
        <AnimatePresence>
          {art !== null && (
            <Lightbox
              items={g.art.map((a) => ({
                title: a.title,
                media: { ...a.image, fit: "contain" },
              }))}
              index={art}
              onIndex={setArt}
              onClose={() => setArt(null)}
              noun="artwork"
            />
          )}
        </AnimatePresence>
      </>
    );
  }
  return null;
}
