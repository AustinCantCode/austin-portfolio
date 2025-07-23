"use client";

// COMPONENTS
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useState } from "react";

// DATA
import { GDProjects as GD } from "@data/design-projects";
import { textColors as colors } from "@data/colors";
import ClickableImage from "@components/ui/clickable-image";

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

  const changePinColor = () => {
    const newColors = GD.map(() => getRandomColor());
    setPinColors(newColors);
  };
  return (
    <div className="rounded-md border-8 border-white">
      <div className="flex justify-baseline gap-x-8 items-center bg-white p-4 w-full mx-auto text-black md:col-span-3">
        <Icon width={80} height={80} icon={"devicon:photoshop"} />
        <div className="grid gap-y-2">
          <p className="font-semibold text-2xl md:text-4xl m-0 p-0">
            Made with Adobe Photoshop
          </p>
          <p className="m-0 p-0">Click on the artworks to make them bigger!</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-3">
        {GD.map((project, index) => (
          <div
            className="col-span-1 text-center place-items-center px-2 py-4 bg-white"
            key={index}
          >
            <div className="cursor-pointer transition-all select-none" onMouseEnter={changePinColor}>
              <Icon
                icon="ion:pin"
                width={30}
                height={30}
                className={`mx-auto translate-y-3 z-50 ${colors[pinColors[index]]}`}
              />
              <ClickableImage src={project.src} />
            </div>
          </div>
        ))}
      </div>{" "}
    </div>
  );
}
