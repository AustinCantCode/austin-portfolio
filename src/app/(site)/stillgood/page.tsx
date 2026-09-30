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
import { SmartLink } from "@components/ui";
import { ImageSlot, PhoneFrame } from "@components/media";
import {
  stillgoodScreens as screens,
  type StillgoodScreen,
} from "@data/stillgood-screens";
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

/**
 * The app's own light sage, from its colour palette. The screens sit on it
 * in both themes, so they read as the app rather than as page decoration.
 */
const STAGE = "bg-[#b1cccc]";

function Screen({
  name,
  size = 240,
  width,
  priority,
}: {
  name: StillgoodScreen;
  size?: 210 | 240 | 260 | 300;
  width?: string;
  priority?: boolean;
}) {
  return (
    <PhoneFrame size={size} width={width}>
      <ImageSlot
        media={screens[name]}
        placeholder={`${name} screen`}
        tone="light"
        sizes={`${size}px`}
        priority={priority}
      />
    </PhoneFrame>
  );
}

// The screen reel under the title: the middle phone largest, the others
// stepping down and back. On phones only the middle three are shown.
const REEL = [
  {
    w: "w-[clamp(120px,15vw,210px)]",
    mt: "mt-[clamp(48px,7vw,112px)]",
    hide: true,
    size: 210,
  },
  {
    w: "w-[clamp(130px,17vw,240px)]",
    mt: "mt-[clamp(24px,3.5vw,56px)]",
    hide: false,
    size: 240,
  },
  { w: "w-[clamp(150px,20vw,300px)]", mt: "mt-0", hide: false, size: 300 },
  {
    w: "w-[clamp(130px,17vw,240px)]",
    mt: "mt-[clamp(24px,3.5vw,56px)]",
    hide: false,
    size: 240,
  },
  {
    w: "w-[clamp(120px,15vw,210px)]",
    mt: "mt-[clamp(48px,7vw,112px)]",
    hide: true,
    size: 210,
  },
] as const;

function Checks({ items }: { items: string[] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
      {items.map((pt) => (
        <li key={pt} className="flex items-start gap-2.5 text-[16px]">
          <Icon
            name="check"
            size={16}
            className="mt-[4px] flex-none text-accent-text"
          />
          {pt}
        </li>
      ))}
    </ul>
  );
}

export default function StillGoodPage() {
  const { hero, demo, features, tiers, builtWith } = sg;
  const reel = hero.reel.slice(0, REEL.length);
  // Centre the reel on the middle slot however many screens there are.
  const offset = Math.floor((REEL.length - reel.length) / 2);
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

      <section className="gutter pt-[clamp(44px,min(7vw,10vh),100px)]">
        <div className="wrap flex flex-col gap-[clamp(40px,5vw,72px)]">
          <div className="flex flex-col gap-3">
            <p className="text-[14px] font-medium text-fg-2">{hero.meta}</p>
            <h1 className="t-h1">{hero.title}</h1>
            <p className="t-sub max-w-[640px]">{hero.line}</p>
          </div>

          {reel.length > 0 && (
            <div
              className={cn(
                "flex h-[clamp(280px,40vw,560px)] items-start justify-center gap-[clamp(10px,1.8vw,28px)] overflow-hidden rounded-[32px] px-4 pt-[clamp(32px,4.5vw,64px)]",
                STAGE,
              )}
            >
              {reel.map((name, i) => {
                const slot = REEL[i + offset];
                return (
                  <div
                    key={`${name}-${i}`}
                    className={cn(
                      "flex-none",
                      slot.w,
                      slot.mt,
                      slot.hide && "hidden sm:block",
                    )}
                  >
                    <Screen
                      name={name}
                      size={slot.size}
                      width="100%"
                      priority={i + offset === 2}
                    />
                  </div>
                );
              })}
            </div>
          )}

          <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-x-[clamp(24px,3vw,40px)] gap-y-6 border-t border-hairline pt-[clamp(20px,2.4vw,32px)]">
            <div className="flex flex-col gap-1">
              <dt className="text-[13px] text-fg-2">Role</dt>
              <dd className="m-0 text-[16px] font-semibold">{hero.role}</dd>
            </div>
            {hero.links.length > 0 && (
              <div className="flex flex-col gap-1">
                <dt className="text-[13px] text-fg-2">Links</dt>
                <dd className="m-0 flex flex-col gap-1 text-[16px] font-semibold">
                  {hero.links.map((l) => (
                    <SmartLink
                      key={l.href}
                      href={l.href}
                      className="inline-flex w-max items-center gap-1.5 text-accent-text"
                    >
                      {l.label}
                      <Icon
                        name={
                          /^https?:/.test(l.href)
                            ? "arrow-up-right"
                            : "arrow-right"
                        }
                        size={15}
                      />
                    </SmartLink>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      <section aria-labelledby="sg-how" className="gutter band-y">
        <div className="wrap flex flex-col gap-[clamp(40px,6vw,88px)]">
          <h2 id="sg-how" className="t-h2">
            {features.title}
          </h2>
          <ol className="m-0 flex list-none flex-col gap-[clamp(48px,7vw,104px)] p-0">
            {features.items.map((f, i) => (
              <li
                key={f.title}
                className="grid items-center gap-x-[clamp(32px,6vw,96px)] gap-y-8 md:grid-cols-2"
              >
                <div
                  className={cn(
                    "flex justify-center rounded-[32px] px-6 py-[clamp(32px,4vw,56px)]",
                    STAGE,
                    i % 2 === 1 && "md:order-2",
                  )}
                >
                  <div className="w-[clamp(200px,20vw,240px)]">
                    {i === 0 && demo.video ? (
                      <DemoVideo
                        src={demo.video}
                        poster={demo.poster}
                        label={demo.alt}
                      />
                    ) : (
                      <Screen name={f.screen} size={260} width="100%" />
                    )}
                  </div>
                </div>
                <div className="flex max-w-[480px] flex-col gap-4">
                  <p className="font-display text-[clamp(40px,4.4vw,56px)] leading-none font-bold text-accent-text">
                    {i + 1}
                  </p>
                  <h3 className="text-[clamp(28px,3vw,38px)] leading-[1.08] font-bold tracking-[-0.025em]">
                    {f.title}
                  </h3>
                  <p className="text-[clamp(17px,1.6vw,19px)] text-fg-2">
                    {f.text}
                  </p>
                  {f.points.length > 0 && (
                    <div className="border-t border-hairline pt-4">
                      <Checks items={f.points} />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="sg-tiers" className="gutter band-y bg-bg-alt">
        <div className="wrap flex flex-col gap-[clamp(32px,5vw,64px)]">
          <div className="flex max-w-[680px] flex-col gap-4">
            <h2 id="sg-tiers" className="t-h2">
              {tiers.title}
            </h2>
            {tiers.line && (
              <p className="text-[clamp(17px,1.6vw,19px)] text-fg-2">
                {tiers.line}
              </p>
            )}
          </div>
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-x-[clamp(20px,3vw,40px)] gap-y-12 p-0">
            {tiers.items.map((t) => (
              <li key={t.name} className="flex flex-col gap-5">
                <div
                  className={cn(
                    "flex h-[clamp(260px,26vw,340px)] justify-center overflow-hidden rounded-[28px] px-6 pt-[clamp(24px,3vw,36px)]",
                    STAGE,
                  )}
                >
                  <div className="w-[clamp(200px,20vw,240px)]">
                    <Screen name={t.screen} size={240} width="100%" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-[clamp(26px,2.6vw,32px)] leading-[1.1] font-bold tracking-[-0.02em]">
                    {t.name}
                  </h3>
                  <p className="text-[16px] text-fg-2">{t.who}</p>
                </div>
                <Checks items={t.points} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="sg-built" className="gutter band-y">
        <div className="wrap flex flex-wrap gap-x-[clamp(28px,6vw,88px)] gap-y-4">
          <div className="flex max-w-[560px] flex-[1_1_420px] flex-col gap-4">
            <h2
              id="sg-built"
              className="text-[clamp(26px,3vw,36px)] leading-[1.1] font-bold tracking-[-0.025em]"
            >
              {builtWith.title}
            </h2>
            <p className="max-w-[420px] text-[17px] text-fg-2">
              {builtWith.text}
            </p>
          </div>
          <ul className="m-0 flex min-w-0 flex-[2_1_420px] list-none flex-wrap content-start gap-2 p-0">
            {builtWith.stack.map((s) => (
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
    </>
  );
}
