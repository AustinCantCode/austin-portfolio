"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@lib/utils";
import {
  categories,
  categoryBySlug,
  categoryCount,
  categoryHref,
  navSections,
} from "@data/categories";
import { projectBySlug } from "@data/projects";
import { ventures } from "@data/ventures";
import { about } from "@data/about";
import { allSkills } from "@data/skills";
import { allCertificates } from "@data/certificates";
import { events } from "@data/events";
import { site } from "@data/site";
import type { AreaId, CategorySlug, Project } from "@data/types";
import logo from "../../../public/AS-Circle-Logo.png";
import { Icon } from "../icon";
import { buttonClass, SmartLink } from "../ui";
import { ThemeToggle } from "./theme-toggle";

const EASE = [0.2, 0.7, 0.2, 1] as const;

type Menu = AreaId | "about";
type Section = Menu | "contact" | "home" | null;
type Sheet = "work" | "about";

/** Top-level areas. They come from navSections, so labels stay in sync. */
const AREAS = navSections.map((s) => ({
  id: s.id as AreaId,
  label: s.id === "ventures" ? "Ventures" : s.label,
  icon: s.icon,
  categories: s.categories,
}));

/** Projects featured in each area's menu. */
const FEATURED: Partial<Record<AreaId, string[]>> = {
  dev: ["ite", "ksp", "grx"],
  design: ["quizzy", "fresko", "lawks"],
};

/** One line under each area's name in its menu (matches the Work page). */
const AREA_LINE: Partial<Record<AreaId, string>> = {
  dev: "Websites, platforms and apps, built for clients and for myself.",
  design: "Interfaces, physical products and artwork.",
};

const activeSection = (path: string): Section => {
  if (path === "/") return "home";
  const cat = path.match(/^\/work\/([^/]+)/)?.[1];
  if (cat) return categoryBySlug(cat)?.area ?? null;
  const slug = path.match(/^\/projects\/([^/]+)/)?.[1];
  if (slug) {
    const p = projectBySlug(slug);
    return p ? (categoryBySlug(p.categories[0])?.area ?? null) : null;
  }
  if (/^\/stillgood(\/|$)/.test(path)) return "ventures";
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

// From the previous site: an icon beside each label, and a filled pill
// for the section you are in.
const itemClass = (active: boolean) =>
  cn(
    "inline-flex h-9 items-center gap-1.5 rounded-full border-0 px-3 text-[14px] transition-colors duration-200 hover:no-underline",
    active
      ? "bg-pill font-semibold text-fg"
      : "bg-transparent text-fg-2 hover:bg-bg-alt hover:text-fg",
  );

export function Nav() {
  const pathname = usePathname();
  const active = activeSection(pathname);
  const [open, setOpen] = useState<Menu | null>(null);
  const [sheet, setSheet] = useState<Sheet | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const triggers = useRef<Partial<Record<Menu, HTMLButtonElement | null>>>({});

  const close = useCallback(() => {
    clearTimeout(hoverTimer.current);
    setOpen(null);
    setSheet(null);
  }, []);

  // Close menus on navigation.
  useEffect(() => close(), [pathname, close]);
  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  const trigger = (menu: Menu, label: string, icon: string) => (
    <button
      key={menu}
      ref={(el) => {
        triggers.current[menu] = el;
      }}
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
      className={cn(itemClass(active === menu), open === menu && "text-fg")}
    >
      <Icon name={icon} size={15} />
      {label}
      <motion.span
        aria-hidden="true"
        className="inline-flex"
        initial={false}
        animate={{ rotate: open === menu ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <Icon name="chevron-down" size={13} />
      </motion.span>
    </button>
  );

  return (
    <>
      <header
        data-intro-hide=""
        className="sticky top-0 z-50 w-full bg-bg text-fg"
        onMouseLeave={() => {
          clearTimeout(hoverTimer.current);
          if (canHover()) setOpen(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape" && open) {
            const btn = triggers.current[open];
            setOpen(null);
            btn?.focus();
          }
        }}
      >
        <nav
          aria-label="Main"
          className="wrap gutter relative z-[2] flex h-14 items-center gap-3 bg-bg"
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
          <div className="hidden items-center gap-1 lg:flex">
            {AREAS.map((a) => trigger(a.id, a.label, a.icon))}
            {trigger("about", "About", "user")}
            <Link
              href="/contact"
              aria-current={active === "contact" ? "page" : undefined}
              className={itemClass(active === "contact")}
            >
              <Icon name="mail" size={15} />
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-2 lg:ml-3">
            <ThemeToggle />
            <SmartLink
              href={site.contact.cvPdf}
              target="_blank"
              data-track="cv_download"
              aria-label="Download my CV (PDF)"
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-accent px-4 text-[14px] font-semibold text-on-accent transition-colors hover:bg-accent-hover hover:no-underline hover:shadow-[var(--glow-accent)]"
            >
              <Icon name="arrow-down-to-line" size={15} />
              CV
            </SmartLink>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="absolute inset-x-0 top-14 z-[1] hidden max-h-[calc(100vh_-_56px)] overflow-auto bg-menu shadow-[var(--shadow-menu)] lg:block"
            >
              {/* Moving between menus cross-fades the content. */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={open}
                  id={`${open}-menu`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.16, ease: EASE }}
                >
                  {open === "about" ? (
                    <AboutMenu pathname={pathname} />
                  ) : open === "ventures" ? (
                    <VenturesMenu />
                  ) : (
                    <AreaMenu area={open} pathname={pathname} />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
          {open && (
            <motion.div
              key="backdrop"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={close}
              onMouseEnter={close}
              className="fixed inset-x-0 top-14 bottom-0 z-0 hidden bg-black/[.18] lg:block"
            />
          )}
        </AnimatePresence>
      </header>

      <MobileBar
        active={active}
        sheet={sheet}
        onSheet={setSheet}
        pathname={pathname}
      />
    </>
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
        className="font-display text-[clamp(26px,2.8vw,32px)] leading-[1.1] font-bold text-fg hover:text-accent-text hover:no-underline"
      >
        {title}
      </Link>
      {children}
    </div>
  );
}

/** Small preview of a project's first image, never cropped. */
function Thumb({ project }: { project: Project }) {
  const m = project.screen ?? project.cover;
  return (
    <span className="relative grid h-12 w-16 flex-none place-items-center overflow-hidden rounded-[10px] bg-well">
      {m ? (
        <Image
          src={m.src}
          alt=""
          fill
          sizes="64px"
          quality={100}
          className="object-contain"
        />
      ) : (
        <Icon name="image" size={16} className="opacity-60" />
      )}
    </span>
  );
}

function CategoryList({
  slugs,
  pathname,
}: {
  slugs: CategorySlug[];
  pathname: string;
}) {
  return (
    <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
      {slugs.map((slug) => {
        const c = categories.find((x) => x.slug === slug)!;
        const current = pathname === categoryHref(slug);
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
  );
}

function AreaMenu({ area, pathname }: { area: AreaId; pathname: string }) {
  const a = AREAS.find((x) => x.id === area)!;
  const featured = (FEATURED[area] ?? [])
    .map((s) => projectBySlug(s))
    .filter((p): p is Project => !!p);
  return (
    <div className="wrap gutter flex flex-wrap gap-[clamp(20px,4vw,56px)] pt-[clamp(28px,3.4vw,44px)] pb-[clamp(36px,4.4vw,56px)]">
      <MenuLead label="Explore" href={`/work?filter=${area}`} title={a.label}>
        <p className="max-w-[240px] text-[14px] leading-[1.45] text-fg-2">
          {AREA_LINE[area]}
        </p>
        <Link href={`/work?filter=${area}`} className="mt-1 py-1 text-[14px]">
          All {a.label.toLowerCase()} ›
        </Link>
      </MenuLead>
      <div className="grid min-w-0 flex-[1_1_640px] grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-x-[clamp(24px,3vw,48px)] gap-y-6">
        <div className="flex flex-col gap-1.5">
          <p className="pb-1 text-[12px] font-semibold text-fg-2">Categories</p>
          <CategoryList slugs={a.categories} pathname={pathname} />
        </div>
        {featured.length > 0 && (
          <div className="flex flex-col gap-1.5 border-l border-pill pl-[clamp(0px,2vw,24px)]">
            <p className="pb-1 text-[12px] font-semibold text-fg-2">Featured</p>
            <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
              {featured.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    aria-current={
                      pathname === `/projects/${p.slug}` ? "page" : undefined
                    }
                    className={cn(menuLink, "flex-row items-center gap-3")}
                  >
                    <Thumb project={p} />
                    <span className="flex min-w-0 flex-col">
                      <span className="text-[16px] font-semibold">
                        {p.title}
                      </span>
                      <span className="text-[13px] text-fg-2">
                        {p.subtext} · {p.year}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function VenturesMenu() {
  return (
    <div className="wrap gutter flex flex-wrap gap-[clamp(20px,4vw,56px)] pt-[clamp(28px,3.4vw,44px)] pb-[clamp(36px,4.4vw,56px)]">
      <MenuLead label="Things I started" href="/work/ventures" title="Ventures">
        <p className="text-[14px] text-fg-2">
          From a hackathon team to a live app and freelance clients.
        </p>
      </MenuLead>
      <ul className="m-0 grid min-w-0 flex-[1_1_640px] list-none grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-[clamp(24px,3vw,48px)] gap-y-2 p-0">
        {ventures.map((v) => (
          <li key={v.id}>
            <Link href={v.href} className={menuLink}>
              <span className="text-[16px] font-semibold">{v.name}</span>
              <span className="text-[12px] font-medium text-fg-2">
                {v.role} · {v.date}
              </span>
              <span className="text-[13px] leading-[1.4] text-fg-2">
                {v.line}
              </span>
              <span className="pt-1 text-[13px] text-accent-text">
                {v.cta} ›
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AboutMenu({ pathname }: { pathname: string }) {
  const now = about.timeline.find((t) => t.now);
  const latest = about.timeline[0];
  return (
    <div className="wrap gutter flex flex-wrap gap-[clamp(20px,4vw,56px)] pt-[clamp(28px,3.4vw,44px)] pb-[clamp(36px,4.4vw,56px)]">
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
          <Link href="/contact" className={buttonClass("primary", "md")}>
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Phones and tablets: a bottom tab bar for one-thumb navigation. Work and
 * About open a sheet above the bar; Home and Contact are plain links.
 */
function MobileBar({
  active,
  sheet,
  onSheet,
  pathname,
}: {
  active: Section;
  sheet: Sheet | null;
  onSheet: (s: Sheet | null) => void;
  pathname: string;
}) {
  const workActive =
    active === "dev" || active === "design" || active === "ventures";
  const tabClass = (on: boolean) =>
    cn(
      "flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 border-0 bg-transparent text-[11px] font-medium hover:no-underline",
      on ? "text-fg" : "text-fg-2",
    );
  const pill = (on: boolean) =>
    cn(
      "grid h-7 w-12 place-items-center rounded-full transition-colors",
      on && "bg-pill",
    );
  const sheetTab = (s: Sheet, label: string, icon: string) => {
    const on =
      sheet === s ||
      (!sheet && (s === "work" ? workActive : active === "about"));
    return (
      <button
        type="button"
        aria-expanded={sheet === s}
        aria-controls={`${s}-sheet`}
        onClick={() => onSheet(sheet === s ? null : s)}
        className={tabClass(on)}
      >
        <span className={pill(on)}>
          <Icon name={icon} size={19} />
        </span>
        {label}
      </button>
    );
  };
  const linkTab = (
    href: string,
    label: string,
    icon: string,
    section: Section,
  ) => {
    const on = active === section && !sheet;
    return (
      <Link
        href={href}
        aria-current={active === section ? "page" : undefined}
        className={tabClass(on)}
      >
        <span className={pill(on)}>
          <Icon name={icon} size={19} />
        </span>
        {label}
      </Link>
    );
  };

  return (
    <div
      className="lg:hidden"
      onKeyDown={(e) => {
        if (e.key === "Escape" && sheet) onSheet(null);
      }}
    >
      <AnimatePresence>
        {sheet && (
          <motion.div
            key="sheet-backdrop"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onSheet(null)}
            className="fixed inset-0 z-[60] bg-black/40"
          />
        )}
        {sheet && (
          <motion.div
            key="sheet"
            id={`${sheet}-sheet`}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 420, damping: 40 }}
            className="fixed inset-x-0 bottom-[calc(64px+env(safe-area-inset-bottom))] z-[61] max-h-[72vh] overflow-auto rounded-t-[24px] bg-menu shadow-[var(--shadow-menu)]"
          >
            {sheet === "about" ? (
              <AboutMenu pathname={pathname} />
            ) : (
              <div className="gutter flex flex-col gap-6 py-6">
                <Link
                  href="/work"
                  className="font-display text-[28px] font-bold text-fg hover:no-underline"
                >
                  All work ›
                </Link>
                {AREAS.map((a) => (
                  <div key={a.id} className="flex flex-col gap-1.5">
                    <p className="flex items-center gap-2 text-[12px] font-semibold text-fg-2">
                      <Icon name={a.icon} size={14} />
                      {a.label}
                    </p>
                    <CategoryList slugs={a.categories} pathname={pathname} />
                    {a.id === "ventures" && (
                      <Link href="/stillgood" className={menuLink}>
                        <span className="text-[16px] font-semibold">
                          StillGood
                        </span>
                        <span className="text-[13px] text-fg-2">
                          My food waste app, live on Google Play.
                        </span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <nav
        aria-label="Quick"
        data-intro-hide=""
        className="fixed inset-x-0 bottom-0 z-[62] flex h-[calc(64px+env(safe-area-inset-bottom))] border-t border-hairline bg-menu/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur"
      >
        {linkTab("/", "Home", "house", "home")}
        {sheetTab("work", "Work", "layout-grid")}
        {sheetTab("about", "About", "user")}
        {linkTab("/contact", "Contact", "mail", "contact")}
      </nav>
    </div>
  );
}
