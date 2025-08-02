// // FEATURED PROJECTS IMAGES
// import GRX from "../../public/Coding Projects/Projects/grx.png";
// import ITE from "../../public/Coding Projects/Projects/ite.png";
// import INLAB from "../../public/Coding Projects/Projects/inlab.webp";
// import KSP from "../../public/Coding Projects/Projects/ksp.png";

// const featuredProjects = [
//   {
//     id: "GRX",
//     title: "Glovida-RX (GRX) Pharmacy",
//     description:
//       "• Resolved dynamic state issues within components to ensure product prices update correctly in real time.\n• Improved backend state handling between pharmacist and doctor roles to ensure accurate data updates and proper display across the system.",
//     src: GRX,
//     date: "2025",
//     skills: ["Next.js", "React", "Tailwind CSS"],
//     link: "https://www.glovida-rx.com.sg/",
//   },
//   {
//     id: "ITE",
//     title: "ITE Work-Study Diploma (WSDip)",
//     description: `• Built full-stack features for multiple user roles (trainee, trainer, admin, company rep).\n• Developed responsive UI using custom ShadCN components and Tailwind CSS.\n• Created backend APIs to support dynamic data flow and frontend integration.\n• Assisted in debugging and maintaining the code.`,
//     src: ITE,
//     date: "2025",
//     skills: [
//       "Next.js",
//       "React",
//       "ShadCN",
//       "Tailwind CSS",
//       "Zustand",
//       "Azure Blob Storage",
//       "TablePlus",
//       "UNIX",
//       "Docker",
//       "Node.js",
//       "Swagger UI",
//     ],
//     link: "https://www.ite.edu.sg/courses/work-study-diploma",
//   },
//   {
//     id: "KSP",
//     title: "Kiasu Parents",
//     description: `• Developed and deployed multiple new features and webpages in alignment with the client's requirements.\n• Assisted in identifying and resolving bugs to maintain application stability.\n• Performed regular content updates on webpages in response to client requests.\n• Gained hands-on experience using Strapi CMS, NodeBB, and WordPress for content management, user administration, and backend operations.`,
//     src: KSP,
//     date: "2025",
//     skills: ["Next.js", "React", "Tailwind CSS", "WordPress", "Strapi CMS"],
//     link: "https://www.kiasuparents.com/kiasu",
//   },
//   {
//     id: "INLAB",
//     title: "InLab Singapore",
//     description: `• Assisted in identifying and resolving bugs to maintain application stability. \n• Gained hands-on experience using StoryBlok CMS for content management and backend operations.\n• Used the nullish coalescing operator (??) to provide fallback values when a variable is null or undefined, allowing valid falsy values for when the value in the CMS is empty.`,
//     src: INLAB,
//     date: "2025",
//     skills: ["Next.js", "React", "Tailwind CSS", "StoryBlok CMS"],
//     link: "https://inlab.ial.edu.sg/",
//   },
// ];

// export default featuredProjects;

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

const featuredProjects = [
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
    role: "Backend Developer",
    link: "https://t.me/Teleprojectchatbot",
    slogan: "Ask freely with TeleGPT!",
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
    slogan: "Go anywhere with GoWhere!",
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
    slogan: "Shop freely with Shoply!",
  },
];

export default featuredProjects;
