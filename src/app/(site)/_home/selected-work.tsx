import type { Project } from "@data/types";
import { ShowroomPairs } from "@components/client/showroom";

/**
 * "Selected work" as a showroom: no cards or borders, each device standing
 * on the page (see ShowroomPairs for how the rows split).
 */
export function SelectedWork({ projects }: { projects: Project[] }) {
  return <ShowroomPairs projects={projects} />;
}
