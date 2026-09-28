import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { clip, pageMetadata } from "@lib/metadata";
import { JsonLd, breadcrumbLd, graph, postLd } from "@lib/structured-data";
import { parseMarkdoc } from "@lib/markdoc";
import { formatDate, postBySlug, posts } from "@data/writing";
import { NextCard, PageHeader } from "@components/ui";
import { Toc } from "@components/client/toc";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const p = postBySlug((await params).slug);
  if (!p) return {};
  return pageMetadata({
    title: clip(p.title, 47),
    description: clip(p.summary),
    path: `/writing/${p.slug}`,
    type: "article",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const p = postBySlug((await params).slug);
  if (!p) notFound();
  const { toc, node } = parseMarkdoc(p.body);
  const i = posts.indexOf(p);
  const next = posts.length > 1 ? posts[(i + 1) % posts.length] : null;
  // A contents list only helps once there are a few sections.
  const withToc = toc.length >= 3;

  return (
    <>
      <JsonLd
        data={graph(
          postLd(p),
          breadcrumbLd([
            { name: "Writing", path: "/writing" },
            { name: p.title, path: `/writing/${p.slug}` },
          ]),
        )}
      />
      <PageHeader
        back={{ label: "All writing", href: "/writing" }}
        title={p.title}
        className="pb-[clamp(40px,5vw,72px)]"
      >
        <p className="t-sub max-w-[680px]">{p.summary}</p>
        <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-fg-2">
          <time dateTime={p.date}>{formatDate(p.date)}</time>
          {p.draft && (
            <span className="rounded-full bg-pill px-2.5 py-0.5 text-[12px] font-medium text-fg">
              Draft, only visible on your computer
            </span>
          )}
        </p>
      </PageHeader>

      <section className="gutter pb-[clamp(72px,min(9vw,13vh),136px)]">
        <div
          className={
            withToc
              ? "wrap grid gap-x-[clamp(40px,6vw,96px)] gap-y-8 lg:grid-cols-[220px_minmax(0,1fr)]"
              : "wrap"
          }
        >
          {withToc && (
            <aside className="min-w-0">
              <Toc items={toc} />
            </aside>
          )}
          <article className="prose-post max-w-[700px] min-w-0">{node}</article>
        </div>
      </section>

      {next && (
        <NextCard
          href={`/writing/${next.slug}`}
          label="Next post"
          title={next.title}
          line={next.summary}
        />
      )}
    </>
  );
}
