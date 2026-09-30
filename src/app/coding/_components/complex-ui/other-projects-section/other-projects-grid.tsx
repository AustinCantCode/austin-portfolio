// COMPONENTS
import ProjectCard from "./other-projects-card";
import Title from "@components/ui/title";

// LOGO
import Logo from "../../../../../../public/AS-Circle-Logo.png";

// DATA
import projects from "@data/other-coding-projects";

// TYPES
import type { Asset } from "next-video/dist/assets.js";

export interface OtherProjectsGridProps {
  selectedSkills: string[];
}

export default function OtherProjectsGrid() {
  return (
    <div className="max-w-5xl mx-auto">
      <Title header="My First Projects" />
      <div className="grid md:grid-cols-2 gap-4 px-4 md:px-0">
        {projects.map((project) => (
          <section
            id={project.id}
            className="min-w-full col-span-1"
            key={project.id}
          >
            <ProjectCard
              key={project.id}
              title={project.title || "Untitled Video"}
              date={project.date || "Unknown Date"}
              thumbnail={project.thumbnail || Logo}
              src={project.src as Asset}
              description={project.description || ""}
              skills={
                Array.isArray(project.skills)
                  ? project.skills
                  : project.skills
                    ? [project.skills]
                    : []
              }
            />
          </section>
        ))}
      </div>
    </div>
  );
}
