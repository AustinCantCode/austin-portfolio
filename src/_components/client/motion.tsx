"use client";

import { usePathname } from "next/navigation";
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

const EASE = "cubic-bezier(.2,.7,.2,1)";

/**
 * Page-level motion, driven by data attributes so server components can
 * opt in without client code:
 * - [data-reveal]: fades and rises into view (only if it starts below 90%
 *   of the viewport).
 * - [data-parallax="k"]: moves at -k times its distance from the viewport
 *   centre, measured from its parent.
 * Runs again on every route change. Disabled under reduced motion.
 */
export function MotionManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let cancelled = false;
    let io: IntersectionObserver | undefined;
    let raf = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const parallax: HTMLElement[] = [];

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        for (const el of parallax) {
          const r = (el.parentElement ?? el).getBoundingClientRect();
          const k = parseFloat(el.dataset.parallax ?? "") || 0.08;
          el.style.transform = `translateY(${(r.top + r.height / 2 - vh / 2) * -k}px)`;
        }
      });
    };

    // Wait a frame so the new page has laid out.
    const start = requestAnimationFrame(() => {
      if (cancelled) return;
      const vh = window.innerHeight;
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            const el = e.target as HTMLElement;
            io?.unobserve(el);
            el.style.opacity = "1";
            el.style.transform = "none";
            // Hand the element back to its own CSS (e.g. hover scale).
            timers.push(
              setTimeout(() => {
                el.style.removeProperty("opacity");
                el.style.removeProperty("transform");
                el.style.removeProperty("transition");
              }, 900),
            );
          }
        },
        { threshold: 0.12 },
      );
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.dataset.revealed) return;
        el.dataset.revealed = "1";
        if (el.getBoundingClientRect().top <= vh * 0.9) return;
        el.style.opacity = "0";
        el.style.transform = "translateY(28px)";
        el.style.transition = `opacity .8s ${EASE}, transform .8s ${EASE}`;
        io!.observe(el);
      });
      document
        .querySelectorAll<HTMLElement>("[data-parallax]")
        .forEach((el) => parallax.push(el));
      if (parallax.length) {
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        onScroll();
      }
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(start);
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document
        .querySelectorAll<HTMLElement>("[data-revealed]")
        .forEach((el) => {
          delete el.dataset.revealed;
          el.style.removeProperty("opacity");
          el.style.removeProperty("transform");
          el.style.removeProperty("transition");
        });
    };
  }, [pathname]);

  return null;
}
