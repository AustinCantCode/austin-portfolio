import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";

export type Client = {
  name: string;
  project?: string | null;
  logo?: StaticImageData | null;
};

/** A typical logo's height; it scales with the screen (see --logo-h). */
const BASE = 48;

/**
 * Logos of different shapes look equally big at about the same area, not
 * the same height: a wide wordmark is set shorter, a compact mark taller.
 * Returns a multiple of the typical height.
 */
const logoScale = (l: StaticImageData) =>
  Math.min(1.35, Math.max(0.8, Math.sqrt(2.5 / (l.width / l.height))));

/** A wordmark's width, in typical logo heights (see the text size below). */
const wordmarkWidth = (name: string) => name.length * 0.36;

/**
 * A quiet line of the clients behind the work, each linking to its case
 * study. Names are set as wordmarks until a logo is added in the CMS.
 *
 * Always one line: the typical logo height is worked out from the row's
 * own width (a container query) so every logo fits side by side, up to
 * 48px. Below 24px they'd be hard to read, so on phones the line stays
 * that size and scrolls sideways instead of wrapping.
 */
export function Clients({ title, items }: { title: string; items: Client[] }) {
  if (!items.length) return null;
  // How wide the whole row is, in typical logo heights.
  const span = items.reduce(
    (sum, c) =>
      sum +
      (c.logo
        ? logoScale(c.logo) * (c.logo.width / c.logo.height)
        : wordmarkWidth(c.name)),
    0,
  );
  const gaps = items.length - 1;
  return (
    <div
      data-reveal=""
      className="flex flex-col gap-4 border-t border-hairline pt-[clamp(28px,3vw,40px)] [container-type:inline-size]"
    >
      <p className="text-[14px] text-fg-2">{title}</p>
      <ul
        className="no-scrollbar m-0 flex list-none flex-nowrap items-center justify-between gap-x-(--gap) overflow-x-auto overflow-y-hidden p-0 [--gap:clamp(20px,3vw,48px)]"
        style={{
          ["--logo-h" as string]: `clamp(24px, calc((100cqw - ${gaps} * var(--gap)) / ${span.toFixed(3)}), ${BASE}px)`,
        }}
      >
        {items.map((c) => {
          const mark = c.logo ? (
            <Image
              src={c.logo}
              alt={c.name}
              quality={100}
              height={Math.round(BASE * logoScale(c.logo))}
              style={{ height: `calc(var(--logo-h) * ${logoScale(c.logo)})` }}
              className="client-logo w-auto opacity-60 transition-opacity duration-200 group-hover:opacity-100"
            />
          ) : (
            <span className="font-display text-[calc(var(--logo-h)*0.6)] leading-none font-semibold tracking-[-0.01em] whitespace-nowrap text-fg-2 transition-colors duration-200 group-hover:text-fg">
              {c.name}
            </span>
          );
          return (
            <li key={c.name} className="flex-none">
              {c.project ? (
                <Link
                  href={`/projects/${c.project}`}
                  aria-label={`${c.name} case study`}
                  className="group inline-flex py-1 hover:no-underline"
                >
                  {mark}
                </Link>
              ) : (
                <span className="group inline-flex py-1">{mark}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
