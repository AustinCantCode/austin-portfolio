// COMPONENTS
import Image from "next/image";
import { Button } from "@components/ui/button";
import Link from "next/link";
import { Icon } from "@iconify/react";

// DATA
import { UIUXProjects as UIUX } from "@data/design-projects";
import Tags from "@components/complex-ui/tags";

export default function UIUXProjects() {
  return (
    <div className="space-y-8">
      {UIUX.map((project, index) => {
        const ProjectImage = (
          <Image
            src={project.src}
            alt="Picture of Project"
            quality={100}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            className="w-full h-auto col-span-1 p-8"
          />
        );

        const ProjectContent = (
          <div className="col-span-1 p-8 space-y-4">
            {/* Title + Button */}
            <div className="flex justify-between items-center">
              <p className="text-2xl md:text-4xl font-semibold m-0">
                {project.title}
              </p>
              <Link href={project.link} target="_blank">
                <Button variant="default" size="sm">
                  <Icon icon="tabler:external-link" />
                  Prototype
                </Button>
              </Link>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 py-2 font-semibold">
              <Tags data={project.skills} />
            </div>

            {/* Description */}
            <p className="text-sm md:text-base">{project.description}</p>
          </div>
        );

        return (
          <div
            key={index}
            className="rounded-md overflow-hidden transition-all grid sm:grid-cols-1 lg:grid-cols-2 bg-white text-black"
          >
            {index % 2 === 0 ? (
              <>
                {ProjectImage}
                {ProjectContent}
              </>
            ) : (
              <>
                {ProjectContent}
                {ProjectImage}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
