/** StillGood app screenshots, edited in the CMS (Work → StillGood page). */
import raw from "./generated/stillgood.json";
import { toMedia, type RawMedia } from "./cms";
import type { Media } from "./types";

export type StillgoodScreen =
  | "home"
  | "pantry"
  | "householdPantry"
  | "recipes"
  | "scan"
  | "recipeStudio"
  | "alerts";

const screens = raw.screens as unknown as Record<StillgoodScreen, RawMedia>;

export const stillgoodScreens = Object.fromEntries(
  Object.entries(screens).map(([k, m]) => [k, toMedia(m)]),
) as Record<StillgoodScreen, Media | undefined>;
