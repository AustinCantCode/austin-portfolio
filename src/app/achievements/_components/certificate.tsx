// COMPONENTS
import Image from "next/image";

// TYPES
type CardProps = {
  title?: string;
  sender?: string;
  description?: string;
  src?: string;
};

export default function Certificate(props: CardProps) {
  return (
    <div className="card rounded-md overflow-hidden transition-all max-h-fit">
      <Image
        src={props.src}
        alt="Picture of Certificate"
        quality={100}
        className="w-full min-w-full p-2"
        priority={true}
      />
      <div className="card-body">
        <p className="font-medium text-sm md:text-lg">{props.title}</p>

        <p className="text-[10px] md:text-sm">{props.sender}</p>

        <p className="text-xs md:text-base">{props.description}</p>
      </div>
    </div>
  );
}
