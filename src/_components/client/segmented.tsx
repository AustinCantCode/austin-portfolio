"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@lib/utils";
import { Icon } from "../icon";

export type Segment = {
  id: string;
  label: ReactNode;
  count?: number | string;
  icon?: ReactNode;
};

/**
 * A pill-shaped tablist with a sliding indicator. Arrow keys, Home and
 * End move the selection; only the selected tab is in the tab order.
 * When the tabs are wider than the space, the bar scrolls sideways: the
 * edge with more tabs fades out, arrow buttons scroll it on desktop, and
 * the selected tab is kept in view.
 *
 * With `position` (a motion value from 0 to the last tab's index), the
 * pill instead glides continuously between tabs as it changes, like a
 * slider: the What I Do panel drives it from the page scroll.
 */
export function SegmentedControl({
  segments,
  value,
  onChange,
  label,
  idPrefix,
  size = "md",
  className,
  position,
}: {
  segments: Segment[];
  value: string;
  onChange: (id: string) => void;
  label: string;
  idPrefix: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Continuous tab position (0 … n − 1) for a gliding pill. */
  position?: MotionValue<number>;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const fallback = useMotionValue(0);
  const pos = position ?? fallback;
  const tabs = useRef<{ left: number; width: number }[]>([]);
  const glideX = useMotionValue(0);
  const glideW = useMotionValue(0);
  const [measured, setMeasured] = useState(false);

  // Place the gliding pill between the two tabs either side of `pos`.
  const glide = useCallback(() => {
    const t = tabs.current;
    if (!t.length) return;
    const v = Math.max(0, Math.min(t.length - 1, pos.get()));
    const i = Math.min(Math.floor(v), t.length - 1);
    const j = Math.min(i + 1, t.length - 1);
    const f = v - i;
    glideX.set(t[i].left + (t[j].left - t[i].left) * f);
    glideW.set(t[i].width + (t[j].width - t[i].width) * f);
  }, [pos, glideX, glideW]);

  useMotionValueEvent(pos, "change", glide);

  // Measure each tab (again on resize and once fonts load).
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!position || !list) return;
    const read = () => {
      tabs.current = [
        ...list.querySelectorAll<HTMLElement>('[role="tab"]'),
      ].map((b) => ({ left: b.offsetLeft, width: b.offsetWidth }));
      glide();
      setMeasured(true);
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(list);
    document.fonts?.ready.then(read);
    return () => ro.disconnect();
  }, [position, glide]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });
  const ids = segments.map((s) => s.id);

  const measure = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const left = el.scrollLeft > 2;
    const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 2;
    setEdges((e) =>
      e.left === left && e.right === right ? e : { left, right },
    );
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (listRef.current) ro.observe(listRef.current);
    return () => ro.disconnect();
  }, [measure]);

  // Keep the selected tab in view (without scrolling the page).
  useEffect(() => {
    const el = scrollRef.current;
    const tab = document.getElementById(`${idPrefix}-${value}`);
    if (!el || !tab || el.scrollWidth <= el.clientWidth) return;
    const pad = 40;
    const l = tab.offsetLeft - pad;
    const r = tab.offsetLeft + tab.offsetWidth + pad - el.clientWidth;
    if (el.scrollLeft > l) el.scrollTo({ left: l, behavior: "smooth" });
    else if (el.scrollLeft < r) el.scrollTo({ left: r, behavior: "smooth" });
  }, [value, idPrefix]);

  const nudge = (dir: 1 | -1) => {
    const el = scrollRef.current;
    el?.scrollBy({ left: dir * el.clientWidth * 0.6, behavior: "smooth" });
  };

  const fade = 44;
  const mask =
    edges.left || edges.right
      ? `linear-gradient(to right, ${edges.left ? "transparent" : "#000"} 0, #000 ${edges.left ? fade : 0}px, #000 calc(100% - ${edges.right ? fade : 0}px), ${edges.right ? "transparent" : "#000"} 100%)`
      : undefined;

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = ids.indexOf(value);
    let n: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown")
      n = (i + 1) % ids.length;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      n = (i - 1 + ids.length) % ids.length;
    if (e.key === "Home") n = 0;
    if (e.key === "End") n = ids.length - 1;
    if (n === null) return;
    e.preventDefault();
    onChange(ids[n]);
    requestAnimationFrame(() =>
      document.getElementById(`${idPrefix}-${ids[n!]}`)?.focus(),
    );
  };

  return (
    <div className={cn("relative max-w-full", className)}>
      <div
        ref={scrollRef}
        onScroll={measure}
        style={{ maskImage: mask, WebkitMaskImage: mask }}
        className="no-scrollbar max-w-full overflow-x-auto rounded-full"
      >
        <div
          ref={listRef}
          role="tablist"
          aria-label={label}
          onKeyDown={onKeyDown}
          className="relative flex w-max gap-0.5 rounded-full bg-bg-alt p-1"
        >
          {position && measured && (
            <motion.span
              aria-hidden="true"
              style={{ x: glideX, width: glideW }}
              className="absolute top-1 bottom-1 left-0 rounded-full bg-tile shadow-[var(--shadow-tab)]"
            />
          )}
          {segments.map((s) => {
            const on = s.id === value;
            return (
              <button
                key={s.id}
                id={`${idPrefix}-${s.id}`}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls={`${idPrefix}-panel`}
                tabIndex={on ? 0 : -1}
                onClick={() => onChange(s.id)}
                className={cn(
                  "relative inline-flex flex-none items-center gap-2 overflow-hidden rounded-full border-0 bg-transparent whitespace-nowrap transition-colors duration-300 hover:text-fg",
                  size === "lg" &&
                    "h-11 px-[clamp(14px,1.8vw,22px)] text-[clamp(14px,1.3vw,16px)] font-semibold",
                  size === "md" &&
                    "h-10 px-[clamp(12px,1.8vw,20px)] text-[clamp(13px,1.2vw,15px)] font-medium",
                  size === "sm" &&
                    "h-9 px-[clamp(12px,1.6vw,16px)] text-[14px] font-medium",
                  on ? "text-fg" : "text-fg-2",
                )}
              >
                {on && !position && (
                  <motion.span
                    layoutId={`${idPrefix}-indicator`}
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-tile shadow-[var(--shadow-tab)]"
                    transition={{ duration: 0.45, ease: [0.3, 0.8, 0.2, 1] }}
                  />
                )}
                <span className="relative z-[1] inline-flex items-center gap-2">
                  {s.icon}
                  {s.label}
                  {s.count !== undefined && s.count !== "" && (
                    <span className="text-[12px] font-medium text-fg-2 tabular-nums">
                      {s.count}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {(["left", "right"] as const).map(
        (side) =>
          edges[side] && (
            <button
              key={side}
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={() => nudge(side === "left" ? -1 : 1)}
              className={cn(
                "absolute top-1/2 hidden size-8 -translate-y-1/2 place-items-center rounded-full border-0 bg-tile text-fg shadow-[var(--shadow-tab)] transition-transform hover:scale-105 [@media(hover:hover)]:grid",
                side === "left" ? "left-1" : "right-1",
              )}
            >
              <Icon
                name={side === "left" ? "chevron-left" : "chevron-right"}
                size={16}
              />
            </button>
          ),
      )}
    </div>
  );
}
