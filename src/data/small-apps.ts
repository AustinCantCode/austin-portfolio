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

/** Demo recordings live in /public/coding-projects/others/video-demo. */
const demo = (file: string) =>
  `/coding-projects/others/video-demo/${encodeURIComponent(file)}`;

export const smallApps: SmallApp[] = [
  {
    title: "Magic 8 Ball",
    tech: "JavaScript",
    year: "2023",
    text: "Ask a question and get a random answer.",
    image: img(eightBall, "Magic 8 Ball"),
    video: demo("8Ball Demo.mp4"),
  },
  {
    title: "Coin Flip",
    tech: "JavaScript",
    year: "2023",
    text: "Flip a coin and see heads or tails.",
    image: img(coinFlip, "Coin Flip"),
    video: demo("Coin Flip.mp4"),
  },
  {
    title: "Calculator",
    tech: "JavaScript",
    year: "2023",
    text: "A calculator for everyday sums.",
    image: img(calculator, "Calculator"),
    video: demo("Calc.mp4"),
  },
  {
    title: "Rock Paper Scissors",
    tech: "JavaScript",
    year: "2023",
    text: "Rock Paper Scissors against the computer, with buttons to play.",
    image: img(rpsGame, "Rock Paper Scissors"),
    video: demo("RPS.mp4"),
  },
  {
    title: "RPS Console Game",
    tech: "Node.js",
    year: "2023",
    text: "Rock Paper Scissors played in the terminal.",
    image: img(rpsConsole, "RPS Console Game"),
    video: demo("RPS Demo.mp4"),
  },
  {
    title: "Temperature Converter",
    tech: "JavaScript",
    year: "2023",
    text: "Convert between Celsius, Fahrenheit and Kelvin.",
    image: img(tempCalc, "Temperature Converter"),
    video: demo("Temp Calc.mp4"),
  },
  {
    title: "Stopwatch",
    tech: "React",
    year: "2024",
    text: "A stopwatch with start, stop and reset.",
    image: img(stopwatch, "Stopwatch"),
    video: demo("Stopwatch Demo.mp4"),
  },
  {
    title: "Tic Tac Toe",
    tech: "React",
    year: "2024",
    text: "The classic two-player game.",
    image: img(ticTacToe, "Tic Tac Toe"),
    video: demo("TTT.mp4"),
  },
  {
    title: "To-Do List",
    tech: "React",
    year: "2024",
    text: "Add, tick off and remove tasks.",
    image: img(todo, "To-Do List"),
    video: demo("TDL Demo.mp4"),
  },
];
