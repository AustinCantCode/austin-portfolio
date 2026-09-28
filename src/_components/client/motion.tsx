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

const EASE = [0.2, 0.7, 0.2, 1] as const;

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
