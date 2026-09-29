import { events, FEATURED_EVENT_INDEX } from "@data/events";
import { projectBySlug } from "@data/projects";
import { stillgoodScreens } from "@data/stillgood-screens";
import {
  phoneLook,
  photoLook,
  tabletLook,
  type Look,
} from "@components/showroom-look";

/** What each venture stands as in the showroom. */
export function ventureLook(id: string): Look {
  if (id === "stillgood") return phoneLook(stillgoodScreens.home);
  if (id === "zenith") return photoLook(events[FEATURED_EVENT_INDEX]?.image);
  return {
    ...tabletLook(projectBySlug("calibrium")?.cover),
    label: "Calibrium screenshot",
  };
}
