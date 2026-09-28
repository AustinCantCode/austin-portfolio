import { events, FEATURED_EVENT_INDEX } from "@data/events";
import { pageMetadata } from "@lib/metadata";
import { PageHeader, TextLink } from "@components/ui";
import { ImageSlot } from "@components/media";

export const metadata = pageMetadata({
  title: "Events",
  description:
    "Hackathons, trips and volunteering: the events Austin Sia has taken part in.",
  path: "/about/events",
});

export default function EventsPage() {
  const featured = events[FEATURED_EVENT_INDEX];
  const rest = events.filter((_, i) => i !== FEATURED_EVENT_INDEX);
  return (
    <>
      <PageHeader
        back={{ label: "About", href: "/about" }}
        title="Out and about."
        sub="Hackathons, trips and volunteering."
        className="pb-[clamp(40px,5vw,64px)]"
      />
      <section className="gutter pb-[clamp(16px,2vw,24px)]">
        <article
          data-reveal=""
          className="wrap flex flex-wrap items-stretch overflow-hidden rounded-[28px] bg-band text-band-fg"
        >
          <div className="relative min-h-[clamp(280px,36vw,440px)] min-w-0 flex-[1.3_1_420px] bg-band-pill">
            <ImageSlot
              media={featured.image}
              placeholder={`${featured.title} photo`}
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
          </div>
          <div className="flex min-w-0 flex-[1_1_320px] flex-col justify-center gap-2.5 p-[clamp(28px,5vw,56px)]">
            <p className="text-[13px] font-semibold text-band-fg-2">
              {featured.date} · {featured.role}
            </p>
            <h2 className="text-[clamp(28px,4vw,44px)] leading-[1.08] font-bold tracking-[-0.025em]">
              {featured.title}
            </h2>
            <p className="text-[17px] text-band-fg-2">{featured.text}</p>
            <TextLink href="/stillgood" className="mt-2 text-band-link">
              See what it became ›
            </TextLink>
          </div>
        </article>
      </section>
      <section className="gutter pb-[clamp(64px,10vw,128px)]">
        <div className="wrap grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-[clamp(16px,2vw,24px)]">
          {rest.map((e) => (
            <article
              key={e.title}
              data-reveal=""
              data-hover-card=""
              className="flex flex-col overflow-hidden rounded-[24px] bg-bg-alt"
            >
              <div className="relative aspect-[4/3] bg-pill">
                <ImageSlot
                  media={e.image}
                  placeholder={`${e.title} photo`}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
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
