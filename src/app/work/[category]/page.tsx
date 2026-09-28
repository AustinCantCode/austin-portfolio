import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "@lib/utils";
import { pageMetadata } from "@lib/metadata";
import {
  categories,
  categoryBySlug,
  categoryCount,
  categoryHref,
  projectsInCategory,
} from "@data/categories";
import { byYear } from "@data/projects";
import { smallApps } from "@data/small-apps";
import { graphics } from "@data/graphics";
import { ventures } from "@data/ventures";
import { events, FEATURED_EVENT_INDEX } from "@data/events";
import { NextCard, PageHeader } from "@components/ui";
import { ImageSlot, LaptopFrame, PhoneFrame } from "@components/media";
import {
  ProjectTile,
  RowTile,
  SmallAppCard,
  VenturePanel,
} from "@components/tiles";
import { projectBySlug } from "@data/projects";
import { stillgoodScreens } from "@data/stillgood-screens";
import { ScrollToCurrent } from "@components/client/scroll-to-current";
import { Gallery } from "./gallery";

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
  return pageMetadata({
    title: c.label,
    description: `${c.blurb} ${c.label} by Austin Sia.`,
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

      <section className="gutter pt-[clamp(24px,3vw,40px)] pb-[clamp(64px,10vw,128px)]">
        <div className="wrap flex flex-col gap-[clamp(16px,2vw,24px)]">
          <p className="text-[14px] text-fg-2">
            {n} {n === 1 ? noun : `${noun}s`}
          </p>

          {cat.layout === "projects" && list.length > 2 && (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-[clamp(16px,2vw,24px)]">
              {list.map((p) => (
                <ProjectTile key={p.slug} project={p} />
              ))}
            </div>
          )}

          {cat.layout === "projects" &&
            list.length <= 2 &&
            list.map((p) => <RowTile key={p.slug} project={p} />)}

          {cat.layout === "small-apps" && (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-4">
              {smallApps.map((a) => (
                <div key={a.title} data-reveal="">
                  <SmallAppCard app={a} />
                </div>
              ))}
            </div>
          )}

          {cat.layout === "gallery" && <Gallery items={graphics} />}

          {cat.layout === "ventures" &&
            ventures.map((v, k) => (
              <VenturePanel
                key={v.id}
                venture={v}
                band={k === 0}
                media={<VentureMedia id={v.id} />}
              />
            ))}
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

function VentureMedia({ id }: { id: string }) {
  if (id === "stillgood") {
    return (
      <PhoneFrame size={240} dark className="-mb-[35%]">
        <ImageSlot
          media={stillgoodScreens.home}
          placeholder="StillGood screenshot"
          tone="light"
          sizes="240px"
        />
      </PhoneFrame>
    );
  }
  if (id === "zenith") {
    const photo = events[FEATURED_EVENT_INDEX].image;
    return (
      <div className="relative size-full min-h-[260px] overflow-hidden rounded-t-[20px] bg-pill">
        <ImageSlot
          media={photo}
          placeholder="Zenith hackathon photo"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }
  const calibrium = projectBySlug("calibrium");
  return (
    <LaptopFrame>
      <ImageSlot media={calibrium?.cover} placeholder="Calibrium screenshot" />
    </LaptopFrame>
  );
}
