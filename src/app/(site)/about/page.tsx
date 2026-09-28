import Image from "next/image";
import Link from "next/link";
import { about, portrait } from "@data/about";
import { site } from "@data/site";
import { JsonLd, graph, webPageLd, breadcrumbLd } from "@lib/structured-data";
import { pageMetadata } from "@lib/metadata";
import { pageCopy } from "@data/pages";
import { IconCircle, TextLink } from "@components/ui";
import GitHubCalendar from "@components/complex-ui/github-calendar";

export const metadata = pageMetadata({
  title: pageCopy.about.title,
  description: pageCopy.about.description,
  path: "/about",
  absoluteTitle: true,
  type: "profile",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageLd({
            type: "ProfilePage",
            path: "/about",
            name: "About Austin Sia",
            description:
              "About Austin Sia, full-stack developer and UI/UX designer in Singapore.",
          }),
          breadcrumbLd([{ name: "About", path: "/about" }]),
        )}
      />
      <section className="gutter pt-[clamp(48px,min(8vw,11vh),112px)] pb-[clamp(72px,min(9vw,13vh),136px)]">
        <div className="wrap flex flex-wrap items-center gap-[clamp(40px,7vw,104px)]">
          {portrait && (
            <Image
              quality={100}
              src={portrait.src}
              alt={portrait.alt || "Portrait of Austin Sia"}
              width={200}
              height={200}
              priority
              className="aspect-square h-auto w-[clamp(120px,18vw,200px)] flex-none rounded-full object-cover"
            />
          )}
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-5">
            <h1 className="t-h1">{pageCopy.about.heading}</h1>
            <p className="max-w-[680px] text-[clamp(18px,1.8vw,22px)] leading-[1.45] text-fg-2">
              {about.intro}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="so-far"
        className="gutter bg-bg-alt py-[clamp(72px,min(9vw,13vh),136px)]"
      >
        <div className="wrap flex flex-col gap-[clamp(40px,6vw,80px)]">
          <h2 id="so-far" data-reveal="" className="t-h2">
            So far.
          </h2>
          <ol className="m-0 flex list-none flex-col p-0">
            {about.timeline.map((t) => (
              <li
                key={t.title}
                data-reveal=""
                className="flex flex-wrap gap-x-[clamp(28px,6vw,88px)] gap-y-1 border-t border-black/10 py-6 [[data-theme=dark]_&]:border-white/12"
              >
                <p className="flex-[0_0_200px] pt-[3px] font-mono text-[14px] font-medium text-fg-2">
                  {t.date}
                </p>
                <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-0.5">
                  <p className="font-display flex items-center gap-2.5 text-[clamp(19px,2vw,22px)] font-semibold tracking-[-0.01em]">
                    {t.title}
                    {t.now && (
                      <span className="rounded-full bg-accent px-2.5 py-[3px] text-[12px] font-semibold tracking-normal text-on-accent">
                        Now
                      </span>
                    )}
                  </p>
                  <p className="text-[17px] text-fg-2">{t.sub}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="more"
        className="gutter py-[clamp(72px,min(9vw,13vh),136px)]"
      >
        <div className="wrap flex flex-col gap-[clamp(40px,6vw,80px)]">
          <h2 id="more" data-reveal="" className="t-h2">
            More about me.
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(max(180px,calc((100%_-_48px)/4)),1fr))] gap-4">
            {about.more.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                data-reveal=""
                data-hover-card=""
                className="lift flex flex-col gap-1.5 rounded-[24px] bg-bg-alt p-7 text-fg [--hover-scale:1.02] hover:no-underline"
              >
                <IconCircle name={m.icon} className="bg-well-alt" />
                <p className="font-display mt-6 text-[24px] font-bold tracking-[-0.02em]">
                  {m.title}
                </p>
                <p data-hover-detail="" className="text-[15px] text-fg-2">
                  {m.text}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="github"
        className="gutter bg-bg-alt py-[clamp(72px,min(9vw,13vh),136px)]"
      >
        <div className="wrap flex flex-col gap-[clamp(24px,4vw,40px)]">
          <div
            data-reveal=""
            className="flex flex-wrap items-end justify-between gap-4"
          >
            <h2 id="github" className="t-h2">
              Shipping, most days.
            </h2>
            <TextLink href={site.contact.github}>
              {site.contact.githubLabel} ›
            </TextLink>
          </div>
          <div
            data-reveal=""
            tabIndex={0}
            role="region"
            aria-label="GitHub contributions"
            className="overflow-x-auto rounded-[24px] bg-tile p-[clamp(20px,3vw,36px)]"
          >
            <GitHubCalendar username={site.contact.githubUser} />
          </div>
        </div>
      </section>
    </>
  );
}
