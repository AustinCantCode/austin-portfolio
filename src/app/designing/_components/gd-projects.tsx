"use client";

// COMPONENTS
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useState } from "react";

// DATA
import { GDProjects as GD } from "@data/design-projects";
import { textColors as colors } from "@data/colors";

export default function GDProjects() {
  const numberValue = {
    1: "red",
    2: "orange",
    3: "yellow",
    4: "green",
    5: "blue",
    6: "indigo",
    7: "violet",
    8: "gray",
  };

  function getRandomColor() {
    const number = Math.floor(Math.random() * 8) + 1;
    return numberValue[number];
  }

  const [pinColors, setPinColors] = useState(() =>
    GD.map(() => getRandomColor())
  );

  const handleImageClick = () => {
    const newColors = GD.map(() => getRandomColor());
    setPinColors(newColors);
  };
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 mx-4">
      <div className="flex justify-baseline gap-x-8 items-center bg-white/15 p-4 w-full mx-auto rounded-lg md:col-span-3 mb-8">
        <Icon width={80} height={80} icon={"devicon:photoshop"} />
        <div className="grid gap-y-2">
          <p className="font-semibold text-2xl md:text-4xl m-0 p-0">
            Made with Adobe Photoshop
          </p>
          <p className="m-0 p-0">Click on the artworks to make them bigger!</p>
        </div>
      </div>
      {GD.map((project, index) => (
        <div
          className="col-span-1 text-center place-items-center px-2 py-4 bg-white"
          key={index}
        >
          <div className="cursor-pointer transition-all hover:scale-102 active:scale-98 select-none">
            <Icon
              icon="ion:pin"
              width={30}
              height={30}
              className={`mx-auto translate-y-3 ${colors[pinColors[index]]}`}
            />
            <Image
              src={project.src}
              className="w-max cursor-pointer hover:shadow-[0px_0px_14px_rgba(0,0,0,0.5)] transition-all active:scale-200"
              onMouseEnter={handleImageClick}
              alt="Image of Project"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
