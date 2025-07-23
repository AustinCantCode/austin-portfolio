// COMPONENTS
import Image from "next/image";

// DATA
import { PDProjects as PD } from "@data/design-projects";

export default function PDProjects() {
  {
    return (
      <div className="space-y-8 rounded-md p-8 bg-white text-black">
        {PD.map((project, index) => (
          <div key={index}>
            <div className="flex justify-between gap-x-8 items-start w-full mx-auto">
              <div className="grid gap-y-2">
                <p className="text-2xl md:text-4xl font-semibold m-0">
                  {project.title}
                </p>
                <p className="font-semibold m-0 p-0">
                  {project.skills.join(", ")}
                </p>
              </div>
              <Image
                src={project.logo}
                alt="Picture of Certificate"
                quality={100}
                className="w-full max-w-25 bg-red-500 p-2 rounded-md"
                priority={true}
              />
            </div>
            <div className="grid grid-cols-3 place-items-center gap-x-2">
              {project.src.map((image, index) => (
                <div className="grid col-span-1 py-8 m-0" key={index}>
                  <Image
                    src={image}
                    alt="Picture of Certificate"
                    quality={100}
                    className="rounded-md hover:scale-115 active:scale-220 transition-all "
                    priority={true}
                  />
                </div>
              ))}
            </div>
            <p className="">{project.description}</p>
          </div>
        ))}
      </div>
    );
  }
}
