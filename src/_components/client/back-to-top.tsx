"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { useState } from "react";
import { Icon } from "../icon";
import { prefersReducedMotion } from "./motion";

/**
 * Desktop back-to-top button. It appears after a screen of scrolling,
 * and a gold ring around it shows how far down the page you are. (Phones
 * have the tab bar instead.)
 */
export function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const ring = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) =>
    setShow(y > window.innerHeight),
  );

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: prefersReducedMotion() ? "auto" : "smooth",
            })
          }
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          className="press fixed right-6 bottom-6 z-[58] hidden size-12 place-items-center rounded-full border border-hairline bg-menu text-fg shadow-[var(--shadow-menu)] transition-colors hover:bg-pill lg:grid"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 48 48"
            className="absolute inset-0 size-full -rotate-90"
          >
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="var(--accent-fill)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: ring }}
            />
          </svg>
          <Icon name="arrow-right" size={18} className="-rotate-90" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
