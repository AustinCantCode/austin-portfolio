import Image from "next/image";
import { Button } from "@components/ui/button";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex items-center mt-40 flex-col space-y-8">
      <p className="font-bold text-red-600 text-2xl">
        You are not supposed to be here...
      </p>
      <Image
        src="https://i.makeagif.com/media/10-15-2017/pCIzHR.gif"
        alt="Darth Vader GIF"
        unoptimized
        width={80}
        height={80}
        quality={100}
        loading="lazy"
        className="w-full max-w-3xl"
      />

      <p className="text-center text-white">
        Just kidding! This page is not found.
        <br />
        Return to the homepage by clicking below.
      </p>
      <Link href="/">
        <Button variant={"austin"} size={"lg"}>
          Return Home
        </Button>
      </Link>
    </div>
  );
}
