import Image from "next/image";
import { Button } from "@components/ui/button";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex items-center my-30 flex-col space-y-8 text-white mx-4">
      <p className="font-bold text-lg md:text-2xl">
        You are not supposed to be here...
      </p>
      <Image
        src="https://media.tenor.com/7Ev3mwetMFsAAAAM/angry-cat-cat.gif"
        alt="Cat GIF"
        unoptimized
        width={400}
        height={400}
        quality={100}
        priority={true}
        className="rounded-md"
      />

      <p className="text-center text-base md:text-lg">
        Just kidding!
        <br />
        Click below to return to the homepage .
      </p>
      <Link href="/homepage">
        <Button variant={"austin"} size={"lg"}>
          Return Home
        </Button>
      </Link>
    </div>
  );
}
