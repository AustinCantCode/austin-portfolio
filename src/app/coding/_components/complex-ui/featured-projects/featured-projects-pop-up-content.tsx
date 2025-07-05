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

// TYPES
import type { StaticImageData } from "next/image";

export interface Project {
  title: string;
  description: string;
  src: string | StaticImageData;
  images: (string | StaticImageData)[];
  link?: string;
}

export interface PopUpContentProps {
  props: Project;
}

export default function PopUpContent(props: PopUpContentProps) {
  const project = props.props;
  return (
    <DialogContent
      className="sm:max-w-[425px] min-w-[65vw] p-0 m-0 border-0 text-left py-4"
      showCloseButton={false}
    >
      <DialogHeader>
        <div className="flex items-center gap-x-4 px-4 py-0 m-0 border-0">
          <Image
            src={project.src}
            quality={100}
            className="w-full max-w-14 rounded-full"
            alt="Project Logo"
          />
          <DialogTitle>{project.title}</DialogTitle>
          {project.link ? (
            <Link href={project.link} target="_blank" className="ml-auto">
              <Button variant="default" size="sm">
                View
              </Button>
            </Link>
          ) : null}
        </div>
      </DialogHeader>
      <ImageCarousel images={project.images} />
      <DialogDescription className="whitespace-pre-wrap text-left text-[1vw] px-4">
        {project.description}
      </DialogDescription>
    </DialogContent>
  );
}
