"use client";
import { useEffect, useState } from "react";
import { Button } from "@components/ui/button";
import Link from "next/link";

export default function Name() {
  const [nameOutput, setNameOutput] = useState("");
  const [textVisible, setTextVisible] = useState("invisible");
  const [buttonVisible, setButtonVisible] = useState("mt-2 invisible");

  useEffect(() => {
    const name = "AUSTIN SIA";
    let index = 0;

    const interval = setInterval(() => {
      if (index === 10) {
        setTimeout(() => {
          setTextVisible("text-white animate-pulse fade-in");
          setButtonVisible("mt-2 fade-in");
        }, 1000);
      }
      if (index < name.length) {
        const char = name[index];
        setNameOutput((prev) => prev + char);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-2">{nameOutput}</h1>
      <p className={textVisible}>
        SOFTWARE DEVELOPER || ENTREPRENEUR || DESIGNER
      </p>
      <Link href="/homepage" prefetch={true}>
        <Button variant="austin" className={buttonVisible}>
          Discover More
        </Button>
      </Link>
    </div>
  );
}
