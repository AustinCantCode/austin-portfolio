import Link from "next/link";
import { cv } from "@data/about";
import { site } from "@data/site";
import { skillGroups } from "@data/skills";
import { pickProjects } from "@data/projects";
import { allCertificates } from "@data/certificates";
import { JsonLd, graph, breadcrumbLd } from "@lib/structured-data";
import { pageMetadata } from "@lib/metadata";
import { ButtonLink, SmartLink } from "@components/ui";

export const metadata = pageMetadata({
  title: "CV: Full-Stack Developer and UI/UX Designer",
  description:
    "Austin Sia's CV: experience at Amber Creative and as a freelancer, a Diploma in IT from Singapore Polytechnic, selected projects and skills, plus a PDF.",
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
      <section className="gutter pt-[clamp(32px,min(5vw,8vh),72px)] pb-[clamp(32px,4vw,56px)]">
        <div className="wrap flex flex-col gap-4">
          <p className="text-[15px] font-semibold text-fg-2">
            Curriculum vitae
          </p>
          <h1 className="text-[clamp(40px,6vw,64px)] leading-[1.02] font-bold tracking-[-0.03em]">
            Austin Sia
          </h1>
          <p className="text-[clamp(19px,2.2vw,22px)] text-fg-2">{cv.role}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
            <a href={c.mailto}>{c.email}</a>
            <a href={c.tel}>{c.phone}</a>
            <SmartLink href={c.linkedin}>{c.linkedinLabel}</SmartLink>
            <SmartLink href={c.github}>{c.githubLabel}</SmartLink>
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            <ButtonLink
              href={c.cvPdf}
              download
              icon="arrow-down-to-line"
              data-track="cv_download"
            >
              Download PDF
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Get in touch
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="gutter pb-[clamp(56px,min(7vw,11vh),96px)]">
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
          <Row label="Selected projects">
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {pickProjects(cv.projects).map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="flex flex-wrap justify-between gap-x-4 gap-y-0.5 text-fg hover:text-accent-text hover:no-underline"
                  >
                    <span className="text-[17px] font-semibold">
                      {p.title}{" "}
                      <span className="font-normal text-fg-2">
                        · {p.subtext}
                      </span>
                    </span>
                    <span className="text-[14px] text-fg-2">{p.year}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Row>
          <Row label="Skills">
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
          <Row label="Highlights">
            <ul className="m-0 flex flex-col gap-1.5 pl-[18px] text-[15px] text-fg-2">
              <li>
                Launched StillGood on the Google Play Store, 26 August 2026
              </li>
              <li>SP Batey Hackathon 2024 grand finalist</li>
              <li>
                <Link href="/about/certificates" className="underline">
                  {allCertificates.length} certificates
                </Link>{" "}
                from AWS, GitHub, LinkedIn Learning and more
              </li>
            </ul>
          </Row>
        </div>
      </section>
    </>
  );
}
