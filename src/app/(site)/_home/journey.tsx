"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { home } from "@data/home";
import { SmartLink, TextLink } from "@components/ui";
import { Icon } from "@components/icon";

/**
 * Timeline whose gold rail fills as you scroll (Framer Motion useScroll),
 * lighting each milestone as the rail reaches it.
 */
export function Journey() {
  const { title, sub, link, items } = home.journey;
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 55%", "end 55%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const [lit, setLit] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const ol = listRef.current;
    if (!ol) return;
    const h = (ol.clientHeight - 16) * p;
    const rows = ol.querySelectorAll<HTMLElement>("[data-tl]");
    let n = 0;
    rows.forEach((li) => {
      if (li.offsetTop <= h) n++;
    });
    setLit(n);
  });

  // Milestones up to "Now" light as the rail reaches them; later ones
  // (what comes next) stay as outlines.
  const nowAt = items.findIndex((t) => t.now);
  const on = (i: number) => (nowAt < 0 || i <= nowAt) && (reduce || i < lit);

  return (
    <section
      aria-labelledby="journey-title"
      className="gutter band-y bg-bg-alt"
    >
      <div className="wrap flex flex-wrap items-start gap-[clamp(32px,6vw,96px)]">
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-4 min-[1100px]:sticky min-[1100px]:top-[120px]">
          <h2 id="journey-title" className="t-h2">
            {title}
          </h2>
          <p className="max-w-[420px] text-[clamp(17px,1.5vw,19px)] text-fg-2">
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
          <motion.span
            aria-hidden="true"
            style={{ scaleY: reduce ? 1 : fill }}
            className="absolute top-2 left-[7px] h-[calc(100%_-_16px)] w-0.5 origin-top rounded-sm bg-accent"
          />
          {items.map((t, i) => (
            <li
              key={t.title}
              data-tl=""
              className="relative flex flex-wrap gap-x-8 gap-y-1 pb-[clamp(28px,3.4vw,44px)] pl-11"
            >
              <span
                aria-hidden="true"
                className="absolute top-1 left-0 grid size-4 place-items-center rounded-full border-2 border-accent bg-bg-alt"
              >
                <motion.span
                  className="size-full rounded-full bg-accent"
                  initial={false}
                  animate={{ scale: on(i) ? 1 : 0, opacity: on(i) ? 1 : 0 }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                />
                {t.now && (
                  <span className="absolute -inset-1.5 rounded-full border-2 border-accent/50 motion-safe:animate-[now-pulse_2.4s_ease-out_infinite]" />
                )}
              </span>
              <p className="flex-[0_0_190px] pt-px font-mono text-[13px] font-medium text-fg-2">
                {t.date}
              </p>
              <div className="flex min-w-0 flex-[1_1_280px] flex-col gap-0.5">
                <p className="font-display flex items-start gap-2.5 text-[clamp(19px,2vw,23px)] leading-[1.25] font-bold tracking-[-0.015em]">
                  {t.logo ? (
                    <Image
                      src={t.logo}
                      alt=""
                      width={56}
                      height={56}
                      className="-mt-0.5 size-8 flex-none rounded-full bg-white object-contain p-[3px] shadow-[0_0_0_1px_var(--color-hairline)]"
                    />
                  ) : (
                    t.icon && (
                      <span
                        aria-hidden="true"
                        className="-mt-0.5 grid size-8 flex-none place-items-center rounded-full bg-tile text-fg shadow-[0_0_0_1px_var(--color-hairline)]"
                      >
                        <Icon name={t.icon} size={16} />
                      </span>
                    )
                  )}
                  <span className="min-w-0">
                    {t.title}
                    {t.now && (
                      <span className="ml-2.5 inline-block translate-y-[-3px] rounded-full bg-accent px-2.5 py-[3px] align-middle font-sans text-[12px] leading-[1.4] font-semibold tracking-normal text-on-accent">
                        Now
                      </span>
                    )}
                  </span>
                </p>
                <p className="text-[16px] text-fg-2">{t.sub}</p>
                {t.links.length > 0 && (
                  <ul className="m-0 mt-2.5 flex list-none flex-wrap gap-2 p-0">
                    {t.links.map((l) => (
                      <li key={l.href}>
                        <SmartLink
                          href={l.href}
                          className="rise inline-flex h-8 items-center gap-1 rounded-full bg-pill px-3.5 text-[13px] font-medium text-fg transition-colors hover:bg-well hover:no-underline"
                        >
                          {l.label}
                          <span aria-hidden="true" className="text-fg-2">
                            ›
                          </span>
                        </SmartLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
