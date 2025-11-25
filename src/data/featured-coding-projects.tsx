// FEATURED PROJECTS IMAGES
import GOWHERE from "../../public/Coding Projects/Featured/GoWhere/gowhere.jpeg";

import TELEGPT from "../../public/Coding Projects/Featured/Telegpt/Telegpt.png";

import SHOPLY from "../../public/Coding Projects/Featured/Shoply/Shoply.png";
import SHOPLY1 from "../../public/Coding Projects/Featured/Shoply/image 1.png";
import SHOPLY2 from "../../public/Coding Projects/Featured/Shoply/image 2.png";
import SHOPLY3 from "../../public/Coding Projects/Featured/Shoply/image 3.png";
import SHOPLY4 from "../../public/Coding Projects/Featured/Shoply/image 4.png";
import SHOPLY5 from "../../public/Coding Projects/Featured/Shoply/image 5.png";
import SHOPLY6 from "../../public/Coding Projects/Featured/Shoply/image 6.png";

import GRX from "../../public/Coding Projects/Projects/grx.png";
import GRX1 from "../../public/Coding Projects/Featured/GRX/GRX.png";

import KSP from "../../public/Coding Projects/Projects/ksp.png";
import KSP1 from "../../public/Coding Projects/Featured/KSP/KSP1.png";
import KSP2 from "../../public/Coding Projects/Featured/KSP/KSP2.png";

import INLAB from "../../public/Coding Projects/Projects/inlab.png";
import INLAB1 from "../../public/Coding Projects/Featured/IAL/IAL1.png";

import ITE from "../../public/Coding Projects/Projects/ite.png";
import ITE1 from "../../public/Coding Projects/Featured/ITE/ITE1.png";

import JINT from "../../public/Coding Projects/Projects/jint.png";
import AC from "../../public/Coding Projects/Projects/ac.png";
import AS from "../../public/Coding Projects/Projects/AS Square Logo.png";

const featuredProjects = [
  {
    id: "JINT",
    title: "JuzInterior",
    description:
      "JuzInterior is an interior design and renovation company focused on creating personalized living and commercial spaces. I contributed to the enhancement of their website by implementing responsive UI components, improving layout consistency, and optimizing user interactions.\n\nAs a Frontend Developer, I refined the design system, improved cross-page styling, and ensured that pages loaded smoothly across all screen sizes for a professional and reliable browsing experience.",
    src: JINT,
    images: [],
    date: "2025",
    skills: ["WordPress", "BetterDocs", "PHP", "CSS"],
    link: "https://juzinterior.com/",
    subtext: "Interior Design & Renovation Firm",
  },

  {
    id: "AC",
    title: "Amber Creative",
    description:
      "Amber Creative is a digital marketing agency offering branding, web development, and paid media solutions. During my internship, I contributed to various internal systems and client-facing projects, focusing on backend logic, database handling, and improving component performance.\n\nAs a Software Developer Intern, I worked with REST and gRPC services, optimized queries, maintained PostgreSQL schemas, and helped implement new features across ongoing marketing tech projects.",
    src: AC,
    images: [],
    date: "2025",
    skills: ["Node.js", "Express.js", "PostgreSQL", "Prisma", "gRPC", "React"],
    link: "https://ambercreative.sg/",
    subtext: "Software Development Company",
  },

  {
    id: "PORT",
    title: "My Portfolio",
    description:
      "A modern, editorial-inspired portfolio showcasing my development work, case studies, and interactive UI components. The site blends minimal layouts with motion elements to create a sophisticated and engaging browsing experience.\n\nAs the Full-Stack Developer, I designed the UI, developed reusable components, implemented animations, and organized the content structure to present my projects in a clear and visually appealing manner.",
    src: AS,
    images: [],
    date: "2025",
    skills: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
      "TypeScript",
    ],
    link: "/",
    subtext: "My Digital Portfolio Project",
  },
  {
    id: "GRX",
    title: "Glovida-RX",
    description:
      "Glovida-RX is a digital healthcare platform that streamlines prescription management between doctors, pharmacists, and patients. I contributed to improving system stability by resolving issues related to dynamic state updates within key UI components.\n\nAs a Frontend Developer, I ensured that product prices and medication details updated accurately in real time. I also enhanced backend state handling between pharmacist and doctor roles, ensuring data reflected correctly across the platform for faster and more reliable decision-making.",
    src: GRX,
    images: [GRX1],
    date: "2025",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "GraphQL",
      "TablePlus",
    ],
    link: "https://www.glovida-rx.com.sg/",
    subtext: "Medical Prescription Management",
  },
  {
    id: "KSP",
    title: "KiasuParents",
    description:
      "KiasuParents is a widely-used online community and resource hub for parents in Singapore. I worked on enhancing the platform through new feature development, bug fixes, and continuous content updates guided by client requirements.\n\nMy contributions included implementing new webpages, improving application performance, and maintaining stability across key modules. I also gained experience working with Strapi CMS, WordPress, and NodeBB — managing content workflows, performing administrative tasks, and supporting backend operations.",
    src: KSP,
    images: [KSP1, KSP2],
    date: "2025",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "WordPress",
      "Strapi CMS",
      "Mautic Automations",
      "NodeBB Forum",
    ],
    link: "https://www.kiasuparents.com/kiasu",
    subtext: "Parenting Community & Content",
  },
  {
    id: "INLAB",
    title: "IAL InLab",
    description:
      "IAL InLab is a platform that supports innovation initiatives within the Institute for Adult Learning (IAL). During my time contributing to the project, I worked closely with the project managers to improve application reliability and enhance the overall content experience through the StoryBlok CMS.\n\nAs a Frontend Developer, I was responsible for identifying and fixing functional bugs to ensure smooth platform performance. I also gained hands-on experience using StoryBlok CMS for managing structured content and backend operations. One key improvement I implemented involved using the nullish coalescing operator (??) to provide safe fallback values for content fields, ensuring the UI handled empty CMS values gracefully without breaking.",
    src: INLAB,
    images: [INLAB1],
    date: "2025",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "StoryBlok CMS"],
    link: "https://inlab.ial.edu.sg/",
    subtext: "Institute for Adult Learning",
  },
  {
    id: "ITE",
    title: "ITE WSDip",
    description:
      "ITE Work-Study Diploma (WSDip) is a multi-role education management platform supporting trainees, trainers, administrators, and company representatives. I contributed as a Full-stack Developer, building features that improved both user experience and backend reliability.\n\nMy work involved developing responsive UI using custom ShadCN components, integrating backend APIs, and managing data flow across multiple user types. I also handled debugging, dynamic data handling, and supported deployments using tools like Docker, Azure Blob Storage, and UNIX environments.",
    src: ITE,
    images: [ITE1],
    date: "2025",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "ShadCN",
      "Tailwind CSS",
      "Zustand",
      "Azure Blob Storage",
      "TablePlus",
      "UNIX",
      "Docker",
      "Node.js",
      "Swagger UI",
    ],
    link: "https://www.ite.edu.sg/courses/work-study-diploma",
    subtext: "Education & Training Management",
  },
  {
    id: "GOWHERE",
    title: "GoWhere",
    description:
      "This application was developed to assist users in discovering and booking tourist attractions across Singapore. It aims to enhance the travel experience by offering a user-friendly platform for exploring available destinations and managing bookings efficiently.\n\nAs a Full-stack Software Developer, I was responsible for implementing key user and admin functionalities. My contributions included developing authentication features such as login, registration, and password recovery, as well as user profile management and a rewards system. On the admin side, I built dashboards and tools for managing users and rewards, ensuring administrative control over the platform.",
    src: GOWHERE,
    images: [],
    video: ["/videos/GoWhere Demo.mp4"],
    date: "2025",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "Express.js",
      "Microsoft Azure",
      "PostgreSQL",
    ],
    link: "https://gowhere-ambphgb0g9hbfcf7.southeastasia-01.azurewebsites.net/homepage/html/login.html",
    subtext: "Local Attractions Booking",
  },
  {
    id: "TELEGPT",
    title: "TeleGPT",
    description: `Developed a Telegram chatbot integrated with OpenAI's GPT-4o mini model. The bot receives messages from Telegram, sends them to the OpenAI API via HTTP POST requests, and returns the generated responses to the user in real-time.\n\nThe bot was configured using Telegram's BotFather for token generation, and OpenAI's API key was used for model access. GPT-4o mini was chosen for its lightweight performance and versatility in handling general-purpose conversational tasks.`,
    src: TELEGPT,
    images: [],
    video: ["/videos/Telegram Bot Demo.mp4"],
    date: "2024",
    skills: [
      "JavaScript",
      "Node.js",
      "Telegram Bot API",
      "OpenAI API",
      "HTTP Requests",
      "Webhook Integration",
    ],
    link: "https://t.me/Teleprojectchatbot",
    subtext: "ChatGPT Telegram Bot",
  },
  {
    id: "SHOPLY",
    title: "Shoply",
    description:
      "This is the first full-stack project I have developed using HTML, CSS, JavaScript, Node.js, MySQL, PostgreSQL and Prisma for the Database Systems module I was taking in Singapore Polytechnic.\n\nThis is a simple online shopping website where users can view, review, favourite and checkout multiple products. Using JavaScript /Node.js for the logic, PostgreSQL for database management and Prisma for the Object-relational mapping, I ensured that the backend of this website is fully functional and able to create, retrieve, update and delete data from my PostgreSQL server. Along with the user interface, which I created and designed with HTML and CSS to give the website a more finished and clean look.",
    src: SHOPLY,
    images: [SHOPLY1, SHOPLY2, SHOPLY3, SHOPLY4, SHOPLY5, SHOPLY6],
    date: "2024",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "MySQL",
      "PostgreSQL",
      "Prisma",
    ],
    link: "",
    subtext: "Simple Online Store",
  },
];

export default featuredProjects;
