import { site } from "./site";
import type { Media, Project } from "./types";

import iteShot from "../../public/coding-projects/featured/ite/ITE1.png";
import kspShot from "../../public/coding-projects/featured/ksp/KSP1.png";
import grxShot from "../../public/coding-projects/featured/grx/GRX.png";
import acShot from "../../public/coding-projects/featured/ac/AC1.png";
import inlabShot from "../../public/coding-projects/featured/ial/IAL1.png";
import jintShot from "../../public/coding-projects/featured/juzinterior/JINT1.png";
import jintShot2 from "../../public/coding-projects/featured/juzinterior/JINT2.png";
import portShot from "../../public/coding-projects/featured/portfolio/AS1.png";
import gowhereShot from "../../public/coding-projects/featured/gowhere/image 1.png";
import shoplyShot from "../../public/coding-projects/featured/shoply/image 1.png";
import telegptLogo from "../../public/coding-projects/featured/telegpt/Telegpt.png";
import freskoMock from "../../public/design-projects/UIUX/fresko.png";
import quizzyMock from "../../public/design-projects/UIUX/quizzy.png";
import hgMock from "../../public/design-projects/UIUX/hidden gems app.png";
import spMock from "../../public/design-projects/UIUX/sp app.png";
import lawksPhoto from "../../public/design-projects/product-design/LAWKS/lawks_1.png";
import watchArt from "../../public/design-projects/graphic-design/watch-1.jpg";

const shot = (src: Media["src"], alt: string): Media => ({
  src,
  alt,
  fit: "cover",
  position: "top",
});

// Mockup images that already contain phones are shown without a device frame.
const mockup = (src: Media["src"], alt: string): Media => ({
  src,
  alt,
  fit: "contain",
  bare: true,
});

/**
 * Images for each project. Projects without an entry show a labelled
 * placeholder until a real screenshot is added.
 * TODO(Austin): StillGood screenshots, a Calibrium screenshot and an IAL
 * Success Stories screenshot (the old site reused IAL InLab's image).
 */
const MEDIA: Record<string, Pick<Project, "cover" | "second">> = {
  stillgood: {},
  calibrium: {},
  ite: { cover: shot(iteShot, "ITE Work-Study Diploma platform") },
  ksp: { cover: shot(kspShot, "KiasuParents website") },
  grx: { cover: shot(grxShot, "Glovida-RX platform") },
  ac: { cover: shot(acShot, "Amber Creative website") },
  ial: {},
  inlab: { cover: shot(inlabShot, "IAL InLab website") },
  jint: {
    cover: shot(jintShot, "JuzInterior website"),
    second: shot(jintShot2, "JuzInterior FAQ page"),
  },
  port: { cover: shot(portShot, "The previous version of this portfolio") },
  gowhere: { cover: shot(gowhereShot, "GoWhere attractions booking website") },
  telegpt: {
    cover: { src: telegptLogo, alt: "TeleGPT logo", fit: "cover" },
  },
  shoply: { cover: shot(shoplyShot, "Shoply online shop") },
  fresko: { cover: mockup(freskoMock, "Frésko app screens") },
  quizzy: { cover: mockup(quizzyMock, "Quizzy app screens") },
  hg: { cover: mockup(hgMock, "Hidden Gems app screens") },
  sp: { cover: mockup(spMock, "SP Mobile v3 app screens") },
  lawks: {
    cover: { src: lawksPhoto, alt: "The LAWKS Mini card holder", fit: "cover" },
  },
  graphic: {
    cover: { src: watchArt, alt: "Watch advert artwork", fit: "cover" },
  },
};

export const projects: Project[] = [
  {
    slug: "stillgood",
    title: "StillGood",
    year: "2026",
    line: "An app that helps families waste less food.",
    subtext: "Food waste app",
    role: "Founder & solo developer",
    problem:
      "Families throw away food they forgot they had. Expiry dates get lost at the back of the fridge.",
    did: "I came up with the idea, designed every screen and built the whole thing myself: the phone app, the system behind it and the website. You can snap a photo of your groceries and the app lists them for you, reminds you before they expire and suggests recipes to use them up.",
    outcome:
      "Anyone can download it from the Google Play Store since 26 August 2026. It began as a hackathon idea in 2024.",
    ai: "I used Claude Code, an AI coding assistant, like a very fast helper. I decided how the app should work, gave the AI clear written rules to follow, and checked every piece of code it wrote before adding it. The idea, the design, the testing and the launch were all mine.",
    skills: [
      "React Native",
      "Expo",
      "TypeScript",
      "Fastify",
      "Supabase",
      "Gemini API",
      "PostHog",
      "Next.js",
      "Claude Code",
    ],
    links: [
      { label: "Get it on Google Play", href: site.googlePlayUrl },
      { label: "Visit website", href: site.stillgoodWebsiteUrl },
    ],
    categories: ["mobile-apps", "ui-ux", "ventures"],
    frame: "phone",
    ...MEDIA["stillgood"],
  },
  {
    slug: "calibrium",
    title: "Calibrium",
    year: "2026",
    line: "An online watch shop, ready to take orders.",
    subtext: "Online watch shop",
    role: "Freelance full-stack developer",
    problem:
      "Calibrium's website could show watches, but customers couldn't create an account, place an order or save favourites.",
    did: "As a freelancer, I added everything a shopper needs: sign-up and login, a profile, checkout and payment, order history, favourites and automatic order confirmation emails.",
    outcome:
      "Customers can now go from browsing to a paid order and a confirmation email in one smooth flow.",
    ai: "I used Claude Code, an AI coding assistant, to speed up repetitive parts of the build. I agreed the work with the client, checked and tested every change myself, and was responsible for everything that went live.",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Strapi CMS",
      "Node.js",
      "Claude Code",
    ],
    links: [{ label: "Visit live site", href: site.calibriumUrl }],
    categories: ["web-apps", "client-work"],
    frame: "laptop",
    ...MEDIA["calibrium"],
  },
  {
    slug: "ite",
    title: "ITE WSDip",
    year: "2025",
    line: "One system for students, teachers and companies.",
    subtext: "Education platform",
    role: "Full-stack developer, Amber Creative",
    problem:
      "ITE's work-study programme has four kinds of users, and each needs to see different information from the same system.",
    did: "During my internship I built screens for each type of user, connected them to the data behind the scenes and fixed problems as they came up. I also helped put new versions live.",
    outcome:
      "A more reliable system for everyone who uses it, from students to partner companies.",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "shadcn/ui",
      "Tailwind CSS",
      "Zustand",
      "Azure Blob Storage",
      "Docker",
      "Node.js",
      "Swagger UI",
    ],
    links: [
      { label: "Visit live site", href: "https://wsdip.ite.edu.sg/login" },
    ],
    categories: ["web-apps", "client-work"],
    frame: "laptop",
    ...MEDIA["ite"],
  },
  {
    slug: "ksp",
    title: "KiasuParents",
    year: "2025",
    line: "Singapore's parenting community, kept fast and fresh.",
    subtext: "Parenting website",
    role: "Full-stack developer, Amber Creative",
    problem:
      "A very busy website with lots of articles and forums needed new pages without slowing down.",
    did: "I built new pages, made the site faster and fixed bugs across its main sections. I also kept content up to date.",
    outcome:
      "New features for thousands of parents, on a faster and steadier site.",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "WordPress",
      "Strapi CMS",
      "Mautic",
      "NodeBB",
    ],
    links: [
      { label: "Visit live site", href: "https://www.kiasuparents.com/kiasu" },
    ],
    categories: ["web-apps", "client-work"],
    frame: "laptop",
    ...MEDIA["ksp"],
  },
  {
    slug: "grx",
    title: "Glovida-RX",
    year: "2025",
    line: "Prescriptions that stay up to date.",
    subtext: "Medical prescriptions",
    role: "Full-stack developer, Amber Creative",
    problem:
      "Prices and medicine details weren't always updating correctly between doctors and pharmacists.",
    did: "I found and fixed the issues so that changes made by one person show up correctly for everyone else.",
    outcome:
      "Doctors and pharmacists now see accurate information straight away.",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "GraphQL",
      "TablePlus",
    ],
    links: [
      { label: "Visit live site", href: "https://www.glovida-rx.com.sg/" },
    ],
    categories: ["web-apps", "client-work"],
    frame: "laptop",
    ...MEDIA["grx"],
  },
  {
    slug: "ac",
    title: "Amber Creative",
    year: "2025",
    line: "The agency's own website.",
    subtext: "Agency website",
    role: "Software developer intern",
    problem:
      "The agency's website needed new sections, better visibility on Google and easier content updates.",
    did: "I built new parts of the site, connected it to a content editor so the team can update it themselves, and improved how it appears in search results.",
    outcome:
      "A faster website that looks good on any device and is easy for the team to update.",
    skills: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
      "TypeScript",
      "Directus CMS",
      "Storyblok CMS",
    ],
    links: [{ label: "Visit live site", href: "https://ambercreative.sg/" }],
    categories: ["web-apps", "client-work"],
    frame: "laptop",
    ...MEDIA["ac"],
  },
  {
    slug: "ial",
    title: "IAL",
    year: "2025",
    line: "Success stories, easy to find.",
    subtext: "Adult learning institute",
    role: "Full-stack developer, Amber Creative",
    problem:
      "Visitors couldn't easily browse IAL's success stories by topic or year.",
    did: "I built a Success Stories page with filters for category and year, and tidied up how each story is shown.",
    outcome:
      "Visitors can find the stories that matter to them in a few clicks.",
    skills: ["C#", "Razor MVC", "Kentico CMS"],
    links: [{ label: "Visit live site", href: "https://www.ial.edu.sg/" }],
    categories: ["web-apps", "client-work"],
    frame: "laptop",
    ...MEDIA["ial"],
  },
  {
    slug: "inlab",
    title: "IAL InLab",
    year: "2025",
    line: "An innovation platform that doesn't break.",
    subtext: "Adult learning institute",
    role: "Frontend developer, Amber Creative",
    problem: "Parts of the website broke when some content was left empty.",
    did: "I fixed the bugs and made sure pages still look right even when information is missing.",
    outcome: "A more reliable website for visitors and the content team.",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Storyblok CMS"],
    links: [{ label: "Visit live site", href: "https://inlab.ial.edu.sg/" }],
    categories: ["web-apps", "client-work"],
    frame: "laptop",
    ...MEDIA["inlab"],
  },
  {
    slug: "jint",
    title: "JuzInterior",
    year: "2025",
    line: "Answers and articles, easier to find.",
    subtext: "Renovation company",
    role: "Developer, Amber Creative",
    problem:
      "Visitors couldn't find answers to common questions or filter blog posts by topic.",
    did: "I built a Frequently Asked Questions page and a way to filter blog articles by topic.",
    outcome: "Visitors get answers faster and stay on the site longer.",
    skills: ["WordPress", "BetterDocs", "PHP", "CSS"],
    links: [{ label: "Visit live site", href: "https://juzinterior.com/" }],
    categories: ["web-apps", "client-work"],
    frame: "laptop",
    ...MEDIA["jint"],
  },
  {
    slug: "port",
    title: "My Portfolio",
    year: "2026",
    line: "This website.",
    subtext: "Personal website",
    role: "Designer & developer",
    problem: "My old website had too many pages and too much on each one.",
    did: "I redesigned it around fewer, bigger projects and a clear story, then rebuilt it from scratch.",
    outcome: "A simpler site that shows who I am in a few minutes.",
    skills: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
      "TypeScript",
    ],
    links: [],
    categories: ["web-apps", "ui-ux"],
    frame: "laptop",
    ...MEDIA["port"],
  },
  {
    slug: "gowhere",
    title: "GoWhere",
    year: "2025",
    line: "Find and book things to do in Singapore.",
    subtext: "Attractions booking",
    role: "Full-stack developer",
    problem:
      "Tourists needed one place to discover attractions and manage their bookings.",
    did: "For a school project I built accounts, bookings and a rewards system, plus tools for staff to manage users and rewards.",
    outcome: "A working booking website, put online on Microsoft's cloud.",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "Express.js",
      "Microsoft Azure",
      "PostgreSQL",
    ],
    links: [],
    categories: ["web-apps", "school-projects"],
    frame: "laptop",
    ...MEDIA["gowhere"],
  },
  {
    slug: "telegpt",
    title: "TeleGPT",
    year: "2024",
    line: "ChatGPT, inside Telegram.",
    subtext: "Chat assistant",
    role: "Developer",
    problem:
      "I wanted to ask ChatGPT questions without leaving the Telegram chat app.",
    did: "I connected a Telegram chat bot to ChatGPT so it answers any message instantly.",
    outcome: "A simple chat assistant anyone can message.",
    skills: [
      "JavaScript",
      "Node.js",
      "Telegram Bot API",
      "OpenAI API",
      "Webhooks",
    ],
    links: [
      { label: "Open in Telegram", href: "https://t.me/Teleprojectchatbot" },
    ],
    categories: ["mobile-apps"],
    frame: "phone",
    ...MEDIA["telegpt"],
  },
  {
    slug: "shoply",
    title: "Shoply",
    year: "2024",
    line: "My first complete online shop.",
    subtext: "Online shop",
    role: "Developer",
    problem:
      "A school assignment: build a working online shop from start to finish.",
    did: "I built product pages, reviews, favourites and checkout, all saving to a real database.",
    outcome: "My first project where every part worked together end to end.",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "MySQL",
      "PostgreSQL",
      "Prisma",
    ],
    links: [],
    categories: ["web-apps", "school-projects"],
    frame: "laptop",
    ...MEDIA["shoply"],
  },
  {
    slug: "fresko",
    title: "Frésko",
    year: "2024",
    line: "The hackathon idea that became StillGood.",
    subtext: "Hackathon app design",
    role: "Designer, Zenith Technologies",
    problem: "Food waste often starts with forgetting what's in the fridge.",
    did: "With my team, I designed an app that tracks expiry dates, reads grocery receipts, sends reminders and suggests recipes.",
    outcome: "We reached the grand finals of the SP Batey Hackathon 2024.",
    skills: ["Figma"],
    links: [
      {
        label: "View Figma prototype",
        href: "https://www.figma.com/proto/jCGPHu0P1Uk1iWxlpmD1FU/Zenith?page-id=73%3A1027&node-id=299-1810&node-type=FRAME&viewport=3014%2C-5449%2C0.88&t=9HbyaxOebRZJfAZt-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=299%3A118&show-proto-sidebar=1",
      },
    ],
    categories: ["mobile-apps", "ui-ux", "ventures"],
    frame: "phone",
    ...MEDIA["fresko"],
  },
  {
    slug: "quizzy",
    title: "Quizzy",
    year: "2024",
    line: "Quizzes that feel like a game.",
    subtext: "Learning app design",
    role: "UI/UX designer",
    problem: "Students lose focus during normal revision.",
    did: "I designed quiz rooms where friends can play live, with leaderboards and progress tracking, in a clean and simple look.",
    outcome: "A complete clickable design that makes studying more active.",
    skills: ["Adobe XD", "Adobe Illustrator", "Adobe Photoshop"],
    links: [
      {
        label: "View Adobe XD prototype",
        href: "https://xd.adobe.com/view/f1ad9155-7110-4499-9cc8-4c887e2e72d6-a4fe/",
      },
    ],
    categories: ["mobile-apps", "ui-ux", "school-projects"],
    frame: "phone",
    ...MEDIA["quizzy"],
  },
  {
    slug: "hg",
    title: "Hidden Gems",
    year: "2023",
    line: "Swipe to discover Singapore's hidden places.",
    subtext: "Travel app design",
    role: "UI/UX designer, group project",
    problem: "Tourists rarely find the places locals love.",
    did: "Our group designed a swipe-to-like way to discover places, a shared feed and a view of what's nearby.",
    outcome: "A clickable design for a school module on designing for people.",
    skills: ["Figma"],
    links: [
      {
        label: "View Figma prototype",
        href: "https://www.figma.com/proto/j9XKNokz1Ng8EkSr6oz6wQ/DEUI-CA2?page-id=0%3A1&node-id=471-80509&viewport=299%2C298%2C0.02&t=v6l5Ng3Hn27IVNAD-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=471%3A80509&show-proto-sidebar=1",
      },
    ],
    categories: ["mobile-apps", "ui-ux", "school-projects"],
    frame: "phone",
    ...MEDIA["hg"],
  },
  {
    slug: "sp",
    title: "SP Mobile v3",
    year: "2023",
    line: "A calmer app for Singapore Polytechnic students.",
    subtext: "App redesign",
    role: "UI/UX designer, group project",
    problem: "Students found the school's app hard to use.",
    did: "We redesigned it to look modern and simple, while keeping important features like taking attendance.",
    outcome: "A clickable design for a school module on user experience.",
    skills: ["Figma"],
    links: [
      {
        label: "View Figma prototype",
        href: "https://www.figma.com/proto/Pup2sAqLTUNiIh5MbZTfNH/Class-02__Group-01?page-id=1216%3A2&node-id=1216-5&starting-point-node-id=1216%3A5&t=Uvatm2YP2QAmnenr-1",
      },
    ],
    categories: ["mobile-apps", "ui-ux", "school-projects"],
    frame: "phone",
    ...MEDIA["sp"],
  },
  {
    slug: "lawks",
    title: "The LAWKS Mini",
    year: "2024",
    line: "A card holder that props up your phone.",
    subtext: "Product design",
    role: "Product designer, group project",
    problem: "Students we spoke to had no easy way to prop up their phones.",
    did: "We designed and 3D-printed a light card holder that holds a phone upright or sideways.",
    outcome: "A working prototype you can hold, for our Product Design module.",
    skills: ["3D modelling", "CAD", "Tinkercad"],
    links: [],
    categories: ["product-design", "school-projects"],
    frame: "none",
    ...MEDIA["lawks"],
  },
  {
    slug: "graphic",
    title: "Graphic design",
    year: "2023",
    line: "Posters and product artwork.",
    subtext: "Artwork",
    role: "Graphic designer",
    problem: "Personal and school projects across adverts and posters.",
    did: "I made watch adverts, posters and brand artwork in Photoshop and Illustrator.",
    outcome: "Six finished pieces.",
    skills: ["Adobe Photoshop", "Adobe Illustrator"],
    links: [],
    categories: ["graphic-design"],
    frame: "none",
    ...MEDIA["graphic"],
  },
];

export const projectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);

/** Projects in data order, newest year first. */
export const byYear = (list: Project[]) =>
  list
    .map((p, i) => ({ p, i }))
    .sort((a, b) => Number(b.p.year) - Number(a.p.year) || a.i - b.i)
    .map(({ p }) => p);

export const pickProjects = (slugs: string[]) =>
  slugs.map(projectBySlug).filter((p): p is Project => Boolean(p));
