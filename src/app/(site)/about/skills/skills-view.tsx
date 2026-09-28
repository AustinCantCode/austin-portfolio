"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { cn } from "@lib/utils";
import type { Project, SkillGroup } from "@data/types";
import { Icon } from "@components/icon";

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace("strapicms", "strapi")
    .replace("swaggerui", "swagger");

/** Skill pills that filter a "Used in" list of projects. */
export function SkillsView({
  groups,
  projects,
}: {
  groups: SkillGroup[];
  projects: Project[];
}) {
  const [pick, setPick] = useState<string | null>(null);
  const panelRef = useRef<HTMLElement>(null);
  const usedIn = (skill: string) =>
    projects.filter((p) => p.skills.some((k) => norm(k) === norm(skill)));
  const uses = pick ? usedIn(pick) : [];

  const choose = (name: string) => {
    const on = pick === name;
    setPick(on ? null : name);
    if (!on) {
      setTimeout(() => {
        const el = panelRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top > window.innerHeight - 120) {
          window.scrollTo({
            top: r.top + window.scrollY - 140,
            behavior: "smooth",
          });
        }
      }, 60);
    }
  };

  return (
    <>
      <section
        aria-label="Skill groups"
        className="gutter pb-[clamp(72px,10vw,128px)]"
      >
        <div className="wrap flex flex-col">
          {groups.map((g) => (
            <div
              key={g.name}
              className="flex flex-wrap gap-x-[clamp(28px,6vw,88px)] gap-y-3 border-t border-pill py-7"
            >
              <div className="flex flex-[0_0_240px] flex-col gap-1">
                <h2 className="text-[clamp(21px,2.4vw,26px)] font-bold tracking-[-0.015em]">
                  {g.name}
                </h2>
                <p className="text-[14px] text-fg-2">{g.plain}</p>
              </div>
              <ul className="m-0 flex min-w-0 flex-[1_1_360px] list-none flex-wrap content-start gap-2 p-0">
                {g.items.map((name) => {
                  const n = usedIn(name).length;
                  const on = pick === name;
                  return (
                    <li key={name}>
                      <button
                        type="button"
                        onClick={() => choose(name)}
                        aria-pressed={on}
                        aria-controls="used-in"
                        className={cn(
                          "inline-flex h-[38px] items-center gap-2 rounded-full border-0 px-4 text-[15px] font-medium transition-[background-color,color,transform] duration-200 press",
                          on ? "bg-fg text-bg" : "bg-bg-alt text-fg",
                        )}
                      >
                        {name}
                        {n > 0 && (
                          <span
                            className="text-[12px] opacity-65"
                            aria-label={`, used in ${n} projects`}
                          >
                            {n}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section
        ref={panelRef}
        id="used-in"
        aria-live="polite"
        aria-label="Projects using the selected skill"
        className={cn("gutter pb-[clamp(72px,10vw,128px)]", !pick && "hidden")}
      >
        {pick && (
          <div className="wrap flex flex-col gap-5 rounded-[28px] bg-bg-alt p-[clamp(24px,4vw,44px)]">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em]">
                {pick}
                {uses.length > 0 &&
                  ` is in ${uses.length} ${uses.length === 1 ? "project" : "projects"}`}
              </h2>
              <button
                type="button"
                onClick={() => setPick(null)}
                aria-label="Clear selection"
                className="grid size-9 flex-none place-items-center rounded-full border-0 bg-pill text-fg"
              >
                <Icon name="x" size={16} />
              </button>
            </div>
            {uses.length > 0 ? (
              <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-3 p-0">
                {uses.map((u) => (
                  <li key={u.slug}>
                    <Link
                      href={`/projects/${u.slug}`}
                      className="lift flex flex-col gap-0.5 rounded-[18px] bg-tile px-5 py-4 text-fg [--hover-scale:1.02] hover:no-underline"
                    >
                      <span className="text-[17px] font-semibold">
                        {u.title}
                      </span>
                      <span className="text-[13px] text-fg-2">
                        {u.subtext} · {u.year}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[17px] text-fg-2">
                Used in learning and day-to-day work rather than a listed
                project.
              </p>
            )}
          </div>
        )}
      </section>
    </>
  );
}
