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
      className="card rounded-md transition-all border-0 hover:scale-105 active:scale-102"
      key={props.id}
    >
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <div>
              <div className="flex justify-between whitespace-nowrap items-baseline p-3">
                <h5 className="m-0">{props.title}</h5>
                <p className="m-0 text-sm">{props.date}</p>
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
            className="sm:max-w-[425px] min-w-[60%] p-4 m-0 text-left"
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
            <Video src={props.src} className="min-w-full" />
            <DialogDescription className="text-black text-base md:text-lg">
              {props.description}
            </DialogDescription>
          </DialogContent>
        </form>
      </Dialog>
      <p className="whitespace-pre-wrap text-center text-sm md:text-x py-3 m-0">
        {props.skills.join(" / ")}
      </p>
    </div>
  );
}
