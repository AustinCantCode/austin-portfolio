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
      <Title header="Featured Projects" />
      <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-1 md:grid-cols-1 place-items-center rounded-md mx-2">
        {featuredProjects.map((project, index) => (
          <div
            className="card rounded-md overflow-hidden transition-all w-full border-0 hover:scale-105 active:scale-102"
            key={index}
          >
            <Dialog>
              <DialogTrigger>
                <div className="flex text-left justify-start">
                  <Image
                    src={project.src}
                    alt="Picture of Project"
                    quality={100}
                    className="w-full max-w-40 max-h-40 mr-6"
                    priority={true}
                  />
                  <div className="text-left whitespace-nowrap place-items-baseline my-auto">
                    <p className="m-0 p-0 font-semibold text-2xl md:text-4xl">
                      {project.title}
                    </p>

                    <p className="text-sm md:text-base m-0 mt-2">
                      {project.slogan}
                    </p>
                    <p className="m-0 text-xs md:text-sm mt-4">{project.date}</p>
                  </div>
                  <Icon
                    icon="iconamoon:arrow-right-2-light"
                    width={60}
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
