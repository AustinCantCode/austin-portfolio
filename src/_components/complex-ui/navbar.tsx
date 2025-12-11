"use client";

// IMAGES
import ASLogo from "../../../public/AS-Circle-Logo.png";

// REACT HOOKS
import { useState } from "react";
import { usePathname } from "next/navigation";

// COMPONENTS
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Button } from "@components/ui/button";

// DATA
import navbarItems from "@data/navbar-items";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  for (let i = 0; i < navbarItems.length; i++) {
    if (pathname === navbarItems[i].href) {
      return (
        <nav>
          <div className="flex justify-between items-center px-8 pt-4 pb-12">
            <div className="flex items-center w-full gap-x-8 ">
              <Link
                href="/"
                className="relative min-w-[80px] min-h-[80px] mr-auto"
              >
                <Image
                  src={ASLogo.src}
                  alt="Austin's Logo"
                  fill
                  quality={100}
                  priority={true}
                  className="object-contain"
                />
              </Link>
              {navbarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    `hidden lg:flex gap-x-2 text-base font-medium transition-colors p-3 h-10 rounded-md items-center ` +
                    (pathname === item.href
                      ? "bg-white text-black"
                      : "text-white hover:bg-white/15")
                  }
                >
                  <Icon icon={item.icon} width="18" height="18" />
                  {item.label}
                </Link>
              ))}
            </div>
            <Button
              variant="austin"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <Icon icon={"material-symbols:close-rounded"} />
              ) : (
                <Icon icon={"ci:hamburger-md"} />
              )}
            </Button>
          </div>
          {isOpen && (
            <div className="lg:hidden border-t-2 border-b-2 mb-8">
              {navbarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    `flex text-lg text-left text-white bg-white/15 font-medium py-3 space-x-8 items-center transition-colors ` +
                    (pathname === item.href
                      ? "border-l-4 pl-5 border-white"
                      : "pl-6")
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <Icon
                    icon={item.icon}
                    width="20"
                    height="20"
                    className="mr-4"
                  />
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </nav>
      );
    }
  }
}
