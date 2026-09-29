"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@lib/utils";
import type { Project } from "@data/types";
import { ProjectPeek } from "@components/client/project-peek";
import { EASE, useReducedMotionPref } from "@components/client/motion";
import { ImageSlot, PhoneFrame, TabletFrame } from "@components/media";

/** Apps show in a phone; websites, platforms and the rest in a tablet. */
const inPhone = (p: Project) => p.frame === "phone" || !!p.screen;

// Hover: the device rises off its floor and the shadow tightens under it.
const device: Variants = {
  rest: { y: 0 },
  hover: {
    y: -10,
    transition: { type: "spring", stiffness: 300, damping: 22 },
  },
};
const floor: Variants = {
  rest: { scaleX: 1, opacity: 1 },
  hover: {
    scaleX: 0.86,
    opacity: 0.6,
    transition: { duration: 0.4, ease: EASE },
  },
};

function Item({
  project: p,
  span,
  still,
}: {
  project: Project;
  span: string;
  still: boolean;
}) {
  const phone = inPhone(p);
  return (
    <ProjectPeek
      project={p}
      data-reveal=""
      className={cn(
        "group block rounded-[24px] text-fg outline-offset-8 hover:no-underline",
        span,
      )}
    >
      <motion.div
        initial="rest"
        animate="rest"
        whileHover={still ? undefined : "hover"}
        className="flex flex-col gap-[clamp(22px,2.6vw,32px)]"
      >
        {/* The stage: the device stands on the page, on a soft shadow. */}
        {/* Left-aligned, so the device and its caption share an edge. */}
        <div className="flex h-[var(--stage)] items-end">
          <div
            className="relative"
            style={
              phone
                ? { width: "calc(var(--stage) * 9 / 19.5)" }
                : { width: "min(100%, calc((var(--stage) - 24px) * 4 / 3))" }
            }
          >
            {/* Positioned with insets: Framer owns this element's transform. */}
            <motion.span
              aria-hidden="true"
              variants={floor}
              className="floor-shadow absolute inset-x-[12%] -bottom-[10px] h-[20px] rounded-[50%] blur-[14px]"
            />
            <motion.div variants={device} className="relative">
              {phone ? (
                <PhoneFrame size={240} width="100%">
                  <ImageSlot
                    media={p.screen ?? p.cover}
                    placeholder={`${p.title} screenshot`}
                    sizes="(max-width: 768px) 45vw, 220px"
                  />
                </PhoneFrame>
              ) : (
                <TabletFrame>
                  <ImageSlot
                    media={p.cover}
                    placeholder={`${p.title} screenshot`}
                    sizes="(max-width: 768px) 100vw, 560px"
                  />
                </TabletFrame>
              )}
            </motion.div>
          </div>
        </div>

        <div className="flex max-w-[520px] flex-col gap-2">
          <p className="text-[13px] font-medium text-fg-2">
            {p.subtext}, {p.year}
          </p>
          <h3 className="font-display text-[clamp(28px,2.6vw,36px)] leading-[1.08] font-bold tracking-[-0.015em] transition-colors duration-300 group-hover:text-accent-text">
            {p.title}
          </h3>
          <p className="text-[17px] leading-[1.5] text-fg-2">{p.line}</p>
          <p className="text-[14px] font-medium text-fg">{p.role}</p>
        </div>
      </motion.div>
    </ProjectPeek>
  );
}

/**
 * "Selected work" as a showroom: no cards or borders, each device standing
 * on the page. Projects pair up in rows; a tablet next to a phone splits
 * 7/5 (the side follows the CMS order), two of a kind split evenly.
 */
export function SelectedWork({ projects }: { projects: Project[] }) {
  const still = useReducedMotionPref();
  const rows: Project[][] = [];
  for (let i = 0; i < projects.length; i += 2)
    rows.push(projects.slice(i, i + 2));

  return (
    <div className="grid grid-cols-1 gap-x-[clamp(28px,4vw,64px)] gap-y-[clamp(64px,7vw,112px)] [--stage:clamp(280px,78vw,360px)] md:grid-cols-12 md:[--stage:clamp(300px,32vw,460px)]">
      {rows.flatMap((row) => {
        const mixed = row.length === 2 && inPhone(row[0]) !== inPhone(row[1]);
        return row.map((p) => {
          const span =
            row.length === 1
              ? "md:col-span-12"
              : mixed
                ? inPhone(p)
                  ? "md:col-span-5"
                  : "md:col-span-7"
                : "md:col-span-6";
          return <Item key={p.slug} project={p} span={span} still={still} />;
        });
      })}
    </div>
  );
}
