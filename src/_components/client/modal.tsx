"use client";

import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@lib/utils";
import { Icon } from "../icon";

/**
 * A centred pop-up panel. Escape and the backdrop close it, focus moves
 * to the close button, stays inside while open and returns to the
 * trigger afterwards. `onKey` receives other key presses (for example
 * arrow keys for a carousel).
 */
export function Modal({
  label,
  onClose,
  onKey,
  className,
  children,
}: {
  /** Accessible name; usually the visible title. */
  label: string;
  onClose: () => void;
  onKey?: (e: React.KeyboardEvent) => void;
  className?: string;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      trigger?.focus?.();
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key === "Tab") {
      const f = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), video, [tabindex]:not([tabindex="-1"])',
      );
      if (!f?.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
      return;
    }
    onKey?.(e);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
      onKeyDown={onKeyDown}
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "relative flex max-h-[92vh] w-full max-w-[880px] flex-col overflow-hidden rounded-t-[28px] bg-tile text-fg shadow-[var(--shadow-lift)] sm:rounded-[28px]",
          className,
        )}
      >
        <span id={titleId} className="sr-only">
          {label}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-[2] grid size-10 place-items-center rounded-full bg-well text-fg transition-colors hover:bg-pill"
        >
          <Icon name="x" size={18} />
        </button>
        <div className="overflow-y-auto overscroll-contain">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
