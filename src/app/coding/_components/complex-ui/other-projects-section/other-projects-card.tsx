// COMPONENTS
import Video from "next-video";
import { Icon } from "@iconify/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import Image from "next/image";

// TYPES
import type { StaticImageData } from "next/image";

export interface VideoCardProps {
  id?: string;
  title: string;
  date?: string;
  thumbnail: string | StaticImageData;
  src: string;
  description?: string;
  skills: string[];
}

export default function VideoCard(props: VideoCardProps) {
  return (
    <div
      className="card rounded-md transition-all border-0 hover:scale-105 active:scale-102 min-h-full max-h-[100%]"
      key={props.id}
    >
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <div className="flex justify-between whitespace-nowrap items-baseline p-3">
              <h4 className="font-semibold">{props.title}</h4>
              <p className="text-xs md:text-sm m-0">{props.date}</p>
            </div>
            <Image
              src={props.thumbnail}
              alt="Thumbnail of Project"
              className="min-w-full px-2.5"
              loading="lazy"
              quality={1}
            />
          </div>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px] min-w-[70%] p-4 m-0 text-left"
          showCloseButton={false}
        >
          <div className="flex justify-between items-start">
            <DialogTitle className="m-0 p-0">{props.title}</DialogTitle>
            <DialogClose>
              <Icon
                icon={"material-symbols:close-rounded"}
                width="25"
                height="25"
                className="text-gray-600"
              />
            </DialogClose>
          </div>
          <Video src={props.src} className="min-w-full" autoplay={true} />
        </DialogContent>
      </Dialog>
      <div className="flex-row space-x-2 py-3 ml-3 mr-auto font-semibold">
        {props.skills.map((item, id) => (
          <span
            key={id}
            className="w-fit bg-black/15 rounded px-2 py-1 text-xs"
          >
            {item}
          </span>
        ))}
      </div>
      <p className="flex-row w-fit text-left text-sm md:text-base text-black px-3 pb-4">
        {props.description}
      </p>
    </div>
  );
}
