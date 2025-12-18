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

export default function SkillsSection() {
  return (
    <main className="space-y-20">
      {/* Frontend Section */}
      <div>
        <Title header="Front-end Development" className="col-span-full" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-auto max-w-5xl px-4 md:px-0">
          {frontendSkills.map((skills, index) => (
            <SkillsCard
              key={index}
              title={skills.title || "No Title"}
              src={skills.src || Logo}
              proficiency={skills.proficiency}
              indicatorColor={skills.color}
            />
          ))}
        </div>
      </div>
      <div>
        {/* Backend Section */}
        <Title header="Back-end Development" className="col-span-full" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-auto max-w-5xl px-4 md:px-0">
          {backendSkills.map((skills, index) => (
            <SkillsCard
              key={index}
              title={skills.title || "No Title"}
              src={skills.src || Logo}
              proficiency={skills.proficiency}
              indicatorColor={skills.color}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
