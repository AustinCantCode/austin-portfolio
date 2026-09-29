import type { Metadata } from "next";
import Coin from "@components/complex-ui/coin";
import { ButtonLink } from "@components/ui";
import { SiteChrome } from "@components/site-chrome";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page not found | Austin Sia",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <SiteChrome>
      <section className="gutter flex min-h-[calc(100vh_-_56px)] items-center py-[clamp(48px,8vw,112px)]">
        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-5 text-center">
          <Coin
            delay={400}
            label="The AS coin. Click to flip it."
            className="w-[clamp(160px,22vw,220px)]"
          />
          <p className="text-[15px] font-semibold text-fg-2">Error 404</p>
          <h1 className="text-[clamp(36px,5vw,60px)] leading-[1.02] font-bold tracking-[-0.03em] text-balance">
            Oops! This Page Doesn&apos;t Exist
          </h1>
          <p className="max-w-[480px] text-[clamp(17px,1.6vw,19px)] text-balance text-fg-2">
            The page you are looking for may have been moved or no longer
            exists. Feel free to flip the coin, or head back to the homepage.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/">Back to home</ButtonLink>
            <ButtonLink href="/development" variant="secondary">
              View my projects
            </ButtonLink>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
