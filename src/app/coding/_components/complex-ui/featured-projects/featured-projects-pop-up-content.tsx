// COMPONENTS
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import Link from "next/link";
import Image from "next/image";
import ImageCarousel from "./featured-projects-image-carousel";
import VideoDisplay from "./featured-projects-video";
import { Icon } from "@iconify/react";

// TYPES
import type { StaticImageData } from "next/image";
export interface Project {
  id?: string;
  title: string;
  description: string;
  src: string | StaticImageData;
  images?: (string | StaticImageData)[];
  video?: string | string[];
  date?: string;
  skills?: string[];
  role?: string;
  link?: string;
  subtext: string;
}
export interface PopUpContentProps {
  props: Project;
}

export default function PopUpContent(props: PopUpContentProps) {
  const project = props.props;
  return (
    <DialogContent
      className="sm:max-w-[425px] min-w-fit p-0 m-0 border-0 text-left py-4"
      showCloseButton={false}
    >
      <DialogHeader>
        <div className="flex items-center gap-x-4 px-4 py-0 m-0 border-0">
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="ml-auto">
              <Icon icon="mdi:close" className="size-8" />
            </Button>
          </DialogClose>
          <Image
            src={project.src}
            quality={100}
            className="w-full max-w-15 rounded-full object-contain aspect-square"
            alt="Project Logo"
          />
          <div className="text-left grid gap-y-1">
            <DialogTitle className="text-left font-semibold m-0 p-0">
              {project.title}
            </DialogTitle>
            <p className="m-0 p-0 text-sm">{project.subtext}</p>
          </div>
          {project.link ? (
            <Link href={project.link} target="_blank" className="ml-auto">
              <Button variant="default" size="sm">
                <Icon icon="mdi:eye" />
                View
              </Button>
            </Link>
          ) : null}
        </div>
      </DialogHeader>
      <p className="text-base block md:hidden font-semibold px-4">
        To view project images, please view this page on a larger screen.
      </p>
      {project.images && project.images.length > 0 ? (
        <ImageCarousel images={project.images} />
      ) : project.video ? (
        <VideoDisplay video={project.video} />
      ) : null}
      <DialogHeader className="flex-row w-fit text-left text-base md:text-lg text-black font-semibold px-4">
        <div className="flex flex-row flex-wrap gap-2">
          {project.skills.map((item, id) => (
            <span
              key={id}
              className="min-w-fit bg-black/15 rounded px-2 py-1 text-xs"
            >
              {item}
            </span>
          ))}
        </div>
      </DialogHeader>
      <DialogDescription className="whitespace-pre-wrap text-left text-sm md:text-base px-4 text-black">
        {project.description}
      </DialogDescription>
    </DialogContent>
  );
}
