import Link from "next/link";
import { formatDate, type Post } from "@data/writing";
import { Carousel } from "@components/client/carousel";

/** The other posts, starting from the next one, at the foot of a post. */
export function MorePosts({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;
  return (
    <section aria-labelledby="more-posts" className="gutter band-y-2">
      <div className="wrap flex flex-col gap-[clamp(28px,3.4vw,48px)]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 id="more-posts" className="t-h2">
            More Posts
          </h2>
          <Link href="/writing" className="py-1 text-[15px]">
            See all ›
          </Link>
        </div>
        <Carousel label="more posts">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/writing/${p.slug}`}
              className="group flex w-[clamp(260px,28vw,340px)] flex-none snap-start flex-col gap-3 rounded-[20px] bg-bg-alt p-6 text-fg transition-colors duration-200 hover:bg-pill hover:no-underline"
            >
              <span className="flex items-center gap-2 text-[13px] text-fg-2">
                <time dateTime={p.date}>{formatDate(p.date)}</time>
                {p.draft && (
                  <span className="rounded-full bg-pill px-2 py-0.5 text-[12px] font-medium text-fg">
                    Draft
                  </span>
                )}
              </span>
              <span className="font-display text-[clamp(22px,2.2vw,26px)] leading-[1.15] font-bold tracking-[-0.015em] transition-colors duration-200 group-hover:text-accent-text">
                {p.title}
              </span>
              <span className="line-clamp-3 text-[15px] leading-[1.55] text-fg-2">
                {p.summary}
              </span>
            </Link>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
