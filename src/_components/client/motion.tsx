"use client";

import { usePathname } from "next/navigation";
import { animate, inView, scroll } from "framer-motion";
import { useEffect, useState } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Tracks the user's reduced-motion setting. */
export function useReducedMotionPref() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduce;
}

export const EASE = [0.2, 0.7, 0.2, 1] as const;

/**
 * Page-level motion with Framer Motion, driven by data attributes so
 * server components can opt in without client code:
 * - [data-reveal]: fades and rises into view (only if it starts below 90%
 *   of the viewport), via inView + animate.
 * - [data-parallax="k"]: drifts at -k times its distance from the
 *   viewport centre while its parent scrolls past, via scroll().
 * Runs again on every route change. Disabled under reduced motion.
 */
export function MotionManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const stops: (() => void)[] = [];
    const touched: HTMLElement[] = [];

    // Wait a frame so the new page has laid out.
    const start = requestAnimationFrame(() => {
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.dataset.revealed) return;
        el.dataset.revealed = "1";
        if (el.getBoundingClientRect().top <= vh * 0.9) return;
        touched.push(el);
        animate(el, { opacity: 0, y: 28 }, { duration: 0 });
        stops.push(
          inView(
            el,
            () => {
              animate(
                el,
                { opacity: 1, y: 0 },
                { duration: 0.8, ease: EASE },
              ).then(() => {
                // Hand the element back to its own CSS (e.g. hover scale).
                el.style.removeProperty("opacity");
                el.style.removeProperty("transform");
              });
            },
            { amount: "some" },
          ),
        );
      });

      document
        .querySelectorAll<HTMLElement>("[data-parallax]")
        .forEach((el) => {
          const k = parseFloat(el.dataset.parallax ?? "") || 0.08;
          const target = el.parentElement ?? el;
          const reach = (window.innerHeight + target.offsetHeight) / 2;
          touched.push(el);
          stops.push(
            scroll(
              animate(el, { y: [-k * reach, k * reach] }, { ease: "linear" }),
              { target, offset: ["start end", "end start"] },
            ),
          );
        });
    });

    return () => {
      cancelAnimationFrame(start);
      stops.forEach((stop) => stop());
      touched.forEach((el) => {
        delete el.dataset.revealed;
        el.style.removeProperty("opacity");
        el.style.removeProperty("transform");
      });
      document
        .querySelectorAll<HTMLElement>("[data-revealed]")
        .forEach((el) => delete el.dataset.revealed);
    };
  }, [pathname]);

  return null;
}

type Spring = {
  type: "spring";
  stiffness: number;
  damping: number;
  mass: number;
};
const SPRING: Spring = {
  type: "spring",
  stiffness: 320,
  damping: 26,
  mass: 0.6,
};
const QUICK = { duration: 0.35, ease: EASE };

/** Reads a numeric custom property (for example --hover-scale). */
const cssNum = (el: Element, prop: string, fallback: number) =>
  parseFloat(getComputedStyle(el).getPropertyValue(prop)) || fallback;

/**
 * Hover and press effects with Framer Motion, by event delegation so
 * server components (and cards that mount later) only need a hook:
 * - .lift: scales to --hover-scale (default 1.015) on hover, dips on press
 * - .rise: moves up by --rise px (default 2) on hover
 * - .press: shrinks slightly while pressed
 * - .zoom-host: zooms its [data-zoom] children on hover
 * - [data-hover-card]: reveals its [data-hover-detail] parts on hover or
 *   keyboard focus (they start hidden via CSS on pointer devices)
 * Mouse and pen only; touch keeps the static styles. Off under reduced
 * motion.
 */
export function GestureManager() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");

    const lift = (el: Element, on: boolean) =>
      animate(
        el,
        { scale: on ? cssNum(el, "--hover-scale", 1.015) : 1 },
        SPRING,
      );
    const rise = (el: Element, on: boolean) =>
      animate(el, { y: on ? -cssNum(el, "--rise", 2) : 0 }, SPRING);
    const zoom = (el: Element, on: boolean) => {
      const kids = el.querySelectorAll("[data-zoom]");
      if (kids.length)
        animate(kids, { scale: on ? 1.04 : 1 }, { duration: 0.6, ease: EASE });
    };
    const reveal = (el: Element, on: boolean) => {
      if (!fine.matches) return;
      const kids = el.querySelectorAll("[data-hover-detail]");
      if (kids.length)
        animate(kids, on ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }, QUICK);
    };
    const HOVER: [string, (el: Element, on: boolean) => unknown][] = [
      [".lift", lift],
      [".rise", rise],
      [".zoom-host", zoom],
      ["[data-hover-card]", reveal],
    ];

    const crossing = (e: PointerEvent | FocusEvent, sel: string) => {
      const el = (e.target as Element | null)?.closest?.(sel);
      const other = e.relatedTarget as Node | null;
      return el && !(other && el.contains(other)) ? el : null;
    };
    const onOver = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      for (const [sel, fx] of HOVER) {
        const el = crossing(e, sel);
        if (el) fx(el, true);
      }
    };
    const onOut = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      for (const [sel, fx] of HOVER) {
        const el = crossing(e, sel);
        if (el) fx(el, false);
      }
    };

    // Press: dip from the current hover scale, then return to it.
    let pressed: Element | null = null;
    const onDown = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(".press, .lift");
      if (!el) return;
      pressed = el;
      const base =
        el.matches(":hover") && el.classList.contains("lift")
          ? cssNum(el, "--hover-scale", 1.015)
          : 1;
      animate(el, { scale: base * 0.97 }, { duration: 0.1 });
    };
    const onUp = () => {
      const el = pressed;
      pressed = null;
      if (!el) return;
      const hovered = el.matches(":hover") && el.classList.contains("lift");
      animate(
        el,
        { scale: hovered ? cssNum(el, "--hover-scale", 1.015) : 1 },
        SPRING,
      );
    };

    // Keyboard: focusing into a card reveals its details too.
    const onFocusIn = (e: FocusEvent) => {
      const el = crossing(e, "[data-hover-card]");
      if (el) reveal(el, true);
    };
    const onFocusOut = (e: FocusEvent) => {
      const el = crossing(e, "[data-hover-card]");
      if (el) reveal(el, false);
    };

    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerup", onUp);
    document.addEventListener("pointercancel", onUp);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointercancel", onUp);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  return null;
}
