import Link from "next/link";
import { cn } from "@lib/utils";
import {
  AREA_PATH,
  categoriesIn,
  categoryCount,
  categoryHref,
  navSections,
  projectsInCategory,
} from "@data/categories";
import { smallApps } from "@data/small-apps";
import { graphics } from "@data/graphics";
import { posts } from "@data/writing";
import type { AreaId } from "@data/types";
import { ScrollToCurrent } from "./client/scroll-to-current";

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

/** Development or Design: All, then that area's own categories. */
export function AreaNav({
  area,
  current,
}: {
  area: Exclude<AreaId, "ventures">;
  current: string;
}) {
  const cats = categoriesIn(area);
  // Projects filed under several of the area's categories count once.
  const unique = new Set(cats.flatMap((c) => projectsInCategory(c.slug)));
  const total =
    unique.size + (area === "dev" ? smallApps.length : graphics.length);
  return (
    <LocalNav
      title={areaLabel(area)}
      titleHref={AREA_PATH[area]}
      current={current}
      items={[
        { label: "All", href: AREA_PATH[area], count: total },
        ...cats.map((c) => ({
          label: c.label,
          href: categoryHref(c.slug),
          count: categoryCount(c.slug),
        })),
      ]}
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

/** About and the pages that used to sit in its menu. */
export function AboutNav({ current }: { current: string }) {
  return (
    <LocalNav
      title="About"
      titleHref="/about"
      current={current}
      items={[
        { label: "About Me", href: "/about" },
        { label: "Skills", href: "/about/skills" },
        { label: "Certificates", href: "/about/certificates" },
        { label: "Events", href: "/about/events" },
        ...(posts.length ? [{ label: "Writing", href: "/writing" }] : []),
        { label: "CV", href: "/cv" },
      ]}
    />
  );
}
