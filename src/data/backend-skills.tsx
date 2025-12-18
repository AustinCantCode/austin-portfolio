// LOGOS
import express from "../../public/coding-projects/skill-logos/express.webp";
import node from "../../public/coding-projects/skill-logos/node.webp";
import mongo from "../../public/coding-projects/skill-logos/mongo.png";
import psql from "../../public/coding-projects/skill-logos/psql.png";
import prisma from "../../public/coding-projects/skill-logos/prisma.png";
import mysql from "../../public/coding-projects/skill-logos/mysql.png";
import tableplus from "../../public/coding-projects/skill-logos/tableplus.png";

// DATA
import { bgColors as colors } from "./colors";

const backendSkills = [
  {
    title: "Express.js",
    src: express,
    proficiency: 70,
    color: colors.gray,
  },
  {
    title: "Node.js",
    src: node,
    proficiency: 70,
    color: colors.green,
  },
  {
    title: "MongoDB",
    src: mongo,
    proficiency: 40,
    color: colors.green,
  },
  {
    title: "PostgreSQL",
    src: psql,
    proficiency: 60,
    color: colors.blue,
  },
  {
    title: "Prisma ORM",
    src: prisma,
    proficiency: 40,
    color: colors.gray,
  },
  {
    title: "MySQL",
    src: mysql,
    proficiency: 70,
    color: colors.blue,
  },
  {
    title: "TablePlus",
    src: tableplus,
    proficiency: 50,
    color: colors.yellow,
  },
];

export default backendSkills;
