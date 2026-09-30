"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@lib/utils";
import { home } from "@data/home";
import { pickProjects } from "@data/projects";
import { Icon } from "@components/icon";
import { ButtonLink } from "@components/ui";
import { ProjectPeek } from "@components/client/project-peek";
import { ImageSlot } from "@components/media";
import { SegmentedControl } from "@components/client/segmented";
import { prefersReducedMotion } from "@components/client/motion";

const AREAS = home.whatIDo.areas;
const IDS = AREAS.map((a) => a.key);
const N = AREAS.length;
// The homepage header isn't sticky (nav.tsx), so the panel pins to the
// very top of the screen.
const NAV = 0;
// Scroll per area while pinned (in screen heights), and how much of that,
// either side of the switch, the pill spends gliding to the next tab. The
// rest of the time it rests, so a quick flick doesn't skip past an area.
const STEP = 1;
const GLIDE = 0.12;

/**
 * "What I do". On large screens the section pins for a screen-height per
 * area and scrolling steps through the tabs; elsewhere they are plain tabs.
 * If the copy would not fit the pinned panel, it stays unpinned rather
 * than scrolling inside the panel.
 */
export function WhatIDo() {
  const [area, setArea] = useState(IDS[0]);
  const [pinned, setPinned] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const fits = useRef(true);
  const pinnedRef = useRef(false);
  // 0 when the section's top reaches the top of the screen, 1 when its end
  // reaches the bottom: STEP screen-heights of scrolling per area.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [`start ${NAV}px`, "end end"],
  });

  // The selector's pill follows the scroll like a slider: it rests on
  // each tab for most of its stretch, glides to the next one around the
  // switch, and the content changes as it passes halfway. Smoothed so
  // wheel steps glide.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.0005,
  });
  const pillPos = useTransform(smooth, (p) => {
    const c = Math.max(0, Math.min(0.9999, p)) * N;
    const k = Math.round(c);
    if (k >= 1 && k <= N - 1 && Math.abs(c - k) < GLIDE) {
      const t = (c - k + GLIDE) / (2 * GLIDE);
      return k - 1 + t * t * (3 - 2 * t);
    }
    return Math.min(N - 1, Math.floor(c));
  });

  const overflowing = () => {
    const copy = copyRef.current;
    return !!copy && copy.scrollHeight > copy.clientHeight + 1;
  };

  const evaluate = useCallback(() => {
    if (overflowing()) fits.current = false;
    const pin =
      fits.current &&
      !prefersReducedMotion() &&
      window.innerWidth >= 1080 &&
      window.innerHeight >= 680;
    pinnedRef.current = pin;
    setPinned(pin);
  }, []);

  useEffect(() => {
    evaluate();
    const onResize = () => {
      fits.current = true;
      evaluate();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [evaluate]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (pinnedRef.current && overflowing()) evaluate();
    if (!pinnedRef.current) return;
    const q = Math.max(0, Math.min(0.9999, p));
    setArea(IDS[Math.floor(q * N)]);
  });

  // Unpin when the copy is taller than the pinned panel.
  useEffect(() => {
    if (pinned && overflowing()) {
      fits.current = false;
      evaluate();
    }
  }, [pinned, area, evaluate]);

  const select = useCallback(
    (id: string) => {
      const sec = sectionRef.current;
      if (pinned && sec) {
        const i = IDS.indexOf(id);
        const total = sec.offsetHeight - (window.innerHeight - NAV);
        // The middle of this tab's stretch (the very top for the first).
        const top =
          sec.getBoundingClientRect().top +
          window.scrollY -
          NAV +
          total * (i === 0 ? 0.02 : (i + 0.5) / N);
        if (prefersReducedMotion()) window.scrollTo(0, top);
        else
          animate(window.scrollY, top, {
            duration: 0.7,
            ease: [0.2, 0.7, 0.2, 1],
            onUpdate: (v) => window.scrollTo(0, v),
          });
        return;
      }
      setArea(id);
    },
    [pinned],
  );

  const cur = AREAS.find((a) => a.key === area) ?? AREAS[0];
  const items = pickProjects(cur.featuredProjects);
  const photo = cur.photo;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="what-title"
      className="relative"
      style={{ height: pinned ? `${100 + N * STEP * 100}vh` : "auto" }}
    >
      <div
        className={cn(
          "gutter flex flex-col justify-center overflow-hidden",
          pinned
            ? "sticky top-0 h-screen py-[clamp(28px,6vh,64px)]"
            : "band-y",
        )}
      >
        <div
          className={cn(
            "wrap flex min-h-0 flex-col",
            pinned
              ? "h-full gap-[clamp(16px,2.4vh,32px)]"
              : "gap-[clamp(20px,2.6vw,40px)]",
          )}
        >
          <div className="flex flex-none flex-wrap items-end justify-between gap-x-12 gap-y-4">
            <h2 id="what-title" className="t-h2">
              {home.whatIDo.title}
            </h2>
            <div className="max-w-full">
              <SegmentedControl
                label="What I do"
                idPrefix="area"
                size="lg"
                value={cur.key}
                onChange={select}
                segments={AREAS.map((a) => ({
                  id: a.key,
                  label: a.label,
                  count: a.count,
                  icon: <Icon name={a.icon} size={16} />,
                }))}
                position={pinned ? pillPos : undefined}
              />
            </div>
          </div>

          <div
            id="area-panel"
            role="tabpanel"
            aria-labelledby={`area-${cur.key}`}
            className={cn(
              "relative min-h-0 flex-1 overflow-hidden rounded-[28px] bg-bg-alt",
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={cur.key}
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
                <div
                  ref={copyRef}
                  className="flex min-w-0 flex-[1_1_420px] flex-col gap-[clamp(14px,calc(6vh_-_24px),48px)] overflow-hidden p-[clamp(22px,min(3.6vw,calc(6.4vh_-_16px)),60px)]"
                >
                  <div className="flex flex-col gap-[clamp(8px,calc(2.4vh_-_6px),20px)]">
                    <h3 className="text-[clamp(24px,min(2.6vw,4.2vh),38px)] leading-[1.1] font-bold tracking-[-0.03em] text-balance">
                      {cur.headline}
                    </h3>
                    <p className="max-w-[540px] text-[clamp(15px,min(1.4vw,2.2vh),18px)] leading-[1.55] text-fg-2">
                      {cur.blurb}
                    </p>
                  </div>
                  <ul className="m-0 flex list-none flex-col p-0">
                    {cur.services.map((sv) => (
                      <li
                        key={sv.title}
                        className="flex items-center gap-3.5 border-t border-pill py-[clamp(7px,calc(2.6vh_-_10px),18px)] last:border-b"
                      >
                        <span className="grid size-8 flex-none place-items-center rounded-full bg-tile">
                          <Icon name={sv.icon} size={16} />
                        </span>
                        <span className="text-[15px] leading-snug font-semibold">
                          {sv.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {cur.stack.map((k) => (
                      <span
                        key={k}
                        className="rounded-full bg-tile px-3 py-1.5 text-[12px] font-medium"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-[clamp(4px,1vh,12px)]">
                    <ButtonLink href={cur.href} size="md">
                      {cur.cta}
                    </ButtonLink>
                  </div>
                </div>
                <div
                  className={cn(
                    "min-w-0 flex-[1.3_1_480px] p-[clamp(8px,1vw,12px)]",
                    pinned && "min-h-0",
                  )}
                >
                  {/* The photo is a square exactly as wide as the row of four
                      thumbnails. Pinned, both are as big as the panel's height
                      allows: square (W) + gap (g) + a thumbnail ((W - 3g) / 4)
                      must fit, so W = (height - g / 4) × 0.8. */}
                  <div
                    className={cn(pinned && "grid h-full place-items-center")}
                    style={pinned ? { containerType: "size" } : undefined}
                  >
                    <div
                      className="flex flex-col gap-[var(--g)]"
                      style={
                        {
                          "--g": "clamp(8px, 1vw, 12px)",
                          width: pinned
                            ? "min(100cqw, calc((100cqh - var(--g) / 4) * 0.8))"
                            : "100%",
                        } as React.CSSProperties
                      }
                    >
                      <div className="relative aspect-square w-full overflow-hidden rounded-[20px] bg-pill">
                        <ImageSlot
                          media={photo ? { ...photo, fit: "cover" } : undefined}
                          placeholder={cur.photoHint}
                          sizes="(max-width: 1080px) 100vw, 50vw"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-[var(--g)] min-[560px]:grid-cols-4">
                        {items.map((p) => (
                          <ProjectPeek
                            key={p.slug}
                            project={p}
                            aria-label={p.title}
                            className="relative block aspect-square overflow-hidden rounded-2xl bg-pill text-white lift [--hover-scale:1.03] hover:no-underline"
                          >
                            <ImageSlot
                              // Always a filled square: the thumbnail (or the
                              // cover) is cropped to the middle.
                              media={
                                (p.thumbnail ?? p.cover)
                                  ? {
                                      ...(p.thumbnail ?? p.cover)!,
                                      fit: "cover",
                                      position: "center",
                                    }
                                  : undefined
                              }
                              placeholder={p.title}
                              sizes="(max-width: 560px) 50vw, 200px"
                              compact
                            />
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_40%,rgba(0,0,0,.7))]"
                            />
                            <span className="font-display pointer-events-none absolute inset-x-0 bottom-0 px-3 py-2.5 text-[clamp(13px,1.2vw,16px)] leading-[1.2] font-bold tracking-[-0.01em]">
                              {p.title}
                            </span>
                          </ProjectPeek>
                        ))}
                      </div>
                    </div>
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
