import Image from "next/image";
import Link from "next/link";
import playBadge from "../../public/stillgood/google-play-badge.png";
import { cn } from "@lib/utils";
import type { Project, SmallApp, Venture } from "@data/types";
import { site } from "@data/site";
import { ImageSlot, LaptopFrame, PhoneFrame, TileMedia } from "./media";
import { SmartLink } from "./ui";

export const projectHref = (p: Project) => `/projects/${p.slug}`;
export const projectMeta = (p: Project) => `${p.subtext} · ${p.year}`;

/**
 * A project card: meta, title and one-liner, with the device frame bleeding
 * off the bottom. `compact` is the smaller Work-page version.
 */
export function ProjectTile({
  project,
  compact,
  devices,
  reveal = true,
}: {
  project: Project;
  compact?: boolean;
  /** Show the work in a tablet or phone only (see TileMedia). */
  devices?: boolean;
  reveal?: boolean;
}) {
  return (
    <Link
      href={projectHref(project)}
      data-reveal={reveal ? "" : undefined}
      data-hover-card=""
      className={cn(
        "lift flex flex-col overflow-hidden bg-tile-alt text-fg hover:no-underline",
        compact ? "rounded-[24px]" : "rounded-[28px]",
      )}
    >
      <div
        className={cn(
          "flex flex-col",
          compact
            ? "gap-1 px-[clamp(20px,2.4vw,28px)] pt-[clamp(20px,2.4vw,28px)]"
            : "gap-1.5 px-[clamp(24px,3vw,36px)] pt-[clamp(24px,3vw,36px)]",
        )}
      >
        <p
          data-hover-detail=""
          className={cn(
            "font-semibold text-fg-2",
            compact ? "text-[12px]" : "text-[13px]",
          )}
        >
          {projectMeta(project)}
        </p>
        <h3
          className={cn(
            "font-bold tracking-[-0.02em]",
            compact
              ? "text-[clamp(21px,2vw,24px)] leading-[1.2]"
              : "text-[clamp(22px,2.1vw,26px)] leading-[1.15]",
          )}
        >
          {project.title}
        </h3>
        <p
          data-hover-detail=""
          className={cn("text-fg-2", compact ? "text-[15px]" : "text-[17px]")}
        >
          {project.line}
        </p>
      </div>
      <div className={compact ? "mt-6" : "mt-8"}>
        {compact ? (
          <TileMedia
            project={project}
            height="clamp(180px,15vw,240px)"
            phoneSize={160}
            compact
          />
        ) : (
          <TileMedia
            project={project}
            devices={devices}
            height={devices ? "clamp(240px,22vw,290px)" : undefined}
          />
        )}
      </div>
    </Link>
  );
}

/** Horizontal tile for categories with two or fewer projects. */
export function RowTile({ project }: { project: Project }) {
  return (
    <Link
      href={projectHref(project)}
      data-reveal=""
      data-hover-card=""
      className="lift flex flex-wrap items-stretch overflow-hidden rounded-[28px] bg-tile-alt text-fg [--hover-scale:1.01] hover:no-underline"
    >
      <div className="flex min-w-0 flex-[1_1_320px] flex-col justify-center gap-2 p-[clamp(28px,5vw,64px)]">
        <p data-hover-detail="" className="text-[13px] font-semibold text-fg-2">
          {projectMeta(project)}
        </p>
        <h3 className="text-[clamp(26px,2.8vw,36px)] leading-[1.1] font-bold tracking-[-0.025em]">
          {project.title}
        </h3>
        <p
          data-hover-detail=""
          className="max-w-[380px] text-[clamp(17px,1.8vw,21px)] text-fg-2"
        >
          {project.line}
        </p>
        <p data-hover-detail="" className="mt-2 text-[17px] text-accent-text">
          Read the case study ›
        </p>
      </div>
      <div className="relative h-[clamp(300px,40vw,460px)] min-w-0 flex-[1.4_1_420px] bg-pill">
        <ImageSlot
          media={project.cover}
          placeholder={`${project.title} image`}
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>
    </Link>
  );
}

/** Venture card for the Work page. The first (StillGood) is a dark band. */
export function VentureCard({
  venture,
  band,
}: {
  venture: Venture;
  band?: boolean;
}) {
  return (
    <Link
      href={venture.href}
      data-hover-card=""
      className={cn(
        "lift flex min-h-[300px] flex-col items-start gap-2.5 rounded-[24px] p-[clamp(24px,3vw,36px)] hover:no-underline",
        band ? "bg-band text-band-fg" : "bg-bg-alt text-fg",
      )}
    >
      <p
        className={cn(
          "text-[12px] font-semibold",
          band ? "text-band-fg-2" : "text-fg-2",
        )}
      >
        {venture.date} · {venture.role}
      </p>
      <p className="font-display text-[clamp(28px,3vw,36px)] leading-[1.08] font-bold tracking-[-0.025em]">
        {venture.name}
      </p>
      <p
        data-hover-detail=""
        className={cn("text-[16px]", band ? "text-band-fg-2" : "text-fg-2")}
      >
        {venture.line}
      </p>
      <p
        className={cn(
          "mt-auto inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-semibold",
          band ? "bg-band-pill" : "bg-pill",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "size-[7px] rounded-full",
            band ? "bg-live" : "bg-accent",
          )}
        />
        {venture.status}
      </p>
      <p
        data-hover-detail=""
        className={cn(
          "text-[16px]",
          band ? "text-band-link" : "text-accent-text",
        )}
      >
        {venture.cta} ›
      </p>
    </Link>
  );
}

/** Large venture panel for the /work/ventures page. */
export function VenturePanel({
  venture,
  band,
  media,
}: {
  venture: Venture;
  band?: boolean;
  media: React.ReactNode;
}) {
  return (
    <article
      data-reveal=""
      className={cn(
        "flex flex-wrap items-stretch overflow-hidden rounded-[28px]",
        band ? "bg-band text-band-fg" : "bg-bg-alt text-fg",
      )}
    >
      <div className="flex min-w-0 flex-[1_1_360px] flex-col items-start justify-center gap-2.5 p-[clamp(28px,5vw,64px)]">
        <p
          className={cn(
            "text-[13px] font-semibold",
            band ? "text-band-fg-2" : "text-fg-2",
          )}
        >
          {venture.date} · {venture.role}
        </p>
        <h2 className="text-[clamp(28px,3.4vw,40px)] leading-[1.05] font-bold tracking-[-0.025em]">
          {venture.name}
        </h2>
        <p
          className={cn(
            "max-w-[420px] text-[clamp(17px,1.5vw,19px)]",
            band ? "text-band-fg-2" : "text-fg-2",
          )}
        >
          {venture.line}
        </p>
        <p
          className={cn(
            "mt-1.5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-semibold",
            band ? "bg-band-pill" : "bg-pill",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "size-[7px] rounded-full",
              band ? "bg-live" : "bg-accent",
            )}
          />
          {venture.status}
        </p>
        <Link
          href={venture.href}
          className={cn(
            "mt-2.5 text-[17px]",
            band ? "text-band-link" : "text-accent-text",
          )}
        >
          {venture.cta} ›
        </Link>
      </div>
      <div className="flex min-h-[clamp(300px,36vw,440px)] min-w-0 flex-[1_1_380px] items-end justify-center overflow-hidden px-[clamp(24px,4vw,48px)] pt-[clamp(28px,4vw,48px)]">
        {media}
      </div>
    </article>
  );
}

export { PhoneFrame, LaptopFrame };

/** Small-app card (4:3 screenshot, title, tech). */
export function SmallAppCard({
  app,
  size = "md",
}: {
  app: SmallApp;
  size?: "sm" | "md";
}) {
  const sm = size === "sm";
  return (
    <article
      data-hover-card=""
      className={cn(
        "group/app flex h-full flex-col overflow-hidden bg-tile-alt",
        sm ? "min-w-[180px] rounded-[20px]" : "rounded-[24px]",
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-pill">
        <ImageSlot
          media={app.image}
          placeholder={`${app.title} screenshot`}
          sizes={sm ? "240px" : "(max-width: 768px) 100vw, 25vw"}
          className="transition-transform duration-[600ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover/app:scale-[1.04]"
        />
      </div>
      <div
        className={cn(
          "flex flex-col gap-0.5",
          sm ? "px-4 pt-3.5 pb-4" : "px-5 pt-[18px] pb-5",
        )}
      >
        <h3
          className={cn(
            "tracking-[-0.01em]",
            sm ? "text-[15px] font-semibold" : "text-[19px] font-semibold",
          )}
        >
          {app.title}
        </h3>
        <p
          data-hover-detail=""
          className={cn("text-fg-2", sm ? "text-[12px]" : "text-[14px]")}
        >
          {app.tech}
        </p>
      </div>
    </article>
  );
}

/** The official "Get it on Google Play" badge, linking to StillGood. */
export function GooglePlayBadge({ className }: { className?: string }) {
  return (
    <SmartLink
      href={site.googlePlayUrl}
      data-track="play_store_click"
      className={cn("inline-block shrink-0 hover:no-underline", className)}
    >
      {/* The badge art includes Google's required clear space, so the
          negative margin lines the visible badge up with its neighbours. */}
      <Image
        quality={100}
        src={playBadge}
        alt="Get it on Google Play"
        height={78}
        className="-m-[13px] h-[78px] w-auto max-w-none"
      />
    </SmartLink>
  );
}
