import { Icon } from "@iconify/react";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import Link from "next/link";

export default function ContactCards() {
  const cardDetails = [
    {
      title: "Phone Number",
      content: "+65 9107 0598",
      icon: "solar:phone-bold",
      link: "https://wa.me/+6591070598",
    },
    {
      title: "Email",
      content: "austin.sia1515@gmail.com",
      icon: "ic:round-email",
      link: "https://mail.google.com/mail/?view=cm&fs=1&to=austin.sia1515@gmail.com&su=Lets get in touch!&body=Hi,%20I%20am%20interested%20in%20your%20work%20and%20would%20like%20to%20collaborate!",
    },
    {
      title: "LinkedIn Profile",
      content: "https://www.linkedin.com/in/austin-sia/",
      icon: "devicon-plain:linkedin",
      link: "https://www.linkedin.com/in/austin-sia/",
    },
  ];

  return (
    <div className="space-x-10 max-w-2xl mx-auto">
      {cardDetails.map((details, index) => {
        return (
          <Link href={details.link} key={index} target="_blank">
            <Card>
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
