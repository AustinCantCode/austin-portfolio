"use client";
import profilePic from "../../../public/Contact/profile pic.png";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { Button } from "@components/ui/button";

export default function Homepage() {
  return (
    <main className="text-white max-w-5xl mx-auto rounded-md bg-white/15 p-4 space-y-4 fade-in">
      {/* Header Section */}
      <section className="flex flex-col sm:flex-row justify-between items-center gap-y-4">
        <div className="flex items-center gap-x-4 sm:gap-x-8">
          <Image
            src={profilePic}
            width={80}
            height={80}
            alt="Profile Photo"
            className="outline-white/15 outline-4 rounded-full"
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

      {/* About Me */}
      <section className="bg-white/15 p-3 sm:p-4 rounded-md">
        <h3 className="pb-2">About Me</h3>
        <p>
          Currently a third year student at Singapore Polytechnic pursing a
          diploma in Information Technology, specializing in User Experience and
          Interface (UI/UX) design. As of 2025, I am serving an internship at
          Amber Creative Singapore to further educate myself on the latest web
          development technologies and to better myself as a full-stack software
          developer.
        </p>
      </section>

      {/* Education & Experience */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/15 rounded-md p-3 sm:p-4 w-full">
          <h3 className="pb-2">Education</h3>
          <h5 className="pl-4">Compassvale Secondary School</h5>
          <p className="pl-4">2018 - 2022</p>
          <div className="border-l-2 pl-4">
            <h5>Singapore Polytechnic</h5>
            <p>2023 - Present</p>
          </div>
        </div>
        <div className="bg-white/15 rounded-md p-3 sm:p-4 w-full">
          <h3 className="pb-2">Experience</h3>
          <div className="border-l-2 pl-4">
            <h5>Amber Creative Pte Ltd</h5>
            <p>Full-stack Software Developer</p>
          </div>
        </div>
      </section>

      {/* Achievements, Coding, Designing */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 place-items-stretch">
        <div className="bg-white/15 w-full h-full p-3 sm:p-4 rounded-md flex flex-col justify-between">
          <div>
            <h3 className="pb-2">Achivements</h3>
            <div className="border-l-2 pl-4">
              <p>More than 20 certificates attained</p>
              <p>
                Received certificates from organizations such AWS and GitHub
              </p>
              <p>Awarded Grand Finalist for SP Batey Hackathon</p>
            </div>
          </div>
          <div className="mt-4 flex justify-start">
            <Link href="/achievements">
              <Button size="sm" variant="default" className="w-full md:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        <div className="bg-white/15 w-full h-full p-3 sm:p-4 rounded-md flex flex-col justify-between">
          <div>
            <h3 className="pb-2">Coding</h3>
            <div className="border-l-2 pl-4">
              <p>Over 2 years experience doing full-stack web development</p>
              <p>Studying to become a MERN stack developer</p>
              <p>
                Developed and contributed to over 10 projects with a variety of
                tech stacks
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-start">
            <Link href="/coding">
              <Button size="sm" variant="default" className="w-full md:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        <div className="bg-white/15 w-full h-full p-3 sm:p-4 rounded-md flex flex-col justify-between">
          <div>
            <h3 className="pb-2">Designing</h3>
            <div className="border-l-2 pl-4">
              <p>Over 2 years doing product, UI/UX and graphic designs</p>
              <p>
                Experienced with design softwares such as Adobe Photoshop, Adobe
                Illustrator, Figma etc.
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-start">
            <Link href="/design">
              <Button size="sm" variant="default" className="w-full md:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
