"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@lib/utils";
import { AREA_PATH, projectArea } from "@data/categories";
import { projectBySlug } from "@data/projects";
import type { AreaId } from "@data/types";
import logo from "../../../public/AS-Circle-Logo.png";
import { Icon } from "../icon";
import { ThemeToggle } from "./theme-toggle";

type Section = AreaId | "about" | "contact" | "home" | null;

/**
 * One link per page, no dropdowns. Each page has its own selector for
 * what's inside it (see local-nav.tsx).
 */
const ITEMS: {
  id: Exclude<Section, "home" | null>;
  label: string;
  href: string;
  icon: string;
}[] = [
  { id: "dev", label: "Development", href: AREA_PATH.dev, icon: "code-xml" },
  { id: "design", label: "Design", href: AREA_PATH.design, icon: "pen-tool" },
  {
    id: "ventures",
    label: "Ventures",
    href: AREA_PATH.ventures,
    icon: "rocket",
  },
  { id: "about", label: "About", href: "/about", icon: "user" },
  { id: "contact", label: "Contact", href: "/contact", icon: "mail" },
];

const activeSection = (path: string): Section => {
  if (path === "/") return "home";
  if (/^\/development(\/|$)/.test(path)) return "dev";
  if (/^\/design(\/|$)/.test(path)) return "design";
  if (/^\/(ventures|stillgood)(\/|$)/.test(path)) return "ventures";
  const slug = path.match(/^\/projects\/([^/]+)/)?.[1];
  if (slug) {
    const p = projectBySlug(slug);
    return p ? projectArea(p) : null;
  }
  if (/^\/(about|cv|writing)(\/|$)/.test(path)) return "about";
  if (/^\/contact(\/|$)/.test(path)) return "contact";
  return null;
};

// From the previous site: an icon beside each label, and a filled pill
// for the section you are in.
const itemClass = (active: boolean) =>
  cn(
    "inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-[14px] transition-colors duration-200 hover:no-underline",
    active
      ? "bg-pill font-semibold text-fg"
      : "text-fg-2 hover:bg-bg-alt hover:text-fg",
  );

export function Nav() {
  const active = activeSection(usePathname());
  return (
    <>
      <header
        data-intro-hide=""
        className="sticky top-0 z-50 w-full bg-bg text-fg"
      >
        <nav
          aria-label="Main"
          className="wrap gutter flex h-14 items-center gap-3"
        >
          <Link
            href="/"
            aria-label="Austin Sia, home"
            aria-current={active === "home" ? "page" : undefined}
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
            {ITEMS.map((it) => (
              <Link
                key={it.id}
                href={it.href}
                aria-current={active === it.id ? "page" : undefined}
                className={itemClass(active === it.id)}
              >
                <Icon name={it.icon} size={15} />
                {it.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2 lg:ml-3">
            <ThemeToggle />
            <Link
              href="/cv"
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-accent px-4 text-[14px] font-semibold text-on-accent transition-colors hover:bg-accent-hover hover:no-underline hover:shadow-[var(--glow-accent)]"
            >
              <Icon name="file-text" size={15} />
              CV
            </Link>
          </div>
        </nav>
      </header>
      <MobileBar active={active} />
    </>
  );
}

/** Phones and tablets: the same five pages as a bottom tab bar. */
function MobileBar({ active }: { active: Section }) {
  return (
    <nav
      aria-label="Quick"
      data-intro-hide=""
      className="fixed inset-x-0 bottom-0 z-[62] flex h-[calc(64px+env(safe-area-inset-bottom))] border-t border-hairline bg-menu/95 px-1 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      {ITEMS.map((it) => {
        const on = active === it.id;
        return (
          <Link
            key={it.id}
            href={it.href}
            aria-current={on ? "page" : undefined}
            className={cn(
              "flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-medium hover:no-underline",
              on ? "text-fg" : "text-fg-2",
            )}
          >
            <span
              className={cn(
                "grid h-7 w-12 place-items-center rounded-full transition-colors",
                on && "bg-pill",
              )}
            >
              <Icon name={it.icon} size={19} />
            </span>
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
