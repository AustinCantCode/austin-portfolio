import { events, FEATURED_EVENT_INDEX } from "@data/events";
import { JsonLd, graph, breadcrumbLd } from "@lib/structured-data";
import { pageMetadata } from "@lib/metadata";
import { pageCopy } from "@data/pages";
import { PageHeader, TextLink } from "@components/ui";
import { NaturalImage } from "@components/media";
import { AboutNav } from "@components/local-nav";

export const metadata = pageMetadata({
  title: pageCopy.events.title,
  description: pageCopy.events.description,
  path: "/about/events",
});

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
        sub="The hackathons, study trips and volunteering events I have taken part in."
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
            <TextLink href="/stillgood" className="mt-2 text-band-link">
              See what it became ›
            </TextLink>
          </div>
        </article>
      </section>
      <section className="gutter pb-[clamp(72px,min(9vw,13vh),136px)]">
        {/* Masonry columns so every photo keeps its own shape. */}
        <div className="wrap columns-[320px] gap-[clamp(20px,2.4vw,32px)]">
          {rest.map((e) => (
            <article
              key={e.title}
              data-reveal=""
              data-hover-card=""
              className="mb-[clamp(16px,2vw,24px)] flex break-inside-avoid flex-col overflow-hidden rounded-[24px] bg-bg-alt"
            >
              <NaturalImage
                media={e.image}
                placeholder={`${e.title} photo`}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="bg-pill"
              />
              <div className="flex flex-col gap-1.5 px-6 pt-5 pb-[26px]">
                <p className="text-[13px] font-semibold text-fg-2">{e.date}</p>
                <h3 className="text-[21px] leading-[1.25] font-bold tracking-[-0.015em]">
                  {e.title}
                </h3>
                <p className="text-[14px] font-medium text-fg">{e.role}</p>
                <p data-hover-detail="" className="text-[15px] text-fg-2">
                  {e.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
