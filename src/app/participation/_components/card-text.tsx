// COMPONENTS
import Icons from "./icons";

// TYPES
export interface CardTextProps {
  role: string;
  text: string;
}

export default function CardText(props: CardTextProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <Icons />
      <p className="text-[2.4vh] font-semibold m-0 p-0">{props.role}</p>
      <p className="text-[2vh] m-0 p-0 pb-4 whitespace-pre-wrap">
        {props.text}
      </p>
    </div>
  );
}
