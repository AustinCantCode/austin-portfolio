import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../_components/complex-ui/navbar";
import Footer from "@components/complex-ui/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Austin Sia | Portfolio",
  description:
    "The digital portfolio of Austin Sia. Showcasing his achievements, projects in coding, design, successes in entrepreneurship and events he participated in.",
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
  icons: {
    icon: "/AS-Circle-Logo.png",
  },
  openGraph: {
    title: "Austin Sia",
    description:
      "The digital portfolio of Austin Sia. Showcasing his achievements, projects in coding, design, successes in entrepreneurship and events he participated in.",
    url: "https://austinsia.com",
    siteName: "Austin's Portfolio",
    images: [
      {
        url: "../../public/AS-Circle-Logo.png",
        width: 500,
        height: 500,
        alt: "AS Logo",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased overflow-x-hidden`}>
        <Navbar />
        <SpeedInsights />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://austinsia.com" />
        <div
          className="fixed inset-0 bg-stars bg-black -z-20"
          aria-hidden="true"
        />
        <div className="fixed inset-0 bg-twinkling -z-10" aria-hidden="true" />
        {children}
        <Footer />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Austin Sia",
              url: "https://austinsia.com",
              sameAs: [
                "https://www.linkedin.com/in/austin-sia",
                "https://github.com/austincantcode",
              ],
              jobTitle: "Web Developer",
            }),
          }}
        />
      </body>
    </html>
  );
}
