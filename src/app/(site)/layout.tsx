import { SiteChrome } from "@components/site-chrome";
import "../globals.css";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteChrome>{children}</SiteChrome>;
}
