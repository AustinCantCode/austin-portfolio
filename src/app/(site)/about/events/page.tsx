import { events, FEATURED_EVENT_INDEX } from "@data/events";
import { JsonLd, graph, breadcrumbLd } from "@lib/structured-data";
import { pageMetadata } from "@lib/metadata";
import { pageCopy } from "@data/pages";
import { PageHeader, TextLink } from "@components/ui";
import Image from "next/image";
import { ImageSlot, NaturalImage } from "@components/media";
import { AboutNav, AboutPager } from "@components/local-nav";
import type { EventItem, GalleryItem, Media } from "@data/types";
import { GalleryButton } from "./gallery-button";

export const metadata = pageMetadata({
  title: pageCopy.events.title,
  description: pageCopy.events.description,
  path: "/about/events",
});

/** The card's photo first, then the rest, for the full-screen viewer. */
const allPhotos = (e: EventItem): GalleryItem[] =>
  e.gallery.length
    ? [...(e.image ? [{ media: e.image }] : []), ...e.gallery]
    : [];

const PHOTO_RATIO = 4 / 3;

/**
 * An event card's photo in a frame of one shape, so every card lines up.
 * The photo is never cropped: one of another shape sits whole in the
 * frame, over a blurred copy of itself.
 */
function EventPhoto({ media, title }: { media?: Media; title: string }) {
  const sizes = "(max-width: 768px) 100vw, 33vw";
  const odd =
    media &&
    Math.abs(media.src.width / media.src.height / PHOTO_RATIO - 1) > 0.02;
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-pill">
      {odd && (
        <Image
          src={media.src}
          alt=""
          aria-hidden="true"
          fill
          quality={100}
          sizes={sizes}
          className="scale-110 object-cover opacity-70 blur-2xl"
        />
      )}
      <ImageSlot
        media={media ? { ...media, fit: "contain" } : undefined}
        placeholder={`${title} photo`}
        sizes={sizes}
      />
    </div>
  );
}

export default function EventsPage() {
  const featured = events[FEATURED_EVENT_INDEX];
  const rest = events.filter((_, i) => i !== FEATURED_EVENT_INDEX);
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbLd([
            { name: "About", path: "/about" },
            { name: "Events", path: "/about/events" },
          ]),
        )}
      />
      <AboutNav current="/about/events" />
      <PageHeader
        title={pageCopy.events.heading}
        sub={pageCopy.events.intro}
        className="pb-[clamp(48px,6vw,88px)]"
      />
      <section className="gutter pb-[clamp(16px,2vw,24px)]">
        <article
          data-reveal=""
          className="wrap flex flex-wrap items-center overflow-hidden rounded-[28px] bg-band text-band-fg"
        >
          <div className="min-w-0 flex-[1.3_1_420px] bg-band-pill">
            <NaturalImage
              media={featured.image}
              placeholder={`${featured.title} photo`}
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
          </div>
          <div className="flex min-w-0 flex-[1_1_320px] flex-col justify-center gap-2.5 p-[clamp(32px,5.5vw,72px)]">
            <p className="text-[13px] font-semibold text-band-fg-2">
              {featured.date}, {featured.role}
            </p>
            <h2 className="text-[clamp(26px,3.2vw,38px)] leading-[1.08] font-bold tracking-[-0.025em]">
              {featured.title}
            </h2>
            <p className="text-[17px] text-band-fg-2">{featured.text}</p>
            {featured.gallery.length > 0 && (
              <GalleryButton
                title={featured.title}
                items={allPhotos(featured)}
                className="mt-2 bg-band-pill text-band-fg"
              />
            )}
            {featured.link && (
              <TextLink
                href={featured.link.href}
                className="mt-2 text-band-link"
              >
                {featured.link.label} ›
              </TextLink>
            )}
          </div>
        </article>
      </section>
      <section className="gutter pb-[clamp(72px,min(9vw,13vh),136px)]">
        {/* Equal rows: every card is as tall as the tallest one. */}
        <div className="wrap grid auto-rows-fr grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-x-[clamp(20px,2.4vw,32px)] gap-y-[clamp(16px,2vw,24px)]">
          {rest.map((e) => (
            <article
              key={e.title}
              data-reveal=""
              data-hover-card=""
              className="flex flex-col overflow-hidden rounded-[24px] bg-bg-alt"
            >
              <EventPhoto media={e.image} title={e.title} />
              <div className="flex flex-1 flex-col gap-1.5 px-6 pt-5 pb-[26px]">
                <p className="text-[13px] font-semibold text-fg-2">{e.date}</p>
                <h3 className="text-[21px] leading-[1.25] font-bold tracking-[-0.015em]">
                  {e.title}
                </h3>
                <p className="text-[14px] font-medium text-fg">{e.role}</p>
                <p data-hover-detail="" className="text-[15px] text-fg-2">
                  {e.text}
                </p>
                {(e.gallery.length > 0 || e.link) && (
                  <div className="mt-auto flex flex-col items-start gap-1 pt-2">
                    {e.gallery.length > 0 && (
                      <GalleryButton
                        title={e.title}
                        items={allPhotos(e)}
                        className="bg-pill text-fg"
                      />
                    )}
                    {e.link && (
                      <TextLink href={e.link.href} className="text-[15px]">
                        {e.link.label} ›
                      </TextLink>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      <AboutPager current="/about/events" />
    </>
  );
}
