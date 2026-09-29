"use client";

import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { CertificateGroup } from "@data/types";
import { Icon } from "@components/icon";
import { SegmentedControl } from "@components/client/segmented";
import { Lightbox } from "@components/client/lightbox";

export function CertificatesView({ groups }: { groups: CertificateGroup[] }) {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<number | null>(null);
  const all = groups.flatMap((g) => g.items);
  const list =
    filter === "all" ? all : (groups.find((g) => g.id === filter)?.items ?? []);

  return (
    <>
      <div className="sticky top-14 z-10 bg-bg">
        <div className="wrap gutter pt-2 pb-4">
          <SegmentedControl
            label="Filter by issuer"
            idPrefix="cert-tab"
            size="sm"
            value={filter}
            onChange={(id) => {
              setFilter(id);
              setOpen(null);
            }}
            className="w-max"
            segments={[
              { id: "all", label: "All", count: all.length },
              ...groups.map((g) => ({
                id: g.id,
                label: g.issuerGroup,
                count: g.items.length,
              })),
            ]}
          />
        </div>
      </div>

      <section
        id="cert-tab-panel"
        role="tabpanel"
        aria-labelledby={`cert-tab-${filter}`}
        className="gutter pt-[clamp(24px,3vw,40px)] pb-[clamp(72px,min(9vw,13vh),136px)]"
      >
        {/* Masonry columns so each certificate keeps its own shape. */}
        <div className="wrap columns-[250px] gap-4">
          {list.map((c, i) => (
            <article
              key={c.title}
              data-hover-card=""
              className="mb-4 flex break-inside-avoid flex-col overflow-hidden bg-bg-alt"
            >
              {c.image ? (
                <Image
                  quality={100}
                  src={c.image}
                  alt={`${c.title} certificate`}
                  sizes="(max-width: 640px) 100vw, 300px"
                  className="block h-auto w-full bg-pill"
                />
              ) : (
                <div className="aspect-[1.41/1] bg-pill" />
              )}
              <div className="flex flex-1 items-start gap-3 py-4 pr-4 pl-5">
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <h2 className="text-[15px] leading-[1.35] font-semibold">
                    {c.title}
                  </h2>
                  <p data-hover-detail="" className="text-[13px] text-fg-2">
                    {c.issuer}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label={`Enlarge ${c.title}`}
                  className="grid size-9 flex-none place-items-center rounded-full border-0 bg-tile text-fg"
                >
                  <Icon name="maximize-2" size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {open !== null && (
          <Lightbox
            variant="certificate"
            noun="certificate"
            items={list.map((c) => ({
              title: c.title,
              caption: `${c.issuer}: ${c.description}`,
              media: c.image
                ? {
                    src: c.image,
                    alt: `${c.title} certificate`,
                    fit: "contain",
                  }
                : undefined,
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
