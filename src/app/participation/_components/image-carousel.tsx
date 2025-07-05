// COMPONENTS
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@components/ui/carousel";

// TYPES
import type { StaticImageData } from "next/image";

export interface ImageCarouselProps {
  images: (string | StaticImageData)[];
}
export default function ImageCarousel(props: ImageCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "center",
        loop: false,
        dragFree: false,
      }}
      className="bg-white select-none"
    >
      <CarouselContent>
        {props.images.map((item, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full h-full">
              <Image
                alt="logo"
                src={item || ""}
                className="min-w-full min-h-full object-cover"
                draggable="false"
                loading="lazy"
              />
              <div className="absolute top-2 right-2 bg-white/15 bg-opacity-60 text-white text-xs px-2.5 py-1 m-2 rounded-full">
                {index + 1}/{props.images.length}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
