"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@lib/utils";
import { home, whatIDoPhotoHints, whatIDoPhotos } from "@data/home";
import { pickProjects } from "@data/projects";
import { Icon } from "@components/icon";
import { ButtonLink, Kicker } from "@components/ui";
import { ImageSlot } from "@components/media";
import { SegmentedControl } from "@components/client/segmented";
import { prefersReducedMotion } from "@components/client/motion";

const AREAS = home.whatIDo.areas;
const IDS = AREAS.map((a) => a.id);
const NAV = 56;

/**
 * Chapter 2. On large screens the section pins for three screen-heights
 * and scrolling steps through the tabs; elsewhere they are plain tabs.
 */
export function WhatIDo() {
  const [area, setArea] = useState(IDS[0]);
  const [pinned, setPinned] = useState(false);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const sec = sectionRef.current;
      if (!sec) return;
      const pin =
        !prefersReducedMotion() &&
        window.innerWidth >= 1080 &&
        window.innerHeight >= 640;
      setPinned(pin);
      if (!pin) return;
      const r = sec.getBoundingClientRect();
      const total = sec.offsetHeight - (window.innerHeight - NAV);
      const p = Math.max(0, Math.min(0.9999, (NAV - r.top) / total));
      const i = Math.floor(p * 3);
      setArea(IDS[i]);
      setProgress(p * 3 - i);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const select = useCallback(
    (id: string) => {
      const sec = sectionRef.current;
      if (pinned && sec) {
        const i = IDS.indexOf(id);
        const total = sec.offsetHeight - (window.innerHeight - NAV);
        const top =
          sec.getBoundingClientRect().top +
          window.scrollY -
          NAV +
          total * (i / 3 + 0.02);
        window.scrollTo({
          top,
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
        return;
      }
      setArea(id);
    },
    [pinned],
  );

  const cur = AREAS.find((a) => a.id === area) ?? AREAS[0];
  const curIndex = IDS.indexOf(cur.id);
  const items = pickProjects(cur.featuredProjects);
  const photo = whatIDoPhotos[cur.id];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="what-title"
      className="relative"
      style={{ height: pinned ? "300vh" : "auto" }}
    >
      <div
        className={cn(
          "gutter flex flex-col justify-center overflow-hidden",
          pinned
            ? "sticky top-14 h-[calc(100vh_-_56px)] py-[clamp(20px,3vh,40px)]"
            : "band-y",
        )}
      >
        <div
          className={cn(
            "wrap flex min-h-0 flex-col gap-[clamp(20px,2.6vw,40px)]",
            pinned && "h-full",
          )}
        >
          <div className="flex flex-none flex-wrap items-end justify-between gap-x-12 gap-y-4">
            <div className="flex flex-col gap-3">
              <Kicker>{home.whatIDo.kicker}</Kicker>
              <h2 id="what-title" className="t-h2">
                {home.whatIDo.title}
              </h2>
            </div>
            <div className="flex max-w-full flex-col items-end gap-2.5">
              <SegmentedControl
                label="What I do"
                idPrefix="area"
                size="lg"
                value={cur.id}
                onChange={select}
                segments={AREAS.map((a) => ({
                  id: a.id,
                  label: a.label,
                  count: a.count,
                  icon: <Icon name={a.icon} size={16} />,
                }))}
                renderExtra={(s) =>
                  pinned ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3.5 bottom-[5px] z-[1] h-0.5 rounded-sm bg-pill"
                    >
                      <span
                        className="block h-full rounded-sm bg-accent"
                        style={{
                          width:
                            IDS.indexOf(s.id) < curIndex
                              ? "100%"
                              : s.id === cur.id
                                ? `${Math.round(progress * 100)}%`
                                : "0%",
                        }}
                      />
                    </span>
                  ) : null
                }
              />
              {pinned && (
                <p className="text-[13px] text-fg-2">
                  {home.whatIDo.scrollHint}
                </p>
              )}
            </div>
          </div>

          <div
            id="area-panel"
            role="tabpanel"
            aria-labelledby={`area-${cur.id}`}
            className={cn(
              "relative min-h-0 flex-1 overflow-hidden rounded-[28px] bg-bg-alt",
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={cur.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 0.35, ease: "easeOut" },
                  y: { duration: 0.45, ease: [0.2, 0.7, 0.2, 1] },
                }}
                className={cn(
                  "flex h-full items-stretch",
                  pinned ? "flex-nowrap" : "flex-wrap",
                )}
              >
                <div className="no-scrollbar flex min-w-0 flex-[1_1_420px] flex-col gap-[clamp(14px,1.8vw,24px)] overflow-auto p-[clamp(24px,3.4vw,56px)]">
                  <p className="text-[14px] font-semibold text-fg-2">
                    {cur.kicker}
                  </p>
                  <h3 className="text-[clamp(28px,3.6vw,48px)] leading-[1.04] font-bold tracking-[-0.03em] text-balance">
                    {cur.headline}
                  </h3>
                  <p className="max-w-[560px] text-[clamp(16px,1.6vw,19px)] text-fg-2">
                    {cur.blurb}
                  </p>
                  <ul className="m-0 flex list-none flex-col p-0">
                    {cur.services.map((sv) => (
                      <li
                        key={sv.title}
                        className="flex items-center gap-3.5 border-t border-pill py-3"
                      >
                        <span className="grid size-9 flex-none place-items-center rounded-full bg-tile">
                          <Icon name={sv.icon} size={17} />
                        </span>
                        <span className="flex min-w-0 flex-col">
                          <span className="text-[16px] font-semibold">
                            {sv.title}
                          </span>
                          <span className="text-[14px] text-fg-2">
                            {sv.text}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {cur.stack.map((k) => (
                      <span
                        key={k}
                        className="rounded-full bg-tile px-3 py-[5px] text-[13px] font-medium"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3">
                    <ButtonLink href={cur.href} size="md">
                      {cur.cta}
                    </ButtonLink>
                    <p className="text-[14px] text-fg-2">{cur.stat}</p>
                  </div>
                </div>
                <div
                  className={cn(
                    "grid min-w-0 flex-[1.3_1_480px] grid-rows-[minmax(0,1fr)_auto] gap-[clamp(8px,1vw,12px)] p-[clamp(8px,1vw,12px)]",
                    pinned ? "min-h-0" : "min-h-[420px]",
                  )}
                >
                  <div className="relative min-h-[180px] overflow-hidden rounded-[20px] bg-pill">
                    <ImageSlot
                      media={photo ? { ...photo, fit: "cover" } : undefined}
                      placeholder={whatIDoPhotoHints[cur.id]}
                      sizes="(max-width: 1080px) 100vw, 50vw"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-[clamp(8px,1vw,12px)]">
                    {items.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/projects/${p.slug}`}
                        data-hover-card=""
                        aria-label={p.title}
                        className="relative block aspect-square overflow-hidden rounded-2xl bg-pill text-white transition-transform duration-[400ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:scale-[1.03] hover:no-underline"
                      >
                        <ImageSlot
                          media={
                            p.cover
                              ? { ...p.cover, fit: "cover", position: "top" }
                              : undefined
                          }
                          placeholder={p.title}
                          sizes="160px"
                        />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_40%,rgba(0,0,0,.7))]"
                        />
                        <span className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-0.5 px-3 py-2.5">
                          <span
                            data-hover-detail=""
                            className="truncate text-[11px] font-semibold text-white/85"
                          >
                            {p.subtext} · {p.year}
                          </span>
                          <span className="text-[clamp(13px,1.2vw,16px)] leading-[1.2] font-bold tracking-[-0.01em]">
                            {p.title}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
