import type { Graphic } from "./types";

import watch1 from "../../public/design-projects/graphic-design/watch-1.jpg";
import watch2 from "../../public/design-projects/graphic-design/watch-2.jpg";
import watch3 from "../../public/design-projects/graphic-design/watch-3.jpg";
import fire from "../../public/design-projects/graphic-design/fire.jpg";
import magicalMoments from "../../public/design-projects/graphic-design/magical-moments.jpg";
import chupaChups from "../../public/design-projects/graphic-design/chupachups.jpg";

const art = (
  id: string,
  title: string,
  src: Graphic["image"]["src"],
): Graphic => ({
  id,
  title,
  image: { src, alt: title, fit: "cover" },
});

export const graphics: Graphic[] = [
  art("watch1", "Watch ad, no. 1", watch1),
  art("watch2", "Watch ad, no. 2", watch2),
  art("watch3", "Watch ad, no. 3", watch3),
  art("fire", "Fire", fire),
  art("mm", "Magical Moments", magicalMoments),
  art("chupachups", "Chupa Chups", chupaChups),
];
