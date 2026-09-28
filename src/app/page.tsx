import Coin from "@components/complex-ui/coin";
import { ButtonLink, SectionHeader, StatusPill } from "@components/ui";
import { ProjectTile } from "@components/tiles";
import { home } from "@data/home";
import { site } from "@data/site";
import { pickProjects } from "@data/projects";
import { JsonLd, graph, webPageLd } from "@lib/structured-data";
import { pageMetadata } from "@lib/metadata";
import { Journey } from "./_home/journey";
import { WhatIDo } from "./_home/what-i-do";
import { ToolsMarquee } from "./_home/marquee";
import { EventsCarousel } from "./_home/events-carousel";
import { Numbers } from "./_home/numbers";
import { ContactTiles } from "./_home/contact-tiles";

export const metadata = pageMetadata({
  title: "Austin Sia – Full-Stack Developer & Designer in Singapore",
  description:
    "Portfolio of Austin Sia, a full-stack developer and UI/UX designer in Singapore: client platforms for ITE, KiasuParents and IAL, mobile apps and design work.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  const selected = pickProjects(home.selectedWork.projects);

  return (
    <>
      <JsonLd
        data={graph(
          webPageLd({
            path: "/",
            name: "Austin Sia",
            description:
              "Portfolio of Austin Sia, full-stack developer and UI/UX designer in Singapore.",
          }),
        )}
      />
      {/* Hero */}
      <section className="gutter pt-[clamp(32px,min(6vw,9vh),88px)] pb-[clamp(56px,min(8vw,12vh),104px)]">
        <div className="wrap flex flex-wrap-reverse items-center gap-[clamp(24px,5vw,64px)]">
          <div className="flex min-w-0 flex-[1_1_440px] flex-col items-start gap-6">
            <a href="/contact" className="hover:no-underline">
              <StatusPill>{site.heroLabel}</StatusPill>
            </a>
            <h1 className="t-h1">{site.heroHeadline}</h1>
            <p className="t-sub max-w-[520px]">{site.heroLine}</p>
            <div className="mt-2 flex w-full flex-wrap gap-3">
              <ButtonLink href="/work" data-track="view_work_click">
                View work
              </ButtonLink>
              <ButtonLink
                href={site.contact.cvPdf}
                variant="secondary"
                icon="arrow-down-to-line"
                target="_blank"
                data-track="cv_download"
              >
                Download CV
              </ButtonLink>
            </div>
          </div>
          <div className="mx-auto min-w-0 flex-[0_1_420px]">
            <Coin className="mx-auto w-[clamp(220px,28vw,400px)] max-w-full" />
          </div>
        </div>
      </section>

      <Journey />
      <WhatIDo />
      <ToolsMarquee />

      {/* Selected work */}
      <section aria-labelledby="work-title" className="gutter band-y">
        <div className="wrap flex flex-col gap-[clamp(32px,4vw,56px)]">
          <SectionHeader
            id="work-title"
            title={home.selectedWork.title}
            link={home.selectedWork.link}
          />
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,max(300px,calc((100%_-_48px)/3))),1fr))] gap-[clamp(16px,2vw,24px)]">
            {selected.map((p) => (
              <ProjectTile key={p.slug} project={p} devices />
            ))}
          </div>
        </div>
      </section>

      <EventsCarousel />
      <Numbers />

      {/* Contact */}
      <section
        aria-labelledby="contact-title"
        className="gutter band-y bg-bg-alt"
      >
        <div data-reveal="" className="wrap flex flex-col gap-4">
          <h2
            id="contact-title"
            className="text-[clamp(38px,5.5vw,72px)] leading-none font-bold tracking-[-0.035em]"
          >
            Let&apos;s build
            <br />
            something.
          </h2>
          <p className="max-w-[520px] text-[clamp(17px,1.6vw,19px)] text-fg-2">
            {home.contact.line}
          </p>
        </div>
        <ContactTiles />
      </section>
    </>
  );
}
