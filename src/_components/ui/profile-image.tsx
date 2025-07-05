"use client";

// COMPONENTS
import Image from "next/image";
import ASLogo from "../../../public/AS-Circle-Logo.png";
import profilePic from "../../../public/Contact/profile pic.png";
import { useState, useEffect, useRef, useCallback } from "react";

// TYPES
export interface ProfileImageProps {
  className?: string;
  width?: number;
}

export default function ProfileImage(props: ProfileImageProps) {
  const logoRef = useRef<HTMLImageElement>(null);
  const [flipProfilePic, setFlipProfilePic] = useState(ASLogo);
  const isAnimatingRef = useRef(false);

  const flipLogo = useCallback(() => {
    if (isAnimatingRef.current || !logoRef.current) return;

    isAnimatingRef.current = true;

    logoRef.current.classList.add("animate");

    setTimeout(() => {
      setFlipProfilePic((prevPic) =>
        prevPic === profilePic ? ASLogo : profilePic,
      );
      logoRef.current?.classList.add("animateTwo");
    }, 400);

    setTimeout(() => {
      logoRef.current?.classList.remove("animate");
      logoRef.current?.classList.remove("animateTwo");
    }, 800);

    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 3000);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      flipLogo();
    }, 2000);
    return () => clearTimeout(timer);
  }, [flipLogo]);

  return (
    <Image
      quality={100}
      src={flipProfilePic}
      alt="AS Logo"
      ref={logoRef}
      onClick={flipLogo}
      id="ASLogo"
      width={props.width || 500}
      height={500}
      className={
        "max-w-60 transition-all duration-300 rounded-full " +
        (props.className || "")
      }
      loading="eager"
      priority={true}
    />
  );
}
