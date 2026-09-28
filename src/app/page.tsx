import { SectionHeader } from "@components/ui";
import { ProjectTile } from "@components/tiles";
import { home } from "@data/home";
import { pickProjects } from "@data/projects";
import { JsonLd, graph, webPageLd } from "@lib/structured-data";
import { pageMetadata } from "@lib/metadata";
import { Hero } from "./_home/hero";
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
      <Hero />

      <Journey />
      <WhatIDo />
      <ToolsMarquee />

      {/* Selected work */}
      <section aria-labelledby="work-title" className="gutter band-y">
        <div className="wrap flex flex-col gap-[clamp(40px,5vw,72px)]">
          <SectionHeader
            id="work-title"
            title={home.selectedWork.title}
            link={home.selectedWork.link}
          />
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,max(300px,calc((100%_-_48px)/3))),1fr))] gap-[clamp(20px,2.4vw,32px)]">
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
