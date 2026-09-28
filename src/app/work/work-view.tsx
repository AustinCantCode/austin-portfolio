"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { AreaId, Graphic, Project, SmallApp, Venture } from "@data/types";
import { Icon } from "@components/icon";
import { ImageSlot } from "@components/media";
import { ProjectTile, SmallAppCard, VentureCard } from "@components/tiles";
import { SegmentedControl } from "@components/client/segmented";
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
      ventures: Venture[];
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

export function WorkView({ sections }: { sections: WorkSection[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const raw = params.get("filter");
  const filter: Filter = FILTERS.includes(raw as Filter)
    ? (raw as Filter)
    : "all";

  const counts: Record<string, number> = {};
  for (const s of sections)
    counts[s.id] = s.groups.reduce((n, g) => n + groupCount(g), 0);
  counts.all = sections.reduce((n, s) => n + counts[s.id], 0);

  const select = useCallback(
    (id: string) => {
      track("work_filter", { tab: id });
      const q = id === "all" ? "" : `?filter=${id}`;
      router.replace(`${pathname}${q}`, { scroll: false });
    },
    [pathname, router],
  );

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
        className="gutter pt-[clamp(24px,3vw,40px)] pb-[clamp(64px,10vw,140px)]"
      >
        <div className="wrap flex flex-col gap-[clamp(64px,8vw,120px)]">
          {shown.map((sec) => (
            <section
              key={sec.id}
              aria-labelledby={`area-${sec.id}`}
              className="flex flex-col gap-[clamp(32px,4vw,56px)]"
            >
              <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-t-2 border-fg pt-[clamp(24px,3vw,40px)]">
                <div className="flex min-w-0 flex-col gap-2.5">
                  <p className="flex items-center gap-2 text-[14px] font-semibold text-fg-2">
                    <Icon name={sec.icon} size={16} />
                    {sec.label}
                  </p>
                  <h2
                    id={`area-${sec.id}`}
                    className="text-[clamp(36px,5.5vw,64px)] leading-[1.02] font-bold tracking-[-0.03em]"
                  >
                    {sec.label}.
                  </h2>
                  <p className="max-w-[560px] text-[clamp(17px,1.9vw,21px)] text-fg-2">
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
                    className="flex min-w-0 scroll-mt-32 flex-col gap-[clamp(16px,2vw,24px)]"
                    style={{ flex: g.flex }}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <h3 className="flex items-baseline gap-2.5 text-[clamp(22px,2.4vw,28px)] font-bold tracking-[-0.02em]">
                        {g.label}
                        <span className="text-[15px] font-medium tracking-normal text-fg-2">
                          {groupCount(g)}
                        </span>
                      </h3>
                      <Link href={g.href} className="text-[15px]">
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
  if (g.kind === "tiles") {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-[clamp(16px,2vw,24px)]">
        {g.projects.map((p) => (
          <ProjectTile key={p.slug} project={p} compact reveal={false} />
        ))}
      </div>
    );
  }
  if (g.kind === "small") {
    return (
      <div
        tabIndex={0}
        role="region"
        aria-label="Small apps"
        className="grid auto-cols-[minmax(180px,1fr)] grid-flow-col gap-4 overflow-x-auto pb-2 [scrollbar-width:thin]"
      >
        {g.apps.map((a) => (
          <SmallAppCard key={a.title} app={a} size="sm" />
        ))}
      </div>
    );
  }
  if (g.kind === "art") {
    return (
      <div className="grid flex-1 grid-cols-[repeat(auto-fit,minmax(max(110px,calc((100%_-_24px)/3)),1fr))] gap-3">
        {g.art.map((a) => (
          <Link
            key={a.id}
            href={g.href}
            aria-label={`${a.title}, open the gallery`}
            className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-tile-alt"
          >
            <ImageSlot
              media={a.image}
              placeholder={a.title}
              sizes="(max-width: 768px) 33vw, 20vw"
            />
          </Link>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-[clamp(16px,2vw,24px)]">
      {g.ventures.map((v, i) => (
        <VentureCard key={v.id} venture={v} band={i === 0} />
      ))}
    </div>
  );
}
