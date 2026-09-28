import Link from "next/link";
import { categories, categoryHref, navSections } from "@data/categories";
import { site } from "@data/site";
import { SmartLink } from "./ui";

const linkClass = "text-fg-2 hover:text-fg hover:no-underline";

const pick = (id: string) =>
  navSections
    .find((s) => s.id === id)!
    .categories.map((slug) => categories.find((c) => c.slug === slug)!);

function Column({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[12px] font-semibold text-fg">{title}</p>
      {children}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-bg-alt text-[12px] leading-[1.5] text-fg-2">
      <div className="wrap gutter flex flex-col gap-7 pt-[clamp(32px,4vw,48px)] pb-7">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(max(130px,calc((100%_-_96px)/5)),1fr))] gap-6">
          <Column title="Development">
            <Link href="/work" className={linkClass}>
              All work
            </Link>
            {pick("dev").map((c) => (
              <Link
                key={c.slug}
                href={categoryHref(c.slug)}
                className={linkClass}
              >
                {c.label}
              </Link>
            ))}
          </Column>
          <Column title="Design">
            {pick("design").map((c) => (
              <Link
                key={c.slug}
                href={categoryHref(c.slug)}
                className={linkClass}
              >
                {c.label}
              </Link>
            ))}
          </Column>
          <Column title="Entrepreneurship">
            <Link href="/work/ventures" className={linkClass}>
              Ventures
            </Link>
            <Link href="/stillgood" className={linkClass}>
              StillGood
            </Link>
            <Link href="/projects/stillgood" className={linkClass}>
              StillGood case study
            </Link>
            <SmartLink
              href={site.googlePlayUrl}
              className={linkClass}
              data-track="play_store_click"
            >
              Google Play
            </SmartLink>
          </Column>
          <Column title="About">
            <Link href="/about" className={linkClass}>
              About me
            </Link>
            <Link href="/about/skills" className={linkClass}>
              Skills
            </Link>
            <Link href="/about/certificates" className={linkClass}>
              Certificates
            </Link>
            <Link href="/about/events" className={linkClass}>
              Events
            </Link>
            <Link href="/cv" className={linkClass}>
              CV
            </Link>
          </Column>
          <Column title="Connect">
            <Link href="/contact" className={linkClass}>
              Contact
            </Link>
            <a
              href={site.contact.mailto}
              className={linkClass}
              data-track="contact_click"
              data-track-channel="email"
            >
              Email
            </a>
            <SmartLink
              href={site.contact.linkedin}
              className={linkClass}
              data-track="contact_click"
              data-track-channel="linkedin"
            >
              LinkedIn
            </SmartLink>
            <SmartLink
              href={site.contact.github}
              className={linkClass}
              data-track="contact_click"
              data-track-channel="github"
            >
              GitHub
            </SmartLink>
            <SmartLink
              href={site.contact.whatsapp}
              className={linkClass}
              data-track="contact_click"
              data-track-channel="whatsapp"
            >
              WhatsApp
            </SmartLink>
          </Column>
        </div>
        <div className="h-px bg-pill" />
        <p>© 2026 Austin Sia. Built in Singapore.</p>
      </div>
    </footer>
  );
}
