import { useRef } from "react";

// COMPONENTS
import AutoScroll from "embla-carousel-auto-scroll";
import VideoCard from "./video-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@components/ui/carousel";

// LOGO
import Logo from "../../../../../../public/AS-Circle-Logo.png";

// DATA
import projects from "@data/coding-projects";

// TYPES
export interface VideoCarouselProps {
  selectedSkills: string[];
}

export default function VideoCarousel({ selectedSkills }: VideoCarouselProps) {
  const plugin = useRef(
    AutoScroll({
      speed: 0.8,
      stopOnMouseEnter: false,
      stopOnInteraction: false,
      stopOnFocusIn: true,
    })
  );
  let filteredProjects;
  if (selectedSkills.length === 0) {
    filteredProjects = projects;
  } else {
    filteredProjects = projects.filter(
      (project) =>
        Array.isArray(project.skills) &&
        selectedSkills.every((skill) => project.skills.includes(skill))
    );
  }

  return (
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        plugins={[plugin.current]}
        className="w-full"
      >
        <CarouselContent>
          {filteredProjects.map((project) => (
            <CarouselItem
              key={project.id}
              className="md:basis-1/2 lg:basis-1/3 flex items-center user-select-none"
            >
              <section id={project.id} className="min-w-full">
                <VideoCard
                  key={project.id}
                  title={project.title || "Untitled Video"}
                  date={project.date || "Unknown Date"}
                  thumbnail={project.thumbnail || Logo}
                  src={project.src || Logo}
                  description={project.description || ""}
                  skills={project.skills || ""}
                />
              </section>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
  );
}
