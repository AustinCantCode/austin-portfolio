// VIDEO DEMONSTRATIONS
import eightball from "../../videos/8Ball Demo.mp4.json";
import rpsgame from "../../videos/RPS.mp4.json";
import calculator from "../../videos/Calc.mp4.json";
import coinflip from "../../videos/Coin Flip.mp4.json";
import tempconverter from "../../videos/Temp Calc.mp4.json";
import chatbot from "../../videos/Telegram Bot Demo.mp4.json";
import rps from "../../videos/RPS Demo.mp4.json";
import stopwatch from "../../videos/Stopwatch Demo.mp4.json";
import ttt from "../../videos/TTT.mp4.json";
import tdl from "../../videos/TDL Demo.mp4.json";

// THUMBNAILS
import eightballTN from "../../public/Coding Projects/Thumbnail/8 Ball.png";
import rpsgameTN from "../../public/Coding Projects/Thumbnail/RPS game.png";
import calculatorTN from "../../public/Coding Projects/Thumbnail/Calc.png";
import coinflipTN from "../../public/Coding Projects/Thumbnail/Coin Flip.png";
import tempconverterTN from "../../public/Coding Projects/Thumbnail/Temp Calc.png";
import chatbotTN from "../../public/Coding Projects/Thumbnail/Telegram Bot.png";
import rpsconsoleTN from "../../public/Coding Projects/Thumbnail/RPS console.png";
import stopwatchTN from "../../public/Coding Projects/Thumbnail/Stopwatch.png";
import tttTN from "../../public/Coding Projects/Thumbnail/TTT.png";
import tdlTN from "../../public/Coding Projects/Thumbnail/TDL.png";

const codingProjects = [
  {
    id: "8ball",
    title: "Magic 8 Ball",
    description:
      "A simple Magic 8 Ball game where you ask a question and receive a random answer.",
    thumbnail: eightballTN,
    src: eightball,
    date: "2023",
    skills: ["JavaScript"],
  },
  {
    id: "rpsconsole",
    title: "RPS Console Game",
    description: "A Rock Paper Scissors game built with a console interface.",
    thumbnail: rpsconsoleTN,
    src: rps,
    date: "2023",
    skills: ["HTML", "CSS", "JavaScript", "Node.js"],
  },
  {
    id: "rps",
    title: "Rock Paper Scissors",
    description:
      "A Rock Paper Scissors game built with a simple user interface.",
    thumbnail: rpsgameTN,
    src: rpsgame,
    date: "2023",
    skills: ["HTML", "CSS", "JavaScript", "Node.js"],
  },
  {
    id: "calculator",
    title: "Calculator",
    description:
      "A simple calculator application that performs basic arithmetic operations.",
    thumbnail: calculatorTN,
    src: calculator,
    date: "2023",
    skills: ["JavaScript", "Node.js"],
  },
  {
    id: "tempconverter",
    title: "Temperature Converter",
    description:
      "An application to convert temperatures between Celsius, Fahrenheit, and Kelvin.",
    thumbnail: tempconverterTN,
    src: tempconverter,
    date: "2023",
    skills: ["HTML", "CSS", "JavaScript", "Node.js"],
  },
  {
    id: "coinflip",
    title: "Coin Flip",
    description:
      "A coin flip game that simulates flipping a coin and shows heads or tails.",
    thumbnail: coinflipTN,
    src: coinflip,
    date: "2023",
    skills: ["HTML", "CSS", "JavaScript", "Node.js"],
  },
  {
    id: "chatbot",
    title: "ChatGPT Telegram Bot",
    description:
      "A Telegram bot powered by ChatGPT for interactive conversations.",
    thumbnail: chatbotTN,
    src: chatbot,
    date: "2024",
    skills: ["JavaScript", "Node.js"],
  },
  {
    id: "stopwatch",
    title: "Stopwatch",
    description: "A stopwatch app with start/stop/reset functionality.",
    thumbnail: stopwatchTN,
    src: stopwatch,
    date: "2024",
    skills: ["React", "JavaScript", "Node.js"],
  },
  {
    id: "ttt",
    title: "Tic Tac Toe",
    description: "A classic two-player Tic Tac Toe game.",
    thumbnail: tttTN,
    src: ttt,
    date: "2024",
    skills: ["React", "JavaScript", "Node.js"],
  },
  {
    id: "tdl",
    title: "To-Do List",
    description: "A simple task-tracking to-do list app.",
    thumbnail: tdlTN,
    src: tdl,
    date: "2024",
    skills: ["React", "JavaScript", "Node.js"],
  },
];

export default codingProjects;
