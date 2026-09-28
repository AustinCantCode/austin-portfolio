/** StillGood app screenshots, edited in the CMS (Work → StillGood page). */
import raw from "./generated/stillgood.json";
import { toMedia, type RawMedia } from "./cms";
import type { Media } from "./types";

type Key =
  | "home"
  | "pantry"
  | "householdPantry"
  | "recipes"
  | "scan"
  | "recipeStudio";

const screens = raw.screens as unknown as Record<Key, RawMedia>;

export const stillgoodScreens = Object.fromEntries(
  Object.entries(screens).map(([k, m]) => [k, toMedia(m)]),
) as Record<Key, Media>;
