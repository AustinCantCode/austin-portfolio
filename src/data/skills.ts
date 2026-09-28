import type { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    name: "Frontend",
    plain: "The parts of websites and apps you see and click.",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "JavaScript",
      "Motion",
    ],
  },
  {
    name: "Mobile",
    plain: "Apps for phones.",
    items: ["React Native", "Expo", "NativeWind"],
  },
  {
    name: "Backend",
    plain:
      "The behind-the-scenes systems that store data and make things work.",
    items: [
      "Node.js",
      "Express.js",
      "Fastify",
      "C#",
      "Supabase",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Prisma",
      "GraphQL",
      "Strapi CMS",
    ],
  },
  {
    name: "Tools",
    plain: "Helpers for building, testing and tracking how people use an app.",
    items: [
      "Claude Code",
      "PostHog",
      "Sentry",
      "Docker",
      "GitHub Actions",
      "Swagger UI",
      "TablePlus",
    ],
  },
  {
    name: "Design",
    plain: "Planning how things look and feel before they're built.",
    items: [
      "Figma",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Adobe XD",
      "Tinkercad",
    ],
  },
];

export const allSkills = skillGroups.flatMap((g) => g.items);
