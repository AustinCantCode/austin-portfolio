"use client";

import posthog from "posthog-js";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

let started = false;

/** Sends an event to PostHog. Does nothing when no key is configured. */
export function track(event: string, props?: Record<string, unknown>) {
  if (!started) return;
  posthog.capture(event, props);
}

/**
 * Starts PostHog only when NEXT_PUBLIC_POSTHOG_KEY is set, tracks page
 * views, and sends a click event for any element with `data-track`
 * (props come from `data-track-*` attributes).
 */
export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!KEY || started) return;
    posthog.init(KEY, {
      api_host: HOST,
      capture_pageview: false,
      person_profiles: "identified_only",
    });
    started = true;
  }, []);

  useEffect(() => {
    if (!started) return;
    posthog.capture("$pageview", { $current_url: window.location.href });
    const m = pathname.match(/^\/projects\/([^/]+)/);
    if (m) track("case_study_view", { slug: m[1] });
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-track]",
      );
      if (!el) return;
      const props: Record<string, string> = {};
      for (const [k, v] of Object.entries(el.dataset)) {
        if (k.startsWith("track") && k !== "track") {
          props[k.slice(5, 6).toLowerCase() + k.slice(6)] = v ?? "";
        }
      }
      track(el.dataset.track as string, props);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return children;
}
