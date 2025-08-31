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
  title: "Austin Sia",
  description:
    "The personal portfolio of Austin Sia. Explore projects in web development, UI/UX, and software design.",
  icons: {
    icon: "/AS-Circle-Logo.png",
  },
  openGraph: {
    title: "Austin Sia",
    description:
      "The personal portfolio of Austin Sia. Explore projects in web development, UI/UX, and software design.",
    url: "https://austinsia.com",
    siteName: "AustinSia",
    images: [
      {
        url: "https://austinsia.com/AS-Circle-Logo.png",
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
