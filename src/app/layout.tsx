import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@components/client/providers";
import { Nav } from "@components/client/nav";
import { MotionManager } from "@components/client/motion";
import { Footer } from "@components/footer";
import { site } from "@data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Austin Sia",
  description:
    "Austin Sia is a full-stack developer and designer in Singapore, and the founder of StillGood.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: site.name,
              url: site.url,
              jobTitle: "Full-stack developer and designer",
              sameAs: [site.contact.linkedin, site.contact.github],
            }),
          }}
        />
      </body>
    </html>
  );
}
