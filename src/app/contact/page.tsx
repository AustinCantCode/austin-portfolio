import { site } from "@data/site";
import { JsonLd, graph, webPageLd, breadcrumbLd } from "@lib/structured-data";
import { pageMetadata } from "@lib/metadata";
import { Icon } from "@components/icon";
import { SmartLink } from "@components/ui";
import { ContactForm } from "./contact-form";

export const metadata = pageMetadata({
  title: "Contact Austin Sia: Developer Roles and Freelance",
  description:
    "Get in touch with Austin Sia about developer roles and freelance web or app projects in Singapore or remote. Email, phone, WhatsApp, LinkedIn or GitHub.",
  path: "/contact",
  absoluteTitle: true,
});

const c = site.contact;
const methods = [
  {
    title: "Email",
    content: c.email,
    icon: "mail",
    href: c.mailto,
    channel: "email",
  },
  {
    title: "Phone",
    content: c.phone,
    icon: "phone",
    href: c.tel,
    channel: "phone",
  },
  {
    title: "WhatsApp",
    content: c.phone,
    icon: "mdi:whatsapp",
    href: c.whatsapp,
    channel: "whatsapp",
  },
  {
    title: "LinkedIn",
    content: c.linkedinLabel,
    icon: "mdi:linkedin",
    href: c.linkedin,
    channel: "linkedin",
  },
  {
    title: "GitHub",
    content: c.githubLabel,
    icon: "mdi:github",
    href: c.github,
    channel: "github",
  },
  {
    title: "CV",
    content: "Download my CV",
    icon: "file-text",
    href: c.cvPdf,
    channel: "cv",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageLd({
            type: "ContactPage",
            path: "/contact",
            name: "Contact Austin Sia",
            description:
              "Ways to contact Austin Sia about developer roles and freelance projects.",
          }),
          breadcrumbLd([{ name: "Contact", path: "/contact" }]),
        )}
      />
      <section className="gutter pt-[clamp(36px,min(6vw,9vh),84px)] pb-[clamp(40px,5vw,64px)]">
        <div className="wrap flex flex-col gap-4">
          <h1 className="t-h1">Let&apos;s build something.</h1>
          <p className="max-w-[600px] text-[clamp(19px,1.8vw,22px)] text-fg-2">
            Open to developer roles and freelance projects. I usually reply
            within a day.
          </p>
        </div>
      </section>

      <section
        aria-label="Ways to reach me"
        className="gutter pb-[clamp(56px,8vw,96px)]"
      >
        <div className="wrap grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-4">
          {methods.map((m) => (
            <SmartLink
              key={m.title}
              href={m.href}
              target={m.channel === "cv" ? "_blank" : undefined}
              data-track={m.channel === "cv" ? "cv_download" : "contact_click"}
              data-track-channel={m.channel}
              className="lift flex items-center gap-4 rounded-[24px] bg-bg-alt px-6 py-[22px] text-fg [--hover-scale:1.02] hover:no-underline"
            >
              <span className="grid size-12 flex-none place-items-center rounded-full bg-tile text-fg">
                <Icon name={m.icon} size={22} />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-[13px] text-fg-2">{m.title}</span>
                <span className="text-[17px] font-semibold [overflow-wrap:anywhere]">
                  {m.content}
                </span>
              </span>
              <Icon
                name="arrow-up-right"
                size={18}
                className="ml-auto flex-none text-fg-2"
              />
            </SmartLink>
          ))}
        </div>
      </section>

      <section aria-labelledby="message" className="gutter band-y-2 bg-bg-alt">
        <div className="wrap flex flex-wrap gap-[clamp(32px,6vw,80px)]">
          <div className="flex flex-[1_1_300px] flex-col gap-3">
            <h2
              id="message"
              className="text-[clamp(28px,3.4vw,40px)] leading-[1.05] font-bold tracking-[-0.025em]"
            >
              Or send a message.
            </h2>
            <p className="max-w-[360px] text-[17px] text-fg-2">
              It opens in your email app, ready to send.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
