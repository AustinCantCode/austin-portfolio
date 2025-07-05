"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";

export default function Icons() {
  const [heart, setHeart] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <div className="flex justify-between mt-4 items-center">
      <div className="flex justify-baseline space-x-4">
        <Icon
          onClick={() => setHeart((prev) => !prev)}
          icon={heart ? "mdi:heart" : "mdi:heart-outline"}
          width="38"
          height="38"
          className={
            heart ? "text-red-500 cursor-pointer" : "text-black cursor-pointer"
          }
        />

        <Icon
          icon="tabler:message-circle"
          width="38"
          height="38"
          className="text-black cursor-pointer"
        />

        <Icon
          icon="ci:paper-plane"
          width="38"
          height="38"
          className="text-black cursor-pointer"
        />
      </div>
      <Icon
        onClick={() => setSaved((prev) => !prev)}
        icon={saved ? "mingcute:bookmark-fill" : "mingcute:bookmark-line"}
        width="35"
        height="35"
        className="text-black cursor-pointer"
      />
    </div>
  );
}
