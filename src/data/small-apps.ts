import type { StaticImageData } from "next/image";
import type { SmallApp } from "./types";

import eightBall from "../../public/coding-projects/others/thumbnail/8 Ball.png";
import coinFlip from "../../public/coding-projects/others/thumbnail/Coin Flip.png";
import calculator from "../../public/coding-projects/others/thumbnail/Calc.png";
import rpsGame from "../../public/coding-projects/others/thumbnail/RPS game.png";
import rpsConsole from "../../public/coding-projects/others/thumbnail/RPS console.png";
import tempCalc from "../../public/coding-projects/others/thumbnail/Temp Calc.png";
import stopwatch from "../../public/coding-projects/others/thumbnail/Stopwatch.png";
import ticTacToe from "../../public/coding-projects/others/thumbnail/TTT.png";
import todo from "../../public/coding-projects/others/thumbnail/TDL.png";

const img = (src: StaticImageData, title: string) => ({
  src,
  alt: `${title} screenshot`,
  fit: "cover" as const,
});

export const smallApps: SmallApp[] = [
  {
    title: "Magic 8 Ball",
    tech: "JavaScript",
    image: img(eightBall, "Magic 8 Ball"),
  },
  { title: "Coin Flip", tech: "JavaScript", image: img(coinFlip, "Coin Flip") },
  {
    title: "Calculator",
    tech: "JavaScript",
    image: img(calculator, "Calculator"),
  },
  {
    title: "Rock Paper Scissors",
    tech: "JavaScript",
    image: img(rpsGame, "Rock Paper Scissors"),
  },
  {
    title: "RPS Console Game",
    tech: "Node.js",
    image: img(rpsConsole, "RPS Console Game"),
  },
  {
    title: "Temperature Converter",
    tech: "JavaScript",
    image: img(tempCalc, "Temperature Converter"),
  },
  { title: "Stopwatch", tech: "React", image: img(stopwatch, "Stopwatch") },
  { title: "Tic Tac Toe", tech: "React", image: img(ticTacToe, "Tic Tac Toe") },
  { title: "To-Do List", tech: "React", image: img(todo, "To-Do List") },
];
