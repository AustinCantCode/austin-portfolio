import { about } from "@data/about";
import { skillGroups } from "@data/skills";
import { projects } from "@data/projects";
import { JsonLd, graph, breadcrumbLd } from "@lib/structured-data";
import { pageMetadata } from "@lib/metadata";
import { pageCopy } from "@data/pages";
import { IconCircle, PageHeader } from "@components/ui";
import { SkillsView } from "./skills-view";
import { AboutNav } from "@components/local-nav";

export const metadata = pageMetadata({
  title: pageCopy.skills.title,
  description: pageCopy.skills.description,
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
      <AboutNav current="/about/skills" />
      <PageHeader
        title={pageCopy.skills.heading}
        sub="The tools and technologies I use to design and build. Tap on any of them to see the projects I used it in."
        className="pb-[clamp(48px,6vw,88px)]"
      />
      <SkillsView groups={skillGroups} projects={projects} />
      <section aria-labelledby="learnt" className="gutter band-y-2 bg-bg-alt">
        <div className="wrap flex flex-col gap-[clamp(28px,4vw,48px)]">
          <h2 id="learnt" className="t-h2">
            Recently Learnt
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
            {about.learnt.map((l) => (
              <div
                key={l.title}
                className="flex flex-col gap-2 rounded-[24px] bg-tile p-7"
              >
                <IconCircle name={l.icon} />
                <p className="font-display mt-2 text-[21px] font-bold tracking-[-0.01em]">
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
