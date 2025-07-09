"use client";
import { Icon } from "@iconify/react";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import Link from "next/link";
import contactDetails from "@data/contact-details";

export default function ContactCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-8">
      {contactDetails.map((details, index) => {
        return (
          <Link href={details.link} key={index} target="_blank">
            <Card
              onClick={() => {
                if (details.title === "Curriculum Vitae (CV)") {
                  window.open("/resume/AustinResume2.pdf", "_blank");
                }
              }}
            >
              <CardHeader>
                <CardTitle>{details.title || ""}</CardTitle>
                <CardDescription>{details.content || ""}</CardDescription>
                <CardAction>
                  <Icon
                    icon={details.icon || ""}
                    width="40"
                    height="40"
                    className="text-gray-600"
                  />
                </CardAction>
              </CardHeader>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
