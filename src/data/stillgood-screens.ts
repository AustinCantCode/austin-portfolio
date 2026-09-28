import type { Media } from "./types";

import home from "../../public/stillgood/basic-user-homepage.webp";
import pantry from "../../public/stillgood/basic-pantry.webp";
import householdPantry from "../../public/stillgood/family-household-pantry.webp";
import recipes from "../../public/stillgood/recipes.webp";
import scan from "../../public/stillgood/basic-single-scan.webp";
import recipeStudio from "../../public/stillgood/pro-recipe-studio.webp";

const screen = (src: Media["src"], alt: string): Media => ({
  src,
  alt,
  fit: "cover",
  position: "top",
});

/** StillGood app screenshots, from the StillGood website (stillgoodapp.org). */
export const stillgoodScreens = {
  home: screen(
    home,
    "StillGood home screen showing pantry health and items that need attention",
  ),
  pantry: screen(pantry, "StillGood pantry list sorted by expiry date"),
  householdPantry: screen(householdPantry, "StillGood shared household pantry"),
  recipes: screen(
    recipes,
    "StillGood recipe suggestions that use expiring items",
  ),
  scan: screen(scan, "StillGood scanner adding a banana to the pantry"),
  recipeStudio: screen(
    recipeStudio,
    "StillGood Recipe Studio choosing ingredients from the pantry",
  ),
};
