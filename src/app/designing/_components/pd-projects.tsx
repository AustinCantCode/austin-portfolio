// COMPONENTS
import Image from "next/image";

// DATA
import { PDProjects as PD } from "@data/design-projects";
import ClickableImage from "@components/ui/clickable-image";

export default function PDProjects() {
  {
    return (
      <div className="space-y-8 rounded-md p-8 bg-white text-black">
        {PD.map((project, index) => (
          <div key={index}>
            <div className="flex justify-between gap-x-8 items-center md:items-start w-full mx-auto">
              <div className="grid gap-y-2">
                <p className="text-2xl md:text-4xl font-semibold m-0">
                  {project.title}
                </p>
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
              </div>
              <Image
                src={project.logo}
                alt="Picture of Logo"
                quality={100}
                className="w-full max-w-20 md:max-w-25 bg-red-500 p-2 rounded-md"
                priority={true}
              />
            </div>
            <div className="grid md:grid-cols-3 place-items-center gap-y-8 md:gap-x-4 py-4">
              {project.src.map((image, index) => (
                <div className="grid col-span-1 m-0 " key={index}>
                  <ClickableImage src={image} rounded="md" />
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
