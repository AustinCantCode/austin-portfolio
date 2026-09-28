"use client";

import { useRef } from "react";
import { events } from "@data/events";
import { home } from "@data/home";
import { Icon } from "@components/icon";
import { Kicker, TextLink } from "@components/ui";
import { ImageSlot } from "@components/media";

const pad = "max(clamp(16px,4.5vw,72px),calc((100vw - 1680px) / 2 + 72px))";

/** Chapter 5: horizontal scroll-snap carousel of events. */
export function EventsCarousel() {
  const { kicker, title, link } = home.events;
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (d: number) =>
    ref.current?.scrollBy({ left: d, behavior: "smooth" });

  return (
    <section aria-labelledby="events-title" className="band-y-2 bg-bg-alt">
      <div
        data-reveal=""
        className="wrap gutter mb-[clamp(24px,3vw,40px)] flex flex-wrap items-end justify-between gap-4"
      >
        <div className="flex flex-col gap-2">
          <Kicker>{kicker}</Kicker>
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
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pt-1 pb-2"
        style={{ paddingInline: pad, scrollPaddingInline: pad }}
      >
        {events.map((e) => (
          <article
            key={e.title}
            data-hover-card=""
            className="flex w-[clamp(280px,28vw,420px)] flex-none snap-start flex-col overflow-hidden rounded-[24px] bg-tile"
          >
            <div className="relative aspect-[4/3] bg-pill">
              <ImageSlot
                media={e.image}
                placeholder={`${e.title} photo`}
                sizes="(max-width: 768px) 80vw, 420px"
              />
            </div>
            <div className="flex flex-col gap-1 px-6 pt-5 pb-6">
              <p className="text-[13px] font-semibold text-fg-2">{e.date}</p>
              <p className="text-[19px] leading-[1.3] font-bold tracking-[-0.01em]">
                {e.title}
              </p>
              <p data-hover-detail="" className="text-[14px] text-fg-2">
                {e.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
