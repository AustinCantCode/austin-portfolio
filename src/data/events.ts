import type { EventItem } from "./types";

import robocup from "../../public/participation/2025/robocup/image 4.jpg";
import shenzhen from "../../public/participation/2024/shenzhen/image 3.jpg";
import batey from "../../public/participation/2024/batey-hackathon/image 1.png";
import techWeek from "../../public/participation/2024/sg-tech-week/image 1.jpg";
import sgCares from "../../public/participation/2024/sg-cares-volunteer/image 2.jpg";
import jcyel from "../../public/participation/2024/jcyel-volunteer/image 1.jpg";

export const events: EventItem[] = [
  {
    title: "RoboCup Singapore",
    date: "April 2025",
    role: "Student volunteer, media and operations",
    text: "Ran the T-shirt booth on day one, then sorted trophies and updated live results for the awards ceremony on day three.",
    image: {
      src: robocup,
      alt: "Robot football match at RoboCup Singapore 2025",
      fit: "cover",
    },
  },
  {
    title: "SOC Shenzhen Overseas Study Trip",
    date: "September 2024",
    role: "Singapore Polytechnic student",
    text: "Visited tech companies like Sandstone and VoiceAI, exhibitions and Shenzhen Technology University.",
    image: {
      src: shenzhen,
      alt: "Group photo on the Shenzhen study trip",
      fit: "cover",
    },
  },
  {
    title: "SP Batey Hackathon",
    date: "September 2024",
    role: "Participant, grand finalist",
    text: "My team, Zenith Technologies, designed Frésko to cut food waste. It reached the grand finals and later became StillGood.",
    image: {
      src: batey,
      alt: "Team Zenith Technologies at the SP Batey Hackathon",
      fit: "cover",
    },
  },
  {
    title: "Singapore Technology Week",
    date: "2024",
    role: "Participant",
    text: "Explored cloud, DevOps, security and AI booths, and heard GitHub talk about Copilot.",
    image: {
      src: techWeek,
      alt: "Austin at Singapore Technology Week",
      fit: "cover",
    },
  },
  {
    title: "SP GDSC × SG Cares",
    date: "2024",
    role: "Student volunteer",
    text: "Helped prepare and present an anti-scam talk for seniors at NTUC Senior Day Care, Boon Lay.",
    image: { src: sgCares, alt: "Anti-scam talk for seniors", fit: "cover" },
  },
  {
    title: "SP GDSC × JCYEL Sentosa",
    date: "2024",
    role: "Student volunteer",
    text: "A day of team-building on Sentosa: the Imbiah Trail, quiz challenges and a sandcastle contest.",
    image: {
      src: jcyel,
      alt: "Volunteers on the beach at Sentosa",
      fit: "cover",
    },
  },
];

/** The SP Batey Hackathon, featured on the events page. */
export const FEATURED_EVENT_INDEX = 2;
