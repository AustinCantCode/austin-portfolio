"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { cn } from "@lib/utils";
import {
  categories,
  categoryCount,
  categoryHref,
  navSections,
} from "@data/categories";
import { projects } from "@data/projects";
import { about } from "@data/about";
import { allSkills } from "@data/skills";
import { allCertificates } from "@data/certificates";
import { events } from "@data/events";
import { site } from "@data/site";
import logo from "../../../public/AS-Circle-Logo.png";
import { Icon } from "../icon";
import { buttonClass, SmartLink } from "../ui";
import { ThemeToggle } from "./theme-toggle";

type Section = "work" | "about" | "contact" | null;
type Menu = "work" | "about";

const activeSection = (path: string): Section => {
  if (/^\/(work|projects|stillgood)(\/|$)/.test(path)) return "work";
  if (/^\/(about|cv)(\/|$)/.test(path)) return "about";
  if (/^\/contact(\/|$)/.test(path)) return "contact";
  return null;
};

const canHover = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

const aboutCounts: Record<string, number> = {
  "/about/skills": allSkills.length,
  "/about/certificates": allCertificates.length,
  "/about/events": events.length,
};

const menuLink =
  "-mx-3 flex flex-col gap-0.5 rounded-[14px] px-3 py-2 text-fg transition-colors duration-200 hover:bg-bg-alt hover:no-underline";

export function Nav() {
  const pathname = usePathname();
  const active = activeSection(pathname);
  const currentCategory = pathname.match(/^\/work\/([^/]+)/)?.[1];
  const [open, setOpen] = useState<Menu | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const workBtn = useRef<HTMLButtonElement>(null);
  const aboutBtn = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    clearTimeout(hoverTimer.current);
    setOpen(null);
  }, []);

  // Close the menu on navigation.
  useEffect(() => close(), [pathname, close]);
  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  const trigger = (
    menu: Menu,
    label: string,
    ref: RefObject<HTMLButtonElement | null>,
  ) => (
    <button
      ref={ref}
      type="button"
      aria-expanded={open === menu}
      aria-controls={`${menu}-menu`}
      aria-current={active === menu ? "page" : undefined}
      onClick={() => setOpen((v) => (v === menu ? null : menu))}
      onMouseEnter={() => {
        if (!canHover()) return;
        clearTimeout(hoverTimer.current);
        hoverTimer.current = setTimeout(() => setOpen(menu), 120);
      }}
      className={cn(
        "inline-flex h-9 items-center gap-0.5 border-0 bg-transparent p-0 text-[14px] hover:text-fg sm:gap-1",
        active === menu ? "font-semibold text-fg" : "text-fg-2",
      )}
    >
      {label}
      <Icon
        name="chevron-down"
        size={14}
        className={cn(
          "transition-transform duration-[250ms]",
          open === menu && "rotate-180",
        )}
      />
    </button>
  );

  return (
    <header
      className="sticky top-0 z-50 w-full bg-bg text-fg"
      onMouseLeave={() => {
        clearTimeout(hoverTimer.current);
        if (canHover()) setOpen(null);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          const btn = open === "work" ? workBtn : aboutBtn;
          setOpen(null);
          btn.current?.focus();
        }
      }}
    >
      <nav
        aria-label="Main"
        className="wrap gutter relative z-[2] flex h-14 items-center gap-3 bg-bg sm:gap-6"
      >
        <Link
          href="/"
          aria-label="Austin Sia, home"
          className="mr-auto flex shrink-0 items-center gap-2.5 text-fg hover:no-underline"
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
          <span className="font-display text-[17px] font-bold whitespace-nowrap">
            Austin Sia
          </span>
        </Link>
        <div className="flex items-center gap-[clamp(10px,3vw,32px)]">
          {trigger("work", "Work", workBtn)}
          {trigger("about", "About", aboutBtn)}
          <Link
            href="/contact"
            aria-current={active === "contact" ? "page" : undefined}
            className={cn(
              "inline-flex h-9 items-center text-[14px] hover:text-fg hover:no-underline",
              active === "contact"
                ? "font-semibold text-fg"
                : "font-normal text-fg-2",
            )}
          >
            Contact
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      {open && (
        <>
          <div
            id={`${open}-menu`}
            className="absolute inset-x-0 top-14 z-[1] max-h-[calc(100vh_-_56px)] overflow-auto bg-menu shadow-[var(--shadow-menu)]"
          >
            {open === "work" ? (
              <WorkMenu currentCategory={currentCategory} />
            ) : (
              <AboutMenu pathname={pathname} />
            )}
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

/** The left column of a menu: label, big link and a line under it. */
function MenuLead({
  label,
  href,
  title,
  children,
}: {
  label: string;
  href: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-[0_1_240px] flex-col gap-2">
      <p className="text-[12px] font-semibold text-fg-2">{label}</p>
      <Link
        href={href}
        className="font-display text-[clamp(24px,2.6vw,28px)] leading-[1.15] font-bold tracking-[-0.02em] text-fg hover:text-accent-text hover:no-underline"
      >
        {title}
      </Link>
      {children}
    </div>
  );
}

function WorkMenu({ currentCategory }: { currentCategory?: string }) {
  return (
    <div className="wrap gutter flex flex-wrap gap-[clamp(20px,4vw,56px)] pt-[clamp(20px,3vw,32px)] pb-[clamp(28px,4vw,44px)]">
      <MenuLead label="Explore work" href="/work" title="All work">
        <p className="text-[14px] text-fg-2">
          {projects.length} projects, {categories.length} categories
        </p>
      </MenuLead>
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
                      className={cn(menuLink, current && "bg-bg-alt")}
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
  );
}

function AboutMenu({ pathname }: { pathname: string }) {
  const now = about.timeline.find((t) => t.now);
  const latest = about.timeline[0];
  return (
    <div className="wrap gutter flex flex-wrap gap-[clamp(20px,4vw,56px)] pt-[clamp(20px,3vw,32px)] pb-[clamp(28px,4vw,44px)]">
      <MenuLead label="Get to know me" href="/about" title="About me">
        <p className="max-w-[260px] text-[14px] leading-[1.45] text-fg-2">
          {site.heroLine}
        </p>
        {now && (
          <p className="mt-2 flex flex-wrap items-center gap-2 text-[13px] text-fg-2">
            <span className="rounded-full bg-accent px-2.5 py-[3px] text-[12px] font-semibold text-on-accent">
              Now
            </span>
            <span>
              <span className="font-semibold text-fg">{now.title}</span>,{" "}
              {now.sub}
            </span>
          </p>
        )}
      </MenuLead>
      <div className="flex min-w-0 flex-[1_1_640px] flex-col gap-6">
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-[clamp(24px,3vw,48px)] gap-y-1 p-0 min-[900px]:grid-cols-2">
          {about.more.map((m) => {
            const current = pathname === m.href;
            const count = aboutCounts[m.href];
            return (
              <li key={m.href}>
                <Link
                  href={m.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    menuLink,
                    "flex-row items-start gap-3",
                    current && "bg-bg-alt",
                  )}
                >
                  <span className="mt-0.5 grid size-9 flex-none place-items-center rounded-full bg-well text-fg">
                    <Icon name={m.icon} size={17} />
                  </span>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="flex items-baseline gap-2 text-[16px] font-semibold">
                      {m.title}
                      {count !== undefined && (
                        <span className="text-[12px] font-medium text-fg-2">
                          {count}
                        </span>
                      )}
                    </span>
                    <span className="text-[13px] leading-[1.4] text-fg-2">
                      {m.text}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-pill pt-4">
          <p className="text-[13px] text-fg-2">
            Latest:{" "}
            <span className="font-semibold text-fg">{latest.title}</span>,{" "}
            {latest.date}
          </p>
          <div className="flex flex-wrap gap-2">
            <SmartLink
              href={site.contact.cvPdf}
              target="_blank"
              data-track="cv_download"
              className={buttonClass("secondary", "md")}
            >
              <Icon name="arrow-down-to-line" size={16} />
              Download CV
            </SmartLink>
            <Link href="/contact" className={buttonClass("primary", "md")}>
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
