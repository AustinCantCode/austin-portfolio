import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "@lib/utils";
import { clip, pageMetadata } from "@lib/metadata";
import { JsonLd, breadcrumbLd, graph, projectLd } from "@lib/structured-data";
import { projects, projectBySlug } from "@data/projects";
import {
  AREA_PATH,
  categoryBySlug,
  categoryHref,
  moreProjects,
  navSections,
  projectArea,
} from "@data/categories";
import { isPlaceholderLink } from "@data/site";
import { Icon } from "@components/icon";
import { SmartLink } from "@components/ui";
import { ImageSlot } from "@components/media";
import { AreaNav, VenturesNav } from "@components/local-nav";
import { ShowroomCarousel, ShowroomHero } from "@components/client/showroom";
import type { Media, StorySection } from "@data/types";
import { testimonialFor } from "@data/testimonials";
import { Toc } from "@components/client/toc";
import { AnchorHeading } from "@components/anchor-heading";

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
      className="flex flex-wrap gap-x-[clamp(28px,6vw,88px)] gap-y-3 border-t border-pill pt-[clamp(24px,3vw,36px)]"
    >
      <h2 className="flex-[1_1_220px] text-[clamp(24px,2.8vw,32px)] leading-[1.2] font-bold tracking-[-0.02em]">
        {label}
      </h2>
      <div className="min-w-0 max-w-[680px] flex-[3_1_420px]">{children}</div>
    </div>
  );
}

type Block = { id: string; title: string; body: React.ReactNode };

function StoryBody({
  section,
  title,
}: {
  section: StorySection;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-[clamp(20px,2.4vw,28px)]">
      {section.paragraphs.map((t, i) => (
        <p
          key={i}
          className="text-[clamp(17px,1.5vw,19px)] leading-[1.65] text-fg-2"
        >
          {t}
        </p>
      ))}
      {section.callout && (
        <p className="font-display border-l-2 border-accent pl-[clamp(16px,2vw,24px)] text-[clamp(22px,2.3vw,28px)] leading-[1.35] font-medium text-fg">
          {section.callout}
        </p>
      )}
      {section.image && (
        <figure className="m-0 flex flex-col gap-3">
          <StoryImage media={section.image} title={title} />
          {section.image.alt && (
            <figcaption className="text-[14px] text-fg-2">
              {section.image.alt}
            </figcaption>
          )}
        </figure>
      )}
    </div>
  );
}

/**
 * A story image in one of three fixed frames, by its shape: an app screen
 * as a phone screen, a photo as a 4:3 print, a web screenshot at 2:1 (as in
 * the showroom). Screens fill from the top; photos from the middle.
 */
function StoryImage({ media, title }: { media: Media; title: string }) {
  const r = media.src.width / media.src.height;
  const frame =
    r < 0.7
      ? { ratio: 9 / 19.5, className: "max-w-[300px]", position: "top" }
      : r < 1.6
        ? { ratio: 4 / 3, className: "", position: "center" }
        : { ratio: 2, className: "", position: "top" };
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[clamp(12px,1.4vw,18px)] bg-pill",
        frame.className,
      )}
      style={{ aspectRatio: frame.ratio }}
    >
      <ImageSlot
        media={{ ...media, fit: "cover", position: frame.position }}
        placeholder={`${title} image`}
        sizes="(max-width: 1024px) 100vw, 760px"
      />
    </div>
  );
}

function Results({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-x-[clamp(24px,3vw,40px)] gap-y-8">
      {items.map((r) => (
        <div
          key={r.label}
          className="flex flex-col-reverse justify-end gap-3.5 border-t border-pill pt-5"
        >
          <dt className="text-[15px] leading-[1.45] text-fg-2">{r.label}</dt>
          <dd className="font-display m-0 text-[clamp(44px,5vw,68px)] leading-[1.05] font-semibold tracking-[-0.02em]">
            {r.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const p = projectBySlug((await params).slug);
  if (!p) notFound();
  const cats = p.categories.map((c) => categoryBySlug(c)!).filter(Boolean);
  const area = projectArea(p);
  const areaHref = AREA_PATH[area];
  const areaName = navSections.find((s) => s.id === area)?.label ?? "";
  // The selector highlights the project's first category in its area.
  const current = cats.find((c) => c.area === area);
  const more = moreProjects(p);
  const links = p.links;
  const quote = testimonialFor(p.slug);

  // Quote, AI, tools and links: shared by both layouts.
  const extras: Block[] = [
    ...(quote
      ? [
          {
            id: "what-they-said",
            title: "Testimonial",
            body: (
              <figure className="m-0 flex flex-col gap-4">
                <blockquote className="m-0">
                  <p className="font-display text-[clamp(22px,2.3vw,28px)] leading-[1.35] font-medium text-pretty">
                    &ldquo;{quote.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="text-[15px] text-fg-2">
                  <span className="font-semibold text-fg">{quote.name}</span>
                  {[quote.role, quote.org].filter(Boolean).length > 0 &&
                    `, ${[quote.role, quote.org].filter(Boolean).join(", ")}`}
                </figcaption>
              </figure>
            ),
          },
        ]
      : []),
    ...(p.ai
      ? [
          {
            id: "how-i-used-ai",
            title: "How I Used AI",
            body: (
              <div className="flex items-start gap-4">
                <span className="grid size-10 flex-none place-items-center rounded-full bg-pill">
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
            ),
          },
        ]
      : []),
    {
      id: "tools-used",
      title: "Tools Used",
      body: (
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
      ),
    },
    ...(links.length
      ? [
          {
            id: "links",
            title: "Links",
            body: (
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
                          ? "bg-accent text-on-accent hover:bg-accent-hover"
                          : "bg-pill text-fg",
                      )}
                    >
                      {l.label}
                      <Icon name="arrow-up-right" size={16} />
                    </SmartLink>
                  );
                })}
              </div>
            ),
          },
        ]
      : []),
  ];

  // The long-form case study: its sections, the results, then the extras.
  const blocks: Block[] = [
    ...(p.story ?? []).map((sec) => ({
      id: sec.id,
      title: sec.title,
      body: <StoryBody section={sec} title={p.title} />,
    })),
    ...(p.results?.length
      ? [
          {
            id: "results",
            title: "Results",
            body: <Results items={p.results} />,
          },
        ]
      : []),
    ...extras,
  ];

  return (
    <>
      <JsonLd
        data={graph(
          projectLd(p),
          breadcrumbLd([
            { name: areaName, path: areaHref },
            { name: p.title, path: `/projects/${p.slug}` },
          ]),
        )}
      />
      {area === "ventures" ? (
        <VenturesNav current="/stillgood" />
      ) : (
        <AreaNav
          area={area}
          current={current ? categoryHref(current.slug) : areaHref}
        />
      )}

      <section className="gutter pt-[clamp(44px,min(7vw,10vh),100px)]">
        <div className="wrap flex flex-col gap-[clamp(40px,5vw,72px)]">
          <div className="flex flex-col gap-3">
            <p className="text-[14px] font-medium text-fg-2">
              {p.subtext}, {p.year}
            </p>
            <h1 className="t-h1">{p.title}</h1>
            <p className="t-sub max-w-[640px]">{p.line}</p>
          </div>
          <ShowroomHero project={p} />
          <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(100%,140px),1fr))] gap-x-[clamp(24px,3vw,40px)] gap-y-6 border-t border-hairline pt-[clamp(20px,2.4vw,32px)]">
            {[
              ["Year", p.year],
              ["Role", p.role],
              ["Type", p.subtext],
              ...(p.ai ? [["AI Use", "AI assistant, reviewed by me"]] : []),
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1">
                <dt className="text-[13px] text-fg-2">{k}</dt>
                <dd className="m-0 text-[16px] font-semibold">{v}</dd>
              </div>
            ))}
            <div className="flex flex-col gap-1">
              <dt className="text-[13px] text-fg-2">Categories</dt>
              <dd className="m-0 flex flex-wrap gap-x-3 gap-y-1 text-[16px] font-semibold">
                {cats.map((c) => (
                  <Link key={c.slug} href={categoryHref(c.slug)}>
                    {c.label}
                  </Link>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {p.story ? (
        <section className="gutter band-y-2">
          <div className="wrap grid gap-x-[clamp(40px,6vw,96px)] gap-y-8 lg:grid-cols-[220px_minmax(0,1fr)]">
            <aside className="min-w-0 lg:row-span-2">
              <Toc items={blocks.map(({ id, title }) => ({ id, title }))} />
            </aside>
            <article className="flex max-w-[760px] min-w-0 flex-col gap-[clamp(56px,6vw,88px)]">
              {blocks.map((b) => (
                <section
                  key={b.id}
                  aria-labelledby={b.id}
                  className="flex flex-col gap-[clamp(16px,2vw,24px)]"
                >
                  <AnchorHeading id={b.id}>{b.title}</AnchorHeading>
                  {b.body}
                </section>
              ))}
            </article>
          </div>
        </section>
      ) : (
        <section className="gutter band-y-2">
          <div className="wrap flex flex-col gap-[clamp(32px,4vw,48px)]">
            {[
              ["Overview", p.problem],
              ["What I Did", p.did],
              ["Outcome", p.outcome],
            ].map(([label, text]) => (
              <Row key={label} label={label}>
                <p className="pt-[clamp(2px,.4vw,6px)] text-[clamp(17px,1.5vw,19px)] leading-[1.5] text-fg-2">
                  {text}
                </p>
              </Row>
            ))}
            {extras.map((b) => (
              <Row key={b.id} label={b.title}>
                {b.body}
              </Row>
            ))}
          </div>
        </section>
      )}

      <ShowroomCarousel
        title={more.title}
        href={more.href}
        projects={more.projects}
      />
    </>
  );
}
