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
  title: string;
  date?: string;
  thumbnail: string | StaticImageData;
  src: string;
  description?: string;
  skills: string[];
}

export default function VideoCard(props: VideoCardProps) {
  return (
    <div className="card rounded-md transition-all border-0">
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <div>
              <div className="flex justify-between py-3 px-4 whitespace-nowrap items-baseline">
                <h5 className="m-0">{props.title}</h5>
                <p className="m-0 text-sm">{props.date}</p>
              </div>
              <Image
                src={props.thumbnail}
                alt="Thumbnail of Project"
                className="min-w-full"
                loading="lazy"
                quality={1}
              />
            </div>
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-[425px] min-w-[65vw] p-4 m-0 text-left"
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
            <DialogDescription className="text-black text-[1.2vw]">
              {props.description}
            </DialogDescription>
          </DialogContent>
        </form>
      </Dialog>
      <h6 className="m-0 py-3 px-4 text-left whitespace-nowrap">
        {props.skills.join(" / ")}
      </h6>
    </div>
  );
}
