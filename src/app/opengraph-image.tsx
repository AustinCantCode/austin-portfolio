import { OG_SIZE, ogCard } from "@lib/og";

export const alt =
  "Austin Sia, Full-stack Software Developer and UI/UX Designer in Singapore";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    eyebrow: "Portfolio",
    title: "Austin Sia",
    line: "Full-stack Software Developer and UI/UX Designer in Singapore, building websites and mobile apps.",
  });
}
