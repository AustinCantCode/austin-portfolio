import { cn } from "@lib/utils";

/**
 * A section heading you can link to: a "#" link appears beside it on
 * hover or keyboard focus (not on touch screens, where it can't be
 * seen), and it stops clear of the nav and the page's selector bar.
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
        "group relative scroll-mt-[84px] text-[clamp(28px,3.2vw,40px)] leading-[1.1] font-bold tracking-[-0.02em] outline-none",
        className,
      )}
    >
      {children}
      <a
        href={`#${id}`}
        aria-label={`Link to “${children}”`}
        className="ml-2 inline-grid min-h-6 min-w-6 place-items-center align-middle text-[0.6em] font-normal text-fg-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:text-accent-text hover:no-underline focus-visible:opacity-100 [@media(hover:none)]:hidden"
      >
        #
      </a>
    </h2>
  );
}
