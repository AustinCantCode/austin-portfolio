import Link from "next/link";
import { cv } from "@data/about";
import { site } from "@data/site";
import { skillGroups } from "@data/skills";
import { pickProjects } from "@data/projects";
import { allCertificates } from "@data/certificates";
import { JsonLd, graph, breadcrumbLd } from "@lib/structured-data";
import { pageMetadata } from "@lib/metadata";
import { pageCopy } from "@data/pages";
import { ButtonLink, SmartLink } from "@components/ui";
import { Icon } from "@components/icon";
import Coin from "@components/complex-ui/coin";
import { AboutNav, AboutPager } from "@components/local-nav";

export const metadata = pageMetadata({
  title: pageCopy.cv.title,
  description: pageCopy.cv.description,
  path: "/cv",
});

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap gap-x-[clamp(24px,5vw,56px)] gap-y-3 border-t border-pill py-8">
      <h2 className="flex-[0_0_clamp(160px,22vw,360px)] text-[17px] font-bold">
        {label}
      </h2>
      <div className="min-w-0 flex-[1_1_400px]">{children}</div>
    </div>
  );
}

export default function CVPage() {
  const c = site.contact;
  return (
    <>
      <JsonLd data={graph(breadcrumbLd([{ name: "CV", path: "/cv" }]))} />
      <AboutNav current="/cv" />
      <section className="gutter pt-[clamp(44px,min(7vw,10vh),100px)] pb-[clamp(32px,4vw,56px)]">
        <div className="wrap flex flex-col-reverse items-start gap-[clamp(28px,4vw,56px)] md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4">
            <p className="text-[15px] font-semibold text-fg-2">
              Curriculum Vitae
            </p>
            <h1 className="text-[clamp(40px,6vw,64px)] leading-[1.02] font-bold tracking-[-0.03em]">
              Austin Sia
            </h1>
            <p className="text-[clamp(19px,2.2vw,22px)] text-fg-2">{cv.role}</p>
            <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
              {[
                { label: `Email ${c.email}`, href: c.mailto, icon: "mail" },
                { label: `Call ${c.phone}`, href: c.tel, icon: "phone" },
                { label: "WhatsApp", href: c.whatsapp, icon: "mdi:whatsapp" },
                { label: "LinkedIn", href: c.linkedin, icon: "mdi:linkedin" },
                { label: "GitHub", href: c.github, icon: "mdi:github" },
              ].map((l) => (
                <li key={l.icon}>
                  <SmartLink
                    href={l.href}
                    aria-label={l.label}
                    title={l.label}
                    className="grid size-11 place-items-center rounded-full bg-bg-alt text-fg transition-colors duration-200 hover:bg-pill hover:text-accent-text hover:no-underline"
                  >
                    <Icon name={l.icon} size={19} />
                  </SmartLink>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-wrap gap-3">
              <ButtonLink
                href={c.cvPdf}
                download
                icon="arrow-down-to-line"
                data-track="cv_download"
              >
                Download PDF
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Contact me
              </ButtonLink>
            </div>
          </div>
          <Coin className="w-[clamp(160px,22vw,280px)] flex-none" delay={600} />
        </div>
      </section>

      <section className="gutter pb-[clamp(72px,min(9vw,13vh),136px)]">
        <div className="wrap flex flex-col">
          <Row label="Profile">
            <p className="text-[17px] text-fg-2">{cv.profile}</p>
          </Row>
          <Row label="Experience">
            <ol className="m-0 flex list-none flex-col gap-6 p-0">
              {cv.experience.map((x) => (
                <li key={x.org} className="flex flex-col gap-1">
                  <div className="flex flex-wrap justify-between gap-x-4 gap-y-1">
                    <p className="text-[17px] font-semibold">{x.org}</p>
                    <p className="text-[14px] text-fg-2">{x.date}</p>
                  </div>
                  <p className="text-[15px] font-medium">{x.role}</p>
                  <p className="text-[15px] text-fg-2">{x.text}</p>
                </li>
              ))}
            </ol>
          </Row>
          <Row label="Education">
            <ol className="m-0 flex list-none flex-col gap-4 p-0">
              {cv.education.map((x) => (
                <li key={x.org} className="flex flex-col gap-0.5">
                  <div className="flex flex-wrap justify-between gap-x-4 gap-y-1">
                    <p className="text-[17px] font-semibold">{x.org}</p>
                    <p className="text-[14px] text-fg-2">{x.date}</p>
                  </div>
                  <p className="text-[15px] text-fg-2">{x.text}</p>
                </li>
              ))}
            </ol>
          </Row>
          <Row label="Technical Skills">
            <dl className="m-0 flex flex-col gap-2.5">
              {skillGroups.map((g) => (
                <div key={g.name} className="flex flex-wrap gap-x-4 gap-y-0.5">
                  <dt className="flex-[0_0_90px] text-[15px] font-semibold">
                    {g.name}
                  </dt>
                  <dd className="m-0 flex-[1_1_260px] text-[15px] text-fg-2">
                    {g.items.join(", ")}
                  </dd>
                </div>
              ))}
            </dl>
          </Row>
          <Row label="Soft Skills">
            <p className="text-[15px] text-fg-2">{cv.softSkills.join(", ")}</p>
          </Row>
          <Row label="Languages">
            <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-[15px]">
              {cv.languages.map((l) => (
                <li key={l.name}>
                  <span className="font-semibold">{l.name}</span>
                  <span className="text-fg-2">, {l.level}</span>
                </li>
              ))}
            </ul>
          </Row>
          <Row label="Side Projects">
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {pickProjects(cv.projects).map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="flex flex-wrap justify-between gap-x-4 gap-y-0.5 text-fg hover:text-accent-text hover:no-underline"
                  >
                    <span className="flex flex-col">
                      <span className="text-[17px] font-semibold">
                        {p.title}
                      </span>
                      <span className="text-[15px] text-fg-2">{p.subtext}</span>
                    </span>
                    <span className="text-[14px] text-fg-2">{p.year}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Row>
          <Row label="Achievements">
            <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-[15px] text-fg-2">
              {cv.achievements.map((a) => (
                <li key={a}>{a}</li>
              ))}
              <li>
                <Link href="/about/certificates" className="underline">
                  See all {allCertificates.length} of my certificates
                </Link>
              </li>
            </ul>
          </Row>
        </div>
      </section>
      <AboutPager current="/cv" />
    </>
  );
}
