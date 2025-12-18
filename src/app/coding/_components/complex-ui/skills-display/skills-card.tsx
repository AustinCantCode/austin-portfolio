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
    <Card
      draggable={false}
      className="select-none w-full px-4 border-0 mx-auto"
    >
      <div className="flex items-center space-x-4">
        <Image
          src={src || Logo}
          alt="Logo"
          className="w-full h-full max-w-10 min-h-10 max-h-10 object-contain"
          loading="lazy"
        />
        <p className="pt-2 font-medium text-sm md:text-lg text-left">{title}</p>
      </div>
      <Progress
        value={proficiency}
        className="bg-zinc-300"
        indicatorColor={indicatorColor}
      />
    </Card>
  );
}
