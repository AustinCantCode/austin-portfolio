import { stillgoodPage as sg } from "@data/stillgood";
import {
  JsonLd,
  graph,
  breadcrumbLd,
  stillgoodAppLd,
} from "@lib/structured-data";
import { pageMetadata } from "@lib/metadata";
import { pageCopy } from "@data/pages";
import { Icon } from "@components/icon";
import { ButtonLink, SmartLink, StatusPill, TextLink } from "@components/ui";
import { GooglePlayBadge } from "@components/play-badge";
import { ImageSlot, PhoneFrame } from "@components/media";
import { stillgoodScreens as screens } from "@data/stillgood-screens";
import { VenturesNav } from "@components/local-nav";
import { ShowroomCarousel } from "@components/client/showroom";
import { moreProjects } from "@data/categories";
import { projectBySlug } from "@data/projects";
import { cn } from "@lib/utils";
import { DemoVideo } from "./demo-video";

export const metadata = pageMetadata({
  title: pageCopy.stillgood.title,
  description: pageCopy.stillgood.description,
  path: "/stillgood",
});

// The StillGood case study's own carousel, so both pages end the same.
const stillgood = projectBySlug("stillgood");
const more = stillgood
  ? moreProjects(stillgood)
  : { title: "", href: "/ventures", projects: [] };

export default function StillGoodPage() {
  return (
    <>
      <JsonLd
        data={graph(
          stillgoodAppLd(),
          breadcrumbLd([
            { name: "Ventures", path: "/ventures" },
            { name: "StillGood", path: "/stillgood" },
          ]),
        )}
      />
      <VenturesNav current="/stillgood" />
      <section
        aria-labelledby="sg-hero"
        className="gutter flex flex-col items-center overflow-hidden bg-band pt-[clamp(56px,min(7vw,11vh),104px)] text-center text-band-fg"
      >
        <div className="flex max-w-[860px] flex-col items-center gap-5">
          <StatusPill tone="live">{sg.hero.status}</StatusPill>
          <h1
            id="sg-hero"
            className="text-[clamp(44px,6.5vw,80px)] leading-[.98] font-bold tracking-[-0.04em]"
          >
            {sg.hero.title}
          </h1>
          <p className="text-[clamp(22px,2.6vw,30px)] leading-[1.15] font-semibold tracking-[-0.02em]">
            {sg.hero.tagline}
          </p>
          <p className="max-w-[540px] text-[clamp(17px,2vw,21px)] text-balance text-band-fg-2">
            {sg.hero.line}
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-4">
            <GooglePlayBadge />
            {sg.hero.site && (
              <ButtonLink
                href={sg.hero.site.href}
                variant="secondary"
                iconAfter="arrow-up-right"
                className="bg-band-pill text-band-fg"
                data-track="stillgood_site_click"
              >
                {sg.hero.site.label}
              </ButtonLink>
            )}
          </div>
          <TextLink href="/projects/stillgood" className="text-band-link">
            Read the case study ›
          </TextLink>
        </div>
        <div className="mt-[clamp(56px,7vw,96px)] flex h-[clamp(280px,30vw,460px)] w-full max-w-[var(--container)] items-start justify-center gap-[clamp(12px,3vw,32px)] overflow-hidden">
          <div
            data-parallax="0.04"
            className="mt-[clamp(48px,7vw,120px)] w-[clamp(150px,22vw,260px)]"
          >
            <PhoneFrame size={260} width="100%" dark>
              <ImageSlot
                media={screens.householdPantry}
                placeholder="Pantry screen"
                tone="light"
                sizes="260px"
                priority
              />
            </PhoneFrame>
          </div>
          <div data-parallax="0.09" className="w-[clamp(180px,27vw,320px)]">
            <PhoneFrame size={320} width="100%" dark>
              <ImageSlot
                media={screens.home}
                placeholder="Home screen"
                tone="light"
                sizes="320px"
                priority
              />
            </PhoneFrame>
          </div>
          <div
            data-parallax="0.04"
            className="mt-[clamp(48px,7vw,120px)] w-[clamp(150px,22vw,260px)]"
          >
            <PhoneFrame size={260} width="100%" dark>
              <ImageSlot
                media={screens.recipes}
                placeholder="Recipes screen"
                tone="light"
                sizes="260px"
                priority
              />
            </PhoneFrame>
          </div>
        </div>
      </section>

      <section aria-labelledby="sg-problem" className="gutter band-y">
        <div className="wrap flex flex-col gap-[clamp(32px,5vw,64px)]">
          <div data-reveal="" className="flex max-w-[760px] flex-col gap-4">
            <h2 id="sg-problem" className="t-h2">
              {sg.problem.title}
            </h2>
            <p className="text-[clamp(17px,1.6vw,19px)] text-fg-2">
              {sg.problem.text}
            </p>
          </div>
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-[clamp(16px,2vw,24px)] p-0">
            {sg.problem.stats.map((st) => (
              <li
                key={st.value}
                data-reveal=""
                className="flex flex-col gap-2 rounded-[24px] bg-bg-alt p-[clamp(24px,3vw,32px)]"
              >
                <p className="flex flex-wrap items-baseline gap-x-2.5">
                  <span className="font-display text-[clamp(44px,5vw,60px)] leading-none font-bold tracking-[-0.03em]">
                    {st.value}
                  </span>
                  <span className="text-[13px] font-semibold tracking-[0.06em] text-accent-text uppercase">
                    {st.unit}
                  </span>
                </p>
                <p className="text-[17px] text-fg-2">{st.label}</p>
                {st.source && (
                  <p className="mt-auto pt-2 text-[13px] text-fg-2">
                    Source:{" "}
                    {st.href ? (
                      <SmartLink
                        href={st.href}
                        className="text-fg underline-offset-2 hover:underline"
                      >
                        {st.source}
                      </SmartLink>
                    ) : (
                      st.source
                    )}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {sg.demo.video && (
        <section
          aria-labelledby="sg-demo"
          className="gutter band-y overflow-hidden bg-band text-band-fg"
        >
          <div className="wrap flex flex-wrap items-center justify-center gap-x-[clamp(40px,8vw,120px)] gap-y-12">
            <div
              data-reveal=""
              className="flex max-w-[520px] min-w-0 flex-[1_1_380px] flex-col gap-5"
            >
              <h2
                id="sg-demo"
                className="text-[clamp(34px,4.4vw,56px)] leading-[1.02] font-bold tracking-[-0.03em]"
              >
                {sg.demo.title}
              </h2>
              <p className="text-[clamp(17px,1.6vw,19px)] text-band-fg-2">
                {sg.demo.text}
              </p>
              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                {sg.demo.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-[16px]">
                    <span className="mt-0.5 grid size-6 flex-none place-items-center rounded-full bg-band-pill text-band-link">
                      <Icon name="check" size={14} />
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal="" className="flex flex-none justify-center">
              <DemoVideo
                src={sg.demo.video}
                poster={sg.demo.poster}
                label={sg.demo.alt}
                className="w-[clamp(220px,24vw,300px)]"
              />
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="sg-features" className="gutter band-y">
        <div className="wrap flex flex-col gap-[clamp(40px,6vw,80px)]">
          <h2 id="sg-features" data-reveal="" className="t-h2 max-w-[760px]">
            {sg.features.title}
          </h2>
          <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-[clamp(16px,2vw,24px)] p-0">
            {sg.features.items.map((f, i) => (
              <li
                key={f.title}
                data-reveal=""
                className="flex flex-col overflow-hidden rounded-[28px] bg-bg-alt"
              >
                <div className="flex flex-col gap-2 px-[clamp(22px,2.6vw,28px)] pt-[clamp(22px,2.6vw,28px)]">
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-full bg-well-alt text-fg">
                      <Icon name={f.icon} size={22} />
                    </span>
                    <span className="text-[13px] font-semibold text-accent-text tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-2 text-[clamp(21px,2.2vw,24px)] leading-[1.2] font-bold tracking-[-0.02em]">
                    {f.title}
                  </h3>
                  <p className="text-[16px] text-fg-2">{f.text}</p>
                </div>
                <div className="mt-auto flex h-[280px] justify-center overflow-hidden pt-8">
                  <PhoneFrame size={210}>
                    <ImageSlot
                      media={screens[f.screen]}
                      placeholder={`${f.title} screen`}
                      sizes="210px"
                    />
                  </PhoneFrame>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="sg-plans" className="gutter band-y bg-bg-alt">
        <div className="wrap flex flex-col gap-[clamp(32px,5vw,64px)]">
          <h2 id="sg-plans" data-reveal="" className="t-h2">
            {sg.plans.title}
          </h2>
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-[clamp(16px,2vw,24px)] p-0">
            {sg.plans.items.map((pl) => (
              <li
                key={pl.name}
                data-reveal=""
                className={cn(
                  "relative flex flex-col gap-4 rounded-[28px] bg-tile p-[clamp(24px,3vw,32px)]",
                  pl.popular && "ring-2 ring-accent",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[15px] font-semibold">{pl.name}</p>
                  {pl.popular && (
                    <span className="rounded-full bg-accent px-3 py-1 text-[12px] font-semibold text-on-accent">
                      Most popular
                    </span>
                  )}
                </div>
                <p className="flex items-baseline gap-1">
                  <span className="font-display text-[clamp(38px,4vw,48px)] leading-none font-bold tracking-[-0.03em]">
                    {pl.price}
                  </span>
                  {pl.period && (
                    <span className="text-[15px] text-fg-2">{pl.period}</span>
                  )}
                </p>
                <p className="text-[16px] text-fg-2">{pl.line}</p>
                <ul className="m-0 flex list-none flex-col gap-2.5 border-t border-pill p-0 pt-4">
                  {pl.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-start gap-2.5 text-[15px]"
                    >
                      <Icon
                        name="check"
                        size={16}
                        className="mt-[3px] flex-none text-accent-text"
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          {sg.plans.note && (
            <p data-reveal="" className="max-w-[640px] text-[15px] text-fg-2">
              {sg.plans.note}
            </p>
          )}
        </div>
      </section>

      <section aria-labelledby="sg-story" className="gutter band-y">
        <div className="wrap flex flex-col gap-[clamp(40px,6vw,80px)]">
          <h2 id="sg-story" data-reveal="" className="t-h2">
            {sg.story.title}
          </h2>
          <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-[clamp(20px,2.4vw,32px)] p-0">
            {sg.story.items.map((s) => (
              <li
                key={s.title}
                data-reveal=""
                className="flex flex-col gap-2 rounded-[24px] bg-bg-alt p-7"
              >
                <p className="text-[14px] font-semibold text-accent-text">
                  {s.date}
                </p>
                <p className="font-display text-[21px] leading-[1.25] font-bold tracking-[-0.015em]">
                  {s.title}
                </p>
                <p className="text-[15px] text-fg-2">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="sg-built" className="gutter band-y">
        <div
          data-reveal=""
          className="wrap flex flex-wrap gap-x-[clamp(28px,6vw,88px)] gap-y-4"
        >
          <div className="flex max-w-[560px] flex-[1_1_420px] flex-col gap-4">
            <h2
              id="sg-built"
              className="text-[clamp(26px,3vw,36px)] leading-[1.1] font-bold tracking-[-0.025em]"
            >
              {sg.builtWith.title}
            </h2>
            <p className="max-w-[420px] text-[17px] text-fg-2">
              {sg.builtWith.text}
            </p>
            <TextLink href="/projects/stillgood">How I used AI ›</TextLink>
          </div>
          <ul className="m-0 flex min-w-0 flex-[2_1_420px] list-none flex-wrap content-start gap-2 p-0">
            {sg.builtWith.stack.map((s) => (
              <li
                key={s}
                className="rounded-full bg-bg-alt px-4 py-2 text-[15px] font-medium"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ShowroomCarousel
        title={more.title}
        href={more.href}
        projects={more.projects}
      />

      <section
        aria-labelledby="sg-cta"
        className="gutter band-y-2 bg-band text-band-fg"
      >
        <div
          data-reveal=""
          className="mx-auto flex max-w-[720px] flex-col items-center gap-5 text-center"
        >
          <h2
            id="sg-cta"
            className="text-[clamp(32px,4.2vw,52px)] leading-[1.05] font-bold tracking-[-0.03em]"
          >
            {sg.cta.title}
          </h2>
          <p className="text-[clamp(17px,2vw,21px)] text-band-fg-2">
            {sg.cta.line}
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-4">
            <GooglePlayBadge />
            {sg.hero.site && (
              <ButtonLink
                href={sg.hero.site.href}
                variant="secondary"
                iconAfter="arrow-up-right"
                className="bg-band-pill text-band-fg"
                data-track="stillgood_site_click"
              >
                {sg.hero.site.label}
              </ButtonLink>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
