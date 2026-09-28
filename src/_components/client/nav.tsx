"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@lib/utils";
import {
  categories,
  categoryCount,
  categoryHref,
  navSections,
} from "@data/categories";
import { projects } from "@data/projects";
import logo from "../../../public/AS-Circle-Logo.png";
import { Icon } from "../icon";
import { ThemeToggle } from "./theme-toggle";

type Section = "work" | "about" | "contact" | null;

const activeSection = (path: string): Section => {
  if (/^\/(work|projects|stillgood)(\/|$)/.test(path)) return "work";
  if (/^\/(about|cv)(\/|$)/.test(path)) return "about";
  if (/^\/contact(\/|$)/.test(path)) return "contact";
  return null;
};

const canHover = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

export function Nav() {
  const pathname = usePathname();
  const active = activeSection(pathname);
  const currentCategory = pathname.match(/^\/work\/([^/]+)/)?.[1];
  const [open, setOpen] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const workBtn = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    clearTimeout(hoverTimer.current);
    setOpen(false);
  }, []);

  // Close the menu on navigation.
  useEffect(() => close(), [pathname, close]);
  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  const link = (key: Section) =>
    cn(
      "text-[14px] hover:text-fg hover:no-underline",
      active === key ? "font-semibold text-fg" : "font-normal text-fg-2",
    );

  return (
    <header
      className="sticky top-0 z-50 w-full bg-bg text-fg"
      onMouseLeave={() => {
        clearTimeout(hoverTimer.current);
        if (canHover()) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          workBtn.current?.focus();
        }
      }}
    >
      <nav
        aria-label="Main"
        className="wrap gutter relative z-[2] flex h-14 items-center gap-6 bg-bg"
      >
        <Link
          href="/"
          aria-label="Austin Sia, home"
          className="mr-auto flex items-center gap-2.5 text-fg hover:no-underline"
        >
          <Image
            quality={100}
            src={logo}
            alt=""
            width={28}
            height={28}
            priority
            className="block rounded-full"
          />
          <span className="text-[15px] font-semibold tracking-[-0.01em]">
            Austin Sia
          </span>
        </Link>
        <div className="flex items-center gap-[clamp(12px,3vw,32px)]">
          <button
            ref={workBtn}
            type="button"
            aria-expanded={open}
            aria-controls="work-menu"
            aria-current={active === "work" ? "page" : undefined}
            onClick={() => setOpen((v) => !v)}
            onMouseEnter={() => {
              if (!canHover()) return;
              clearTimeout(hoverTimer.current);
              hoverTimer.current = setTimeout(() => setOpen(true), 120);
            }}
            className={cn(
              "inline-flex h-9 items-center gap-1 border-0 bg-transparent p-0 text-[14px] hover:text-fg",
              active === "work" ? "font-semibold text-fg" : "text-fg-2",
            )}
          >
            Work
            <Icon
              name="chevron-down"
              size={14}
              className={cn(
                "transition-transform duration-[250ms]",
                open && "rotate-180",
              )}
            />
          </button>
          <Link
            href="/about"
            aria-current={active === "about" ? "page" : undefined}
            className={link("about")}
          >
            About
          </Link>
          <Link
            href="/contact"
            aria-current={active === "contact" ? "page" : undefined}
            className={link("contact")}
          >
            Contact
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      {open && (
        <>
          <div
            id="work-menu"
            className="absolute inset-x-0 top-14 z-[1] max-h-[calc(100vh_-_56px)] overflow-auto bg-menu shadow-[var(--shadow-menu)]"
          >
            <div className="wrap gutter flex flex-wrap gap-[clamp(20px,4vw,56px)] pt-[clamp(20px,3vw,32px)] pb-[clamp(28px,4vw,44px)]">
              <div className="flex flex-[0_1_220px] flex-col gap-2">
                <p className="text-[12px] font-semibold text-fg-2">
                  Explore work
                </p>
                <Link
                  href="/work"
                  className="font-display text-[clamp(24px,2.6vw,28px)] leading-[1.15] font-bold tracking-[-0.02em] text-fg hover:text-accent-text hover:no-underline"
                >
                  All work
                </Link>
                <p className="text-[14px] text-fg-2">
                  {projects.length} projects, {categories.length} categories
                </p>
              </div>
              <div className="grid min-w-0 flex-[1_1_640px] grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-[clamp(24px,3vw,48px)] gap-y-6">
                {navSections.map((sec) => (
                  <div
                    key={sec.id}
                    className="flex flex-col gap-1.5 border-l border-pill pl-[clamp(0px,2vw,24px)]"
                  >
                    <p className="flex items-center gap-2 pb-1 text-[12px] font-semibold text-fg-2">
                      <Icon name={sec.icon} size={14} />
                      {sec.label}
                    </p>
                    <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
                      {sec.categories.map((slug) => {
                        const c = categories.find((x) => x.slug === slug)!;
                        const current = currentCategory === slug;
                        return (
                          <li key={slug}>
                            <Link
                              href={categoryHref(slug)}
                              aria-current={current ? "page" : undefined}
                              className={cn(
                                "-mx-3 flex flex-col gap-0.5 rounded-[14px] px-3 py-2 text-fg transition-colors duration-200 hover:bg-bg-alt hover:no-underline",
                                current && "bg-bg-alt",
                              )}
                            >
                              <span className="flex items-baseline gap-2 text-[16px] font-semibold">
                                {c.label}
                                <span className="text-[12px] font-medium text-fg-2">
                                  {categoryCount(slug)}
                                </span>
                              </span>
                              <span className="text-[13px] leading-[1.4] text-fg-2">
                                {c.blurb}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            onClick={close}
            onMouseEnter={close}
            className="fixed inset-x-0 top-14 bottom-0 z-0 bg-black/[.18]"
          />
        </>
      )}
    </header>
  );
}
