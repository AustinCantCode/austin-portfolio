import type { Metadata } from "next";
import Coin from "@components/complex-ui/coin";
import { ButtonLink } from "@components/ui";

export const metadata: Metadata = {
  title: "Page not found | Austin Sia",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="gutter flex min-h-[calc(100vh_-_56px)] items-center py-[clamp(48px,8vw,112px)]">
      <div className="mx-auto flex max-w-[720px] flex-col items-center gap-5 text-center">
        <Coin
          delay={400}
          label="The AS coin. Click to flip it."
          className="w-[clamp(160px,22vw,220px)]"
        />
        <p className="text-[15px] font-semibold text-fg-2">Error 404</p>
        <h1 className="text-[clamp(36px,5vw,60px)] leading-[1.02] font-bold tracking-[-0.03em] text-balance">
          This page landed on the wrong side.
        </h1>
        <p className="max-w-[480px] text-[clamp(17px,1.6vw,19px)] text-balance text-fg-2">
          The link may be old, or the page has moved. Flip the coin, or head
          somewhere real.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Go home</ButtonLink>
          <ButtonLink href="/work" variant="secondary">
            See my work
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
