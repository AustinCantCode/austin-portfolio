import { cn } from "@lib/utils";

/**
 * A section heading you can link to: a "#" link appears beside it on
 * hover or keyboard focus, and it stops clear of the fixed nav.
 */
export function AnchorHeading({
  id,
  children,
  className,
}: {
  id: string;
  children: string;
  className?: string;
}) {
  return (
    <h2
      id={id}
      tabIndex={-1}
      className={cn(
        "group relative scroll-mt-[96px] text-[clamp(28px,3.2vw,40px)] leading-[1.1] font-bold tracking-[-0.02em] outline-none",
        className,
      )}
    >
      {children}
      <a
        href={`#${id}`}
        aria-label={`Link to “${children}”`}
        className="ml-3 align-middle text-[0.6em] font-normal text-fg-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:text-accent-text hover:no-underline focus-visible:opacity-100"
      >
        #
      </a>
    </h2>
  );
}
