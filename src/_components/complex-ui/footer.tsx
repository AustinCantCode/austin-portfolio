"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const pages = [
    "/achievements",
    "/participation",
    "/coding",
    "/homepage",
    "/designing",
    "/contact",
  ];

  for (let i = 0; i < pages.length; i++) {
    if (pathname === pages[i]) {
      return (
        <div className="flex justify-between py-4 bg-white px-4 md:px-16 mt-20 items-center">
          <div className="flex gap-x-4 md:gap-x-8">
            <Link
              href="https://mail.google.com/mail/?view=cm&fs=1&to=austin.sia1515@gmail.com&su=Let%27s%20get%20in%20touch!&body=Hi%20Austin%2C%20I%20came%20across%20your%20portfolio%20and%20was%20really%20impressed%20with%20your%20work.%20I%27d%20love%20to%20connect%20and%20explore%20potential%20opportunities%20to%20collaborate!"
              target="_blank"
            >
              <Icon
                icon={"ic:round-email"}
                width="25"
                height="25"
                className="text-gray-600"
              />
            </Link>
            <Link href="https://wa.me/+6591070598" target="_blank">
              <Icon
                icon={"solar:phone-bold"}
                width="25"
                height="25"
                className="text-gray-600"
              />
            </Link>
            <Link
              href="https://www.linkedin.com/in/austin-sia/"
              target="_blank"
            >
              <Icon
                icon={"devicon-plain:linkedin"}
                width="25"
                height="25"
                className="text-gray-600"
              />
            </Link>
            <Link href="https://github.com/austincantcode" target="_blank">
              <Icon
                icon={"akar-icons:github-fill"}
                width="25"
                height="25"
                className="text-gray-600"
              />
            </Link>
          </div>
          <p className="text-xs md:text-sm text-gray-600 font-bold m-0 p-0">
            © Austin Sia Portfolio 2025
          </p>
        </div>
      );
    }
  }
}
