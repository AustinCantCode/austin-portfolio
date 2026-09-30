"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@lib/utils";
import { Icon } from "../icon";
import { prefersReducedMotion } from "./motion";

const FADE = 48;

/**
 * A horizontal scroll-snap carousel: no native scrollbar, soft edge fades
 * while there is more to see, arrow buttons on pointer devices and a
 * small progress bar. Children are the slides; give each `flex-none
 * snap-start` and a width.
 */
export function Carousel({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState({ start: true, end: false, thumb: 1, pos: 0 });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setS({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft >= max - 2,
      thumb: el.scrollWidth ? el.clientWidth / el.scrollWidth : 1,
      pos: max > 0 ? el.scrollLeft / max : 0,
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  const page = (dir: 1 | -1) => {
    const el = ref.current;
    el?.scrollBy({
      left: dir * el.clientWidth * 0.8,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const scrollable = s.thumb < 0.995;
  const mask = scrollable
    ? `linear-gradient(90deg, ${s.start ? "#000" : "transparent"}, #000 ${FADE}px, #000 calc(100% - ${FADE}px), ${s.end ? "#000" : "transparent"})`
    : undefined;

  const arrow = (dir: 1 | -1) => (
    <button
      type="button"
      onClick={() => page(dir)}
      disabled={dir < 0 ? s.start : s.end}
      aria-label={dir < 0 ? `Scroll ${label} back` : `Scroll ${label} forward`}
      className={cn(
        "absolute top-1/2 z-[1] grid size-10 -translate-y-1/2 place-items-center rounded-full bg-tile text-fg shadow-[var(--shadow-tab)] transition-[opacity,background-color] duration-200 hover:bg-pill disabled:pointer-events-none disabled:opacity-0 [@media(hover:none)]:hidden",
        "opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100",
        dir < 0 ? "left-2" : "right-2",
      )}
    >
      <Icon name={dir < 0 ? "chevron-left" : "chevron-right"} size={18} />
    </button>
  );

  return (
    <div className={cn("flex min-w-0 flex-col gap-4", className)}>
      <div className="group/carousel relative">
        <div
          ref={ref}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label={label}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
              e.preventDefault();
              page(e.key === "ArrowRight" ? 1 : -1);
            }
          }}
          // The padding (taken back by the margin) leaves room inside the
          // scroller for hover lifts and focus outlines.
          className="no-scrollbar -m-3 flex scroll-px-3 snap-x snap-mandatory gap-[clamp(20px,2vw,28px)] overflow-x-auto overscroll-x-contain rounded-[20px] p-3"
          style={{ maskImage: mask, WebkitMaskImage: mask }}
        >
          {children}
        </div>
        {scrollable && arrow(-1)}
        {scrollable && arrow(1)}
      </div>
      {scrollable && (
        <div
          aria-hidden="true"
          className="mx-auto h-1 w-[min(160px,40%)] overflow-hidden rounded-full bg-pill"
        >
          <div
            className="h-full rounded-full bg-fg-2"
            style={{
              width: `${s.thumb * 100}%`,
              transform: `translateX(${s.pos * (1 / s.thumb - 1) * 100}%)`,
            }}
          />
        </div>
      )}
    </div>
  );
}
