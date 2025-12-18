// METADATA
import { Metadata } from "next";

// COMPONENTS
import Header from "./_components/header";
import CardText from "./_components/card-text";
import ImageCarousel from "./_components/image-carousel";

// DATA
import events from "@data/participation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Austin Sia | Participation",
    description:
      "Showcasing my participations in events, workshops, and competitions, reflecting my curiosity, teamwork, and continuous learning and exploration.",
    keywords: [
      "Software Developer",
      "Frontend Developer",
      "Backend Developer",
      "Full-Stack Developer",
      "Web Developer",
      "Information Technology",
      "Computer Science",
      "Entrepreneur",
      "Designer",
      "Portfolio",
      "Next.js",
      "React",
    ],
    openGraph: {
      title: "Austin Sia | Coding Projects",
      description:
        "Showcasing my participations in events, workshops, and competitions, reflecting my curiosity, teamwork, and continuous learning and exploration.",
      url: "https://austinsia.com",
      siteName: "Austin's Portfolio",
      images: [
        {
          url: "../../public/AS-Circle-Logo.png",
          width: 500,
          height: 500,
        },
      ],
      type: "website",
    },
  };
}

export default function Participation() {
  return (
    <main className="mx-auto max-w-3xl">
      {events.map((event, index) => {
        return (
          <div
            className="cols-span-1 card p-4 md:p-8 overflow-hidden transition-all max-h-fit mx-4 lg:mx-0 m-10 fade-in"
            key={index}
          >
            <Header date={event.date} title={event.title} logo={event.logo} />
            <ImageCarousel images={event.src} />
            <CardText role={event.role} text={event.text} />
          </div>
        );
      })}
    </main>
  );
}
