"use client";

// COMPONENTS
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@components/ui/carousel";

import AutoScroll from "embla-carousel-auto-scroll";
import { useRef } from "react";

// TYPES
import type { StaticImageData } from "next/image";

export interface LogoCarouselProps {
  achievementLogos: {
    image: string | StaticImageData;
  }[];
}

export default function LogoCarousel(props: LogoCarouselProps) {
  const plugin = useRef(
    AutoScroll({
      speed: 0.8,
      stopOnMouseEnter: false,
      stopOnInteraction: false,
      stopOnFocusIn: false,
    }),
  );
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
        dragFree: false,
      }}
      plugins={[plugin.current]}
      className="bg-white select-none pointer-events-none"
    >
      <CarouselContent>
        {props.achievementLogos.map((item, index) => (
          <CarouselItem
            key={index}
            className="basis-1/3 md:basis-1/5 lg:basis-1/8 flex items-center py-3"
          >
            <Image
              width={200}
              height={200}
              alt="logo"
              src={item.image || ""}
              className="max-w-25"
              draggable="false"
              priority={true}
              quality={100}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
