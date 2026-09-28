"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@lib/utils";
import type { Media, Project, SmallApp } from "@data/types";
import { Icon } from "../icon";
import { buttonClass, SmartLink } from "../ui";
import { Modal } from "./modal";
import { track } from "./analytics";

/** True for a plain left click (not ctrl/cmd/shift/middle click). */
const plainClick = (e: React.MouseEvent) =>
  e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;

/**
 * A project card that opens a pop-up preview. It stays a real link to the
 * case study, so new-tab clicks, crawlers and no-JS visitors still work.
 */
export function ProjectPeek({
  project,
  className,
  children,
  ...rest
}: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  project: Project;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Link
        href={`/projects/${project.slug}`}
        aria-haspopup="dialog"
        className={className}
        onClick={(e) => {
          if (!plainClick(e)) return;
          e.preventDefault();
          setOpen(true);
          track("project_preview", { slug: project.slug });
        }}
        {...rest}
      >
        {children}
      </Link>
      {open && (
        <ProjectDialog project={project} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

/** Image carousel at each image's own shape, with arrows and dots. */
function Carousel({
  items,
  index,
  onIndex,
}: {
  items: Media[];
  index: number;
  onIndex: (i: number) => void;
}) {
  const n = items.length;
  const item = items[index];
  const go = (d: number) => onIndex((index + d + n) % n);
  return (
    <div className="relative bg-bg-alt">
      <div className="flex min-h-[200px] items-center justify-center px-[clamp(16px,4vw,48px)] pt-16 pb-8">
        <Image
          key={index}
          quality={100}
          src={item.src}
          alt={item.alt}
          sizes="(max-width: 900px) 100vw, 880px"
          className="h-auto max-h-[52vh] w-auto max-w-full rounded-[12px]"
        />
      </div>
      {n > 1 && (
        <>
          {[-1, 1].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => go(d)}
              aria-label={d < 0 ? "Previous image" : "Next image"}
              className={cn(
                "absolute top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-well text-fg transition-colors hover:bg-pill",
                d < 0 ? "left-3" : "right-3",
              )}
            >
              <Icon name={d < 0 ? "chevron-left" : "chevron-right"} size={18} />
            </button>
          ))}
          <div className="flex items-center justify-center gap-1.5 pb-4">
            {items.map((m, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onIndex(i)}
                aria-label={`Image ${i + 1} of ${n}`}
                aria-current={i === index ? "true" : undefined}
                className="grid size-6 place-items-center"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-all",
                    i === index ? "w-5 bg-accent" : "w-1.5 bg-fg-2/50",
                  )}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Video({ src, poster }: { src: string; poster?: Media }) {
  return (
    <div className="bg-black pt-16">
      <video
        src={src}
        poster={poster?.src.src}
        controls
        autoPlay
        muted
        playsInline
        preload="metadata"
        className="block max-h-[56vh] w-full"
      />
    </div>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
      {items.map((s) => (
        <li
          key={s}
          className="rounded-full bg-well px-3 py-1 text-[13px] font-medium"
        >
          {s}
        </li>
      ))}
    </ul>
  );
}

export function ProjectDialog({
  project: p,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const gallery = p.gallery ?? [];
  const n = gallery.length;
  return (
    <Modal
      label={p.title}
      onClose={onClose}
      onKey={(e) => {
        if (p.video || n < 2) return;
        if (e.key === "ArrowLeft") setIndex((index - 1 + n) % n);
        if (e.key === "ArrowRight") setIndex((index + 1) % n);
      }}
    >
      {p.video ? (
        <Video src={p.video} poster={p.cover} />
      ) : n ? (
        <Carousel items={gallery} index={index} onIndex={setIndex} />
      ) : null}
      <div
        className={cn(
          "flex flex-col gap-5 p-[clamp(24px,4vw,40px)]",
          !p.video && !n && "pt-16",
        )}
      >
        <div className="flex flex-col gap-1.5">
          <p className="text-[13px] font-semibold text-fg-2">
            {p.subtext} · {p.year}
          </p>
          <h2 className="text-[clamp(30px,3.6vw,42px)] leading-[1.05] font-bold">
            {p.title}
          </h2>
          <p className="text-[17px] text-fg-2">{p.line}</p>
          <p className="text-[14px] font-medium">{p.role}</p>
        </div>
        <Tags items={p.skills} />
        <div className="flex flex-col gap-3 text-[16px] leading-[1.55] text-fg-2">
          <p>{p.did}</p>
          <p>
            <span className="font-semibold text-fg">Outcome: </span>
            {p.outcome}
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5 border-t border-pill pt-5">
          <Link
            href={`/projects/${p.slug}`}
            onClick={onClose}
            className={buttonClass("primary", "md")}
          >
            Read the full case study
            <Icon name="arrow-right" size={16} />
          </Link>
          {p.links.map((l) => (
            <SmartLink
              key={l.href}
              href={l.href}
              className={buttonClass("secondary", "md")}
              data-track="project_link"
            >
              {l.label}
              <Icon name="arrow-up-right" size={16} />
            </SmartLink>
          ))}
        </div>
      </div>
    </Modal>
  );
}

/** A small-app card that opens its demo video in a pop-up. */
export function SmallAppPeek({
  app,
  className,
  children,
}: {
  app: SmallApp;
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={`${app.title}, watch the demo`}
        onClick={() => {
          setOpen(true);
          track("small_app_preview", { title: app.title });
        }}
        className={cn(
          "block w-full border-0 bg-transparent p-0 text-left",
          className,
        )}
      >
        {children}
      </button>
      {open && (
        <Modal label={app.title} onClose={() => setOpen(false)}>
          {app.video && <Video src={app.video} poster={app.image} />}
          <div
            className={cn(
              "flex flex-col gap-2 p-[clamp(24px,4vw,36px)]",
              !app.video && "pt-16",
            )}
          >
            <p className="text-[13px] font-semibold text-fg-2">
              {app.tech} · {app.year}
            </p>
            <h2 className="text-[clamp(28px,3.2vw,36px)] leading-[1.05] font-bold">
              {app.title}
            </h2>
            <p className="text-[16px] text-fg-2">{app.text}</p>
          </div>
        </Modal>
      )}
    </>
  );
}
