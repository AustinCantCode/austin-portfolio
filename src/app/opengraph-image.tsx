import { OG_SIZE, ogCard } from "@lib/og";

export const alt =
  "Austin Sia, full-stack developer and UI/UX designer in Singapore";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    eyebrow: "Portfolio",
    title: "Austin Sia.",
    line: "Full-stack developer and UI/UX designer in Singapore, building websites and apps.",
  });
}
