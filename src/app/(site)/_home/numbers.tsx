"use client";

import Link from "next/link";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { home } from "@data/home";

/** Four stats that count up (Framer Motion animate) when they come into view. */
export function Numbers() {
  const { title, stats } = home.numbers;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [t, setT] = useState(1);
  const armed = useRef(false);

  // Start from zero only if the stats begin out of view.
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.6) return;
    armed.current = true;
    setT(0);
  }, [reduce]);

  useEffect(() => {
    if (!inView || !armed.current) return;
    const c = animate(0, 1, {
      duration: 1.4,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: setT,
    });
    return () => c.stop();
  }, [inView]);

  const show = (n: number | string) => {
    const s = String(n);
    const num = parseInt(s, 10);
    return `${Math.round(num * t)}${s.replace(/^\d+/, "")}`;
  };

  return (
    <section aria-labelledby="numbers-title" className="gutter band-y-2 bg-bg">
      <div
        data-reveal=""
        className="wrap mb-[clamp(32px,4vw,56px)] flex flex-col gap-3"
      >
        <h2 id="numbers-title" className="t-h2">
          {title}
        </h2>
      </div>
      <div
        ref={ref}
        className="wrap grid grid-cols-[repeat(auto-fit,minmax(max(150px,calc((100%_-_3_*_clamp(24px,3vw,40px))/4)),1fr))] gap-[clamp(24px,3vw,40px)]"
      >
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            data-hover-card=""
            className="flex flex-col gap-3 border-t-2 border-rule pt-5 text-fg hover:no-underline"
          >
            {/* Lining figures: Cormorant's default old-style 3, 4, 5, 7 and 9
                drop below the line and ran into the label. */}
            <p
              aria-label={String(s.n)}
              className="font-display text-[clamp(44px,5.5vw,72px)] leading-[1.05] font-bold tracking-[-0.04em] lining-nums tabular-nums"
            >
              {show(s.n)}
            </p>
            <p className="text-[clamp(15px,1.6vw,19px)] text-fg-2">{s.label}</p>
            <p data-hover-detail="" className="text-[14px] text-accent-text">
              {s.cta} ›
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
