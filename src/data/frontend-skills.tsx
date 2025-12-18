// LOGOS
import html from "../../public/coding-projects/skill-logos/html.png";
import css from "../../public/coding-projects/skill-logos/css.png";
import next from "../../public/coding-projects/skill-logos/next.png";
import tw from "../../public/coding-projects/skill-logos/tw.svg";
import ts from "../../public/coding-projects/skill-logos/ts.png";
import js from "../../public/coding-projects/skill-logos/js.png";
import react from "../../public/coding-projects/skill-logos/react.png";
import motion from "../../public/coding-projects/skill-logos/framer-motion.svg";

// DATA
import { bgColors as colors } from "./colors";

const frontendSkills = [
  {
    title: "Next.js",
    src: next,
    proficiency: 80,
    color: colors.gray,
  },
  {
    title: "TypeScript",
    src: ts,
    proficiency: 75,
    color: colors.blue,
  },
  {
    title: "React",
    src: react,
    proficiency: 80,
    color: colors.blue,
  },
  {
    title: "Tailwind CSS",
    src: tw,
    proficiency: 80,
    color: colors.blue,
  },
  {
    title: "HTML",
    src: html,
    proficiency: 85,
    color: colors.orange,
  },
  {
    title: "CSS",
    src: css,
    proficiency: 80,
    color: colors.blue,
  },
  {
    title: "JavaScript",
    src: js,
    proficiency: 85,
    color: colors.yellow,
  },
  {
    title: "Motion",
    src: motion,
    proficiency: 50,
    color: colors.violet,
  },
];

export default frontendSkills;
