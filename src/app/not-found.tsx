import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@components/ui";
import { SiteChrome } from "@components/site-chrome";
import "./globals.css";

export const metadata: Metadata = {
  title: "Austin Sia | Page Not Found",
  robots: { index: false },
};

// The angry cat from the original site's error page, served by Tenor.
const CAT = "https://media.tenor.com/7Ev3mwetMFsAAAAM/angry-cat-cat.gif";

/** The 404 page, with the joke and the cat from the original site. */
export default function NotFound() {
  return (
    <SiteChrome>
      <section className="gutter flex min-h-[calc(100vh_-_56px)] items-center py-[clamp(48px,8vw,112px)]">
        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-6 text-center">
          <p className="text-[15px] font-semibold text-fg-2">Error 404</p>
          <h1 className="text-[clamp(32px,4.4vw,52px)] leading-[1.05] font-bold tracking-[-0.03em] text-balance">
            You Are Not Supposed to Be Here…
          </h1>
          <Image
            src={CAT}
            alt="An angry cat glaring at the camera"
            unoptimized
            width={400}
            height={400}
            priority
            className="h-auto w-[clamp(220px,40vw,360px)] rounded-[18px] bg-pill"
          />
          <p className="max-w-[480px] text-[clamp(17px,1.6vw,19px)] text-balance text-fg-2">
            Just kidding! Click below to return to the homepage.
          </p>
          <ButtonLink href="/">Return Home</ButtonLink>
        </div>
      </section>
    </SiteChrome>
  );
}
