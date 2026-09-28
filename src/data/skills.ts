/** Skill groups, edited in the CMS (About → Skills). */
import raw from "./generated/skills.json";
import type { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = raw.groups;

export const allSkills = skillGroups.flatMap((g) => g.items);
