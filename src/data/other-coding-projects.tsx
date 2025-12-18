// VIDEO DEMONSTRATIONS
import eightball from "../../videos/8Ball Demo.mp4.json";
import rpsgame from "../../videos/RPS.mp4.json";
import calculator from "../../videos/Calc.mp4.json";
import coinflip from "../../videos/Coin Flip.mp4.json";
import tempconverter from "../../videos/Temp Calc.mp4.json";
import rps from "../../videos/RPS Demo.mp4.json";
import stopwatch from "../../videos/Stopwatch Demo.mp4.json";
import ttt from "../../videos/TTT.mp4.json";
import tdl from "../../videos/TDL Demo.mp4.json";

// THUMBNAILS
import eightball_THUMBNAIL from "../../public/coding-projects/others/thumbnail/8 Ball.png";
import rpsgame_THUMBNAIL from "../../public/coding-projects/others/thumbnail/RPS game.png";
import calculator_THUMBNAIL from "../../public/coding-projects/others/thumbnail/Calc.png";
import coinflip_THUMBNAIL from "../../public/coding-projects/others/thumbnail/Coin Flip.png";
import tempconverter_THUMBNAIL from "../../public/coding-projects/others/thumbnail/Temp Calc.png";
import rpsconsole_THUMBNAIL from "../../public/coding-projects/others/thumbnail/RPS console.png";
import stopwatch_THUMBNAIL from "../../public/coding-projects/others/thumbnail/Stopwatch.png";
import ttt_THUMBNAIL from "../../public/coding-projects/others/thumbnail/TTT.png";
import tdl_THUMBNAIL from "../../public/coding-projects/others/thumbnail/TDL.png";

const codingProjects = [
  {
    id: "8ball",
    title: "Magic 8 Ball",
    description:
      "A simple Magic 8 Ball game where you ask a question and receive a random answer.",
    thumbnail: eightball_THUMBNAIL,
    src: eightball,
    date: "2023",
    skills: ["JavaScript"],
  },
  {
    id: "rpsconsole",
    title: "RPS Console Game",
    description: "A Rock Paper Scissors game built with a console interface.",
    thumbnail: rpsconsole_THUMBNAIL,
    src: rps,
    date: "2023",
    skills: ["HTML", "CSS", "JavaScript", "Node.js"],
  },
  {
    id: "rps",
    title: "Rock Paper Scissors",
    description:
      "A Rock Paper Scissors game built with a simple user interface.",
    thumbnail: rpsgame_THUMBNAIL,
    src: rpsgame,
    date: "2023",
    skills: ["HTML", "CSS", "JavaScript", "Node.js"],
  },
  {
    id: "calculator",
    title: "Calculator",
    description:
      "A simple calculator application that performs basic arithmetic operations.",
    thumbnail: calculator_THUMBNAIL,
    src: calculator,
    date: "2023",
    skills: ["JavaScript", "Node.js"],
  },
  {
    id: "tempconverter",
    title: "Temperature Converter",
    description:
      "An application to convert temperatures between Celsius, Fahrenheit, and Kelvin.",
    thumbnail: tempconverter_THUMBNAIL,
    src: tempconverter,
    date: "2023",
    skills: ["HTML", "CSS", "JavaScript", "Node.js"],
  },
  {
    id: "coinflip",
    title: "Coin Flip",
    description:
      "A coin flip game that simulates flipping a coin and shows heads or tails.",
    thumbnail: coinflip_THUMBNAIL,
    src: coinflip,
    date: "2023",
    skills: ["HTML", "CSS", "JavaScript", "Node.js"],
  },
  {
    id: "stopwatch",
    title: "Stopwatch",
    description: "A stopwatch app with start/stop/reset functionality.",
    thumbnail: stopwatch_THUMBNAIL,
    src: stopwatch,
    date: "2024",
    skills: ["React", "JavaScript", "Node.js"],
  },
  {
    id: "ttt",
    title: "Tic Tac Toe",
    description: "A classic two-player Tic Tac Toe game.",
    thumbnail: ttt_THUMBNAIL,
    src: ttt,
    date: "2024",
    skills: ["React", "JavaScript", "Node.js"],
  },
  {
    id: "tdl",
    title: "To-Do List",
    description: "A simple task-tracking to-do list app.",
    thumbnail: tdl_THUMBNAIL,
    src: tdl,
    date: "2024",
    skills: ["React", "JavaScript", "Node.js"],
  },
];

export default codingProjects;
