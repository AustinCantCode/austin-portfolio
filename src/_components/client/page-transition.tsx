"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

const OUT_MS = 180;

/**
 * Fades the page out, then the next one in, on every internal link: the
 * click is taken over (Next's Link steps aside once it's handled), the
 * content fades out, then the router navigates and the new page fades in.
 * The nav stays put. Back and forward only fade in. Links that open a new
 * tab, jump within the page, download a file or leave the site are left
 * alone, and reduced motion turns it all off. Styles: globals.css
 * ("Page transitions").
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const first = useRef(true);
  const timer = useRef<number>(0);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!(a instanceof HTMLAnchorElement)) return;
      if (a.target && a.target !== "_self") return;
      if (a.hasAttribute("download") || a.dataset.noTransition !== undefined)
        return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      // Same page (a #section or the page you're on): no fade.
      if (url.pathname === location.pathname && url.search === location.search)
        return;
      // Files (the CV PDF, feeds) and the CMS aren't site pages.
      if (/\.[a-z0-9]+$/i.test(url.pathname)) return;
      if (/^\/(keystatic|api)(\/|$)/.test(url.pathname)) return;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      e.preventDefault();
      const html = document.documentElement;
      html.dataset.page = "leaving";
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        router.push(url.pathname + url.search + url.hash);
        // If the page never arrives, don't leave the screen blank.
        timer.current = window.setTimeout(() => {
          if (html.dataset.page === "leaving") delete html.dataset.page;
        }, 4000);
      }, OUT_MS);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // Before the new page paints: hold it hidden, then let it fade in.
  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const html = document.documentElement;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      delete html.dataset.page;
      return;
    }
    window.clearTimeout(timer.current);
    html.dataset.page = "entering";
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => delete html.dataset.page);
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
