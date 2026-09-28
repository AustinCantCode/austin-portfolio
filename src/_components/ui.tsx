import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@lib/utils";
import { Icon } from "./icon";

type AnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
};

const isInternal = (href: string) =>
  href.startsWith("/") && !/\.(pdf|png|jpe?g|webp)$/i.test(href);

/**
 * A link that uses next/link for internal routes and a plain anchor for
 * everything else. External web links open in a new tab.
 */
export function SmartLink({ href, children, ...rest }: AnchorProps) {
  if (isInternal(href)) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      target={external ? "_blank" : rest.target}
      rel={external ? "noopener noreferrer" : rest.rel}
      {...rest}
    >
      {children}
    </a>
  );
}

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "lg" | "md";

const buttonBase =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,transform] duration-200 hover:no-underline active:scale-[.97]";

export const buttonClass = (
  variant: ButtonVariant = "primary",
  size: ButtonSize = "lg",
) =>
  cn(
    buttonBase,
    size === "lg" ? "h-12 px-6 text-[17px]" : "h-11 px-[22px] text-[15px]",
    variant === "primary"
      ? "bg-accent text-white hover:bg-accent-hover"
      : "bg-pill text-fg",
  );

export function ButtonLink({
  href,
  variant = "primary",
  size = "lg",
  icon,
  iconAfter,
  className,
  children,
  ...rest
}: AnchorProps & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  iconAfter?: string;
}) {
  return (
    <SmartLink
      href={href}
      className={cn(buttonClass(variant, size), className)}
      {...rest}
    >
      {icon && <Icon name={icon} size={18} />}
      {children}
      {iconAfter && <Icon name={iconAfter} size={16} />}
    </SmartLink>
  );
}

/** Accent text link with a trailing chevron, e.g. "See all work ›". */
export function TextLink({ href, className, children, ...rest }: AnchorProps) {
  return (
    <SmartLink
      href={href}
      className={cn("t-link hover:underline", className)}
      {...rest}
    >
      {children}
    </SmartLink>
  );
}

export function PillTag({
  children,
  small,
  onTile,
  className,
}: {
  children: ReactNode;
  small?: boolean;
  onTile?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium text-fg",
        small ? "px-3 py-[5px] text-[13px]" : "px-3.5 py-1.5 text-[14px]",
        onTile ? "bg-tile" : "bg-bg-alt",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatusPill({
  children,
  tone = "accent",
  className,
}: {
  children: ReactNode;
  tone?: "accent" | "live" | "live-light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium",
        tone === "live" && "bg-band-pill font-semibold text-band-fg",
        tone === "accent" && "bg-bg-alt text-fg-2",
        tone === "live-light" && "bg-pill font-semibold text-fg",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-[7px] shrink-0 rounded-full",
          tone === "live" ? "bg-live" : "bg-accent",
        )}
      />
      {children}
    </span>
  );
}

export function Kicker({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cn("t-kicker", className)}>{children}</p>;
}

/** Kicker, H2, optional sub and an optional right-aligned link. */
export function SectionHeader({
  kicker,
  title,
  sub,
  link,
  className,
  titleClassName,
  as: Heading = "h2",
  id,
}: {
  kicker?: string;
  title: ReactNode;
  sub?: ReactNode;
  link?: { label: string; href: string };
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2";
  id?: string;
}) {
  return (
    <div
      data-reveal=""
      className={cn(
        "flex flex-wrap items-end justify-between gap-4",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-3">
        {kicker && <Kicker>{kicker}</Kicker>}
        <Heading id={id} className={cn("t-h2", titleClassName)}>
          {title}
        </Heading>
        {sub && (
          <p className="max-w-[420px] text-[clamp(17px,1.5vw,19px)] text-fg-2">
            {sub}
          </p>
        )}
      </div>
      {link && <TextLink href={link.href}>{link.label}</TextLink>}
    </div>
  );
}

/** Page header used on inner pages: back link, H1 and a sub line. */
export function PageHeader({
  back,
  title,
  sub,
  children,
  className,
}: {
  back?: { label: string; href: string };
  title: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "gutter pt-[clamp(32px,min(5vw,8vh),72px)] pb-[clamp(24px,3vw,40px)]",
        className,
      )}
    >
      <div className="wrap flex flex-col gap-4">
        {back && (
          <SmartLink
            href={back.href}
            className="inline-flex w-max items-center gap-1 text-[14px]"
          >
            <Icon name="chevron-left" size={16} />
            {back.label}
          </SmartLink>
        )}
        <h1 className="t-h1">{title}</h1>
        {sub && (
          <p className="max-w-[600px] text-[clamp(19px,1.8vw,22px)] text-fg-2">
            {sub}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

export function IconCircle({
  name,
  size = 44,
  iconSize = 22,
  className,
}: {
  name: string;
  size?: number;
  iconSize?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-tile text-fg",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Icon name={name} size={iconSize} />
    </span>
  );
}

/** "Next project" / "Next category" card with an accent arrow. */
export function NextCard({
  href,
  label,
  title,
  line,
}: {
  href: string;
  label: string;
  title: string;
  line: string;
}) {
  return (
    <section className="gutter pb-[clamp(56px,min(7vw,11vh),96px)]">
      <Link
        href={href}
        className="wrap lift flex flex-wrap items-center justify-between gap-6 rounded-[28px] bg-bg-alt p-[clamp(28px,5vw,56px)] text-fg [--hover-scale:1.01] hover:no-underline"
      >
        <div className="flex min-w-0 flex-col gap-1.5">
          <p className="text-[14px] text-fg-2">{label}</p>
          <p className="text-[clamp(26px,3.2vw,40px)] leading-[1.05] font-bold tracking-[-0.025em]">
            {title}
          </p>
          <p className="text-[17px] text-fg-2">{line}</p>
        </div>
        <span className="grid size-14 shrink-0 place-items-center rounded-full bg-accent text-white">
          <Icon name="arrow-right" size={24} />
        </span>
      </Link>
    </section>
  );
}
