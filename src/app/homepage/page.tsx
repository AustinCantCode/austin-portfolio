// METADATA
import { Metadata } from "next";

// COMPONENTS
import Header from "./_components/header";
import AboutMe from "./_components/about-me";
import Experiences from "./_components/experiences";
import Highlights from "./_components/highlights";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Austin Sia | Homepage",
    description:
      "Welcome to my portfolio, showcasing my coding, design, and achievements, highlighting creativity, skill, and innovation.",
    keywords: [
      "Software Developer",
      "Frontend Developer",
      "Backend Developer",
      "Full-Stack Developer",
      "Web Developer",
      "Information Technology",
      "Computer Science",
      "Entrepreneur",
      "Designer",
      "Portfolio",
      "Next.js",
      "React",
    ],
    openGraph: {
      title: "Austin Sia | Coding Projects",
      description:
        "Welcome to my portfolio, showcasing my coding, design, and achievements, highlighting creativity, skill, and innovation.",
      url: "https://austinsia.com",
      siteName: "Austin's Portfolio",
      images: [
        {
          url: "../../public/AS-Circle-Logo.png",
          width: 500,
          height: 500,
        },
      ],
      type: "website",
    },
  };
}

export default function Homepage() {
  return (
    <main className="text-white max-w-5xl mx-auto rounded-md bg-white/15 p-4 space-y-4 fade-in">
      {/* Header */}
      <Header />

      {/* About me */}
      <AboutMe />

      {/* Education, Experiences */}
      <Experiences />

      {/* Achievements, Coding, Designing */}
      <Highlights />
    </main>
  );
}
