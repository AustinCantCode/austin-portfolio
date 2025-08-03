// COMPONENTS
import Icons from "./icons";

// TYPES
export interface CardTextProps {
  role: string;
  text: string;
}

export default function CardText(props: CardTextProps) {
  return (
    <div className="flex flex-col gap-y-2 md:gap-y-4 select-none">
      <Icons />
      <p className="text-sm md:text-lg font-semibold m-0 p-0">{props.role}</p>
      <p className="text-xs md:text-base m-0 p-0 whitespace-pre-wrap">
        {props.text}
      </p>
    </div>
  );
}
