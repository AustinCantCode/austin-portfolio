// LOGOS
import express from "../../public/Coding Projects/Logos/express.webp";
import node from "../../public/Coding Projects/Logos/node.webp";
import mongo from "../../public/Coding Projects/Logos/mongo.png";
import psql from "../../public/Coding Projects/Logos/psql.png";
import prisma from "../../public/Coding Projects/Logos/prisma.png";
import mysql from "../../public/Coding Projects/Logos/mysql.png";
import tableplus from "../../public/Coding Projects/Logos/tableplus.png";

// DATA
import colors from "./colors";

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
