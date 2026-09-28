import { site } from "@data/site";
import { pageCopy } from "@data/pages";
import { posts } from "@data/writing";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/[<>&'"]/g, (c) => `&#${c.charCodeAt(0)};`);

/** RSS feed of published posts, for feed readers. */
export function GET() {
  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${site.url}/writing/${p.slug}</link>
      <guid>${site.url}/writing/${p.slug}</guid>
      <pubDate>${new Date(`${p.date}T00:00:00+08:00`).toUTCString()}</pubDate>
      <description>${esc(p.summary)}</description>
    </item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(`${site.name}: Writing`)}</title>
    <link>${site.url}/writing</link>
    <description>${esc(pageCopy.writing.intro ?? pageCopy.writing.description)}</description>
    <language>en-sg</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
