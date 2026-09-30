import { SectionHeader } from "@components/ui";
import { home } from "@data/home";
import { pickProjects } from "@data/projects";
import { JsonLd, graph, webPageLd } from "@lib/structured-data";
import { pageMetadata } from "@lib/metadata";
import { pageCopy } from "@data/pages";
import { Hero } from "./_home/hero";
import { SelectedWork } from "./_home/selected-work";
import { Journey } from "./_home/journey";
import { WhatIDo } from "./_home/what-i-do";
import { ToolsMarquee } from "./_home/marquee";
import { allSkills } from "@data/skills";
import { skillIcons } from "@data/skill-icons";
import { EventsCarousel } from "./_home/events-carousel";
import { Numbers } from "./_home/numbers";
import { ContactTiles } from "./_home/contact-tiles";
import { KindWords } from "./_home/kind-words";
import { Clients } from "./_home/clients";
import { Recognition } from "./_home/recognition";
import { testimonials } from "@data/testimonials";
import { featuredCertificates } from "@data/certificates";

export const metadata = pageMetadata({
  title: pageCopy.home.title,
  description: pageCopy.home.description,
  path: "/",
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
              "The portfolio of Austin Sia, a Full-stack Software Developer and UI/UX Designer in Singapore.",
          }),
        )}
      />
      <Hero />

      <Journey />
      <WhatIDo />
      <ToolsMarquee icons={skillIcons(allSkills)} />

      {/* Selected work */}
      <section aria-labelledby="work-title" className="gutter band-y">
        <div className="wrap flex flex-col gap-[clamp(40px,5vw,72px)]">
          <SectionHeader
            id="work-title"
            title={home.selectedWork.title}
            link={home.selectedWork.link}
          />
          <SelectedWork projects={selected} />
          <Clients title={home.clients.title} items={home.clients.items} />
        </div>
      </section>

      {testimonials.length > 0 && (
        <KindWords
          items={testimonials}
          title={home.kindWords.title}
          sub={home.kindWords.sub}
        />
      )}
      <EventsCarousel />
      <Recognition
        title={home.recognition.title}
        sub={home.recognition.sub}
        link={home.recognition.link}
        items={featuredCertificates}
      />
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
            {home.contact.title}
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
