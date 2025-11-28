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
}

export default function SkillsCard(props: SkillsCardProps) {
  const { title, src, proficiency, indicatorColor } = props;

  return (
    <Card className="w-full max-w-xs px-4 transition hover:duration-300 active:duration-60 ease-in-out active:scale-90 border-0 mx-auto cursor-pointer active:animate-spin hover:scale-95">
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
        className={"bg-zinc-300"}
        indicatorColor={indicatorColor}
      />
    </Card>
  );
}
