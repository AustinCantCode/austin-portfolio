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
      className="bg-white select-none my-4"
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
                priority={true}
              />
              <div className="absolute top-0 md:top-2 right-0 md:right-2 bg-white/15 text-white text-sm md:text-base px-2.5 py-0.5 md:py-1 m-4 rounded-full">
                {index + 1}/{props.images.length}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
