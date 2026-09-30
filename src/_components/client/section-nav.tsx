"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@lib/utils";

export type NavSection = { id: string; label: string };

// Where a section counts as reached: just under the sticky bars, where a
// jump to it lands (the sections' scroll-mt-32 is 128px).
const LINE = 140;

/**
 * The page's own selector bar as a guide to the page itself, like the
 * What I Do selector: each tab is one of the page's sections, the pill
 * glides to the section you've scrolled to, and a tab scrolls down to
 * its section rather than opening another page.
 *
 * The pill stays on a tab while you read that section and only moves
 * over the last stretch before the next one reaches the top, so it
 * changes a little after the next section comes into view.
 */
export function SectionNav({
  title,
  titleHref,
  sections,
}: {
  title: string;
  titleHref: string;
  sections: NavSection[];
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tabs = useRef<{ left: number; width: number }[]>([]);
  const raw = useMotionValue(0);
  const pos = useSpring(raw, { stiffness: 380, damping: 42, mass: 0.6 });
  const x = useMotionValue(0);
  const w = useMotionValue(0);
  const [active, setActive] = useState(0);
  const [measured, setMeasured] = useState(false);

  // Page scroll → a position from 0 to the last tab's index.
  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const read = () => {
      const y = window.scrollY + LINE;
      const max =
        document.documentElement.scrollHeight - window.innerHeight + LINE;
      const zone = Math.min(260, window.innerHeight * 0.3);
      // A section too near the foot to reach the line counts as reached
      // at the bottom of the page, each a little before the next.
      const tops = els.map((e, i) =>
        Math.min(
          e.getBoundingClientRect().top + window.scrollY,
          max - (els.length - 1 - i) * zone,
        ),
      );
      let p = 0;
      for (let i = 1; i < tops.length; i++) {
        const f = (y - (tops[i] - zone)) / zone;
        p += Math.max(0, Math.min(1, f));
      }
      raw.set(p);
      setActive(Math.round(p));
    };
    read();
    pos.jump(raw.get());
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    const ro = new ResizeObserver(read);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
      ro.disconnect();
    };
  }, [sections, raw, pos]);

  // Place the pill between the two tabs either side of the position.
  const glide = useCallback(() => {
    const t = tabs.current;
    if (!t.length) return;
    const v = Math.max(0, Math.min(t.length - 1, pos.get()));
    const i = Math.floor(v);
    const j = Math.min(i + 1, t.length - 1);
    const f = v - i;
    x.set(t[i].left + (t[j].left - t[i].left) * f);
    w.set(t[i].width + (t[j].width - t[i].width) * f);
  }, [pos, x, w]);
  useMotionValueEvent(pos, "change", glide);

  // Measure each tab (again on resize and once fonts load).
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const read = () => {
      tabs.current = [...list.querySelectorAll<HTMLElement>("a")].map((a) => ({
        left: a.offsetLeft,
        width: a.offsetWidth,
      }));
      glide();
      setMeasured(true);
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(list);
    document.fonts?.ready.then(read);
    return () => ro.disconnect();
  }, [glide]);

  // On phones the bar scrolls sideways: keep the current tab in view.
  useEffect(() => {
    const el = scrollRef.current;
    const t = tabs.current[active];
    if (!el || !t || el.scrollWidth <= el.clientWidth) return;
    const pad = 24;
    if (el.scrollLeft > t.left - pad)
      el.scrollTo({ left: t.left - pad, behavior: "smooth" });
    else if (el.scrollLeft < t.left + t.width + pad - el.clientWidth)
      el.scrollTo({
        left: t.left + t.width + pad - el.clientWidth,
        behavior: "smooth",
      });
  }, [active]);

  const go = (e: React.MouseEvent, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav
      aria-label={`${title} sections`}
      className="sticky top-14 z-10 border-b border-hairline bg-bg/90 backdrop-blur-md"
    >
      <div className="wrap gutter flex h-[52px] items-center gap-6">
        <Link
          href={titleHref}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            history.replaceState(null, "", titleHref);
          }}
          className="font-display hidden flex-none text-[20px] font-bold text-fg hover:no-underline sm:block"
        >
          {title}
        </Link>
        <div
          ref={scrollRef}
          className="no-scrollbar -mx-1 max-w-full overflow-x-auto px-1 sm:ml-auto"
        >
          <ul
            ref={listRef}
            className="relative m-0 flex w-max list-none items-center gap-0.5 p-0"
          >
            {measured && (
              <motion.span
                aria-hidden="true"
                style={{ x, width: w }}
                className="absolute top-0 left-0 h-8 rounded-full bg-pill"
              />
            )}
            {sections.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => go(e, s.id)}
                    aria-current={on ? "location" : undefined}
                    className={cn(
                      "relative inline-flex h-8 items-center rounded-full px-3.5 text-[13px] font-medium whitespace-nowrap transition-colors duration-300 hover:text-fg hover:no-underline",
                      on ? "text-fg" : "text-fg-2",
                      !measured && on && "bg-pill",
                    )}
                  >
                    {s.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
