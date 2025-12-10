"use client";

import Title from "@components/ui/title";
import { useEffect } from "react";

export default function GitHubCalendar({
  username = "Austin-Sia",
}: {
  username?: string;
}) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/github-calendar@latest/dist/github-calendar.min.js";
    script.async = true;
    script.onload = () => {
      /* eslint-disable @typescript-eslint/ban-ts-comment */
      // @ts-ignore
      if (window.GitHubCalendar) {
        /* eslint-disable @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        window.GitHubCalendar(".calendar", username, { responsive: true });
      }
    };
    document.body.appendChild(script);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://unpkg.com/github-calendar@latest/dist/github-calendar-responsive.css";
    document.head.appendChild(link);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, [username]);

  return (
    <main>
      <Title header={`GitHub Statistics ${new Date().getFullYear()} `} />
      <section className="mx-auto bg-white rounded-lg text-black flex items-center justify-center max-w-fit p-4">
        <div className="overflow-x-scroll calendar">
          Loading GitHub statistics...
        </div>
      </section>
    </main>
  );
}
