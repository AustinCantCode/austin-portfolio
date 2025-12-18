// LOGOS
import express from "../../public/coding-projects/skill-logos/express.webp";
import node from "../../public/coding-projects/skill-logos/node.webp";
import csharp from "../../public/coding-projects/skill-logos/csharp.png";
import mongo from "../../public/coding-projects/skill-logos/mongo.png";
import psql from "../../public/coding-projects/skill-logos/psql.png";
import prisma from "../../public/coding-projects/skill-logos/prisma.png";
import mysql from "../../public/coding-projects/skill-logos/mysql.png";
import tableplus from "../../public/coding-projects/skill-logos/tableplus.png";
import graphql from "../../public/coding-projects/skill-logos/graphql.png";
import docker from "../../public/coding-projects/skill-logos/docker.jpg";
import fastify from "../../public/coding-projects/skill-logos/fastify.png";
import swagger from "../../public/coding-projects/skill-logos/swagger.webp";

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
    title: "C#",
    src: csharp,
    proficiency: 60,
    color: colors.violet,
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
  {
    title: "GraphQL",
    src: graphql,
    proficiency: 40,
    color: colors.violet,
  },
  {
    title: "Docker",
    src: docker,
    proficiency: 45,
    color: colors.blue,
  },
  {
    title: "Fastify",
    src: fastify,
    proficiency: 45,
    color: colors.gray,
  },
  {
    title: "Swagger",
    src: swagger,
    proficiency: 50,
    color: colors.green,
  },
];

export default backendSkills;
