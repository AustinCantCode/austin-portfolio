import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@lib/utils";
import type { Media, Project } from "@data/types";
import { Icon } from "./icon";

/**
 * Fills its parent with an image, or with a labelled placeholder when the
 * image hasn't been supplied yet. The parent must be positioned.
 */
export function ImageSlot({
  media,
  placeholder,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
  fit,
  position,
  className,
  tone = "default",
  compact,
}: {
  media?: Media;
  placeholder: string;
  sizes?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  position?: string;
  className?: string;
  tone?: "default" | "light" | "dark";
  /** Icon-only placeholder, for thumbnails too small for a label. */
  compact?: boolean;
}) {
  if (media) {
    return (
      <Image
        quality={100}
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder={media.src.blurDataURL ? "blur" : "empty"}
        className={cn("select-none", className)}
        style={{
          objectFit: fit ?? media.fit ?? "cover",
          objectPosition: position ?? media.position ?? "center",
        }}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={`${placeholder} (image coming soon)`}
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center",
        tone === "light" && "bg-[#f4f1ea] text-[#1b1a16]",
        tone === "dark" && "bg-[#2b2924] text-[#f4f1ea]",
        tone === "default" && "bg-pill text-fg",
        className,
      )}
    >
      <Icon
        name="image"
        size={20}
        className={cn("opacity-60", compact && "-mt-6")}
      />
      {!compact && (
        <>
          <span className="max-w-[220px] text-[13px] leading-snug font-medium opacity-80">
            {placeholder}
          </span>
          <span className="text-[11px] font-semibold tracking-wide uppercase opacity-75">
            Image coming soon
          </span>
        </>
      )}
    </div>
  );
}

const PHONE_SIZES: Record<number, [number, number]> = {
  160: [28, 7],
  200: [34, 8],
  210: [36, 8],
  230: [38, 9],
  240: [40, 10],
  260: [44, 10],
  280: [46, 10],
  300: [48, 11],
  320: [52, 12],
  360: [56, 12],
};

/** A phone bezel at 9:19.5. `size` picks the radius and padding pair. */
export function PhoneFrame({
  size = 200,
  width,
  dark,
  className,
  style,
  children,
}: {
  size?: keyof typeof PHONE_SIZES;
  width?: string;
  dark?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const [radius, pad] = PHONE_SIZES[size] ?? PHONE_SIZES[200];
  return (
    <div
      className={cn("shrink-0", className)}
      style={{ width: width ?? size, ...style }}
    >
      <div
        className={cn("aspect-[9/19.5]", dark ? "bg-band-pill" : "bg-frame")}
        style={{ borderRadius: radius, padding: pad }}
      >
        <div
          className={cn(
            "phone-screen relative size-full overflow-hidden",
            dark ? "bg-[#f4f1ea]" : "bg-bg",
          )}
          style={{ borderRadius: radius - pad }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/** A laptop lid at 16:10, with an optional base bar. */
export function LaptopFrame({
  large,
  base,
  className,
  children,
}: {
  large?: boolean;
  base?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "bg-frame",
          large
            ? "rounded-t-[20px] px-3 pt-3 pb-3.5"
            : "rounded-t-2xl px-[9px] pt-[9px] pb-[11px]",
        )}
      >
        <div
          className={cn(
            "relative aspect-[16/10] overflow-hidden bg-bg",
            large ? "rounded-[6px]" : "rounded-[5px]",
          )}
        >
          {children}
        </div>
      </div>
      {base && <div className="mx-[-6%] h-4 rounded-b-2xl bg-frame-base" />}
    </div>
  );
}

/** A landscape tablet with even bezels, for web screenshots. */
export function TabletFrame({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("w-full", className)}>
      <div className="rounded-[clamp(18px,2vw,24px)] bg-frame p-[clamp(8px,0.9vw,11px)]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[clamp(10px,1.1vw,13px)] bg-bg">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * The media area of a project tile: a device frame that bleeds off the
 * bottom, a frameless mockup, or a full-bleed image.
 */
export function TileMedia({
  project,
  height = "clamp(200px,20vw,260px)",
  phoneSize = 200,
  compact,
  devices,
  sizes,
}: {
  project: Project;
  height?: string;
  phoneSize?: keyof typeof PHONE_SIZES;
  compact?: boolean;
  /** Only tablets and phones: web work in a tablet, apps in a phone. */
  devices?: boolean;
  sizes?: string;
}) {
  const ph = `${project.title} screenshot`;
  const cover = project.cover;
  const padX = compact
    ? "px-[clamp(20px,2.4vw,32px)]"
    : "px-[clamp(24px,4vw,48px)]";
  // Laptops and tablets run off the tile's bottom edge, like the phones.
  const bleed = "-mb-[clamp(28px,3.4vw,44px)]";

  if (devices) {
    const phone = project.frame === "phone" || !!project.screen;
    return (
      <div
        className={cn(
          "flex items-start justify-center overflow-hidden",
          phone ? padX : "px-[clamp(20px,2.4vw,32px)]",
        )}
        style={phone ? { height } : undefined}
      >
        {phone ? (
          <PhoneFrame size={phoneSize}>
            <ImageSlot
              media={project.screen ?? cover}
              placeholder={ph}
              sizes="(max-width: 768px) 60vw, 240px"
            />
          </PhoneFrame>
        ) : (
          <TabletFrame className={bleed}>
            <ImageSlot
              media={cover}
              placeholder={ph}
              sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
            />
          </TabletFrame>
        )}
      </div>
    );
  }

  if (project.frame === "none" || cover?.bare) {
    return (
      <div
        className={cn("relative overflow-hidden", cover?.bare ? padX : "")}
        style={{ height }}
      >
        <div
          className={cn(
            "relative size-full overflow-hidden",
            !cover?.bare && "rounded-t-[20px] bg-bg",
          )}
        >
          <ImageSlot
            media={cover}
            placeholder={ph}
            sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
            fit={cover?.bare ? "contain" : undefined}
            position={cover?.bare ? "center top" : undefined}
          />
        </div>
      </div>
    );
  }

  const phone = project.frame === "phone";
  return (
    <div
      className={cn("flex items-start justify-center overflow-hidden", padX)}
      style={phone ? { height } : undefined}
    >
      {phone ? (
        <PhoneFrame size={phoneSize}>
          <ImageSlot media={cover} placeholder={ph} sizes="240px" />
        </PhoneFrame>
      ) : (
        <LaptopFrame className={bleed}>
          <ImageSlot
            media={cover}
            placeholder={ph}
            sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
          />
        </LaptopFrame>
      )}
    </div>
  );
}
