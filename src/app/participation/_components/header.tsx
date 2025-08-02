// COMPONENTS
import Image from "next/image";
import { Icon } from "@iconify/react";

// TYPES
import type { StaticImageData } from "next/image";

export interface HeaderProps {
  logo: string | StaticImageData;
  title: string;
  date: string;
}

export default function Header(props: HeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-between space-x-4 items-center">
        <Image
          width={100}
          height={100}
          src={props.logo}
          alt="Picture of Logo"
          quality={100}
          className="max-w-12 max-h-12 md:max-w-15 md:max-h-15 rounded-full border-2 border-gray-300"
        />
        <div>
          <p className="text-[2.2vh] md:text-[2.8vh] font-semibold m-0 p-0 text-lg">
            {props.title}
          </p>
          <p className="text-[1.6vh] md:text-[2vh] m-0 p-0">{props.date}</p>
        </div>
      </div>
      <Icon
        icon="tabler:dots"
        width="30"
        height="30"
        className="text-black cursor-pointer"
      />
    </div>
  );
}
