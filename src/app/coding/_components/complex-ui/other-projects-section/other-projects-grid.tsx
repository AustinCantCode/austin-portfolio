// COMPONENTS
import ProjectCard from "./other-projects-card";
import Title from "@components/ui/title";

// LOGO
import Logo from "../../../../../../public/AS-Circle-Logo.png";

// DATA
import projects from "@data/other-coding-projects";

// TYPES
export interface OtherProjectsGridProps {
  selectedSkills: string[];
}

export default function OtherProjectsGrid() {
  return (
    <div className="max-w-5xl mx-auto">
      <Title header="My First Projects" />
      <div className="grid md:grid-cols-2 gap-4">
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
              src={typeof project.src === "string" ? project.src : ""}
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
