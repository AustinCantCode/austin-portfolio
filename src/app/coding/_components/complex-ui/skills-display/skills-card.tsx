// COMPONENTS
import { Card } from "@components/ui/card";
import { Progress } from "@components/ui/progress";
import Image from "next/image";

// LOGO
import Logo from "../../../../../../public/AS-Circle-Logo.png";

// TYPES
import type { StaticImageData } from "next/image";

export interface SkillsCardProps {
  title: string;
  src?: string | StaticImageData;
  proficiency?: number;
  indicatorColor?: string;
  selectedTitles: string[];
  setSelectedTitles: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function SkillsCard(props: SkillsCardProps) {
  const {
    title,
    src,
    proficiency,
    indicatorColor,
    selectedTitles,
    setSelectedTitles,
  } = props;

  const isSelected = selectedTitles.includes(title);

  function setButtonState() {
    if (!isSelected) {
      setSelectedTitles((prev: string[]) => [...prev, title]);
    } else {
      setSelectedTitles((prev: string[]) => prev.filter((t) => t !== title));
    }
  }

  const buttonClass = isSelected
    ? "bg-white text-black"
    : "bg-white/15 text-white";
  const progressBarColor = isSelected ? "bg-zinc-300" : "bg-white";

  return (
    <Card
      onClick={setButtonState}
      className={`${buttonClass} w-full max-w-xs px-4 transition hover:duration-300 active:duration-60 ease-in-out hover:bg-white/25 active:scale-95 cursor-pointer border-0 mx-auto`}
    >
      <div className="flex items-center space-x-4">
        <Image
          src={src || Logo}
          alt="Logo"
          className="w-full h-full max-w-10 min-h-10 max-h-10"
          loading="lazy"
        />
        <h5 className="pt-2">{title}</h5>
      </div>
      <Progress
        value={proficiency}
        className={progressBarColor}
        indicatorColor={indicatorColor}
      />
    </Card>
  );
}
