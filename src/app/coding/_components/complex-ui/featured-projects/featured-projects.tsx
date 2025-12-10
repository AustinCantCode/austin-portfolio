// COMPONENTS
import PopUpContent from "./featured-projects-pop-up-content";
import { Dialog, DialogTrigger } from "@components/ui/dialog";
import Image from "next/image";

// DATA
import featuredProjects from "@data/featured-coding-projects";
import Title from "@components/ui/title";

export default function FeaturedProjects() {
  return (
    <div className="max-w-5xl mx-auto">
      <Title header="Recent Project Contributions" />
      <div className="grid lg:grid-cols-3 gap-8 sm:grid-cols-1 md:grid-cols-2 rounded-md px-2 md:px-0">
        {featuredProjects.map((project, index) => (
          <div
            className="card rounded-md overflow-hidden transition-all border-0 hover:scale-105 active:scale-102"
            key={index}
          >
            <Dialog>
              <DialogTrigger>
                <Image
                  src={project.src}
                  alt="Picture of Project"
                  quality={100}
                  className="w-full aspect-square object-contain"
                  priority={true}
                />
                <div className="flex text-left col-span-1 p-4">
                  <div className="whitespace-nowrap my-auto">
                    <h4 className="font-semibold">{project.title}</h4>
                    <p className="text-sm md:text-base font-semibold">
                      {project.subtext}
                    </p>
                    <p className="text-xs md:text-sm m-0">{project.date}</p>
                  </div>
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
