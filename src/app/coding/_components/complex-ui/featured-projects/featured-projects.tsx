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
      <Title header="Featured Projects"/>
      <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-1 md:grid-cols-3 place-items-center bg-white/15 py-4 rounded-md">
        {featuredProjects.map((project, index) => (
          <div
            className="card rounded-md overflow-hidden transition-all max-w-75 hover:scale-105 active:scale-102 hover:shadow-[0_0_25px_0px_rgb(255,255,255)]"
            key={index}
          >
            <Dialog>
              <DialogTrigger>
                <div className="flex justify-between p-3 whitespace-nowrap items-baseline">
                  <h5 className="m-0">{project.title}</h5>
                  <p className="m-0 text-sm">{project.date}</p>
                </div>
                <Image
                  src={project.src}
                  alt="Picture of Project"
                  quality={100}
                  className="px-2"
                  priority={true}
                />

                <p className="text-sm md:text-base m-0 py-3">
                  {project.slogan}
                </p>
              </DialogTrigger>
              <PopUpContent props={project} />
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
}
