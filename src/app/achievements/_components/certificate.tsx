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
      <div className="relative w-full aspect-[1/0.8]">
        <Image
          src={props.src || ""}
          alt="Certificate"
          fill
          className="object-contain p-2"
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw,
                 33vw"
          quality={100}
          priority
        />
      </div>

      <div className="card-body">
        <h5 className="font-semibold">{props.title}</h5>
        <p className="text-xs md:text-sm">{props.sender}</p>
        <p className="text-sm md:text-base">{props.description}</p>
      </div>
    </div>
  );
}
