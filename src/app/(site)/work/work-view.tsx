"use client";

import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { AreaId, Graphic, Project, SmallApp, Venture } from "@data/types";
import type { Look } from "@components/showroom-look";
import { NaturalImage } from "@components/media";
import {
  GRID_SM,
  ShowroomGrid,
  SmallAppItem,
  VentureItem,
} from "@components/client/showroom";
import { SegmentedControl } from "@components/client/segmented";
import { Carousel } from "@components/client/carousel";
import { Lightbox } from "@components/client/lightbox";
import { track } from "@components/client/analytics";

export type WorkGroup =
  | {
      kind: "tiles";
      anchor: string;
      label: string;
      href: string;
      linkLabel: string;
      flex: string;
      projects: Project[];
    }
  | {
      kind: "small";
      anchor: string;
      label: string;
      href: string;
      linkLabel: string;
      flex: string;
      apps: SmallApp[];
    }
  | {
      kind: "art";
      anchor: string;
      label: string;
      href: string;
      linkLabel: string;
      flex: string;
      art: Graphic[];
    }
  | {
      kind: "ventures";
      anchor: string;
      label: string;
      href: string;
      linkLabel: string;
      flex: string;
      ventures: (Venture & { look: Look })[];
    };

export type WorkSection = {
  id: AreaId;
  label: string;
  icon: string;
  blurb: string;
  groups: WorkGroup[];
};

type Filter = "all" | AreaId;
const FILTERS: Filter[] = ["all", "dev", "design", "ventures"];

const groupCount = (g: WorkGroup) =>
  g.kind === "tiles"
    ? g.projects.length
    : g.kind === "small"
      ? g.apps.length
      : g.kind === "art"
        ? g.art.length
        : g.ventures.length;

const readFilter = (): Filter => {
  const raw = new URLSearchParams(window.location.search).get("filter");
  return FILTERS.includes(raw as Filter) ? (raw as Filter) : "all";
};

/**
 * The filter lives in ?filter= but is read after mount, not through
 * useSearchParams, so the whole page still renders on the server and
 * crawlers see every project.
 */
export function WorkView({ sections }: { sections: WorkSection[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    setFilter(readFilter());
    const onPop = () => setFilter(readFilter());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const counts: Record<string, number> = {};
  for (const s of sections)
    counts[s.id] = s.groups.reduce((n, g) => n + groupCount(g), 0);
  counts.all = sections.reduce((n, s) => n + counts[s.id], 0);

  const select = useCallback((id: string) => {
    track("work_filter", { tab: id });
    setFilter(id as Filter);
    const url = new URL(window.location.href);
    if (id === "all") url.searchParams.delete("filter");
    else url.searchParams.set("filter", id);
    window.history.replaceState(window.history.state, "", url);
  }, []);

  const shown =
    filter === "all" ? sections : sections.filter((s) => s.id === filter);

  return (
    <>
      <div className="sticky top-14 z-10 bg-bg">
        <div className="wrap gutter flex items-center gap-4 pt-2 pb-4">
          <SegmentedControl
            label="Filter work"
            idPrefix="work-tab"
            value={filter}
            onChange={select}
            segments={[
              { id: "all", label: "All", count: counts.all },
              ...sections.map((s) => ({
                id: s.id,
                label: s.label,
                count: counts[s.id],
              })),
            ]}
          />
          <p className="ml-auto hidden text-[14px] whitespace-nowrap text-fg-2 min-[721px]:block">
            {counts.all} projects across {sections.length} areas
          </p>
        </div>
      </div>

      <div
        id="work-tab-panel"
        role="tabpanel"
        aria-labelledby={`work-tab-${filter}`}
        className="gutter pt-[clamp(24px,3vw,40px)] pb-[clamp(72px,min(9vw,13vh),136px)]"
      >
        <div className="wrap flex flex-col gap-[clamp(56px,6vw,96px)]">
          {shown.map((sec) => (
            <section
              key={sec.id}
              aria-labelledby={`area-${sec.id}`}
              className="flex flex-col gap-[clamp(40px,5vw,72px)]"
            >
              <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-t-2 border-rule pt-[clamp(24px,3vw,40px)]">
                <div className="flex min-w-0 flex-col gap-2.5">
                  <h2
                    id={`area-${sec.id}`}
                    className="text-[clamp(32px,4.2vw,52px)] leading-[1.02] font-bold tracking-[-0.03em]"
                  >
                    {sec.label}.
                  </h2>
                  <p className="max-w-[560px] text-[clamp(17px,1.5vw,19px)] text-fg-2">
                    {sec.blurb}
                  </p>
                </div>
                <nav
                  aria-label={`${sec.label} types`}
                  className="flex flex-wrap gap-2"
                >
                  {sec.groups.map((g) => (
                    <a
                      key={g.anchor}
                      href={`#${g.anchor}`}
                      className="inline-flex h-8 items-center gap-1.5 rounded-full bg-bg-alt px-3.5 text-[13px] font-medium text-fg hover:bg-pill hover:no-underline"
                    >
                      {g.label}
                      <span className="text-fg-2">{groupCount(g)}</span>
                    </a>
                  ))}
                </nav>
              </div>

              <div className="flex flex-wrap gap-x-[clamp(16px,2vw,24px)] gap-y-[clamp(40px,5vw,72px)]">
                {sec.groups.map((g) => (
                  <div
                    key={g.anchor}
                    id={g.anchor}
                    className="flex min-w-0 scroll-mt-32 flex-col gap-[clamp(20px,2.4vw,32px)]"
                    style={{ flex: g.flex }}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <h3 className="flex items-baseline gap-2.5 text-[clamp(20px,2vw,24px)] font-bold tracking-[-0.02em]">
                        {g.label}
                        <span className="text-[15px] font-medium tracking-normal text-fg-2">
                          {groupCount(g)}
                        </span>
                      </h3>
                      <Link href={g.href} className="py-1 text-[15px]">
                        {g.linkLabel}
                      </Link>
                    </div>
                    <GroupBody group={g} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
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
  return (
    <div className={GRID_SM}>
      {g.ventures.map((v) => (
        <VentureItem key={v.id} venture={v} look={v.look} />
      ))}
    </div>
  );
}
