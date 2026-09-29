import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@lib/metadata";
import { JsonLd, breadcrumbLd, graph, webPageLd } from "@lib/structured-data";
import { pageCopy } from "@data/pages";
import { formatDate, posts } from "@data/writing";
import { PageHeader } from "@components/ui";

export const metadata = pageMetadata({
  title: pageCopy.writing.title,
  description: pageCopy.writing.description,
  path: "/writing",
});

export default function WritingPage() {
  // Nothing to show until a post is published (drafts only show in dev).
  if (!posts.length) notFound();
  return (
    <>
      <JsonLd
        data={graph(
          webPageLd({
            type: "CollectionPage",
            path: "/writing",
            name: pageCopy.writing.heading ?? "Writing",
            description: pageCopy.writing.description,
          }),
          breadcrumbLd([{ name: "Writing", path: "/writing" }]),
        )}
      />
      <PageHeader
        title={pageCopy.writing.heading}
        sub={pageCopy.writing.intro}
        className="pb-[clamp(40px,5vw,72px)]"
      />
      <section className="gutter pb-[clamp(72px,min(9vw,13vh),136px)]">
        <div className="wrap">
          <ol className="m-0 flex list-none flex-col p-0">
            {posts.map((p) => (
              <li key={p.slug} data-reveal="" className="border-t border-pill">
                <Link
                  href={`/writing/${p.slug}`}
                  className="group flex flex-wrap items-baseline gap-x-[clamp(24px,5vw,80px)] gap-y-3 py-[clamp(28px,3.4vw,44px)] text-fg hover:no-underline"
                >
                  <time
                    dateTime={p.date}
                    className="w-[160px] flex-none text-[14px] text-fg-2"
                  >
                    {formatDate(p.date)}
                    {p.draft && (
                      <span className="ml-2 rounded-full bg-pill px-2 py-0.5 text-[12px] font-medium text-fg">
                        Draft
                      </span>
                    )}
                  </time>
                  <span className="flex min-w-0 flex-[1_1_480px] flex-col gap-2.5">
                    <span className="font-display text-[clamp(26px,2.8vw,36px)] leading-[1.12] font-bold tracking-[-0.015em] transition-colors duration-200 group-hover:text-accent-text">
                      {p.title}
                    </span>
                    <span className="max-w-[640px] text-[17px] leading-[1.55] text-fg-2">
                      {p.summary}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
