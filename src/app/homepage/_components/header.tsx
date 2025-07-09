"use client";
import profilePic from "../../../../public/Contact/profile pic.png";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Button } from "@components/ui/button";

export default function Header() {
  return (
    <section className="flex flex-col sm:flex-row justify-between items-center gap-y-4">
      <div className="flex items-center gap-x-4 sm:gap-x-8 mr-auto">
        <Image
          src={profilePic}
          width={80}
          height={80}
          alt="Profile Photo"
          quality={100}
          priority={true}
        />
        <div>
          <h3 className="m-0">AUSTIN SIA</h3>
          <p className="m-0">Singapore</p>
        </div>
      </div>
      <Button
        size="sm"
        variant="austin"
        onClick={() => window.open("/resume/AustinResume2.pdf", "_blank")}
        className="w-full sm:w-auto"
      >
        <Icon icon="uis:download-alt" />
        Download CV
      </Button>
    </section>
  );
}
