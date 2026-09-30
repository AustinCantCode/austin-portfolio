"use client";

import { useEffect, useRef } from "react";
import type { StaticImageData } from "next/image";
import { cn } from "@lib/utils";
import { useReducedMotionPref } from "@components/client/motion";

/**
 * The scanner demo. It plays muted on a loop while it's on screen and
 * pauses when it leaves; with reduced motion it shows its still and plays
 * only when asked. The phone bezel is part of the video itself, so the
 * corners are clipped to the bezel's own radius (9.9% of its width).
 */
export function DemoVideo({
  src,
  poster,
  label,
  className,
}: {
  src: string;
  poster?: StaticImageData;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotionPref();

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <div className={cn("[container-type:inline-size]", className)}>
      <video
        ref={ref}
        src={src}
        poster={poster?.src}
        muted
        loop
        playsInline
        preload="metadata"
        controls={reduce}
        aria-label={label}
        className="block w-full rounded-[9.9cqw] bg-black"
        style={{
          aspectRatio: poster
            ? `${poster.width} / ${poster.height}`
            : "670 / 1440",
        }}
      />
    </div>
  );
}
