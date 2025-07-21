import { useRef } from "react";

// COMPONENTS
import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@components/ui/carousel";
import Image from "next/image";

// LOGO
import Logo from "../../../../../../public/AS-Circle-Logo.png";

// TYPES
import type { StaticImageData } from "next/image";

export interface ImageCarouselProps {
  images: (string | StaticImageData)[];
}

export default function ImageCarousel(props: ImageCarouselProps) {
  const plugin = useRef(
    AutoScroll({
      speed: 0.8,
      stopOnMouseEnter: false,
      stopOnInteraction: false,
      stopOnFocusIn: true,
    }),
  );

  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      plugins={[plugin.current]}
      className="hidden md:block w-full"
    >
      <CarouselContent>
        {props.images.map((project, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/2 lg:basis-1/1 flex items-center user-select-none w-full max-w-[60vw]"
          >
            <section className="min-w-full">
              <Image
                src={project || Logo}
                alt="Picture of Project"
                quality={100}
                loading="lazy"
              />
            </section>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
