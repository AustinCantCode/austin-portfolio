import Image from "next/image";
import playBadge from "../../public/stillgood/google-play-badge.png";
import { cn } from "@lib/utils";
import { site } from "@data/site";
import { SmartLink } from "./ui";

/** The official "Get it on Google Play" badge, linking to StillGood. */
export function GooglePlayBadge({ className }: { className?: string }) {
  return (
    <SmartLink
      href={site.googlePlayUrl}
      data-track="play_store_click"
      className={cn("inline-block shrink-0 hover:no-underline", className)}
    >
      {/* The badge art includes Google's required clear space, so the
          negative margin lines the visible badge up with its neighbours. */}
      <Image
        quality={100}
        src={playBadge}
        alt="Get it on Google Play"
        height={78}
        className="-m-[13px] h-[78px] w-auto max-w-none"
      />
    </SmartLink>
  );
}
