"use client";

import NameBanner from "@components/complex-ui/name-banner";
import { useEffect, useState } from "react";

export default function Homepage() {
  const [fadeIn, setFadeIn] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn("fade-in bg-stars");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="px-4 md:px-0 relative overflow-hidden min-h-screen flex justify-center bg-black">
      <div className={"absolute inset-0 z-0 " + fadeIn} />
      <div className="absolute inset-0 bg-twinkling z-10" />
      <NameBanner />
    </main>
  );
}
