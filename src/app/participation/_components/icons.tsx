"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";
import { useCallback } from "react";

export default function Icons() {
  const [heart, setHeart] = useState(false);
  const [saved, setSaved] = useState(false);

  // Responsive icon sizes
  const iconSize = "w-7 h-7 md:w-10 md:h-10";

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "View Austin's Portfolio!",
          url: window.location.href,
        });
        console.log("Shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  }, []);

  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-baseline space-x-4">
        <Icon
          onClick={() => setHeart((prev) => !prev)}
          icon={heart ? "mdi:heart" : "mdi:heart-outline"}
          className={`${iconSize} ${heart ? "text-red-500" : "text-black hover:scale-105 active:scale-90 transition-all "} cursor-pointer`}
        />

        <Icon
          icon="tabler:message-circle"
          className={`text-black hover:scale-105 active:scale-90 transition-all cursor-pointer  ${iconSize} `}
          onClick={() => {
            window.prompt("Enter your comments!", "");
          }}
        />

        <Icon
          icon="ci:paper-plane"
          className={`text-black hover:scale-105 active:scale-90 transition-all cursor-pointer  ${iconSize} `}
          onClick={handleShare}
        />
      </div>
      <Icon
        onClick={() => setSaved((prev) => !prev)}
        icon={saved ? "mingcute:bookmark-fill" : "mingcute:bookmark-line"}
        className={`text-black cursor-pointer  hover:scale-105 active:scale-90 transition-all ${iconSize}`}
      />
    </div>
  );
}
