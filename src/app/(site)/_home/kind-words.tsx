"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@lib/utils";
import { projectBySlug } from "@data/projects";
import type { Testimonial } from "@data/testimonials";
import { SectionHeader } from "@components/ui";
import { Modal } from "@components/client/modal";
import { OrgLogo, PersonName } from "@components/person-name";

/** Quotes longer than this are shortened, with the rest in a pop-up. */
const SHORT = 260;

function Person({ t, size = 44 }: { t: Testimonial; size?: number }) {
  const project = t.project ? projectBySlug(t.project) : undefined;
  return (
    <figcaption className="flex items-center gap-3.5">
      {t.photo && (
        <Image
          src={t.photo}
          alt={t.name}
          width={size}
          height={size}
          className="flex-none rounded-full object-cover"
          style={{ width: size, height: size }}
        />
      )}
      <span className="flex min-w-0 flex-col">
        <PersonName
          name={t.name}
          href={t.link}
          className="text-[16px] font-semibold"
        />
        <span className="text-[14px] text-fg-2">
          {[t.role, t.org].filter(Boolean).join(", ")}
          {project && (
            <>
              {" "}
              on{" "}
              <Link
                href={`/projects/${project.slug}`}
                className="underline decoration-1 underline-offset-[3px]"
              >
                {project.title}
              </Link>
            </>
          )}
        </span>
      </span>
      <OrgLogo org={t.org} logo={t.orgLogo} href={t.orgLink} />
    </figcaption>
  );
}

/**
 * "Kind words." One lead quote set large, the rest beside it. Hidden
 * until a testimonial is added (and cleared for use) in the CMS.
 */
export function KindWords({
  items,
  title,
  sub,
}: {
  items: Testimonial[];
  title: string;
  sub?: string;
}) {
  const [open, setOpen] = useState<Testimonial | null>(null);
  if (!items.length) return null;
  const lead = items.find((t) => t.lead) ?? items[0];
  const rest = items.filter((t) => t !== lead);

  return (
    <section aria-labelledby="kind-words" className="gutter band-y">
      <div className="wrap flex flex-col gap-[clamp(40px,5vw,72px)]">
        <SectionHeader id="kind-words" title={title} sub={sub} />
        <div
          className={cn(
            "flex flex-wrap items-start gap-x-[clamp(40px,6vw,96px)] gap-y-[clamp(40px,5vw,64px)]",
          )}
        >
          <figure
            data-reveal=""
            className={cn(
              "m-0 flex min-w-0 flex-col gap-[clamp(24px,3vw,36px)]",
              rest.length ? "flex-[1.5_1_480px]" : "max-w-[900px] flex-1",
            )}
          >
            <blockquote className="relative m-0">
              <span
                aria-hidden="true"
                className="font-display absolute -top-[0.28em] -left-[0.04em] text-[clamp(88px,9vw,132px)] leading-none text-accent-text/35 select-none"
              >
                &ldquo;
              </span>
              <p className="font-display relative pt-[clamp(28px,3vw,40px)] text-[clamp(26px,2.9vw,40px)] leading-[1.28] font-medium tracking-[-0.005em] text-pretty">
                {lead.quote}
              </p>
            </blockquote>
            <Person t={lead} size={52} />
          </figure>

          {rest.length > 0 && (
            <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-[clamp(32px,4vw,48px)]">
              {rest.map((t) => {
                const long = t.quote.length > SHORT;
                return (
                  <figure
                    key={t.id}
                    data-reveal=""
                    className="m-0 flex flex-col gap-4 border-t border-pill pt-[clamp(24px,3vw,32px)]"
                  >
                    <blockquote className="m-0">
                      <p
                        className={cn(
                          "text-[17px] leading-[1.6] text-fg",
                          long && "line-clamp-5",
                        )}
                      >
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      {long && (
                        <button
                          type="button"
                          onClick={() => setOpen(t)}
                          aria-haspopup="dialog"
                          className="mt-2 border-0 bg-transparent p-0 text-[15px] font-medium text-accent-text hover:underline"
                        >
                          Read the full quote
                        </button>
                      )}
                    </blockquote>
                    <Person t={t} />
                  </figure>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <Modal
            label={`Quote from ${open.name}`}
            onClose={() => setOpen(null)}
            className="max-w-[680px]"
          >
            <figure className="m-0 flex flex-col gap-6 p-[clamp(28px,4vw,48px)] pt-16">
              <blockquote className="m-0">
                <p className="font-display text-[clamp(22px,2.4vw,28px)] leading-[1.4] font-medium">
                  &ldquo;{open.quote}&rdquo;
                </p>
              </blockquote>
              <Person t={open} />
            </figure>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
}
