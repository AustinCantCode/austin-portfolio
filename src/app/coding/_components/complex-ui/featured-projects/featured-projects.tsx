// COMPONENTS
import PopUpContent from "./featured-projects-pop-up-content";
import { Dialog, DialogTrigger } from "@components/ui/dialog";
import Image from "next/image";
import { Icon } from "@iconify/react";

// DATA
import featuredProjects from "@data/featured-coding-projects";
import Title from "@components/ui/title";

export default function FeaturedProjects() {
  return (
    <div className="max-w-5xl mx-auto">
      <Title header="Recent Project Contributions" />
      <div className="grid lg:grid-cols-2 gap-8 sm:grid-cols-1 md:grid-cols-2 rounded-md">
        {featuredProjects.map((project, index) => (
          <div
            className="card rounded-md overflow-hidden transition-all border-0 hover:scale-105 active:scale-102"
            key={index}
          >
            <Dialog>
              <DialogTrigger>
                <div className="flex text-left justify-start col-span-1">
                  <Image
                    src={project.src}
                    alt="Picture of Project"
                    quality={100}
                    className="w-full max-w-40 max-h-40 mr-6 aspect-square object-contain"
                    priority={true}
                  />
                  <div className="text-left whitespace-nowrap my-auto">
                    <h2 className="font-semibold text-2xl md:text-4xl mb-2 ml-[-2]">
                      {project.title}
                    </h2>
                    <p className="text-sm md:text-base">{project.subtext}</p>
                    <p className="text-xs md:text-sm">{project.date}</p>
                  </div>
                  <Icon
                    icon="iconamoon:arrow-right-2-light"
                    width={50}
                    className="ml-auto my-auto mr-4 hidden md:block"
                  />
                </div>
              </DialogTrigger>
              <PopUpContent props={project} />
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
}
