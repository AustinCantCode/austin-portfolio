"use client";

import { useState } from "react";

// COMPONENTS
import SkillsSection from "./_components/complex-ui/skills-display/skills-section";
import OtherProjectsGrid from "./_components/complex-ui/other-projects-section/other-projects-grid";
import FeaturedProjects from "./_components/complex-ui/featured-projects/featured-projects";
import GitHubCalendar from "@components/complex-ui/github-calendar";

export default function CodingProjects() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  return (
    <main className="text-center text-white bg-none space-y-20 fade-in">
      <FeaturedProjects />
      <SkillsSection
        selectedSkills={selectedSkills}
        setSelectedSkills={setSelectedSkills}
      />
      <GitHubCalendar />

      <OtherProjectsGrid selectedSkills={selectedSkills} />
    </main>
  );
}
