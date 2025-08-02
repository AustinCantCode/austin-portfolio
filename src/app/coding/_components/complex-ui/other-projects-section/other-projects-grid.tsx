// COMPONENTS
import ProjectCard from "./other-projects-card";
import Title from "@components/ui/title";

// LOGO
import Logo from "../../../../../../public/AS-Circle-Logo.png";

// DATA
import projects from "@data/coding-projects";

// TYPES
export interface OtherProjectsGridProps {
  selectedSkills: string[];
}

export default function OtherProjectsGrid({
  selectedSkills,
}: OtherProjectsGridProps) {
  let filteredProjects;
  if (selectedSkills.length === 0) {
    filteredProjects = projects;
  } else {
    filteredProjects = projects.filter(
      (project) =>
        Array.isArray(project.skills) &&
        selectedSkills.every((skill) => project.skills.includes(skill)),
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Title header="My Other Projects" />
      <div className="grid md:grid-cols-3 gap-4 px-2 md:px-0">
        {filteredProjects.map((project) => (
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
              src={project.src || Logo}
              description={project.description || ""}
              skills={project.skills || ""}
            />
          </section>
        ))}
      </div>
    </div>
  );
}
