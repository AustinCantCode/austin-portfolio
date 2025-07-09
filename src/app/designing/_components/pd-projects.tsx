// COMPONENTS
import Image from "next/image";

// DATA
import { PDProjects as PD } from "@data/design-projects";

export default function PDProjects() {
  {
    return (
      <div className="space-y-8 rounded-md p-8 bg-white/15 text-white">
        {PD.map((project, index) => (
          <div
            className="grid grid-cols-3 place-items-center gap-x-8"
            key={index}
          >
            <h2 className="col-span-3 pb-8 m-0">{project.title}</h2>
            {project.src.map((image, index) => (
              <div className="grid col-span-1" key={index}>
                <Image
                  src={image}
                  alt="Picture of Certificate"
                  quality={100}
                  className="w-full max-w-5xl rounded-md mx-auto border-0 hover:scale-105 active:scale-102 transition-all hover:shadow-[0_0_25px_0px_rgb(255,255,255)]"
                  loading="eager"
                />
              </div>
            ))}
            <div className="col-span-full mt-8">
              <p className="col-span-3 font-semibold text-center">
                {project.skills.join(", ")}
              </p>
              <p className="col-span-3">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
