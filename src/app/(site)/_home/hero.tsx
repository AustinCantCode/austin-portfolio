"use client";

import { stagger, useAnimate, type AnimationSequence } from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";
import Coin from "@components/complex-ui/coin";
import { ButtonLink } from "@components/ui";
import { site } from "@data/site";

// A soft ease-in-out: eases in gently, then takes its time to settle.
const ease = [0.45, 0, 0.2, 1] as const;

/** The opening, in seconds from its start (like the original site's). */
const T = {
  type: 0.5, // the name starts typing
  perChar: 0.18, // one letter every 0.18s
  pause: 0.45, // after the last letter, before the titles
  titles: 0.9, // the titles fading in, one after another
  spin: 3.5, // the coin turning over
};

/**
 * The homepage hero and its opening sequence, after the original site:
 * my name types itself out letter by letter, the titles I hold fade in
 * under it, then the gold coin turns over from the AS logo to my photo,
 * and the rest of the hero and the nav settle in.
 *
 * It plays once per visit: an inline script in the layout sets
 * <html data-intro> before first paint (skipped for reduced motion), CSS
 * hides the [data-intro-hide] parts until they're animated in, and
 * without JavaScript everything is simply visible.
 */
export function Hero() {
  const [scope, animate] = useAnimate();
  const name = site.heroHeadline;
  const titles = site.heroTitles;
  // How many letters of the name are showing (all of them unless the
  // intro is playing), and whether the typing caret is on screen.
  const [typed, setTyped] = useState(name.length);
  const [caret, setCaret] = useState(false);
  // Set by the effect; the coin calls it once its first frame is drawn.
  const begin = useRef<() => void>(() => {});
  const flipRef = useRef<((ms?: number) => void) | null>(null);
  // When the intro wants the coin to turn: before it's ready, it turns
  // as soon as it is.
  const wantFlip = useRef(false);
  const playing = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "1") return;
    playing.current = true;
    try {
      sessionStorage.setItem("as-intro", "1");
    } catch {}

    const chrome = [
      document.querySelector("header"),
      document.querySelector('nav[aria-label="Quick"]'),
    ].filter((e): e is HTMLElement => !!e);

    let controls: { complete: () => void } | null = null;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (s: number, fn: () => void) =>
      timers.push(setTimeout(fn, s * 1000));
    let typing: ReturnType<typeof setInterval> | undefined;
    let frame = 0;
    let started = false;

    // Start once the 3D coin is ready (setting it up is the heaviest work
    // on the page), or after 1.2s at the latest.
    const start = () => {
      if (started) return;
      started = true;
      setTyped(0);
      setCaret(true);
      const typedAt = T.type + name.length * T.perChar;
      const titlesAt = typedAt + T.pause;
      const spinAt = titlesAt + 0.4 + titles.length * 0.25;
      const restAt = spinAt + 0.3;
      // Only animate the chrome that is on screen (the tab bar is hidden
      // on desktop, the top links on phones).
      const nav = chrome.filter((e) => e.getClientRects().length > 0);
      const seq: AnimationSequence = [
        ["[data-i=name]", { opacity: [1, 1] }, { duration: 0.01, at: 0 }],
        [
          "[data-i=coin]",
          { opacity: [0, 1], scale: [0.94, 1] },
          { duration: 1.4, at: 0, ease },
        ],
        ["[data-i=glow]", { opacity: [0, 1] }, { duration: 2.4, at: 0.2 }],
        [
          "[data-i=title]",
          { opacity: [0, 1], y: [8, 0] },
          { duration: T.titles, delay: stagger(0.25), at: titlesAt, ease },
        ],
        [
          "[data-i=rise]",
          { opacity: [0, 1], y: [18, 0] },
          { duration: 1.4, delay: stagger(0.2), at: restAt, ease },
        ],
      ];
      if (nav.length)
        seq.push([
          nav,
          { opacity: [0, 1], y: [-10, 0] },
          { duration: 1.4, at: restAt + 0.3, ease },
        ]);
      controls = animate(seq);
      // Framer now holds every part at its first keyframe, so the CSS that
      // hid them can go; each fade then ends on the natural visible value.
      frame = requestAnimationFrame(() => delete root.dataset.intro);

      // Type the name out, a letter at a time.
      later(T.type, () => {
        let n = 0;
        typing = setInterval(() => {
          n += 1;
          setTyped(n);
          if (n >= name.length) clearInterval(typing);
        }, T.perChar * 1000);
      });
      // The caret blinks on a little after the name, then goes.
      later(titlesAt + 1.2, () => setCaret(false));
      later(spinAt, () => {
        wantFlip.current = true;
        flipRef.current?.(T.spin * 1000);
      });
      // Then hand the chrome back to CSS.
      later(restAt + 2, () =>
        chrome.forEach((e) => {
          e.style.removeProperty("opacity");
          e.style.removeProperty("transform");
        }),
      );
    };
    begin.current = start;
    later(1.2, start);

    return () => {
      begin.current = () => {};
      timers.forEach(clearTimeout);
      clearInterval(typing);
      cancelAnimationFrame(frame);
      controls?.complete();
      setTyped(name.length);
      setCaret(false);
      delete root.dataset.intro;
    };
  }, [animate, scope, name, titles.length]);

  // The coin is ready: start the intro, or on a later visit just turn it.
  const onCoinReady = (flip: (ms?: number) => void) => {
    flipRef.current = flip;
    if (!playing.current) setTimeout(() => flip(1400), 700);
    else if (wantFlip.current) flip(T.spin * 1000);
    begin.current();
  };

  return (
    <section
      ref={scope}
      className="gutter pt-[clamp(56px,min(9vw,13vh),144px)] pb-[clamp(80px,min(11vw,16vh),176px)]"
    >
      <div className="wrap flex flex-wrap-reverse items-center gap-[clamp(48px,7vw,112px)]">
        <div className="flex min-w-0 flex-[1_1_440px] flex-col items-start">
          <h1 className="t-h1" aria-label={name}>
            {/* Every letter keeps its place while hidden, so nothing
                shifts as the name types out; the caret has no width. */}
            <span data-i="name" data-intro-hide="" aria-hidden="true">
              {[...name].map((c, i) => (
                <Fragment key={i}>
                  {caret && i === typed && <Caret />}
                  <span className={i < typed ? undefined : "invisible"}>
                    {c}
                  </span>
                </Fragment>
              ))}
              {caret && typed >= name.length && <Caret />}
            </span>
          </h1>
          {titles.length > 0 && (
            <p className="mt-[clamp(14px,1.6vw,20px)] flex flex-wrap items-center gap-x-3 gap-y-1 text-[clamp(13px,1.2vw,15px)] font-semibold tracking-[0.14em] text-accent-text uppercase">
              {titles.map((t, i) => (
                <span
                  key={t}
                  data-i="title"
                  data-intro-hide=""
                  className="flex items-center gap-3"
                >
                  {i > 0 && (
                    <span aria-hidden="true" className="text-fg-2/50">
                      ·
                    </span>
                  )}
                  {t}
                </span>
              ))}
            </p>
          )}
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
              View my projects
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
          <div data-i="coin" data-intro-hide="" className="relative">
            <Coin
              className="mx-auto w-[clamp(220px,28vw,400px)] max-w-full"
              flipOnLoad={false}
              flipMs={T.spin * 1000}
              onReady={onCoinReady}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/** The typing caret: a thin gold bar that blinks, taking up no room. */
function Caret() {
  return (
    <span aria-hidden="true" className="relative inline-block w-0">
      <span className="absolute bottom-[0.12em] left-[0.04em] h-[0.78em] w-[0.06em] animate-[caret_1s_steps(1)_infinite] rounded-full bg-accent" />
    </span>
  );
}
