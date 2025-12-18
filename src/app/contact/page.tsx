// METADATA
import { Metadata } from "next";

import ContactCards from "./_components/contact-cards";
import Header from "./_components/header";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Austin Sia | Contact Me",
    description:
      "Get in touch to discuss projects, collaborations, or opportunities—I'm always open to connecting and sharing ideas.",
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
        "Get in touch to discuss projects, collaborations, or opportunities—I'm always open to connecting and sharing ideas.",
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

export default function Contact() {
  return (
    <main className="text-white space-y-16 fade-in pb-[12%] mx-4 lg:mx-0">
      <Header />
      <ContactCards />
    </main>
  );
}
