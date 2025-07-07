// COMPONENTS
import Title from "@components/ui/title";
import PopUpContent from "./featured-projects-pop-up-content";
import { Dialog, DialogTrigger } from "@components/ui/dialog";
import Image from "next/image";

// DATA
import featuredProjects from "@data/featured-coding-projects";

export default function FeaturedProjects() {
  return (
    <div className="fade-in">
      <Title header="My Featured Projects" />
      <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto place-items-center">
        {featuredProjects.map((project, index) => (
          <div
            className="card rounded-md overflow-hidden transition-all max-w-75 hover:scale-105 active:scale-102 hover:shadow-[0_0_25px_0px_rgb(255,255,255)]"
            key={index}
          >
            <Dialog>
              <DialogTrigger>
                <Image
                  src={project.src}
                  alt="Picture of Project"
                  quality={100}
                  className="p-2"
                  loading="eager"
                />
              </DialogTrigger>
              <PopUpContent props={project} />
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
}
