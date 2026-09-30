import type { Metadata } from "next";
import { cmsEnabled } from "../../../keystatic.config";
import KeystaticApp from "./keystatic";

// The CMS admin (see docs/CMS.md). Kept out of search results.
export const metadata: Metadata = {
  title: "Content · Austin Sia",
  robots: { index: false, follow: false },
};

export default function Layout() {
  if (cmsEnabled) return <KeystaticApp />;
  return (
    <main
      style={{
        fontFamily: "system-ui, sans-serif",
        maxWidth: 560,
        margin: "15vh auto",
        padding: "0 24px",
        lineHeight: 1.55,
      }}
    >
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>CMS not connected yet</h1>
      <p>
        The content editor saves by committing to GitHub. Connect it once by
        following <code>docs/CMS.md</code> (&ldquo;Connect the live CMS&rdquo;),
        then add the four <code>KEYSTATIC_*</code> environment variables, plus{" "}
        <code>CMS_PASSWORD</code> and <code>CMS_ALLOWED_USERS</code>, to Vercel
        and redeploy.
      </p>
    </main>
  );
}
