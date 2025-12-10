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
            className="basis-1/3 md:basis-1/5 lg:basis-1/8 py-3"
          >
            <div className="relative w-[120px] aspect-square flex items-center justify-center">
              <Image
                alt="logo"
                src={item.image}
                fill
                className="object-contain p-2"
                draggable="false"
                quality={100}
                priority
                sizes="(max-width: 768px) 33vw,
             (max-width: 1200px) 20vw,
             10vw"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
