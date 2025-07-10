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
        <nav className="relative mt-4 mb-16">
          <div className="relative flex items-center justify-end lg:justify-evenly p-4 ">
            {/* Logo fixed at the left */}
            <Link
              href="/"
              className="absolute left-0 translate-x-10 md:translate-x-20 md:translate-y-0"
            >
              <Image
                src={ASLogo.src}
                alt="Austin's Logo"
                width={90}
                height={90}
                quality={100}
                priority={true}
                className="rounded-full transition-all hover:shadow-[0_0_25px_8px_rgb(255,255,255)] hover:outline-white/0"
              />
            </Link>
            {/* Desktop Nav centered */}
            <div className="hidden lg:flex justify-evenly w-full max-w-5xl mx-auto bg-white/15 md:py-4 md:rounded-full">
              {navbarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    `gap-x-2 text-base font-medium transition-colors px-3 py-1.5 rounded-full flex items-center ` +
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
            {/* Mobile Hamburger Button */}
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

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden border-t-2 border-b-2 mt-4">
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

  return null;
}
