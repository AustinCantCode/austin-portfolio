// COMPONENTS
import Title from "@components/ui/title";
import SkillsCard from "./skills-card";

// DATA
import frontendSkills from "@data/frontend-skills";
import backendSkills from "@data/backend-skills";

// LOGO
import Logo from "../../../../../../public/AS-Circle-Logo.png";

// TYPES
import type { StaticImageData } from "next/image";

export type Skill = {
  title?: string;
  src?: string | StaticImageData;
  proficiency?: number | string;
  color?: string;
};

export interface SkillsSectionProps {
  selectedSkills: string[];
  setSelectedSkills: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function SkillsSection({
  selectedSkills,
  setSelectedSkills,
}: SkillsSectionProps) {
  return (
    <main className="space-y-20">
      {/* Frontend Section */}
      <div>
        <Title header="Front-end Development" className="col-span-full" />
        <div className="grid md:grid-cols-4 gap-8 mx-auto max-w-5xl">
          {frontendSkills.map((skills, index) => (
            <SkillsCard
              key={index}
              title={skills.title || "No Title"}
              src={skills.src || Logo}
              proficiency={skills.proficiency}
              indicatorColor={skills.color}
              selectedTitles={selectedSkills}
              setSelectedTitles={setSelectedSkills}
            />
          ))}
        </div>
      </div>
      <div>
        {/* Backend Section */}
        <Title header="Back-end Development" className="col-span-full" />
        <div className="grid md:grid-cols-4 gap-8 mx-auto max-w-5xl">
          {backendSkills.map((skills, index) => (
            <SkillsCard
              key={index}
              title={skills.title || "No Title"}
              src={skills.src || Logo}
              proficiency={skills.proficiency}
              indicatorColor={skills.color}
              selectedTitles={selectedSkills}
              setSelectedTitles={setSelectedSkills}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
