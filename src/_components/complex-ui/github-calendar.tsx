"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "../icon";

declare global {
  interface Window {
    GitHubCalendar?: (
      container: string | HTMLElement,
      username: string,
      options?: Record<string, unknown>,
    ) => Promise<unknown>;
  }
}

const SCRIPT =
  "https://unpkg.com/github-calendar@2.3.4/dist/github-calendar.min.js";
const STYLES =
  "https://unpkg.com/github-calendar@2.3.4/dist/github-calendar-responsive.css";

/**
 * GitHub contribution calendar. Falls back to a plain link to the GitHub
 * profile if the calendar can't load (for example when offline).
 */
export default function GitHubCalendar({ username }: { username: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    const fail = () => {
      if (!done) setFailed(true);
      done = true;
    };
    const timeout = setTimeout(() => {
      if (!el.querySelector("svg, .js-calendar-graph")) fail();
    }, 10000);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = STYLES;
    document.head.appendChild(link);

    const render = () => {
      if (!window.GitHubCalendar) return fail();
      window
        .GitHubCalendar(el, username, { responsive: true, tooltips: true })
        .then(() => {
          if (!el.querySelector("svg, .js-calendar-graph")) fail();
          else done = true;
        })
        .catch(fail);
    };

    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT}"]`,
    );
    if (script && window.GitHubCalendar) render();
    else {
      script = document.createElement("script");
      script.src = SCRIPT;
      script.async = true;
      script.onload = render;
      script.onerror = fail;
      document.body.appendChild(script);
    }

    return () => {
      done = true;
      clearTimeout(timeout);
      link.remove();
    };
  }, [username]);

  if (failed) {
    return (
      <a
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 text-fg hover:no-underline"
      >
        <span className="grid size-12 flex-none place-items-center rounded-full bg-bg-alt">
          <Icon name="mdi:github" size={24} />
        </span>
        <span className="flex flex-col">
          <span className="text-[17px] font-semibold">
            See my contributions on GitHub
          </span>
          <span className="text-[14px] text-fg-2">
            The calendar couldn&apos;t load here.
          </span>
        </span>
        <Icon name="arrow-up-right" size={18} className="ml-auto text-fg-2" />
      </a>
    );
  }

  return (
    <div ref={ref} className="gh-calendar min-w-[720px] text-[14px] text-fg-2">
      Loading GitHub contributions…
    </div>
  );
}
