"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icon } from "../icon";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";
  const label = dark ? "Switch to light mode" : "Switch to dark mode";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="grid size-9 place-items-center rounded-full bg-bg-alt text-fg transition-transform duration-200 hover:scale-[1.06] active:scale-[.96]"
    >
      <Icon name={dark ? "sun" : "moon"} size={18} />
    </button>
  );
}
