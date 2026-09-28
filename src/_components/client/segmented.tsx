"use client";

import { motion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@lib/utils";

export type Segment = {
  id: string;
  label: ReactNode;
  count?: number | string;
  icon?: ReactNode;
};

/**
 * A pill-shaped tablist with a sliding indicator. Arrow keys, Home and
 * End move the selection; only the selected tab is in the tab order.
 */
export function SegmentedControl({
  segments,
  value,
  onChange,
  label,
  idPrefix,
  size = "md",
  className,
  renderExtra,
}: {
  segments: Segment[];
  value: string;
  onChange: (id: string) => void;
  label: string;
  idPrefix: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  renderExtra?: (s: Segment, selected: boolean) => ReactNode;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const ids = segments.map((s) => s.id);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = ids.indexOf(value);
    let n: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown")
      n = (i + 1) % ids.length;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      n = (i - 1 + ids.length) % ids.length;
    if (e.key === "Home") n = 0;
    if (e.key === "End") n = ids.length - 1;
    if (n === null) return;
    e.preventDefault();
    onChange(ids[n]);
    requestAnimationFrame(() =>
      document.getElementById(`${idPrefix}-${ids[n!]}`)?.focus(),
    );
  };

  return (
    <div
      className={cn(
        "no-scrollbar max-w-full overflow-x-auto rounded-full",
        className,
      )}
    >
      <div
        ref={listRef}
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="relative flex w-max gap-0.5 rounded-full bg-bg-alt p-1"
      >
        {segments.map((s) => {
          const on = s.id === value;
          return (
            <button
              key={s.id}
              id={`${idPrefix}-${s.id}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`${idPrefix}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => onChange(s.id)}
              className={cn(
                "relative inline-flex flex-none items-center gap-2 overflow-hidden rounded-full border-0 bg-transparent whitespace-nowrap transition-colors duration-300 hover:text-fg",
                size === "lg" &&
                  "h-11 px-[clamp(14px,1.8vw,22px)] text-[clamp(14px,1.3vw,16px)] font-semibold",
                size === "md" &&
                  "h-10 px-[clamp(12px,1.8vw,20px)] text-[clamp(13px,1.2vw,15px)] font-medium",
                size === "sm" &&
                  "h-9 px-[clamp(12px,1.6vw,16px)] text-[14px] font-medium",
                on ? "text-fg" : "text-fg-2",
              )}
            >
              {on && (
                <motion.span
                  layoutId={`${idPrefix}-indicator`}
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-tile shadow-[var(--shadow-tab)]"
                  transition={{ duration: 0.45, ease: [0.3, 0.8, 0.2, 1] }}
                />
              )}
              <span className="relative z-[1] inline-flex items-center gap-2">
                {s.icon}
                {s.label}
                {s.count !== undefined && s.count !== "" && (
                  <span className="text-[12px] font-medium text-fg-2 tabular-nums">
                    {s.count}
                  </span>
                )}
              </span>
              {renderExtra?.(s, on)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
