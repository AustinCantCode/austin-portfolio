import { PageHeader } from "@components/ui";
import { byYear, pickProjects } from "@data/projects";
import { smallApps } from "@data/small-apps";
import { graphics } from "@data/graphics";
import { ventures } from "@data/ventures";
import { JsonLd, graph, webPageLd, breadcrumbLd } from "@lib/structured-data";
import { pageMetadata } from "@lib/metadata";
import { pageCopy } from "@data/pages";
import { WorkView, type WorkSection } from "./work-view";
import { ventureLook } from "./venture-looks";

export const metadata = pageMetadata({
  title: pageCopy.work.title,
  description: pageCopy.work.description,
  path: "/work",
});

const tiles = (slugs: string[]) => byYear(pickProjects(slugs));

const sections: WorkSection[] = [
  {
    id: "dev",
    label: "Development",
    icon: "code-xml",
    blurb: "Websites, platforms and apps, built for clients and for myself.",
    groups: [
      {
        kind: "tiles",
        anchor: "client-work",
        label: "Client work",
        href: "/work/client-work",
        linkLabel: "See all ›",
        flex: "1 1 100%",
        projects: tiles([
          "calibrium",
          "ite",
          "ksp",
          "grx",
          "ac",
          "ial",
          "inlab",
          "jint",
        ]),
      },
      {
        kind: "tiles",
        anchor: "web-mobile",
        label: "Web & mobile apps",
        href: "/work/web-apps",
        linkLabel: "See all ›",
        flex: "1 1 100%",
        projects: tiles(["port", "gowhere", "telegpt", "shoply"]),
      },
      {
        kind: "small",
        anchor: "small-apps",
        label: "Small apps",
        href: "/work/small-apps",
        linkLabel: "See all ›",
        flex: "1 1 100%",
        apps: smallApps,
      },
    ],
  },
  {
    id: "design",
    label: "Design",
    icon: "pen-tool",
    blurb: "Interfaces, physical products and artwork.",
    groups: [
      {
        kind: "tiles",
        anchor: "ui-ux",
        label: "UI/UX",
        href: "/work/ui-ux",
        linkLabel: "See all ›",
        flex: "1 1 100%",
        projects: tiles(["fresko", "quizzy", "hg", "sp"]),
      },
      {
        kind: "tiles",
        anchor: "product-design",
        label: "Product design",
        href: "/work/product-design",
        linkLabel: "View ›",
        flex: "1 1 340px",
        projects: tiles(["lawks"]),
      },
      {
        kind: "art",
        anchor: "graphic-design",
        label: "Graphic design",
        href: "/work/graphic-design",
        linkLabel: "Open gallery ›",
        flex: "2 1 640px",
        art: graphics,
      },
    ],
  },
  {
    id: "ventures",
    label: "Entrepreneurship",
    icon: "rocket",
    blurb: "Things I started, from a hackathon team to a live product.",
    groups: [
      {
        kind: "ventures",
        anchor: "ventures",
        label: "Ventures",
        href: "/work/ventures",
        linkLabel: "See all ›",
        flex: "1 1 100%",
        ventures: ventures.map((v) => ({ ...v, look: ventureLook(v.id) })),
      },
    ],
  },
];

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageLd({
            type: "CollectionPage",
            path: "/work",
            name: "Work",
            description:
              "Web development, mobile app, UI/UX and design projects by Austin Sia.",
          }),
          breadcrumbLd([{ name: "Work", path: "/work" }]),
        )}
      />
      <PageHeader
        title={pageCopy.work.heading}
        sub="What I've built, designed and started."
        className="pt-[clamp(48px,min(8vw,11vh),112px)]"
      />
      <WorkView sections={sections} />
    </>
  );
}
