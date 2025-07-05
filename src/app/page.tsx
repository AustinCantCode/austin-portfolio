"use client";
import NameBanner from "@components/complex-ui/name-banner";
import { useEffect, useState } from "react";

export default function Homepage() {
  const [fadeIn, setFadeIn] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(" fade-in bg-stars");
    }, 3100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative overflow-hidden min-h-screen flex justify-center bg-black">
      {/* Background Layers */}
      <div className={"absolute inset-0 z-0" + fadeIn} />
      <div className="absolute inset-0 bg-twinkling z-10" />
      {/* Name Card */}
      <NameBanner />
    </main>
  );
}
