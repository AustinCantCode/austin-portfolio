"use client";

import { useEffect, useRef } from "react";
import { home } from "@data/home";
import { TextLink, Kicker } from "@components/ui";
import { prefersReducedMotion } from "@components/client/motion";

/** Chapter 1: timeline whose rail fills as you scroll. */
export function Journey() {
  const { kicker, title, sub, link, items } = home.journey;
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ol = listRef.current;
    const fill = fillRef.current;
    if (!ol || !fill) return;
    const paint = (p: number) => {
      const h = (ol.clientHeight - 16) * p;
      fill.style.height = `${h}px`;
      ol.querySelectorAll<HTMLElement>("[data-tl]").forEach((li) => {
        const on = li.offsetTop <= h;
        const dot = li.querySelector<HTMLElement>("[data-dot]");
        if (!dot) return;
        dot.style.background = on ? "var(--accent-fill)" : "var(--bg-alt)";
        dot.style.transform = on ? "scale(1.1)" : "none";
      });
    };
    if (prefersReducedMotion()) {
      paint(1);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = ol.getBoundingClientRect();
        paint(
          Math.max(
            0,
            Math.min(1, (window.innerHeight * 0.55 - r.top) / r.height),
          ),
        );
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      aria-labelledby="journey-title"
      className="gutter band-y bg-bg-alt"
    >
      <div className="wrap flex flex-wrap items-start gap-[clamp(32px,6vw,96px)]">
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-4 min-[1100px]:sticky min-[1100px]:top-[120px]">
          <Kicker>{kicker}</Kicker>
          <h2 id="journey-title" className="t-h2">
            {title}
          </h2>
          <p className="max-w-[420px] text-[clamp(17px,1.9vw,21px)] text-fg-2">
            {sub}
          </p>
          <TextLink href={link.href}>{link.label}</TextLink>
        </div>
        <ol
          ref={listRef}
          className="relative m-0 flex min-w-0 flex-[1.6_1_520px] list-none flex-col p-0"
        >
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[7px] w-0.5 rounded-sm bg-pill"
          />
          <span
            ref={fillRef}
            aria-hidden="true"
            className="absolute top-2 left-[7px] h-[calc(100%_-_16px)] max-h-[calc(100%_-_16px)] w-0.5 rounded-sm bg-accent"
          />
          {items.map((t) => (
            <li
              key={t.title}
              data-tl=""
              className="relative flex flex-wrap gap-x-8 gap-y-1 pb-[clamp(28px,3.4vw,44px)] pl-11"
            >
              <span
                data-dot=""
                aria-hidden="true"
                className="absolute top-1 left-0 size-4 rounded-full border-2 border-accent bg-accent transition-[background-color,transform] duration-300"
              />
              <p className="flex-[0_0_190px] pt-px text-[14px] font-semibold text-fg-2">
                {t.date}
              </p>
              <div className="flex min-w-0 flex-[1_1_280px] flex-col gap-0.5">
                <p className="text-[clamp(19px,2vw,23px)] leading-[1.25] font-bold tracking-[-0.015em]">
                  {t.title}
                </p>
                <p className="text-[16px] text-fg-2">{t.sub}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
