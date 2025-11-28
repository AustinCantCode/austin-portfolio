// COMPONENTS
import Image from "next/image";
import { Button } from "@components/ui/button";
import Link from "next/link";
import { Icon } from "@iconify/react";

// DATA
import { UIUXProjects as UIUX } from "@data/design-projects";

export default function UIUXProjects() {
  return (
    <div className="space-y-8">
      {UIUX.map((project, index) => {
        return index % 2 === 0 ? (
          <div
            className="rounded-md overflow-hidden transition-all grid sm:grid-col-1 lg:grid-cols-2 bg-white text-black"
            key={index}
          >
            <Image
              src={project.src}
              alt="Picture of Project"
              quality={100}
              className="min-w-full col-span-1 p-8"
              priority={true}
            />
            <div className="col-span-1 p-8 space-y-4">
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
              <div className="flex-row space-x-2 py-2 mr-auto font-semibold">
                {project.skills.map((item, id) => (
                  <span
                    key={id}
                    className="w-fit bg-black/15 rounded px-2 py-1 text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-sm md:text-base">{project.description}</p>
            </div>
          </div>
        ) : (
          <div
            className="rounded-md overflow-hidden transition-all grid sm:grid-col-1 lg:grid-cols-2 bg-white text-black"
            key={index}
          >
            <div className="col-span-1 p-8 space-y-4">
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
              <div className="flex-row space-x-2 py-2 mr-auto font-semibold">
                {project.skills.map((item, id) => (
                  <span
                    key={id}
                    className="w-fit bg-black/15 rounded px-2 py-1 text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-sm md:text-base">{project.description}</p>
            </div>
            <Image
              src={project.src}
              alt="Picture of Project"
              quality={100}
              className="min-w-full col-span-1 p-8"
              priority={true}
            />
          </div>
        );
      })}
    </div>
  );
}
