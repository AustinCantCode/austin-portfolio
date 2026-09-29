"use client";

import { useReducedMotionPref } from "@components/client/motion";
import Link from "next/link";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@lib/utils";
import { allSkills } from "@data/skills";
import { home } from "@data/home";
import { SectionHeader } from "@components/ui";
import { SkillIcon } from "@components/skill-icon";
import type { SkillIcon as IconData } from "@data/skill-icons";

const half = Math.ceil(allSkills.length / 2);
const ROWS = [
  { dir: "left" as const, items: allSkills.slice(0, half) },
  { dir: "right" as const, items: allSkills.slice(half) },
];

/**
 * Two rows of skill pills drifting in opposite directions, driven by
 * Framer Motion (useAnimationFrame + motion values). Hover or focus
 * pauses them; reduced motion turns them into plain scrollable rows.
 */
export function ToolsMarquee({ icons }: { icons: Record<string, IconData> }) {
  const { title, link } = home.tools;
  // Hydration-safe: false on the first render, like the server.
  const reduce = useReducedMotionPref();
  const paused = useRef(false);
  const offset = useRef(0);
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  const left = useMotionValue(0);
  const right = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    if (!paused.current) offset.current += Math.min(delta, 50) * 0.04;
    const [a, b] = rows.current;
    const wa = (a?.scrollWidth ?? 0) / 2;
    const wb = (b?.scrollWidth ?? 0) / 2;
    if (wa) left.set(-(offset.current % wa));
    if (wb) right.set((offset.current % wb) - wb);
  });

  return (
    <section
      aria-label="Tools I use"
      className="band-y-2 overflow-hidden bg-bg-alt"
    >
      <div className="wrap gutter mb-[clamp(28px,4vw,48px)]">
        <SectionHeader title={title} link={link} />
      </div>
      <div
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        onFocus={() => (paused.current = true)}
        onBlur={() => (paused.current = false)}
        className="flex flex-col gap-3"
      >
        {ROWS.map((row, r) => (
          <div
            key={row.dir}
            className={cn(
              "fade-edges no-scrollbar",
              reduce ? "overflow-x-auto" : "overflow-x-hidden",
            )}
          >
            <motion.div
              ref={(el) => {
                rows.current[r] = el;
              }}
              style={{ x: reduce ? 0 : row.dir === "left" ? left : right }}
              className="flex w-max gap-3 will-change-transform"
            >
              {(reduce ? row.items : [...row.items, ...row.items]).map(
                (k, i) => (
                  <Link
                    key={`${k}-${i}`}
                    href="/about/skills"
                    tabIndex={i >= row.items.length ? -1 : undefined}
                    aria-hidden={i >= row.items.length ? true : undefined}
                    className="inline-flex h-14 flex-none items-center gap-2.5 rounded-full bg-tile px-6 text-[clamp(16px,1.6vw,19px)] font-semibold whitespace-nowrap text-fg rise transition-[background-color,color] duration-[250ms] hover:bg-fg hover:text-bg hover:no-underline"
                  >
                    <SkillIcon icon={icons[k]} size={18} />
                    {k}
                  </Link>
                ),
              )}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
