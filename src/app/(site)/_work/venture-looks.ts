import { eventBySlug } from "@data/events";
import { projectBySlug } from "@data/projects";
import type { Venture } from "@data/types";
import { stillgoodScreens } from "@data/stillgood-screens";
import {
  phoneLook,
  tabletLook,
  type Look,
} from "@components/showroom-look";

// A laptop's whole width over its height, bezel included (676 × 344 at
// full width), which is a little under the 2:1 of its screen.
const LAPTOP_OUTER = 1.96;

/**
 * What each venture stands as in the showroom: its website screenshot in
 * a laptop when one is set in the CMS, otherwise its default picture,
 * always in the laptop's 2:1 shape.
 */
export function ventureLook(v: Venture): Look {
  if (v.screenshot) return tabletLook(v.screenshot);
  const id = v.id;
  if (id === "stillgood") return phoneLook(stillgoodScreens.home);
  // Zenith Technologies was the SP Batey Hackathon team.
  // Its team photo takes the laptops' outer shape (a 2:1 screen plus its
  // bezel), so every venture is the same size down the page.
  if (id === "zenith")
    return {
      kind: "object",
      media: eventBySlug("sp-batey-hackathon")?.image,
      ratio: LAPTOP_OUTER,
      photo: true,
    };
  return {
    ...tabletLook(projectBySlug("calibrium")?.cover),
    label: "Calibrium screenshot",
  };
}
