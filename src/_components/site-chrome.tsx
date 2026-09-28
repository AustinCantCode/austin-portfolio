import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@components/client/providers";
import { Nav } from "@components/client/nav";
import { GestureManager, MotionManager } from "@components/client/motion";
import { Footer } from "@components/footer";
import { JsonLd, graph, personLd, websiteLd } from "@lib/structured-data";

/**
 * The site's nav, footer and motion around a page. Used by the (site)
 * layout and the 404 page; the CMS at /keystatic has none of it.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Providers>
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-accent px-4 py-2 text-on-accent focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <MotionManager />
        <GestureManager />
      </Providers>
      <SpeedInsights />
      <JsonLd data={graph(personLd(), websiteLd())} />
    </>
  );
}
