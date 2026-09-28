"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@lib/utils";
import { useReducedMotionPref } from "./motion";

export type StackPhoto = { image: StaticImageData; year: string; alt: string };

/** How far a card must be dragged (px) before it flies off. */
const THROW = 100;

function TopCard({
  photo,
  onThrow,
  reduced,
  focus,
}: {
  photo: StackPhoto;
  onThrow: (dir: 1 | -1) => void;
  reduced: boolean;
  /** Move focus here (after the card above it was thrown by keyboard). */
  focus: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (focus) ref.current?.focus({ preventScroll: true });
  }, [focus]);
  // A drag ends with a click; ignore that one so a drag throws one card.
  const dragged = useRef(false);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-18, 18]);
  const opacity = useTransform(x, [-260, -140, 0, 140, 260], [0, 1, 1, 1, 0]);

  const fly = (dir: 1 | -1) => {
    if (reduced) return onThrow(dir);
    animate(x, dir * 420, { duration: 0.28, ease: "easeIn" }).then(() =>
      onThrow(dir),
    );
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={`${photo.alt}, ${photo.year}. Press to see the next photo.`}
      onClick={() => {
        if (dragged.current) {
          dragged.current = false;
          return;
        }
        fly(1);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") fly(-1);
        if (e.key === "ArrowRight") fly(1);
      }}
      drag={reduced ? false : "x"}
      dragSnapToOrigin
      dragElastic={0.6}
      onDragStart={() => {
        dragged.current = true;
      }}
      onDragEnd={(_, info: PanInfo) => {
        if (Math.abs(info.offset.x) > THROW || Math.abs(info.velocity.x) > 600)
          fly(info.offset.x > 0 ? 1 : -1);
      }}
      style={{ x, rotate, opacity }}
      whileTap={reduced ? undefined : { scale: 0.98 }}
      className="absolute inset-0 z-10 cursor-grab touch-pan-y border-0 bg-transparent p-0 active:cursor-grabbing"
    >
      <Card photo={photo} />
    </motion.button>
  );
}

function Card({ photo }: { photo: StackPhoto }) {
  return (
    <span className="relative block size-full overflow-hidden rounded-[20px] bg-pill shadow-[var(--shadow-lift)]">
      <Image
        src={photo.image}
        alt=""
        fill
        sizes="240px"
        draggable={false}
        placeholder={photo.image.blurDataURL ? "blur" : "empty"}
        className="object-cover select-none"
      />
      <span className="font-display absolute right-3 bottom-3 rounded-full bg-black/55 px-2.5 py-0.5 text-[15px] font-semibold text-white">
        {photo.year}
      </span>
    </span>
  );
}

/**
 * A stack of photos across the years: drag (or tap, or use the arrow keys
 * on) the top one to throw it away and see the next. "Again" restacks.
 */
export function PhotoStack({
  photos,
  className,
}: {
  photos: StackPhoto[];
  className?: string;
}) {
  // Newest on top: the list is oldest first, so show it from the end.
  const [left, setLeft] = useState(photos.length);
  const [moved, setMoved] = useState(false);
  const reduced = useReducedMotionPref();
  const visible = photos.slice(0, left);
  const top = visible[visible.length - 1];

  return (
    <div
      className={cn(
        "relative flex flex-none flex-col items-center gap-3",
        className,
      )}
    >
      <div
        role="group"
        aria-roledescription="photo stack"
        aria-label="Photos of Austin over the years"
        className="relative h-[clamp(200px,24vw,280px)] w-[clamp(150px,18vw,210px)]"
      >
        {visible.slice(0, -1).map((p, i, rest) => {
          const depth = rest.length - i; // 1 = just under the top card
          if (depth > 3) return null;
          return (
            <motion.span
              key={`${p.year}-${i}`}
              aria-hidden="true"
              className="absolute inset-0"
              initial={false}
              animate={{
                rotate: depth % 2 ? -5 * depth : 4 * depth,
                scale: 1 - depth * 0.05,
                y: depth * 6,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              <Card photo={p} />
            </motion.span>
          );
        })}
        <AnimatePresence>
          {top ? (
            <TopCard
              key={`${top.year}-${left}`}
              photo={top}
              reduced={reduced}
              focus={moved}
              onThrow={() => {
                setMoved(true);
                setLeft((n) => n - 1);
              }}
            />
          ) : (
            <motion.div
              key="again"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 grid place-items-center rounded-[20px] border-2 border-dashed border-pill"
            >
              <button
                type="button"
                onClick={() => setLeft(photos.length)}
                className="press rounded-full bg-pill px-4 py-2 text-[14px] font-medium text-fg transition-colors hover:bg-well"
              >
                Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p aria-live="polite" className="text-[13px] text-fg-2">
        {top
          ? "Drag or tap the photo to see the next one."
          : "That's all of them."}
      </p>
    </div>
  );
}
