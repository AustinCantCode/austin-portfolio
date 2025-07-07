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
            className="rounded-md overflow-hidden transition-all grid grid-cols-2 bg-white text-black"
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
                <p className="text-[4vh] font-semibold m-0">{project.title}</p>
                <Link href={project.link} target="_blank">
                  <Button variant="default" size="sm">
                    <Icon icon="tabler:external-link" />
                    Prototype
                  </Button>
                </Link>
              </div>
              <p className="text-[2vh] font-semibold">
                {project.skills.join(", ")}
              </p>
              <p className="text-[1.6vh]">{project.description}</p>
            </div>
          </div>
        ) : (
          <div
            className="rounded-md overflow-hidden transition-all grid grid-cols-2 bg-white text-black"
            key={index}
          >
            <div className="col-span-1 p-8 space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-[4vh] font-semibold m-0">{project.title}</p>
                <Link href={project.link} target="_blank">
                  <Button variant="default" size="sm">
                    <Icon icon="tabler:external-link" />
                    Prototype
                  </Button>
                </Link>
              </div>
              <p className="text-[2vh] font-semibold">
                {project.skills.join(", ")}
              </p>
              <p className="text-[1.6vh]">{project.description}</p>
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
