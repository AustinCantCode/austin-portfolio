/**
 * Starts PostHog as the page loads, before React, as PostHog's Next.js
 * guide recommends. It does nothing until NEXT_PUBLIC_POSTHOG_KEY (or
 * NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) is set.
 *
 * Events go through this site's own /relay path (a rewrite in
 * next.config.ts), so ad blockers that block PostHog's domain don't drop
 * them. Page views are captured on every client-side navigation by
 * `defaults`; custom events are in src/_components/client/analytics.tsx.
 */
import posthog from "posthog-js";

const token =
  process.env.NEXT_PUBLIC_POSTHOG_KEY ??
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

if (token) {
  posthog.init(token, {
    api_host: "/relay",
    // Links from the toolbar and replays still open PostHog itself.
    ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST?.includes("eu.")
      ? "https://eu.posthog.com"
      : "https://us.posthog.com",
    // The newest defaults: page views on every route change, page leaves,
    // and hydration-safe script loading for Next.js.
    defaults: "2026-08-30",
    person_profiles: "identified_only",
    // Errors on the site show up in PostHog's error tracking.
    capture_exceptions: true,
  });
}
