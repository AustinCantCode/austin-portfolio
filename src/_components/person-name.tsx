import Image from "next/image";
import type { Img } from "@data/cms";
import { Icon } from "./icon";

/**
 * A person's name, linked to their own website when there is one, so a
 * reader can see who wrote a quote or letter.
 */
export function PersonName({
  name,
  href,
  className,
}: {
  name: string;
  href?: string;
  className?: string;
}) {
  if (!href) return <span className={className}>{name}</span>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={`${className ?? ""} inline-flex w-max items-center gap-1 text-fg decoration-1 underline-offset-[3px] hover:underline`}
    >
      {name}
      <Icon name="arrow-up-right" size={15} className="text-fg-2" />
    </a>
  );
}

/**
 * The logo of the company or school behind a quote, linked to its
 * website, so a reader can see where the words come from.
 */
export function OrgLogo({
  org,
  logo,
  href,
  size = 36,
}: {
  org: string;
  logo?: Img;
  href?: string;
  size?: number;
}) {
  if (!logo) return null;
  const img = (
    <Image
      src={logo}
      alt={`${org} logo`}
      width={size * 2}
      height={size * 2}
      quality={100}
      className="rounded-full bg-white object-contain p-[3px] shadow-[0_0_0_1px_var(--color-hairline)]"
      style={{ width: size, height: size }}
    />
  );
  if (!href) return <span className="flex-none">{img}</span>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={`${org} website`}
      title={`${org} website`}
      className="flex-none transition-transform duration-200 hover:scale-105"
    >
      {img}
    </a>
  );
}
