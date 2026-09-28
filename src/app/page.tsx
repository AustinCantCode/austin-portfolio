import Coin from "@components/complex-ui/coin";
import {
  ButtonLink,
  Kicker,
  SectionHeader,
  StatusPill,
  TextLink,
} from "@components/ui";
import { GooglePlayBadge, ProjectTile } from "@components/tiles";
import { ImageSlot, PhoneFrame } from "@components/media";
import { home } from "@data/home";
import { site } from "@data/site";
import { pickProjects } from "@data/projects";
import { stillgoodScreens } from "@data/stillgood-screens";
import { pageMetadata } from "@lib/metadata";
import { Journey } from "./_home/journey";
import { WhatIDo } from "./_home/what-i-do";
import { ToolsMarquee } from "./_home/marquee";
import { EventsCarousel } from "./_home/events-carousel";
import { Numbers } from "./_home/numbers";
import { ContactTiles } from "./_home/contact-tiles";

export const metadata = pageMetadata({
  title: "Austin Sia",
  description:
    "Full-stack developer, designer and founder of StillGood. See the websites, apps and designs I've built, and get in touch.",
  path: "/",
});

export default function HomePage() {
  const selected = pickProjects(home.selectedWork.projects);

  return (
    <>
      {/* Hero */}
      <section className="gutter pt-[clamp(40px,8vw,120px)] pb-[clamp(64px,10vw,140px)]">
        <div className="wrap flex flex-wrap-reverse items-center gap-[clamp(24px,5vw,64px)]">
          <div className="flex min-w-0 flex-[1_1_440px] flex-col items-start gap-6">
            <a href="#stillgood" className="hover:no-underline">
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
          <div className="mx-auto min-w-0 flex-[0_1_600px]">
            <Coin className="mx-auto w-[clamp(240px,36vw,600px)] max-w-full" />
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
            kicker={home.selectedWork.kicker}
            title={home.selectedWork.title}
            link={home.selectedWork.link}
          />
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-[clamp(16px,2vw,24px)]">
            {selected.map((p) => (
              <ProjectTile key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      <EventsCarousel />
      <Numbers />

      {/* StillGood band */}
      <section
        id="stillgood"
        aria-labelledby="sg-title"
        className="gutter band-y overflow-hidden bg-band text-band-fg"
      >
        <div className="wrap flex flex-wrap items-center gap-[clamp(48px,6vw,80px)]">
          <div
            data-reveal=""
            className="flex min-w-0 flex-[1_1_400px] flex-col items-start gap-5"
          >
            <p className="text-[17px] font-semibold text-band-fg-2">
              {home.stillgood.kicker}
            </p>
            <h2
              id="sg-title"
              className="text-[clamp(36px,5.5vw,60px)] leading-[1.05] font-bold tracking-[-0.025em]"
            >
              Less waste.
              <br />
              Smarter pantry.
            </h2>
            <p className="max-w-[440px] text-[clamp(19px,2vw,21px)] text-band-fg-2">
              {home.stillgood.line}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-5">
              <GooglePlayBadge />
              <TextLink
                href={home.stillgood.caseStudy}
                className="text-band-link"
              >
                Read the case study ›
              </TextLink>
            </div>
          </div>
          <div className="flex min-w-0 flex-[1_1_320px] justify-center">
            <div data-parallax="0.06" className="w-[min(100%,300px)]">
              <PhoneFrame size={300} width="100%" dark>
                <ImageSlot
                  media={stillgoodScreens.home}
                  placeholder="StillGood app screenshot"
                  tone="light"
                  sizes="300px"
                />
              </PhoneFrame>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        aria-labelledby="contact-title"
        className="gutter band-y bg-bg-alt"
      >
        <div data-reveal="" className="wrap flex flex-col gap-4">
          <Kicker>{home.contact.kicker}</Kicker>
          <h2
            id="contact-title"
            className="text-[clamp(40px,7vw,96px)] leading-none font-bold tracking-[-0.035em]"
          >
            Let&apos;s build
            <br />
            something.
          </h2>
          <p className="max-w-[520px] text-[clamp(19px,2vw,21px)] text-fg-2">
            {home.contact.line}
          </p>
        </div>
        <ContactTiles />
      </section>
    </>
  );
}
