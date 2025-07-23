import { Dialog, DialogHeader, DialogContent, DialogTrigger } from "@components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import Image, { StaticImageData } from "next/image";

interface ClickableImageProps {
  src: StaticImageData | string;
  alt?: string;
  rounded? : string;
}

export default function ClickableImage({
  src,
  rounded,
  alt = "Picture",
}: ClickableImageProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Image
          src={src}
          alt={alt}
          quality={100}
          className={`rounded-${rounded ? rounded : "none"} hover:scale-105 active:scale-100 transition-all`}
          priority={true}
        />
      </DialogTrigger>
      <DialogHeader>
        <DialogTitle></DialogTitle>
      <DialogContent
        showCloseButton={false}
        className={`p-2 m-0 border-0 min-w-fit rounded-${rounded ? rounded : "none"}`}
      >
        <Image
          src={src}
          alt={alt}
          quality={100}
          className={`rounded-${rounded ? rounded : "none"} w-full h-full`}
          priority={true}
        />
      </DialogContent>
      </DialogHeader>
    </Dialog>
  );
}
