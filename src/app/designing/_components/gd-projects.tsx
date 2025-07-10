"use client";

// COMPONENTS
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useState } from "react";

// DATA
import { GDProjects as GD } from "@data/design-projects";
import { textColors as colors } from "@data/colors";
import Title from "@components/ui/title";

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
    GD.map(() => getRandomColor()),
  );

  const handleImageClick = () => {
    const newColors = GD.map(() => getRandomColor());
    setPinColors(newColors);
  };
  return (
    <div className="grid grid-cols-3">
      <Title
        header="Graphics Design made with Adobe Photoshop"
        className="col-span-3"
      />
      {GD.map((project, index) => (
        <div
          className="col-span-1 text-center place-items-center px-2.5 py-4 bg-white"
          key={index}
        >
          <div className="cursor-pointer transition-all hover:scale-102 active:scale-100 elect-none">
            <Icon
              icon="ion:pin"
              width={30}
              height={30}
              className={`mx-auto translate-y-3 ${colors[pinColors[index]]}`}
            />
            <Image
              src={project.src}
              className="w-max cursor-pointer"
              onClick={handleImageClick}
              alt="Image of Project"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
