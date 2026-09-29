import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "@lib/utils";
import { clip, pageMetadata } from "@lib/metadata";
import { JsonLd, breadcrumbLd, graph, webPageLd } from "@lib/structured-data";
import {
  categories,
  categoryBySlug,
  categoryCount,
  categoryHref,
  categorySeoTitle,
  projectsInCategory,
} from "@data/categories";
import { byYear } from "@data/projects";
import { smallApps } from "@data/small-apps";
import { graphics } from "@data/graphics";
import { ventures } from "@data/ventures";
import { NextCard, PageHeader } from "@components/ui";
import {
  ShowroomPairs,
  SmallAppItem,
  VentureFeature,
} from "@components/client/showroom";
import { ScrollToCurrent } from "@components/client/scroll-to-current";
import { Gallery } from "./gallery";
import { ventureLook } from "../venture-looks";

type Params = { category: string };

export function generateStaticParams(): Params[] {
  return categories.map((c) => ({ category: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const c = categoryBySlug((await params).category);
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

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const cat = categoryBySlug((await params).category);
  if (!cat) notFound();

  const i = categories.indexOf(cat);
  const next = categories[(i + 1) % categories.length];
  const list =
    cat.layout === "projects" ? byYear(projectsInCategory(cat.slug)) : [];
  const n = categoryCount(cat.slug);
  const noun =
    cat.layout === "gallery"
      ? "artwork"
      : cat.layout === "ventures"
        ? "venture"
        : cat.layout === "small-apps"
          ? "small app"
          : "project";

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
            { name: "Work", path: "/work" },
            { name: cat.label, path: categoryHref(cat.slug) },
          ]),
        )}
      />
      <PageHeader
        back={{ label: "All work", href: "/work" }}
        title={`${cat.label}.`}
        sub={cat.blurb}
      />

      <nav aria-label="Work categories" className="sticky top-14 z-10 bg-bg">
        <div className="wrap gutter pt-2 pb-4">
          <ScrollToCurrent className="no-scrollbar w-max max-w-full overflow-x-auto rounded-full">
            <div className="flex w-max items-center gap-0.5 rounded-full bg-bg-alt p-1">
              {categories.map((c, k) => {
                const on = c.slug === cat.slug;
                const sep = k > 0 && categories[k - 1].area !== c.area;
                return (
                  <span key={c.slug} className="flex items-center">
                    {sep && (
                      <span
                        aria-hidden="true"
                        className="mx-2 h-[18px] w-px flex-none bg-pill"
                      />
                    )}
                    <Link
                      href={categoryHref(c.slug)}
                      aria-current={on ? "page" : undefined}
                      className={cn(
                        "inline-flex h-9 flex-none items-center gap-1.5 rounded-full px-[clamp(12px,1.6vw,16px)] text-[14px] font-medium whitespace-nowrap transition-colors duration-[250ms] hover:text-fg hover:no-underline",
                        on
                          ? "bg-tile text-fg shadow-[var(--shadow-tab)]"
                          : "text-fg-2",
                      )}
                    >
                      {c.label}
                      <span className="text-[12px] text-fg-2 tabular-nums">
                        {categoryCount(c.slug)}
                      </span>
                    </Link>
                  </span>
                );
              })}
            </div>
          </ScrollToCurrent>
        </div>
      </nav>

      <section className="gutter pt-[clamp(24px,3vw,40px)] pb-[clamp(72px,min(9vw,13vh),136px)]">
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

          {cat.layout === "ventures" && (
            <div className="flex flex-col gap-[clamp(72px,8vw,120px)]">
              {ventures.map((v) => (
                <VentureFeature
                  key={v.id}
                  venture={v}
                  look={ventureLook(v.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <NextCard
        href={categoryHref(next.slug)}
        label="Next category"
        title={next.label}
        line={next.blurb}
      />
    </>
  );
}
