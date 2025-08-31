"use client";
import NameBanner from "@components/complex-ui/name-banner";
import { useEffect, useState } from "react";
import { NextSeo } from "next-seo";

export default function Homepage() {
  const [fadeIn, setFadeIn] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(" fade-in bg-stars");
    }, 3100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <NextSeo
        title="Austin Sia"
        description="The personal portfolio of Austin Sia. Explore projects in web development, UI/UX, and software design."
        canonical="https://austinsia.com/"
        openGraph={{
          url: "https://austinsia.com/",
          title: "Austin Sia",
          description:
            "The personal portfolio of Austin Sia. Explore projects in web development, UI/UX, and software design.",
          images: [
            {
              url: "https://austinsia.com/AS-Circle-Logo.png",
              width: 500,
              height: 500,
              alt: "AS Logo",
            },
          ],
          site_name: "AustinSia",
        }}
      />
      <main className="px-4 md:px-0 relative overflow-hidden min-h-screen flex justify-center bg-black">
        {/* Background Layers */}
        <div className={"absolute inset-0 z-0" + fadeIn} />
        <div className="absolute inset-0 bg-twinkling z-10" />
        {/* Name Card */}
        <NameBanner />
      </main>
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
    </>
  );
}
