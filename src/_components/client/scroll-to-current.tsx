"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@lib/utils";

/** A horizontal scroller that brings its aria-current item into view. */
export function ScrollToCurrent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const cur = el?.querySelector<HTMLElement>('[aria-current="page"]');
    if (el && cur && cur.offsetLeft + cur.offsetWidth > el.clientWidth) {
      el.scrollLeft = cur.offsetLeft - 24;
    }
  }, []);
  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
