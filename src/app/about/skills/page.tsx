import { about } from "@data/about";
import { skillGroups } from "@data/skills";
import { projects } from "@data/projects";
import { JsonLd, graph, breadcrumbLd } from "@lib/structured-data";
import { pageMetadata } from "@lib/metadata";
import { IconCircle, PageHeader } from "@components/ui";
import { SkillsView } from "./skills-view";

export const metadata = pageMetadata({
  title: "Skills: Next.js, React, TypeScript and Design",
  description:
    "The 34 tools Austin Sia uses to design and build websites and apps, from Next.js, React and TypeScript to Figma, with the projects that used each one.",
  path: "/about/skills",
});

export default function SkillsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbLd([
            { name: "About", path: "/about" },
            { name: "Skills", path: "/about/skills" },
          ]),
        )}
      />
      <PageHeader
        back={{ label: "About", href: "/about" }}
        title="Skills."
        sub="The tools I use to design and build. Tap any one to see which projects used it."
        className="pb-[clamp(40px,5vw,64px)]"
      />
      <SkillsView groups={skillGroups} projects={projects} />
      <section aria-labelledby="learnt" className="gutter band-y-2 bg-bg-alt">
        <div className="wrap flex flex-col gap-[clamp(28px,4vw,48px)]">
          <h2 id="learnt" className="t-h2">
            Recently learnt.
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
            {about.learnt.map((l) => (
              <div
                key={l.title}
                className="flex flex-col gap-2 rounded-[24px] bg-tile p-7"
              >
                <IconCircle name={l.icon} className="bg-bg-alt" />
                <p className="mt-2 text-[21px] font-bold tracking-[-0.01em]">
                  {l.title}
                </p>
                <p className="text-[15px] text-fg-2">{l.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
