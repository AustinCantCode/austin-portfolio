"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Media } from "@data/types";
import { ImageSlot } from "../media";
import { Icon } from "../icon";

export type LightboxItem = {
  title: string;
  caption?: string;
  media?: Media;
};

/**
 * Full-screen image viewer with previous/next. Escape closes, arrow keys
 * navigate, focus moves to the close button and returns to the trigger.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onIndex,
  variant = "art",
  noun = "item",
}: {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
  variant?: "art" | "certificate";
  noun?: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const item = items[index];
  const n = items.length;
  const go = (d: number) => onIndex((index + d + n) % n);

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

  if (!item) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowLeft") go(-1);
    else if (e.key === "ArrowRight") go(1);
    else if (e.key === "Tab") {
      const f = dialogRef.current?.querySelectorAll<HTMLElement>("button");
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
    }
  };

  const cert = variant === "certificate";

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/[.88] px-4 pt-14 pb-6"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
        className={`flex w-full flex-col items-center gap-4 text-[#f4f1ea] ${cert ? "max-w-[900px]" : "max-w-[720px]"}`}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="fixed top-4 right-4 grid size-10 place-items-center rounded-full bg-[#2b2924] text-[#f4f1ea]"
        >
          <Icon name="x" size={18} />
        </button>
        <div
          className={`relative w-full overflow-hidden rounded-[20px] bg-[#1b1a16] shadow-[0_30px_80px_rgba(0,0,0,.3)] ${cert ? "aspect-[1.41/1] max-h-[66vh]" : "h-[min(72vh,860px)]"}`}
        >
          <ImageSlot
            media={item.media}
            placeholder={item.title}
            fit="contain"
            sizes="(max-width: 900px) 100vw, 900px"
            tone="dark"
          />
        </div>
        <div className="flex max-w-[620px] flex-col items-center gap-1 text-center">
          <h2
            id="lightbox-title"
            className="text-[21px] leading-[1.3] font-semibold"
          >
            {item.title}
          </h2>
          {item.caption && (
            <p className="text-[14px] text-[#a8a294]">{item.caption}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={`Previous ${noun}`}
            className="grid size-11 place-items-center rounded-full bg-[#2b2924] text-[#f4f1ea]"
          >
            <Icon name="chevron-left" size={20} />
          </button>
          <p
            aria-live="polite"
            className="min-w-[72px] text-center text-[14px] text-[#a8a294]"
          >
            {index + 1} of {n}
          </p>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={`Next ${noun}`}
            className="grid size-11 place-items-center rounded-full bg-[#2b2924] text-[#f4f1ea]"
          >
            <Icon name="chevron-right" size={20} />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
