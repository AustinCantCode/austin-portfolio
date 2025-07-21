"use client";

import { useState } from "react";

// COMPONENTS
import SkillsSection from "./_components/complex-ui/skills-display/skills-section";
import VideoCarousel from "./_components/complex-ui/video-section/video-carousel";
import FeaturedProjects from "./_components/complex-ui/featured-projects/featured-projects";

export default function CodingProjects() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  return (
    <main className="text-center text-white bg-none space-y-20 fade-in">
      <FeaturedProjects />
      <VideoCarousel selectedSkills={selectedSkills} />
      <SkillsSection
        selectedSkills={selectedSkills}
        setSelectedSkills={setSelectedSkills}
      />
    </main>
  );
}
