"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@lib/utils";
import type { Project, SmallApp, Venture } from "@data/types";
import { ImageSlot, PhoneFrame, TabletFrame } from "../media";
import { Icon } from "../icon";
import {
  PHONE,
  isWide,
  lookOf,
  phoneLook,
  tabletLook,
  widthOf,
  type Look,
  type Size,
} from "../showroom-look";
import { ProjectPeek, SmallAppPeek } from "./project-peek";
import { Carousel } from "./carousel";
import { EASE, useReducedMotionPref } from "./motion";

/*
 * The showroom: work stands on the page instead of sitting in cards. Each
 * piece is shown whole, in a device shaped to its screenshot, on a soft
 * floor shadow, with its caption set underneath. Items in a grid row share
 * one floor line and one caption line (CSS subgrid).
 */

// Hover: the device rises off its floor and the shadow tightens under it.
const rise = (y: number): Variants => ({
  rest: { y: 0 },
  hover: { y, transition: { type: "spring", stiffness: 300, damping: 22 } },
});
const RISE = { lg: rise(-10), sm: rise(-6) };
const floor: Variants = {
  rest: { scaleX: 1, opacity: 1 },
  hover: {
    scaleX: 0.86,
    opacity: 0.6,
    transition: { duration: 0.4, ease: EASE },
  },
};

/** Starts the hover variants for everything inside it. */
function HoverHost({ className, children, ...rest }: ComponentProps<"div">) {
  const still = useReducedMotionPref();
  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover={still ? undefined : "hover"}
      className={className}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </motion.div>
  );
}

/** A device (or object) on its floor shadow. */
function Stand({
  width,
  size,
  className,
  children,
}: {
  width: string;
  size: Size;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("relative", className)} style={{ width }}>
      {/* Positioned with insets: Framer owns this element's transform. */}
      <motion.span
        aria-hidden="true"
        variants={floor}
        className={cn(
          "floor-shadow pointer-events-none absolute inset-x-[12%] rounded-[50%]",
          size === "lg"
            ? "-bottom-[10px] h-[20px] blur-[14px]"
            : "-bottom-[7px] h-[14px] blur-[10px]",
        )}
      />
      <motion.div variants={RISE[size]} className="relative">
        {children}
      </motion.div>
    </div>
  );
}

const SIZES = {
  lg: {
    wide: "(max-width: 768px) 100vw, 640px",
    tall: "(max-width: 768px) 60vw, 320px",
  },
  sm: {
    wide: "(max-width: 768px) 100vw, 400px",
    tall: "(max-width: 768px) 50vw, 240px",
  },
};

/**
 * The work itself, in its kind's one fixed shape (showroom-look SHAPES):
 * a screenshot fills its screen from the top, a photo fills its print, and
 * a mockup sits whole in its square.
 */
function Device({
  look,
  size,
  label,
  badge,
  sizes: sizesOverride,
  priority,
}: {
  look: Look;
  size: Size;
  label: string;
  badge?: ReactNode;
  sizes?: string;
  priority?: boolean;
}) {
  const sizes = sizesOverride ?? SIZES[size][isWide(look) ? "wide" : "tall"];
  const slot = (
    <ImageSlot
      media={look.media}
      placeholder={look.label ?? label}
      sizes={sizes}
      priority={priority}
      fit="cover"
      position="top"
      compact={size === "sm" && look.kind === "phone"}
    />
  );
  switch (look.kind) {
    case "tablet":
      return (
        <TabletFrame ratio={look.ratio}>
          {slot}
          {badge}
        </TabletFrame>
      );
    case "phone":
      return (
        <PhoneFrame size={PHONE[size]} width="100%" ratio={look.ratio}>
          {slot}
          {badge}
        </PhoneFrame>
      );
    case "icon":
      return (
        <div className="relative aspect-square overflow-hidden rounded-[22%]">
          {slot}
        </div>
      );
    case "object":
      return (
        <div
          className={cn(
            "relative",
            look.photo &&
              "overflow-hidden rounded-[clamp(12px,1.4vw,18px)] bg-pill",
          )}
          style={{ aspectRatio: look.ratio }}
        >
          <ImageSlot
            media={look.media}
            placeholder={look.label ?? label}
            sizes={sizes}
            priority={priority}
            fit={look.photo ? "cover" : "contain"}
            position="center"
          />
          {badge}
        </div>
      );
  }
}

type Heading = "h2" | "h3" | "h4";

const GAP = {
  lg: "gap-y-[clamp(22px,2.6vw,32px)]",
  sm: "gap-y-[clamp(16px,1.8vw,22px)]",
};

const titleClass = (size: Size) =>
  cn(
    "font-display font-bold transition-colors duration-300 group-hover:text-accent-text group-focus-visible:text-accent-text",
    size === "lg"
      ? "text-[clamp(28px,2.6vw,36px)] leading-[1.08] tracking-[-0.015em]"
      : "text-[clamp(23px,2vw,27px)] leading-[1.12] tracking-[-0.01em]",
  );

function Caption({
  project: p,
  size,
  heading: H,
}: {
  project: Project;
  size: Size;
  heading: Heading;
}) {
  const lg = size === "lg";
  return (
    <div
      className={cn("flex max-w-[520px] flex-col", lg ? "gap-2" : "gap-1.5")}
    >
      <p
        className={cn(
          "font-medium text-fg-2",
          lg ? "text-[13px]" : "text-[12px]",
        )}
      >
        {p.subtext}, {p.year}
      </p>
      <H className={titleClass(size)}>{p.title}</H>
      <p
        className={cn(
          "leading-[1.5] text-fg-2",
          lg ? "text-[17px]" : "text-[15px]",
        )}
      >
        {p.line}
      </p>
      <p
        className={cn(
          "font-medium text-fg",
          lg ? "text-[14px]" : "text-[13px]",
        )}
      >
        {p.role}
      </p>
    </div>
  );
}

const STAGE_LG =
  "[--stage:clamp(280px,78vw,360px)] md:[--stage:clamp(300px,32vw,460px)]";

const linkClass =
  "group rounded-[20px] text-fg outline-offset-8 hover:no-underline";

/**
 * One project: the device on its floor with the caption underneath. It
 * spans two rows of its grid (device, caption) so a row lines up.
 */
export function ShowroomItem({
  project: p,
  size = "lg",
  heading = "h3",
  reveal = true,
  className,
}: {
  project: Project;
  size?: Size;
  heading?: Heading;
  reveal?: boolean;
  className?: string;
}) {
  const look = lookOf(p);
  const rows = cn("row-span-2 grid grid-rows-subgrid", GAP[size]);
  return (
    <HoverHost
      data-reveal={reveal ? "" : undefined}
      className={cn(rows, className)}
    >
      <ProjectPeek project={p} className={cn(linkClass, rows)}>
        <Stand width={widthOf(look, size)} size={size} className="self-end">
          <Device look={look} size={size} label={`${p.title} screenshot`} />
        </Stand>
        <Caption project={p} size={size} heading={heading} />
      </ProjectPeek>
    </HoverHost>
  );
}

/** A project on its own: the device on the left, its label beside it. */
export function ShowroomFeature({
  project: p,
  heading = "h3",
  className,
}: {
  project: Project;
  heading?: Heading;
  className?: string;
}) {
  const look = lookOf(p);
  return (
    <HoverHost data-reveal="" className={className}>
      <ProjectPeek
        project={p}
        className={cn(
          linkClass,
          "grid items-end gap-x-[clamp(28px,4vw,64px)] md:grid-cols-12",
          GAP.lg,
          STAGE_LG,
        )}
      >
        <Stand width={widthOf(look, "lg")} size="lg" className="md:col-span-6">
          <Device look={look} size="lg" label={`${p.title} screenshot`} />
        </Stand>
        <div className="md:col-span-6 md:pb-2">
          <Caption project={p} size="lg" heading={heading} />
        </div>
      </ProjectPeek>
    </HoverHost>
  );
}

/**
 * Projects in pairs, each taking half a row so every device of a kind is
 * the same size. One left over takes the same half, its label beside it.
 */
export function ShowroomPairs({
  projects,
  heading = "h3",
}: {
  projects: Project[];
  heading?: Heading;
}) {
  const rows: Project[][] = [];
  for (let i = 0; i < projects.length; i += 2)
    rows.push(projects.slice(i, i + 2));

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-x-[clamp(28px,4vw,64px)] gap-y-[clamp(64px,7vw,112px)] md:grid-cols-12",
        STAGE_LG,
      )}
    >
      {rows.flatMap((row) => {
        if (row.length === 1)
          return (
            <ShowroomFeature
              key={row[0].slug}
              project={row[0]}
              heading={heading}
              className="row-span-2 md:col-span-12"
            />
          );
        return row.map((p) => (
          <ShowroomItem
            key={p.slug}
            project={p}
            heading={heading}
            className="md:col-span-6"
          />
        ));
      })}
    </div>
  );
}

/** The compact showroom's grid: as many across as fit. */
const GRID_SM =
  "grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-x-[clamp(24px,3vw,48px)] gap-y-[clamp(48px,5vw,72px)] [--stage:clamp(200px,17vw,240px)]";

/** The compact showroom for the Work overview. */
export function ShowroomGrid({
  projects,
  heading = "h3",
}: {
  projects: Project[];
  heading?: Heading;
}) {
  return (
    <div className={GRID_SM}>
      {projects.map((p) => (
        <ShowroomItem
          key={p.slug}
          project={p}
          size="sm"
          heading={heading}
          reveal={false}
        />
      ))}
    </div>
  );
}

/**
 * A small app: its screenshot in a tablet, standing in a 16:10 box so a
 * row of them shares a floor. Clicking plays the demo in a pop-up.
 */
export function SmallAppItem({
  app,
  size = "lg",
}: {
  app: SmallApp;
  size?: Size;
}) {
  const lg = size === "lg";
  const badge = app.video && (
    <span
      aria-hidden="true"
      className={cn(
        "absolute right-2 bottom-2 grid place-items-center rounded-full bg-accent text-on-accent shadow-[var(--glow-accent)]",
        lg ? "size-9" : "size-8",
      )}
    >
      <Icon name="play" size={lg ? 16 : 14} />
    </span>
  );
  return (
    <HoverHost className="h-full">
      <SmallAppPeek
        app={app}
        className={cn(linkClass, "flex h-full flex-col", GAP[size])}
      >
        <span className="flex aspect-[16/10] items-end">
          <Stand width="100%" size="sm">
            <Device
              look={tabletLook(app.image)}
              size="sm"
              label={`${app.title} screenshot`}
              badge={badge}
            />
          </Stand>
        </span>
        <span className="flex flex-col gap-1">
          {/* Spans, not a heading: this is all inside a button. */}
          <span
            className={cn(
              "font-display font-bold transition-colors duration-300 group-hover:text-accent-text group-focus-visible:text-accent-text",
              lg ? "text-[23px] leading-[1.15]" : "text-[20px] leading-[1.15]",
            )}
          >
            {app.title}
          </span>
          <span className={cn("text-fg-2", lg ? "text-[15px]" : "text-[13px]")}>
            {app.text}
          </span>
          <span
            className={cn(
              "font-medium text-fg",
              lg ? "text-[13px]" : "text-[12px]",
            )}
          >
            {app.tech}, {app.year}
          </span>
        </span>
      </SmallAppPeek>
    </HoverHost>
  );
}

function VentureText({
  venture: v,
  size,
  heading: H,
}: {
  venture: Venture;
  size: Size;
  heading: Heading;
}) {
  const lg = size === "lg";
  return (
    <div
      className={cn(
        "flex max-w-[520px] flex-col items-start",
        lg ? "gap-2" : "gap-1.5",
      )}
    >
      <p
        className={cn(
          "font-medium text-fg-2",
          lg ? "text-[13px]" : "text-[12px]",
        )}
      >
        {v.date}
      </p>
      <H className={titleClass(size)}>{v.name}</H>
      <p
        className={cn(
          "leading-[1.5] text-fg-2",
          lg ? "text-[17px]" : "text-[15px]",
        )}
      >
        {v.line}
      </p>
      <p
        className={cn(
          "font-medium text-fg",
          lg ? "text-[14px]" : "text-[13px]",
        )}
      >
        {v.role}
      </p>
      <p
        className={cn(
          "inline-flex items-center gap-2 text-fg-2",
          lg ? "mt-1 text-[14px]" : "text-[13px]",
        )}
      >
        <span
          aria-hidden="true"
          className="size-[7px] flex-none rounded-full bg-accent"
        />
        {v.status}
      </p>
      <p
        className={cn(
          "text-accent-text",
          lg ? "mt-1 text-[17px]" : "text-[15px]",
        )}
      >
        {v.cta} ›
      </p>
    </div>
  );
}

/** A venture on its own row, for the Ventures page. */
export function VentureFeature({
  venture,
  look,
  heading = "h3",
}: {
  venture: Venture;
  look: Look;
  heading?: Heading;
}) {
  return (
    <HoverHost data-reveal="">
      <Link
        href={venture.href}
        className={cn(
          linkClass,
          "grid items-end gap-x-[clamp(28px,4vw,64px)] md:grid-cols-12",
          GAP.lg,
          STAGE_LG,
        )}
      >
        <Stand width={widthOf(look, "lg")} size="lg" className="md:col-span-7">
          <Device look={look} size="lg" label={`${venture.name} image`} />
        </Stand>
        <div className="md:col-span-5 md:pb-2">
          <VentureText venture={venture} size="lg" heading={heading} />
        </div>
      </Link>
    </HoverHost>
  );
}

/**
 * A project page's hero: the work standing large on the page, uncropped.
 * Apps show their main and second screens side by side.
 */
export function ShowroomHero({ project: p }: { project: Project }) {
  const main = lookOf(p);
  const second =
    main.kind === "phone" && p.second && p.slug !== "telegpt"
      ? phoneLook(p.second)
      : null;
  const wide = isWide(main);
  return (
    <div className="flex items-end justify-center gap-[clamp(24px,5vw,72px)] [--stage:clamp(300px,78vw,420px)] md:[--stage:clamp(340px,42vw,580px)]">
      <Stand width={widthOf(main, "lg")} size="lg">
        <Device
          look={main}
          size="lg"
          label={`${p.title} screenshot`}
          sizes={
            wide
              ? "(max-width: 1240px) 100vw, 1200px"
              : "(max-width: 768px) 70vw, 400px"
          }
          priority
        />
      </Stand>
      {second && (
        <Stand
          width={widthOf(second, "lg")}
          size="lg"
          className="max-[560px]:hidden"
        >
          <Device
            look={second}
            size="lg"
            label={`${p.title} second screen`}
            sizes="(max-width: 768px) 70vw, 400px"
          />
        </Stand>
      )}
    </div>
  );
}

/** One slide of the carousel: the device in a fixed stage, so floors line up. */
function ShowroomSlide({ project: p }: { project: Project }) {
  const look = lookOf(p);
  return (
    <HoverHost className="h-full">
      <ProjectPeek
        project={p}
        className={cn(linkClass, "flex h-full flex-col", GAP.sm)}
      >
        <div className="flex h-[var(--stage)] items-end">
          <Stand width={widthOf(look, "sm")} size="sm">
            <Device look={look} size="sm" label={`${p.title} screenshot`} />
          </Stand>
        </div>
        <Caption project={p} size="sm" heading="h3" />
      </ProjectPeek>
    </HoverHost>
  );
}

/** Other projects from the same area, at the bottom of a project page. */
export function ShowroomCarousel({
  title,
  href,
  linkLabel = "See all ›",
  projects,
}: {
  title: string;
  href: string;
  linkLabel?: string;
  projects: Project[];
}) {
  if (!projects.length) return null;
  const id = "more-projects";
  return (
    <section aria-labelledby={id} className="gutter band-y-2">
      <div className="wrap flex flex-col gap-[clamp(28px,3.4vw,48px)]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 id={id} className="t-h2">
            {title}
          </h2>
          <Link href={href} className="py-1 text-[15px]">
            {linkLabel}
          </Link>
        </div>
        <Carousel label="more projects">
          {projects.map((p) => (
            <div
              key={p.slug}
              className="w-[clamp(250px,24vw,300px)] flex-none snap-start [--stage:clamp(180px,16vw,220px)]"
            >
              <ShowroomSlide project={p} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
