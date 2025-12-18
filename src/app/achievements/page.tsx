// METADATA
import { Metadata } from "next";

// COMPONENTS
import CertificateSection from "./_components/certificate-section";
import Header from "./_components/header";

// DATA
import certificates from "@data/certificates";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Austin Sia | Achievements",
    description:
      "Showcasing my achievements across projects, competitions, and contributions, reflecting growth, skills, and dedication to excellence in various fields.",
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
        "Showcasing my achievements across projects, competitions, and contributions, reflecting growth, skills, and dedication to excellence in various fields.",
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

export default function Achievement() {
  const numOfCert = Object.values(certificates).reduce(
    (acc, value) => acc + value.data.length,
    0
  );
  return (
    <main className="space-y-20 fade-in">
      <Header certificateCount={numOfCert} />
      {Object.entries(certificates).map(([key, value]) => (
        <CertificateSection key={key} header={value.header} data={value.data} />
      ))}
    </main>
  );
}
