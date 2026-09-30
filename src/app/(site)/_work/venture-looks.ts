import { eventBySlug } from "@data/events";
import { projectBySlug } from "@data/projects";
import type { Venture } from "@data/types";
import { stillgoodScreens } from "@data/stillgood-screens";
import {
  phoneLook,
  photoLook,
  tabletLook,
  type Look,
} from "@components/showroom-look";

/**
 * What each venture stands as in the showroom: its website screenshot in
 * a laptop when one is set in the CMS, otherwise its default picture.
 */
export function ventureLook(v: Venture): Look {
  if (v.screenshot) return tabletLook(v.screenshot);
  const id = v.id;
  if (id === "stillgood") return phoneLook(stillgoodScreens.home);
  // Zenith Technologies was the SP Batey Hackathon team.
  if (id === "zenith")
    return photoLook(eventBySlug("sp-batey-hackathon")?.image);
  return {
    ...tabletLook(projectBySlug("calibrium")?.cover),
    label: "Calibrium screenshot",
  };
}
