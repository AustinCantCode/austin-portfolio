// FEATURED PROJECTS IMAGES
import GOWHERE from "@featuredCodingProjects/gowhere/gowhere.jpeg";

import TELEGPT_THUMBNAIL from "@featuredCodingProjects/telegpt/Telegpt.png";

import SHOPLY from "@featuredCodingProjects/thumbnail/shoply.png";
import SHOPLY1 from "@featuredCodingProjects/shoply/image 1.png";
import SHOPLY2 from "@featuredCodingProjects/shoply/image 2.png";
import SHOPLY3 from "@featuredCodingProjects/shoply/image 3.png";
import SHOPLY4 from "@featuredCodingProjects/shoply/image 4.png";
import SHOPLY5 from "@featuredCodingProjects/shoply/image 5.png";
import SHOPLY6 from "@featuredCodingProjects/shoply/image 6.png";

import GRX_THUMBNAIL from "@featuredCodingProjects/thumbnail/grx.png";
import GRX1 from "@featuredCodingProjects/GRX/GRX.png";

import KSP_THUMBNAIL from "@featuredCodingProjects/thumbnail/ksp.png";
import KSP1 from "@featuredCodingProjects/ksp/KSP1.png";
import KSP2 from "@featuredCodingProjects/ksp/KSP2.png";

import INLAB_THUMBNAIL from "@featuredCodingProjects/thumbnail/inlab.png";
import INLAB1 from "@featuredCodingProjects/IAL/IAL1.png";

import ITE_THUMBNAIL from "@featuredCodingProjects/thumbnail/ite.png";
import ITE1 from "@featuredCodingProjects/ITE/ITE1.png";

import JINT_THUMBNAIL from "@featuredCodingProjects/thumbnail/jint.png";
import JINT1 from "@featuredCodingProjects/juzinterior/JINT1.png";
import JINT2 from "@featuredCodingProjects/juzinterior/JINT2.png";
import JINT3 from "@featuredCodingProjects/juzinterior/JINT3.png";
import JINT4 from "@featuredCodingProjects/juzinterior/JINT4.png";

import AC_THUMBNAIL from "@featuredCodingProjects/thumbnail/ac.png";
import AC1 from "@featuredCodingProjects/ac/AC1.png";
import AC2 from "@featuredCodingProjects/ac/AC2.png";
import AC3 from "@featuredCodingProjects/ac/AC3.png";
import AC4 from "@featuredCodingProjects/ac/AC4.png";
import AC5 from "@featuredCodingProjects/ac/AC5.png";

import AS_THUMBNAIL from "@featuredCodingProjects/thumbnail/as-square.png";
import AS1 from "@featuredCodingProjects/portfolio/AS1.png";
import AS2 from "@featuredCodingProjects/portfolio/AS2.png";

import IAL_THUMBNAIL from "@featuredCodingProjects/thumbnail/ial.png";

const featuredProjects = [
  {
    id: "IAL",
    title: "IAL",
    description:
      "The Institute for Adult Learning (IAL), an autonomous institute under SUSS, focuses on professionalizing adult education through training, research, innovation, and lifelong learning initiatives.\n\nAs a Full-stack Developer, I collaborated with the project manager to build a Success Stories page with search and filtering features. Using C# and Kentico CMS, I retrieved and structured page data, implemented category and year filters, and optimized Razor views to ensure consistent card layouts and a polished user experience.",
    src: IAL_THUMBNAIL,
    images: [INLAB1],
    date: "2025",
    skills: ["C#", "Razor MVC", "Kentico CMS"],
    link: "https://www.ial.edu.sg/",
    subtext: "Institute for Adult Learning",
  },
  {
    id: "JINT",
    title: "JuzInterior",
    description:
      "JuzInterior is an interior design and renovation company focused on creating personalized living and commercial spaces.\n\nI contributed to the enhancement of their website by implementing the Frequently Asked Questions (FAQ) page using BetterDocs and creating a category filter for the blogs page using both PHP and Elementor components in WordPress.",
    src: JINT_THUMBNAIL,
    images: [JINT1, JINT2, JINT3, JINT4],
    date: "2025",
    skills: ["WordPress", "BetterDocs", "PHP", "CSS"],
    link: "https://juzinterior.com/",
    subtext: "Interior Design & Renovation Firm",
  },

  {
    id: "AC",
    title: "Amber Creative",
    description:
      "Amber Creative is a digital marketing agency providing branding, web development, and paid media solutions.\n\nAs a Software Developer Intern, I contributed to the development and maintenance of the Amber Creative website, building responsive UI components, integrating CMS-driven content, implementing SEO improvements, and ensuring cross-device functionality. I also worked on feature development, bug fixes, and codebase optimization, gaining hands-on experience in frontend development and content management systems.",
    src: AC_THUMBNAIL,
    images: [AC1, AC2, AC3, AC4, AC5],
    date: "2025",
    skills: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
      "TypeScript",
      "Directus CMS",
      "StoryBlok CMS",
      "Biome Formatter",
    ],
    link: "https://ambercreative.sg/",
    subtext: "Digital Marketing Agency",
  },
  {
    id: "PORT",
    title: "My Portfolio",
    description:
      "A webpage portfolio showcasing my work in software development, designing, entrepreneurship, and more. The site blends minimal layouts with motion elements to create a sophisticated and engaging browsing experience.\n\nAs the solo software developer and UI/UX designer, I designed the UI, developed reusable components, implemented animations, and organized the content structure to present my projects in a clear and visually appealing manner. Feel free to explore!",
    src: AS_THUMBNAIL,
    images: [AS1, AS2],
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
    subtext: "My Webpage Portfolio",
  },
  {
    id: "GRX",
    title: "Glovida-RX",
    description:
      "Glovida-RX is a digital healthcare platform that streamlines prescription management between doctors, pharmacists, and patients. I contributed to improving system stability by resolving issues related to dynamic state updates within key UI components.\n\nAs a Full-stack Developer, I ensured that product prices and medication details updated accurately in real time. I also enhanced backend state handling between pharmacist and doctor roles, ensuring data reflected correctly across the platform for faster and more reliable decision-making.",
    src: GRX_THUMBNAIL,
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
    src: KSP_THUMBNAIL,
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
    src: INLAB_THUMBNAIL,
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
    src: ITE_THUMBNAIL,
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
    link: "https://wsdip.ite.edu.sg/login",
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
    src: TELEGPT_THUMBNAIL,
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
