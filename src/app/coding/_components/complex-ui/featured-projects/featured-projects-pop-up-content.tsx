// COMPONENTS
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
  images: (string | StaticImageData)[];
  video?: string | string[];
  date?: string;
  skills?: string[];
  role?: string;
  link?: string;
  slogan: string;
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
          <Image
            src={project.src}
            quality={100}
            className="w-full max-w-15 rounded-full"
            alt="Project Logo"
          />
          <div className="text-left grid gap-y-1">
            <DialogTitle className="text-left font-semibold m-0 p-0">
              {project.title}
            </DialogTitle>
            <p className="m-0 p-0 text-sm">{project.slogan}</p>
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
        To view project images, please view this on a larger screen.
      </p>
      {project.images && project.images.length > 0 ? (
        <ImageCarousel images={project.images} />
      ) : project.video ? (
        <VideoDisplay video={project.video} />
      ) : null}

      <DialogDescription className="whitespace-pre-wrap text-left text-sm md:text-base px-4 text-black">
        {project.description}
      </DialogDescription>
    </DialogContent>
  );
}
