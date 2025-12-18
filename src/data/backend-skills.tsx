// LOGOS
import express from "@skillLogos/express.webp";
import node from "@skillLogos/node.webp";
import mongo from "@skillLogos/mongo.png";
import psql from "@skillLogos/psql.png";
import prisma from "@skillLogos/prisma.png";
import mysql from "@skillLogos/mysql.png";
import tableplus from "@skillLogos/tableplus.png";

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
