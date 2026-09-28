"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { home } from "@data/home";
import { prefersReducedMotion } from "@components/client/motion";

/** Chapter 6: four stats that count up when they come into view. */
export function Numbers() {
  const { title, stats } = home.numbers;
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.6) return;
    setT(0);
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - t0) / 1400);
          setT(1 - Math.pow(1 - p, 3));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

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
            className="flex flex-col gap-1.5 border-t-2 border-fg pt-5 text-fg hover:no-underline"
          >
            <p
              aria-label={String(s.n)}
              className="font-display text-[clamp(44px,5.5vw,72px)] leading-none font-bold tracking-[-0.04em] tabular-nums"
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
