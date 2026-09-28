"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@lib/utils";
import { home } from "@data/home";
import { Icon } from "@components/icon";
import { SmartLink } from "@components/ui";
import { track } from "@components/client/analytics";

type Tile = (typeof home.contact.tiles)[number];

const channel = (t: Tile) => t.title.toLowerCase().replace(/\s+/g, "-");

/** Six contact tiles. Email copies the address instead of opening mail. */
export function ContactTiles({
  tiles = home.contact.tiles,
}: {
  tiles?: Tile[];
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = (e: React.MouseEvent, value: string) => {
    e.preventDefault();
    const done = () => {
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    };
    track("email_copy");
    if (navigator.clipboard)
      navigator.clipboard.writeText(value).then(done, done);
    else done();
  };

  return (
    <div className="wrap mt-[clamp(40px,5vw,72px)] grid grid-cols-[repeat(auto-fit,minmax(max(240px,calc((100%_-_2_*_clamp(12px,1.6vw,20px))/3)),1fr))] gap-[clamp(12px,1.6vw,20px)]">
      {tiles.map((t) => {
        const isCopy = t.behavior === "copy-to-clipboard";
        const on = isCopy && copied;
        return (
          <SmartLink
            key={t.title}
            href={t.href}
            onClick={isCopy ? (e) => copy(e, t.value) : undefined}
            aria-label={
              isCopy ? `Copy email, ${t.value}` : `${t.title}, ${t.value}`
            }
            data-hover-card=""
            data-track={isCopy ? undefined : "contact_click"}
            data-track-channel={channel(t)}
            className="relative flex min-h-[clamp(150px,14vw,210px)] flex-col justify-start gap-[clamp(16px,2vw,24px)] overflow-hidden rounded-[24px] bg-tile p-[clamp(18px,2.2vw,32px)] text-fg transition-[transform,box-shadow] duration-[400ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1 hover:no-underline hover:shadow-[var(--shadow-lift)] active:scale-[.98]"
          >
            <span className="flex items-start justify-between gap-3">
              <span className="grid size-[clamp(44px,4vw,56px)] flex-none place-items-center rounded-full bg-bg-alt">
                <Icon name={t.icon} size={24} />
              </span>
              <span
                data-hover-detail=""
                className={cn(
                  "inline-flex h-9 min-w-9 flex-none items-center justify-center gap-1.5 rounded-full text-[13px] font-semibold text-white transition-colors duration-300",
                  isCopy ? "px-3" : "px-0",
                  on ? "bg-success" : "bg-accent",
                )}
              >
                <Icon
                  name={isCopy ? (on ? "check" : "copy") : "arrow-up-right"}
                  size={18}
                />
                {isCopy && (on ? "Copied" : "Copy")}
              </span>
            </span>
            <span className="flex min-w-0 flex-col gap-1">
              <span className="text-[clamp(20px,2.2vw,28px)] leading-[1.15] font-bold tracking-[-0.02em]">
                {t.title}
              </span>
              <span
                data-hover-detail=""
                className="text-[clamp(14px,1.3vw,16px)] font-semibold [overflow-wrap:anywhere]"
              >
                {t.value}
              </span>
              <span
                data-hover-detail=""
                className="text-[clamp(13px,1.2vw,14px)] text-fg-2"
              >
                {t.note}
              </span>
            </span>
            {isCopy && (
              <span className="sr-only" aria-live="polite">
                {on ? "Email address copied" : ""}
              </span>
            )}
          </SmartLink>
        );
      })}
    </div>
  );
}
