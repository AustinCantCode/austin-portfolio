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
    <div className="card rounded-md overflow-hidden transition-all">
      <Image
        src={props.src}
        alt="Picture of Certificate"
        quality={100}
        className="w-full min-w-full p-2"
        priority={true}
      />
      <div className="card-body">
        <h5 className="text-[2.2vh] font-semibold">{props.title}</h5>
        <p className="text-[1.2vh]">{props.sender}</p>
        <p className="text-[1.6vh]">{props.description}</p>
      </div>
    </div>
  );
}
