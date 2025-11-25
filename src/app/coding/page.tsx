"use client";

import { useState } from "react";

// COMPONENTS
import SkillsSection from "./_components/complex-ui/skills-display/skills-section";
import OtherProjectsGrid from "./_components/complex-ui/other-projects-section/other-projects-grid";
import FeaturedProjects from "./_components/complex-ui/featured-projects/featured-projects";
import GitHubCalendar from "@components/complex-ui/github-calendar";

export default function CodingProjects() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  return (
    <main className="text-center text-white bg-none space-y-20 fade-in">
      <FeaturedProjects />

      <ol className="relative border-s border-default">
        <li className="mb-10 ms-4">
          <div className="absolute w-3 h-3 bg-neutral-quaternary rounded-full mt-1.5 -start-1.5 border border-buffer"></div>
          <time className="text-sm font-normal leading-none text-body">
            February 2022
          </time>
          <h3 className="text-lg font-semibold text-heading my-2">
            Application UI code in Tailwind CSS
          </h3>
          <p className="mb-4 text-base font-normal text-body">
            Get access to over 20+ pages including a dashboard layout, charts,
            kanban board, calendar, and pre-order E-commerce & Marketing pages.
          </p>
          <a
            href="#"
            className="inline-flex items-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          >
            Learn more
            <svg
              className="w-4 h-4 ms-1.5 -me-0.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 12H5m14 0-4 4m4-4-4-4"
              />
            </svg>
          </a>
        </li>
        <li className="mb-10 ms-4">
          <div className="absolute w-3 h-3 bg-neutral-quaternary rounded-full mt-1.5 -start-1.5 border border-buffer"></div>
          <time className="text-sm font-normal leading-none text-body">
            March 2022
          </time>
          <h3 className="text-lg font-semibold text-heading my-2">
            Marketing UI design in Figma
          </h3>
          <p className="text-base font-normal text-body">
            All of the pages and components are first designed in Figma and we
            keep a parity between the two versions even as we update the
            project.
          </p>
        </li>
        <li className="ms-4">
          <div className="absolute w-3 h-3 bg-neutral-quaternary rounded-full mt-1.5 -start-1.5 border border-buffer"></div>
          <time className="mb-1 text-sm font-normal leading-none text-body">
            April 2022
          </time>
          <h3 className="text-lg font-semibold text-heading my-2">
            E-Commerce UI code in Tailwind CSS
          </h3>
          <p className="text-base font-normal text-body">
            Get started with dozens of web components and interactive elements
            built on top of Tailwind CSS.
          </p>
        </li>
      </ol>

      <GitHubCalendar />
      <SkillsSection
        selectedSkills={selectedSkills}
        setSelectedSkills={setSelectedSkills}
      />
      <OtherProjectsGrid selectedSkills={selectedSkills} />
    </main>
  );
}
