import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { clip, pageMetadata } from "@lib/metadata";
import { JsonLd, breadcrumbLd, graph, webPageLd } from "@lib/structured-data";
import {
  AREA_PATH,
  categoriesIn,
  categoryBySlug,
  categoryCount,
  categoryHref,
  categorySeoTitle,
  navSections,
  projectsInCategory,
} from "@data/categories";
import { byYear } from "@data/projects";
import { smallApps } from "@data/small-apps";
import { graphics } from "@data/graphics";
import type { AreaId } from "@data/types";
import { NextCard, PageHeader } from "@components/ui";
import { AreaNav } from "@components/local-nav";
import { ShowroomPairs, SmallAppItem } from "@components/client/showroom";
import { Gallery } from "./gallery";

type Area = Exclude<AreaId, "ventures">;
export type CategoryParams = { category: string };

/** Only the area's own categories get a page under it. */
export const categoryParams = (area: Area): CategoryParams[] =>
  categoriesIn(area).map((c) => ({ category: c.slug }));

const inArea = (area: Area, slug: string) => {
  const c = categoryBySlug(slug);
  return c && c.area === area ? c : undefined;
};

export function categoryMetadata(area: Area, slug: string): Metadata {
  const c = inArea(area, slug);
  if (!c) return {};
  const n = categoryCount(c.slug);
  return pageMetadata({
    title: categorySeoTitle[c.slug],
    description: clip(
      `${c.blurb} Browse ${n} ${c.label.toLowerCase()} ${n === 1 ? "project" : "projects"} by Austin Sia, a full-stack developer and UI/UX designer in Singapore.`,
    ),
    path: categoryHref(c.slug),
  });
}

/** One category's page, with its area's selector above it. */
export function CategoryView({ area, slug }: { area: Area; slug: string }) {
  const cat = inArea(area, slug);
  if (!cat) notFound();

  // "Next" stays inside the area.
  const own = categoriesIn(area);
  const next = own[(own.indexOf(cat) + 1) % own.length];
  const list =
    cat.layout === "projects" ? byYear(projectsInCategory(cat.slug)) : [];
  const n = categoryCount(cat.slug);
  const noun =
    cat.layout === "gallery"
      ? "artwork"
      : cat.layout === "small-apps"
        ? "small app"
        : "project";
  const areaName = navSections.find((s) => s.id === area)?.label ?? "";

  return (
    <>
      <JsonLd
        data={graph(
          webPageLd({
            type: "CollectionPage",
            path: categoryHref(cat.slug),
            name: `${cat.label} by Austin Sia`,
            description: cat.blurb,
          }),
          breadcrumbLd([
            { name: areaName, path: AREA_PATH[area] },
            { name: cat.label, path: categoryHref(cat.slug) },
          ]),
        )}
      />
      <AreaNav area={area} current={categoryHref(cat.slug)} />
      <PageHeader title={cat.label} sub={cat.blurb} />

      <section className="gutter pt-[clamp(8px,1vw,16px)] pb-[clamp(72px,min(9vw,13vh),136px)]">
        <div className="wrap flex flex-col gap-[clamp(20px,2.4vw,32px)]">
          <h2 className="text-[14px] font-normal text-fg-2">
            {n} {n === 1 ? noun : `${noun}s`}
          </h2>

          {cat.layout === "projects" && <ShowroomPairs projects={list} />}

          {cat.layout === "small-apps" && (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-x-[clamp(24px,3vw,40px)] gap-y-[clamp(44px,5vw,64px)]">
              {smallApps.map((a) => (
                <div key={a.title} data-reveal="">
                  <SmallAppItem app={a} />
                </div>
              ))}
            </div>
          )}

          {cat.layout === "gallery" && <Gallery items={graphics} />}
        </div>
      </section>

      {next !== cat && (
        <NextCard
          href={categoryHref(next.slug)}
          label={`Next in ${areaName}`}
          title={next.label}
          line={next.blurb}
        />
      )}
    </>
  );
}
