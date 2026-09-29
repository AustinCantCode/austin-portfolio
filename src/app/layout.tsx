import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@data/site";

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
  title: "Austin Sia – Full-stack Developer & Designer in Singapore",
  description:
    "The portfolio of Austin Sia, a Full-stack Software Developer and UI/UX Designer in Singapore: client platforms, mobile apps, designs and ventures.",
  applicationName: "Austin Sia",
  authors: [{ name: "Austin Sia", url: site.url }],
  creator: "Austin Sia",
  icons: { icon: "/AS-Circle-Logo.png" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // Dark is the default theme, so the browser chrome matches it.
  themeColor: "#171717",
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
        {/* Before first paint: the first homepage visit of a session gets
            the hero intro (see _home/hero.tsx) without a flash of content;
            any other first page load fades in (data-load, globals.css). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var d=document.documentElement;if(location.pathname==="/"&&!sessionStorage.getItem("as-intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches)d.dataset.intro="1";else d.dataset.load="fade"}catch(e){}`,
          }}
        />
      </head>
      {/* The site's chrome and styles live in (site)/layout.tsx, so the CMS
          at /keystatic gets a clean page. */}
      <body className="antialiased">{children}</body>
    </html>
  );
}
