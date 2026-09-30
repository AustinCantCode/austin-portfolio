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
