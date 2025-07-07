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
  description: "Austin Sia's Portfolio",
  icons: {
    icon: "/AS-Circle-Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Navbar />
        <SpeedInsights />
        <div
          className="fixed inset-0 bg-stars bg-black -z-20"
          aria-hidden="true"
        />
        <div className="fixed inset-0 bg-twinkling -z-10" aria-hidden="true" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
