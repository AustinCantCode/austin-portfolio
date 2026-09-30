import Link from "next/link";
import { cn } from "@lib/utils";
import { AREA_PATH, navSections } from "@data/categories";
import type { AreaId } from "@data/types";
import { ScrollToCurrent } from "./client/scroll-to-current";
import { SectionNav } from "./client/section-nav";
import { areaGroups } from "../app/(site)/_work/areas";
import { Icon } from "./icon";
import { ShowroomCarousel } from "./client/showroom";
import { home } from "@data/home";
import { pickProjects } from "@data/projects";

type Item = { label: string; href: string; count?: number };

/**
 * A page's own selector, like the bar under Apple's main nav: the page's
 * name on the left, what's inside it on the right. It sticks under the
 * main nav. Each area and About has its own; they never mix.
 */
export function LocalNav({
  title,
  titleHref,
  items,
  current,
}: {
  title: string;
  titleHref: string;
  items: Item[];
  /** The href of the page being shown. */
  current: string;
}) {
  return (
    <nav
      aria-label={`${title} pages`}
      className="sticky top-14 z-10 border-b border-hairline bg-bg/90 backdrop-blur-md"
    >
      <div className="wrap gutter flex h-[52px] items-center gap-6">
        <Link
          href={titleHref}
          className="font-display hidden flex-none text-[20px] font-bold text-fg hover:no-underline sm:block"
        >
          {title}
        </Link>
        <ScrollToCurrent className="no-scrollbar -mx-1 max-w-full overflow-x-auto px-1 sm:ml-auto">
          <ul className="m-0 flex w-max list-none items-center gap-0.5 p-0">
            {items.map((it) => {
              const on = it.href === current;
              return (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    aria-current={on ? "page" : undefined}
                    className={cn(
                      "inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium whitespace-nowrap transition-colors duration-200 hover:no-underline",
                      on
                        ? "bg-pill text-fg"
                        : "text-fg-2 hover:bg-bg-alt hover:text-fg",
                    )}
                  >
                    {it.label}
                    {it.count !== undefined && (
                      <span
                        className={cn(
                          "text-[11px] tabular-nums",
                          on ? "text-fg" : "text-fg-2",
                        )}
                      >
                        {it.count}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </ScrollToCurrent>
      </div>
    </nav>
  );
}

const areaLabel = (area: AreaId) =>
  navSections.find((s) => s.id === area)?.label ?? "";

/**
 * Development or Design: the sections of that area's page. On the page
 * itself the bar follows your scroll and its tabs scroll to each
 * section; elsewhere (a category or project page) they link to them.
 */
export function AreaNav({
  area,
  current,
}: {
  area: Exclude<AreaId, "ventures">;
  current: string;
}) {
  const groups = areaGroups[area];
  const title = areaLabel(area);
  if (current === AREA_PATH[area])
    return (
      <SectionNav
        title={title}
        titleHref={AREA_PATH[area]}
        sections={groups.map((g) => ({ id: g.anchor, label: g.label }))}
      />
    );
  const items = groups.map((g) => ({
    label: g.label,
    href: `${AREA_PATH[area]}#${g.anchor}`,
    group: g.href,
  }));
  return (
    <LocalNav
      title={title}
      titleHref={AREA_PATH[area]}
      current={items.find((it) => it.group === current)?.href ?? ""}
      items={items}
    />
  );
}

/** Ventures and the StillGood page. */
export function VenturesNav({ current }: { current: string }) {
  return (
    <LocalNav
      title="Ventures"
      titleHref={AREA_PATH.ventures}
      current={current}
      items={[
        { label: "All ventures", href: AREA_PATH.ventures },
        { label: "StillGood", href: "/stillgood" },
      ]}
    />
  );
}

/** The About pages, in selector order (also the pager's order). */
const ABOUT_PAGES: Item[] = [
  { label: "About Me", href: "/about" },
  { label: "Skills", href: "/about/skills" },
  { label: "Certificates", href: "/about/certificates" },
  { label: "Events", href: "/about/events" },
  { label: "CV", href: "/cv" },
];

/** About and the pages that used to sit in its menu. */
export function AboutNav({ current }: { current: string }) {
  return (
    <LocalNav
      title="About"
      titleHref="/about"
      current={current}
      items={ABOUT_PAGES}
    />
  );
}

function PagerLink({ item, dir }: { item: Item; dir: "prev" | "next" }) {
  const next = dir === "next";
  return (
    <Link
      href={item.href}
      rel={dir}
      className={cn(
        "group flex min-w-0 items-center gap-4 rounded-[20px] bg-bg-alt p-[clamp(16px,2.2vw,24px)] text-fg transition-colors duration-200 hover:bg-pill hover:no-underline",
        next && "flex-row-reverse text-right sm:col-start-2",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "grid size-11 flex-none place-items-center rounded-full bg-tile shadow-[var(--shadow-tab)] transition-transform duration-300 ease-[cubic-bezier(.2,.7,.2,1)]",
          next ? "group-hover:translate-x-1" : "group-hover:-translate-x-1",
        )}
      >
        <Icon name={next ? "arrow-right" : "arrow-left"} size={18} />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-[13px] font-medium text-fg-2">
          {next ? "Next" : "Previous"}
        </span>
        <span className="font-display truncate text-[clamp(20px,2.2vw,26px)] leading-[1.2] font-bold tracking-[-0.015em]">
          {item.label}
        </span>
      </span>
    </Link>
  );
}

/**
 * Previous and next About pages at the foot of each one, so moving on
 * doesn't mean scrolling back up to the selector, then the featured
 * projects carousel.
 */
export function AboutPager({ current }: { current: string }) {
  const i = ABOUT_PAGES.findIndex((p) => p.href === current);
  const prev = ABOUT_PAGES[i - 1];
  const next = ABOUT_PAGES[i + 1];
  if (i < 0) return null;
  return (
    <>
      <nav aria-label="More about me" className="gutter">
        <div className="wrap flex flex-col gap-5 border-t border-hairline pt-[clamp(28px,3.4vw,44px)]">
          <p className="text-center text-[13px] font-medium text-fg-2 tabular-nums">
            {i + 1} of {ABOUT_PAGES.length}
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {prev && <PagerLink item={prev} dir="prev" />}
            {next && <PagerLink item={next} dir="next" />}
          </div>
        </div>
      </nav>
      {/* Featured projects (Site → Homepage → Featured projects). */}
      <ShowroomCarousel
        title={home.selectedWork.title}
        href={home.selectedWork.link.href}
        linkLabel={home.selectedWork.link.label}
        projects={pickProjects(home.selectedWork.projects)}
      />
    </>
  );
}
