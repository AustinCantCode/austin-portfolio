"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@lib/utils";
import { Icon } from "../icon";
import { prefersReducedMotion } from "./motion";

export type TocItem = { id: string; title: string };

/** Where a heading counts as "current": just below the fixed nav. */
const LINE = 140;

function useActive(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= LINE) current = id;
      }
      // At the very bottom, the last section is current even if short.
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      )
        current = ids[ids.length - 1];
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ids]);
  return active;
}

function jump(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
  history.replaceState(null, "", `#${id}`);
  // Move focus for keyboard and screen reader users, without a jump.
  el.focus({ preventScroll: true });
}

/**
 * "On this page": a contents list that stays beside the text on wide
 * screens, with a gold marker on the section being read. On smaller
 * screens it's a collapsible list above the text.
 */
export function Toc({ items }: { items: TocItem[] }) {
  const ids = items.map((i) => i.id);
  const active = useActive(ids);

  const list = (mobile: boolean) => (
    <ol className="m-0 flex list-none flex-col p-0">
      {items.map((it) => {
        const on = it.id === active;
        return (
          <li key={it.id} className="relative">
            {on && !mobile && (
              <motion.span
                layoutId="toc-marker"
                aria-hidden="true"
                className="absolute top-1.5 bottom-1.5 -left-px w-0.5 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
            <a
              href={`#${it.id}`}
              onClick={(e) => jump(e, it.id)}
              aria-current={on ? "location" : undefined}
              className={cn(
                "block py-1.5 text-[15px] leading-[1.35] transition-colors duration-200 hover:text-fg hover:no-underline",
                mobile ? "px-0" : "pl-4",
                on ? "font-medium text-fg" : "text-fg-2",
              )}
            >
              {it.title}
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      <nav
        aria-label="On this page"
        className="sticky top-[132px] hidden max-h-[calc(100vh-160px)] overflow-y-auto border-l border-pill lg:block"
      >
        {list(false)}
      </nav>
      <details className="group rounded-[20px] bg-bg-alt px-5 py-4 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between text-[15px] font-semibold [&::-webkit-details-marker]:hidden">
          On this page
          <Icon
            name="chevron-down"
            size={18}
            className="text-fg-2 transition-transform duration-200 group-open:rotate-180"
          />
        </summary>
        <nav aria-label="On this page" className="mt-3">
          {list(true)}
        </nav>
      </details>
    </>
  );
}
