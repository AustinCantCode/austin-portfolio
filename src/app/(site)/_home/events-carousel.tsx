"use client";

import { useRef } from "react";
import { events } from "@data/events";
import { home } from "@data/home";
import { Icon } from "@components/icon";
import { TextLink } from "@components/ui";
import { EventPhoto } from "@components/event-photo";

// Line the first card up with the page container.
const pad = "max(var(--gutter), calc((100% - var(--container)) / 2))";

/** Chapter 5: horizontal scroll-snap carousel of events. */
export function EventsCarousel() {
  const { title, link } = home.events;
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (d: number) =>
    ref.current?.scrollBy({ left: d, behavior: "smooth" });

  return (
    <section aria-labelledby="events-title" className="band-y-2 bg-bg-alt">
      <div
        data-reveal=""
        className="wrap gutter mb-[clamp(36px,4.4vw,64px)] flex flex-wrap items-end justify-between gap-4"
      >
        <div className="flex flex-col gap-4">
          <h2 id="events-title" className="t-h2">
            {title}
          </h2>
          <TextLink href={link.href}>{link.label}</TextLink>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scroll(-440)}
            aria-label="Scroll events back"
            className="grid size-11 place-items-center rounded-full bg-tile text-fg transition-colors duration-200 hover:bg-pill"
          >
            <Icon name="chevron-left" size={20} />
          </button>
          <button
            type="button"
            onClick={() => scroll(440)}
            aria-label="Scroll events forward"
            className="grid size-11 place-items-center rounded-full bg-tile text-fg transition-colors duration-200 hover:bg-pill"
          >
            <Icon name="chevron-right" size={20} />
          </button>
        </div>
      </div>
      <div
        ref={ref}
        tabIndex={0}
        role="region"
        aria-label="Events"
        className="no-scrollbar flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto pt-1 pb-2"
        style={{ paddingInline: pad, scrollPaddingInline: pad }}
      >
        {events.map((e) => (
          <article
            key={e.title}
            data-hover-card=""
            className="flex w-[clamp(280px,28vw,420px)] flex-none snap-start flex-col overflow-hidden rounded-[24px] bg-tile"
          >
            <EventPhoto
              media={e.image}
              title={e.title}
              sizes="(max-width: 768px) 80vw, 420px"
            />
            {/* Every card's text takes the same room: one line of date,
                two of title and three of text, with longer text cut off
                with an ellipsis. */}
            <div className="flex flex-col gap-1 px-6 pt-5 pb-6">
              <p className="truncate text-[13px] font-semibold text-fg-2">
                {e.date}
              </p>
              <p className="font-display line-clamp-2 h-[2.6em] text-[19px] leading-[1.3] font-bold tracking-[-0.01em]">
                {e.title}
              </p>
              <p
                data-hover-detail=""
                title={e.text}
                className="line-clamp-3 h-[4.5em] text-[14px] leading-[1.5] text-fg-2"
              >
                {e.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
