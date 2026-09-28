import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={inter.variable}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <Providers>
          <a
            href="#main"
            className="sr-only z-[60] rounded-full bg-accent px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
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
