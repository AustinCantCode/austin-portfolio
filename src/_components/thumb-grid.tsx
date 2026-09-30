import type { Project } from "@data/types";
import { ImageSlot } from "./media";
import { ProjectPeek } from "./client/project-peek";

/**
 * Projects by their square thumbnail (the logo or app icon, from the CMS;
 * the cover if there's none), two across with the caption beside each.
 * Every thumbnail is the same size and filled edge to edge.
 */
export function ThumbGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-x-[clamp(24px,3vw,48px)] gap-y-[clamp(24px,3vw,40px)] min-[700px]:grid-cols-2">
      {projects.map((p) => {
        const media = p.thumbnail ?? p.cover;
        return (
          <ProjectPeek
            key={p.slug}
            project={p}
            className="group flex items-center gap-[clamp(16px,2vw,28px)] rounded-[24px] text-fg outline-offset-8 hover:no-underline"
          >
            <span className="lift relative block size-[clamp(112px,13vw,180px)] flex-none overflow-hidden rounded-[clamp(20px,2vw,28px)] bg-pill [--hover-scale:1.03]">
              <ImageSlot
                media={
                  media
                    ? { ...media, fit: "cover", position: "center" }
                    : undefined
                }
                placeholder={p.title}
                sizes="180px"
                compact
              />
            </span>
            <span className="flex min-w-0 flex-col gap-1.5">
              <span className="text-[12px] font-medium text-fg-2">
                {p.subtext}, {p.year}
              </span>
              <span className="font-display text-[clamp(23px,2vw,27px)] leading-[1.12] font-bold tracking-[-0.01em] transition-colors duration-300 group-hover:text-accent-text">
                {p.title}
              </span>
              <span className="text-[15px] leading-[1.5] text-fg-2">
                {p.line}
              </span>
              <span className="text-[13px] font-medium">{p.role}</span>
            </span>
          </ProjectPeek>
        );
      })}
    </div>
  );
}
