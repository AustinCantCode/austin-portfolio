"use client";

import { stagger, useAnimate, type AnimationSequence } from "framer-motion";
import { Fragment, useEffect, useRef } from "react";
import Coin from "@components/complex-ui/coin";
import { ButtonLink } from "@components/ui";
import { site } from "@data/site";

const ease = [0.2, 0.8, 0.2, 1] as const;

/**
 * The homepage hero and its opening sequence, "the mint": the name rises
 * out of a mask word by word, the gold coin is struck (it lands and a
 * ring pulses out from it, like the AS logo being minted), then the rest
 * of the hero and the nav settle in.
 *
 * It plays once per visit: an inline script in the layout sets
 * <html data-intro> before first paint (skipped for reduced motion), CSS
 * hides the [data-intro-hide] parts until Framer Motion animates them in,
 * and without JavaScript everything is simply visible.
 */
export function Hero() {
  const [scope, animate] = useAnimate();
  const words = site.heroHeadline.split(" ");
  // Set by the effect; the coin calls it once its first frame is drawn.
  const begin = useRef<() => void>(() => {});

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "1") return;
    try {
      sessionStorage.setItem("as-intro", "1");
    } catch {}

    const chrome = [
      document.querySelector("header"),
      document.querySelector('nav[aria-label="Quick"]'),
    ].filter((e): e is HTMLElement => !!e);

    let controls: { complete: () => void } | null = null;
    let done: ReturnType<typeof setTimeout> | undefined;
    let frame = 0;
    let started = false;

    // Start once the 3D coin is ready (setting it up is the heaviest work
    // on the page), or after 1.2s at the latest.
    const start = () => {
      if (started) return;
      started = true;
      // Only animate the chrome that is on screen (the tab bar is hidden
      // on desktop, the top links on phones).
      const nav = chrome.filter((e) => e.getClientRects().length > 0);
      // One timeline, so every part takes its first keyframe at once.
      const seq: AnimationSequence = [
        [
          "[data-i=word]",
          { y: ["110%", "0%"], opacity: [0, 1] },
          { duration: 0.9, delay: stagger(0.12), at: 0, ease },
        ],
        [
          "[data-i=coin]",
          {
            opacity: [0, 1],
            scale: [0.62, 1],
            rotate: [-14, 0],
            y: [-24, 0],
          },
          { duration: 0.85, at: 0.3, ease: [0.3, 1.25, 0.4, 1] },
        ],
        [
          "[data-i=rise]",
          { opacity: [0, 1], y: [16, 0] },
          { duration: 0.7, delay: stagger(0.1), at: 0.62, ease },
        ],
        ["[data-i=glow]", { opacity: [0, 1] }, { duration: 1.2, at: 0.95 }],
        [
          "[data-i=ring]",
          { opacity: [0, 0.8, 0], scale: [0.72, 0.8, 1.45] },
          { duration: 1.2, delay: stagger(0.18), at: 0.95, ease: "easeOut" },
        ],
      ];
      if (nav.length)
        seq.push([
          nav,
          { opacity: [0, 1], y: [-10, 0] },
          { duration: 0.7, at: 1.15, ease },
        ]);
      controls = animate(seq);
      // Framer now holds every part at its first keyframe, so the CSS that
      // hid them can go; each fade then ends on the natural visible value.
      frame = requestAnimationFrame(() => delete root.dataset.intro);
      // The sequence lasts about 2.3s; then hand the chrome back to CSS.
      done = setTimeout(() => {
        chrome.forEach((e) => {
          e.style.removeProperty("opacity");
          e.style.removeProperty("transform");
        });
      }, 2600);
    };
    begin.current = start;
    const fallback = setTimeout(start, 1200);

    return () => {
      begin.current = () => {};
      clearTimeout(fallback);
      clearTimeout(done);
      cancelAnimationFrame(frame);
      controls?.complete();
      delete root.dataset.intro;
    };
  }, [animate, scope]);

  return (
    <section
      ref={scope}
      className="gutter pt-[clamp(56px,min(9vw,13vh),144px)] pb-[clamp(80px,min(11vw,16vh),176px)]"
    >
      <div className="wrap flex flex-wrap-reverse items-center gap-[clamp(48px,7vw,112px)]">
        <div className="flex min-w-0 flex-[1_1_440px] flex-col items-start">
          <h1 className="t-h1" aria-label={site.heroHeadline}>
            {words.map((w, i) => (
              <Fragment key={i}>
                {/* The space sits outside the clipped word, so it is kept. */}
                {i > 0 && " "}
                <span
                  aria-hidden="true"
                  className="inline-block overflow-hidden pb-[0.1em] align-bottom"
                >
                  <span
                    data-i="word"
                    data-intro-hide=""
                    className="inline-block"
                  >
                    {w}
                  </span>
                </span>
              </Fragment>
            ))}
          </h1>
          <p
            data-i="rise"
            data-intro-hide=""
            className="t-sub mt-[clamp(20px,2.4vw,32px)] max-w-[540px] leading-[1.5]"
          >
            {site.heroLine}
          </p>
          <div
            data-i="rise"
            data-intro-hide=""
            className="mt-[clamp(36px,4vw,56px)] flex w-full flex-wrap gap-4"
          >
            <ButtonLink href="/development" data-track="view_work_click">
              View work
            </ButtonLink>
            <ButtonLink
              href={site.contact.cvPdf}
              variant="secondary"
              icon="arrow-down-to-line"
              target="_blank"
              data-track="cv_download"
            >
              Download CV
            </ButtonLink>
          </div>
        </div>
        <div className="relative mx-auto min-w-0 flex-[0_1_420px]">
          {/* A soft gold aura behind the coin; it stays after the intro. */}
          <div
            data-i="glow"
            data-intro-hide=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-[-12%] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent-fill)_18%,transparent),transparent_62%)]"
          />
          {/* The "strike": rings that pulse out once when the coin lands. */}
          {[0, 1].map((i) => (
            <span
              key={i}
              data-i="ring"
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[clamp(220px,28vw,400px)] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent opacity-0"
            />
          ))}
          <div data-i="coin" data-intro-hide="" className="relative">
            <Coin
              className="mx-auto w-[clamp(220px,28vw,400px)] max-w-full"
              delay={1000}
              onReady={() => begin.current()}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
