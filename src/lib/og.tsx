import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * Inter as TTF from Google Fonts (without a browser user agent the CSS API
 * serves TTF, which the image renderer needs). Falls back to the default
 * font if the fetch fails, so builds never break on it.
 */
async function inter(weight: 400 | 600 | 700) {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}`,
      )
    ).text();
    const src = css.match(
      /src: url\((.+?)\) format\('(?:truetype|opentype)'\)/,
    )?.[1];
    if (!src) return null;
    const data = await (await fetch(src)).arrayBuffer();
    return { name: "Inter", data, weight, style: "normal" as const };
  } catch {
    return null;
  }
}

/** The shared 1200×630 share card: title, a line of text and the AS mark. */
export async function ogCard({
  eyebrow,
  title,
  line,
}: {
  eyebrow: string;
  title: string;
  line: string;
}) {
  const logo = await readFile(
    path.join(process.cwd(), "public/AS-Circle-Logo.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const fonts = (
    await Promise.all([inter(400), inter(600), inter(700)])
  ).filter((f): f is NonNullable<typeof f> => f !== null);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#ffffff",
          color: "#1d1d1f",
          fontFamily: fonts.length ? "Inter" : undefined,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            width={56}
            height={56}
            style={{ borderRadius: 999 }}
            alt=""
          />
          <span style={{ fontSize: 30, fontWeight: 600 }}>Austin Sia</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontSize: 28, fontWeight: 600, color: "#0066cc" }}>
            {eyebrow}
          </span>
          <span
            style={{
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontSize: 34,
              color: "#6e6e73",
              lineHeight: 1.3,
              maxWidth: 980,
            }}
          >
            {line}
          </span>
        </div>
        <span style={{ fontSize: 26, color: "#6e6e73" }}>austinsia.com</span>
      </div>
    ),
    { ...OG_SIZE, fonts: fonts.length ? fonts : undefined },
  );
}
