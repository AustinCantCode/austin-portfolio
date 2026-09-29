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
import { StatusPill, TextLink } from "@components/ui";
import { GooglePlayBadge } from "@components/play-badge";
import { ImageSlot, PhoneFrame } from "@components/media";
import { stillgoodScreens as screens } from "@data/stillgood-screens";
import { VenturesNav } from "@components/local-nav";
import { ShowroomCarousel } from "@components/client/showroom";
import { projectsInArea } from "@data/categories";
import { byYear } from "@data/projects";

const FEATURE_SCREENS = [screens.scan, screens.pantry, screens.recipeStudio];

export const metadata = pageMetadata({
  title: pageCopy.stillgood.title,
  description: pageCopy.stillgood.description,
  path: "/stillgood",
});

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
          <div className="mt-2 flex flex-wrap items-center justify-center gap-5">
            <GooglePlayBadge />
            <TextLink href="/projects/stillgood" className="text-band-link">
              Read the case study ›
            </TextLink>
          </div>
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

      <section aria-labelledby="sg-features" className="gutter band-y">
        <div className="wrap flex flex-col gap-[clamp(40px,6vw,80px)]">
          <h2
            id="sg-features"
            data-reveal=""
            className="text-[clamp(32px,4.2vw,52px)] leading-[1.02] font-bold tracking-[-0.03em]"
          >
            {sg.features.title}
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[clamp(20px,2.4vw,32px)]">
            {sg.features.items.map((f, i) => (
              <article
                key={f.title}
                data-reveal=""
                className="flex flex-col overflow-hidden rounded-[28px] bg-bg-alt"
              >
                <div className="flex flex-col gap-2 px-[clamp(24px,3vw,32px)] pt-[clamp(24px,3vw,32px)]">
                  <span className="grid size-11 place-items-center rounded-full bg-well-alt text-fg">
                    <Icon name={f.icon} size={22} />
                  </span>
                  <h3 className="mt-2 text-[clamp(22px,2.4vw,26px)] leading-[1.2] font-bold tracking-[-0.02em]">
                    {f.title}
                  </h3>
                  <p className="text-[17px] text-fg-2">{f.text}</p>
                </div>
                <div className="flex h-[280px] justify-center overflow-hidden pt-8">
                  <PhoneFrame size={210}>
                    <ImageSlot
                      media={FEATURE_SCREENS[i]}
                      placeholder={f.imageHint}
                      sizes="210px"
                    />
                  </PhoneFrame>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="sg-story" className="gutter band-y bg-bg-alt">
        <div className="wrap flex flex-col gap-[clamp(40px,6vw,80px)]">
          <h2 id="sg-story" data-reveal="" className="t-h2">
            {sg.story.title}
          </h2>
          <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-[clamp(20px,2.4vw,32px)] p-0">
            {sg.story.items.map((s) => (
              <li
                key={s.title}
                data-reveal=""
                className="flex flex-col gap-2 rounded-[24px] bg-tile p-7"
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
        title="More From My Ventures"
        href="/ventures"
        projects={byYear(
          projectsInArea("ventures").filter((p) => p.slug !== "stillgood"),
        )}
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
          <GooglePlayBadge className="mt-2" />
        </div>
      </section>
    </>
  );
}
