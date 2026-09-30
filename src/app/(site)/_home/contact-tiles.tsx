"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@lib/utils";
import { home } from "@data/home";
import { Icon } from "@components/icon";
import { SmartLink } from "@components/ui";
import { track } from "@components/client/analytics";

type Tile = (typeof home.contact.tiles)[number];

const channel = (t: Tile) => t.title.toLowerCase().replace(/\s+/g, "-");

/**
 * The contact tiles, one compact row each: icon, channel and address.
 * Email copies the address instead of opening mail.
 */
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
    <div className="wrap mt-[clamp(32px,4vw,56px)] grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-3">
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
            data-track={isCopy ? undefined : "contact_click"}
            data-track-channel={channel(t)}
            title={t.note || undefined}
            className="relative flex items-center gap-3.5 rounded-[18px] bg-tile px-4 py-3.5 text-fg rise press [--rise:3] transition-[box-shadow] duration-[400ms] hover:no-underline hover:shadow-[var(--shadow-lift)]"
          >
            <span className="grid size-10 flex-none place-items-center rounded-full bg-well">
              <Icon name={t.icon} size={20} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-[13px] text-fg-2">{t.title}</span>
              <span className="text-[clamp(14px,3.8vw,15px)] font-semibold [overflow-wrap:anywhere]">
                {t.value}
              </span>
            </span>
            <span
              className={cn(
                "inline-flex h-8 min-w-8 flex-none items-center justify-center gap-1 rounded-full text-[12px] font-semibold transition-colors duration-300",
                isCopy ? "sm:px-2.5" : "px-0",
                on ? "bg-success text-white" : "bg-accent text-on-accent",
              )}
            >
              <Icon
                name={isCopy ? (on ? "check" : "copy") : "arrow-up-right"}
                size={16}
              />
              {/* On phones the icon alone, so the address fits on a line. */}
              {isCopy && (
                <span className="hidden sm:inline">
                  {on ? "Copied" : "Copy"}
                </span>
              )}
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
