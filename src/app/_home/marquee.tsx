"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { cn } from "@lib/utils";
import { allSkills } from "@data/skills";
import { home } from "@data/home";
import { SectionHeader } from "@components/ui";
import { useReducedMotionPref } from "@components/client/motion";

const half = Math.ceil(allSkills.length / 2);
const ROWS = [
  { dir: "left" as const, items: allSkills.slice(0, half) },
  { dir: "right" as const, items: allSkills.slice(half) },
];

/** Chapter 3: two rows of skill pills drifting in opposite directions. */
export function ToolsMarquee() {
  const { title, link } = home.tools;
  const reduce = useReducedMotionPref();
  const rootRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduce) return;
    let raf = 0;
    let last = performance.now();
    let offset = 0;
    const loop = (t: number) => {
      const dt = Math.min(t - last, 50);
      last = t;
      if (!paused.current) offset += dt * 0.04;
      root.querySelectorAll<HTMLElement>("[data-marquee]").forEach((el) => {
        const w = el.scrollWidth / 2;
        if (!w) return;
        const x = offset % w;
        el.style.transform = `translateX(${el.dataset.marquee === "left" ? -x : x - w}px)`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      root.querySelectorAll<HTMLElement>("[data-marquee]").forEach((el) => {
        el.style.transform = "";
      });
    };
  }, [reduce]);

  return (
    <section
      aria-label="Tools I use"
      className="band-y-2 overflow-hidden bg-bg-alt"
    >
      <div className="wrap gutter mb-[clamp(28px,4vw,48px)]">
        <SectionHeader title={title} link={link} />
      </div>
      <div
        ref={rootRef}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        onFocus={() => (paused.current = true)}
        onBlur={() => (paused.current = false)}
        className="flex flex-col gap-3"
      >
        {ROWS.map((row) => (
          <div
            key={row.dir}
            className={cn(
              "fade-edges no-scrollbar",
              reduce ? "overflow-x-auto" : "overflow-x-hidden",
            )}
          >
            <div
              data-marquee={row.dir}
              className="flex w-max gap-3 will-change-transform"
            >
              {(reduce ? row.items : [...row.items, ...row.items]).map(
                (k, i) => (
                  <Link
                    key={`${k}-${i}`}
                    href="/about/skills"
                    tabIndex={i >= row.items.length ? -1 : undefined}
                    aria-hidden={i >= row.items.length ? true : undefined}
                    className="inline-flex h-14 flex-none items-center rounded-full bg-tile px-6 text-[clamp(16px,1.6vw,19px)] font-semibold whitespace-nowrap text-fg transition-[background-color,color,transform] duration-[250ms] hover:-translate-y-0.5 hover:bg-fg hover:text-bg hover:no-underline"
                  >
                    {k}
                  </Link>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
