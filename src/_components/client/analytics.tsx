"use client";

import posthog from "posthog-js";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

/** Sends an event to PostHog. Does nothing when analytics is off. */
export function track(event: string, props?: Record<string, unknown>) {
  if (!posthog.__loaded) return;
  posthog.capture(event, props);
}

/**
 * The site's own events on top of PostHog's automatic page views (PostHog
 * starts in src/instrumentation-client.ts): a case study view for each
 * project page, and a click event for any element with `data-track`
 * (props come from `data-track-*` attributes).
 */
export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
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
