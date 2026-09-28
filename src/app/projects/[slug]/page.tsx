import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "@lib/utils";
import { clip, pageMetadata } from "@lib/metadata";
import { JsonLd, breadcrumbLd, graph, projectLd } from "@lib/structured-data";
import { projects, projectBySlug } from "@data/projects";
import { categoryBySlug, categoryHref } from "@data/categories";
import { isPlaceholderLink } from "@data/site";
import { Icon } from "@components/icon";
import { NextCard, PageHeader, SmartLink } from "@components/ui";
import { ImageSlot, LaptopFrame, PhoneFrame } from "@components/media";
import type { Project } from "@data/types";

type Params = { slug: string };

/** Lower-cases a leading capital unless the word is an acronym. */
const sentence = (s: string) =>
  /^[A-Z][a-z]/.test(s) ? s[0].toLowerCase() + s.slice(1) : s;

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const p = projectBySlug((await params).slug);
  if (!p) return {};
  return pageMetadata({
    title: clip(`${p.title} case study: ${sentence(p.subtext)}`, 47),
    description: clip(`${p.title}: ${p.line} ${p.did}`),
    path: `/projects/${p.slug}`,
    type: "article",
    image: `/projects/${p.slug}/opengraph-image`,
  });
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-reveal=""
      className="flex flex-wrap gap-x-[clamp(24px,5vw,64px)] gap-y-3"
    >
      <h2 className="flex-[1_1_220px] text-[clamp(24px,2.8vw,32px)] leading-[1.2] font-bold tracking-[-0.02em]">
        {label}
      </h2>
      <div className="min-w-0 max-w-[680px] flex-[3_1_420px]">{children}</div>
    </div>
  );
}

function Hero({ p }: { p: Project }) {
  const phone = p.frame === "phone" && !p.cover?.bare;
  return (
    <section aria-label={`${p.title} images`} className="gutter">
      <div className="wrap flex h-[clamp(320px,40vw,520px)] items-start justify-center overflow-hidden rounded-[28px] bg-bg-alt px-[clamp(20px,6vw,96px)] pt-[clamp(32px,6vw,72px)]">
        {phone && (
          <div className="flex items-start gap-[clamp(16px,3vw,32px)]">
            <PhoneFrame size={280} width="clamp(200px,24vw,280px)">
              <ImageSlot
                media={p.cover}
                placeholder={`${p.title} main screen`}
                sizes="280px"
                priority
              />
            </PhoneFrame>
            {p.slug !== "telegpt" && (
              <PhoneFrame
                size={280}
                width="clamp(200px,24vw,280px)"
                className="mt-16 max-[520px]:hidden"
              >
                <ImageSlot
                  media={p.second}
                  placeholder={`${p.title} second screen`}
                  sizes="280px"
                />
              </PhoneFrame>
            )}
          </div>
        )}
        {p.frame === "laptop" && (
          <div className="w-full max-w-[860px]">
            <LaptopFrame large base>
              <ImageSlot
                media={p.cover}
                placeholder={`${p.title} main screen`}
                sizes="(max-width: 900px) 100vw, 860px"
                priority
              />
            </LaptopFrame>
          </div>
        )}
        {(p.frame === "none" || (p.frame === "phone" && p.cover?.bare)) && (
          <div
            className={cn(
              "relative size-full overflow-hidden rounded-t-[20px]",
              p.cover?.bare ? "bare-mock" : "bg-bg",
            )}
          >
            <ImageSlot
              media={p.cover}
              placeholder={`${p.title} main image`}
              sizes="(max-width: 1680px) 100vw, 1680px"
              priority
              fit={p.cover?.bare ? "contain" : undefined}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const p = projectBySlug((await params).slug);
  if (!p) notFound();
  const idx = projects.indexOf(p);
  const next = projects[(idx + 1) % projects.length];
  const cats = p.categories.map((c) => categoryBySlug(c)!).filter(Boolean);
  const links = p.links;

  return (
    <>
      <JsonLd
        data={graph(
          projectLd(p),
          breadcrumbLd([
            { name: "Work", path: "/work" },
            { name: p.title, path: `/projects/${p.slug}` },
          ]),
        )}
      />
      <PageHeader
        back={{ label: "All work", href: "/work" }}
        title={p.title}
        className="pb-[clamp(40px,5vw,64px)]"
      >
        <p className="t-sub max-w-[640px]">{p.line}</p>
        <dl className="mt-4 mb-0 flex flex-wrap gap-x-[clamp(32px,5vw,64px)] gap-y-4">
          {[
            ["Year", p.year],
            ["Role", p.role],
            ["Type", p.subtext],
            ...(p.ai ? [["AI use", "AI assistant, checked by me"]] : []),
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-0.5">
              <dt className="text-[13px] text-fg-2">{k}</dt>
              <dd className="m-0 text-[17px] font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-1 flex flex-wrap gap-2">
          {cats.map((c) => (
            <Link
              key={c.slug}
              href={categoryHref(c.slug)}
              className="inline-flex h-8 items-center rounded-full bg-bg-alt px-3.5 text-[13px] font-medium text-fg hover:bg-pill hover:no-underline"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </PageHeader>

      <Hero p={p} />

      <section className="gutter band-y-2">
        <div className="wrap flex flex-col gap-[clamp(40px,6vw,72px)]">
          {[
            ["Problem", p.problem],
            ["What I did", p.did],
            ["Outcome", p.outcome],
          ].map(([label, text]) => (
            <Row key={label} label={label}>
              <p className="pt-[clamp(2px,.4vw,6px)] text-[clamp(17px,1.5vw,19px)] leading-[1.5] text-fg-2">
                {text}
              </p>
            </Row>
          ))}

          {p.ai && (
            <Row label="How I used AI">
              <div className="flex items-start gap-4 rounded-[24px] bg-bg-alt p-[clamp(20px,2.4vw,28px)]">
                <span className="grid size-10 flex-none place-items-center rounded-full bg-tile">
                  <Icon name="sparkles" size={18} />
                </span>
                <div className="flex min-w-0 flex-col gap-1.5">
                  <p className="text-[15px] font-semibold">
                    Built with Claude Code
                  </p>
                  <p className="text-[clamp(16px,1.7vw,18px)] leading-[1.55] text-fg-2">
                    {p.ai}
                  </p>
                </div>
              </div>
            </Row>
          )}

          <Row label="Tools used">
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0 pt-1">
              {p.skills.map((s) => (
                <li
                  key={s}
                  className="rounded-full bg-bg-alt px-3.5 py-1.5 text-[14px] font-medium text-fg"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Row>

          {links.length > 0 && (
            <Row label="Links">
              <div className="flex flex-wrap gap-3">
                {links.map((l, i) => {
                  const placeholder = isPlaceholderLink(l.href);
                  return (
                    <SmartLink
                      key={l.label}
                      href={l.href}
                      aria-disabled={placeholder || undefined}
                      title={placeholder ? "Link coming soon" : undefined}
                      data-track={
                        l.label.includes("Google Play")
                          ? "play_store_click"
                          : undefined
                      }
                      className={cn(
                        "inline-flex h-11 items-center gap-2 rounded-full px-5 text-[15px] font-medium hover:no-underline",
                        i === 0
                          ? "bg-accent text-white hover:bg-accent-hover"
                          : "bg-pill text-fg",
                      )}
                    >
                      {l.label}
                      <Icon name="arrow-up-right" size={16} />
                    </SmartLink>
                  );
                })}
              </div>
            </Row>
          )}
        </div>
      </section>

      <NextCard
        href={`/projects/${next.slug}`}
        label="Next project"
        title={next.title}
        line={next.line}
      />
    </>
  );
}
