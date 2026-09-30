import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";

export type Client = {
  name: string;
  project?: string | null;
  logo?: StaticImageData | null;
};

/**
 * Logos of different shapes look equally big at about the same area, not
 * the same height: a wide wordmark is set shorter, a compact mark taller.
 */
const logoHeight = (l: StaticImageData) =>
  Math.round(
    Math.min(40, Math.max(22, 28 * Math.sqrt(2.5 / (l.width / l.height)))),
  );

/**
 * A quiet line of the clients behind the work, each linking to its case
 * study. Names are set as wordmarks until a logo is added in the CMS.
 */
export function Clients({ title, items }: { title: string; items: Client[] }) {
  if (!items.length) return null;
  return (
    <div
      data-reveal=""
      className="flex flex-col gap-4 border-t border-hairline pt-[clamp(28px,3vw,40px)]"
    >
      <p className="text-[14px] text-fg-2">{title}</p>
      <ul className="m-0 flex list-none flex-wrap items-center gap-x-[clamp(28px,3.4vw,52px)] gap-y-4 p-0">
        {items.map((c) => {
          const mark = c.logo ? (
            <Image
              src={c.logo}
              alt={c.name}
              height={logoHeight(c.logo)}
              style={{ height: logoHeight(c.logo) }}
              className="client-logo w-auto opacity-60 transition-opacity duration-200 group-hover:opacity-100"
            />
          ) : (
            <span className="font-display text-[clamp(21px,2vw,27px)] leading-none font-semibold tracking-[-0.01em] text-fg-2 transition-colors duration-200 group-hover:text-fg">
              {c.name}
            </span>
          );
          return (
            <li key={c.name}>
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
