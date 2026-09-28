"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { AnalyticsProvider } from "./analytics";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      storageKey="as-theme"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
