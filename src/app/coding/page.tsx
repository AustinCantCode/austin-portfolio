// METADATA
import { Metadata } from "next";

// COMPONENTS
import SkillsSection from "./_components/complex-ui/skills-display/skills-section";
import OtherProjectsGrid from "./_components/complex-ui/other-projects-section/other-projects-grid";
import FeaturedProjects from "./_components/complex-ui/featured-projects/featured-projects";
import GitHubCalendar from "@components/complex-ui/github-calendar";
import Timeline from "@components/complex-ui/timeline";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Austin Sia | Coding Projects",
    description:
      "My projects highlight frontend, backend, and full-stack skills, showcasing clean code, problem-solving, and practical, user-focused solutions.",
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
        "My projects highlight frontend, backend, and full-stack skills, showcasing clean code, problem-solving, and practical, user-focused solutions.",
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

export default function CodingProjects() {
  return (
    <main className="text-center text-white bg-none space-y-20 fade-in">
      <Timeline />
      <FeaturedProjects />
      <OtherProjectsGrid />
      <GitHubCalendar />
      <SkillsSection />
    </main>
  );
}
