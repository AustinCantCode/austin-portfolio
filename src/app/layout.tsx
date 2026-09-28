import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@components/client/providers";
import { Nav } from "@components/client/nav";
import { MotionManager } from "@components/client/motion";
import { Footer } from "@components/footer";
import { site } from "@data/site";
import { JsonLd, graph, personLd, websiteLd } from "@lib/structured-data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Serif display face, echoing the classical caps in the AS logo.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Austin Sia – Full-Stack Developer & Designer in Singapore",
  description:
    "Portfolio of Austin Sia, a full-stack developer and UI/UX designer in Singapore: client websites and platforms, mobile apps, design work and ventures.",
  applicationName: "Austin Sia",
  authors: [{ name: "Austin Sia", url: site.url }],
  creator: "Austin Sia",
  icons: { icon: "/AS-Circle-Logo.png" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // Dark is the default theme, so the browser chrome matches it.
  themeColor: "#0f0e0c",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${cormorant.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks the first homepage visit of a session so the hero intro
            (see _home/hero.tsx) can play without a flash of content. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(location.pathname==="/"&&!sessionStorage.getItem("as-intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="1"}catch(e){}`,
          }}
        />
      </head>
      <body className="antialiased">
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
        </Providers>
        <SpeedInsights />
        <JsonLd data={graph(personLd(), websiteLd())} />
      </body>
    </html>
  );
}
