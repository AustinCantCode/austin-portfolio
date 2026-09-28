/** Copy for /about, /about/skills and /cv, from the design prototypes. */
export const about = {
  intro:
    "I graduated from Singapore Polytechnic with a Diploma in Information Technology, specialising in UI/UX design. After my internship at Amber Creative, I did freelance software development. Now I'm building my own app, StillGood.",
  timeline: [
    {
      date: "Aug 2026",
      title: "Launched StillGood",
      sub: "Live on the Google Play Store.",
    },
    {
      date: "Apr 2026 – Present",
      title: "StillGood",
      sub: "Founder & Developer",
      now: true,
    },
    {
      date: "Feb 2026 – May 2026",
      title: "Freelance",
      sub: "Software Developer",
    },
    {
      date: "Apr 2025 – Feb 2026",
      title: "Amber Creative Pte Ltd",
      sub: "Full-stack Software Developer Intern",
    },
    {
      date: "Sep 2024",
      title: "SP Batey Hackathon",
      sub: "Grand finalist with Frésko, the idea behind StillGood.",
    },
    {
      date: "2023 – 2026",
      title: "Singapore Polytechnic",
      sub: "Diploma in Information Technology",
    },
    {
      date: "2018 – 2022",
      title: "Compassvale Secondary School",
      sub: "GCE O-Level",
    },
  ],
  more: [
    {
      href: "/about/skills",
      icon: "layers",
      title: "Skills",
      text: "34 tools across frontend, mobile, backend and design.",
    },
    {
      href: "/about/certificates",
      icon: "award",
      title: "Certificates",
      text: "29 from AWS, GitHub, LinkedIn Learning and more.",
    },
    {
      href: "/about/events",
      icon: "calendar-days",
      title: "Events",
      text: "Hackathons, trips and volunteering.",
    },
    {
      href: "/cv",
      icon: "file-text",
      title: "CV",
      text: "Everything on one page, plus a PDF.",
    },
  ],
  learnt: [
    {
      icon: "sparkles",
      title: "AI-assisted development",
      text: "Working with an AI coding assistant responsibly: giving it clear rules and checking everything it writes.",
    },
    {
      icon: "chart-line",
      title: "PostHog",
      text: "Understanding how people actually use an app, so I can improve it.",
    },
    {
      icon: "smartphone",
      title: "Mobile development",
      text: "Building phone apps with payments, notifications and fingerprint login.",
    },
  ],
};

export const cv = {
  role: "Full-stack developer and UI/UX designer · Singapore",
  profile:
    "Singapore Polytechnic IT graduate with over 3 years of full-stack web development. I launched my own app, StillGood, on the Google Play Store, and have built more than 10 projects across a range of tech stacks.",
  experience: [
    {
      org: "StillGood",
      role: "Founder & Developer",
      date: "Apr 2026 – Present",
      text: "Designed and built a food waste app, API and website solo. Gemini AI scanning and recipes, PostHog analytics. Built with Claude Code as an AI pair programmer, with every change reviewed through pull requests. Live on Google Play.",
    },
    {
      org: "Freelance",
      role: "Software Developer",
      date: "Feb 2026 – May 2026",
      text: "Client web development, including accounts, orders, payments and email notifications for the Calibrium watch store. Used Claude Code to speed up parts of the build, reviewing and testing every change.",
    },
    {
      org: "Amber Creative Pte Ltd",
      role: "Full-stack Software Developer Intern",
      date: "Apr 2025 – Feb 2026",
      text: "Built and maintained client platforms including ITE WSDip, KiasuParents, Glovida-RX and IAL, using Next.js, TypeScript, C# and several CMSs.",
    },
  ],
  education: [
    {
      org: "Singapore Polytechnic",
      date: "2023 – 2026",
      text: "Diploma in Information Technology, specialising in UI/UX design",
    },
    {
      org: "Compassvale Secondary School",
      date: "2018 – 2022",
      text: "GCE O-Level",
    },
  ],
  projects: ["stillgood", "calibrium", "ite", "ksp", "grx", "fresko"],
};
