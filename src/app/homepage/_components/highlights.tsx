import Link from "next/link";
import { Button } from "@components/ui/button";
import experiences from "@data/homepage-experiences";

export default function Highlights() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 place-items-stretch">
      {experiences.highlightSections.map((highlight, index) => {
        return (
          <div
            className="bg-white/15 w-full h-full p-3 sm:p-4 rounded-md flex flex-col justify-between"
            key={index}
          >
            <div>
              <h3 className="pb-2">{highlight.title}</h3>
              <div className="border-l-2 pl-4">
                {highlight.details.map((details, index) => {
                  return <p key={index}>{details}</p>;
                })}
              </div>
            </div>
            <div className="mt-4 flex justify-start">
              <Link href={highlight.link}>
                <Button
                  size="sm"
                  variant="default"
                  className="w-full md:w-auto"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        );
      })}
    </section>
  );
}
