import { PageHeader } from "@components/ui";
import { VenturesNav } from "@components/local-nav";
import { VentureFeature } from "@components/client/showroom";
import { JsonLd, graph, webPageLd, breadcrumbLd } from "@lib/structured-data";
import { pageMetadata } from "@lib/metadata";
import { pageCopy } from "@data/pages";
import { AREA_PATH, areaLine } from "@data/categories";
import { ventures } from "@data/ventures";
import { ventureLook } from "../_work/venture-looks";

const copy = pageCopy.ventures;

export const metadata = pageMetadata({
  title: copy.title,
  description: copy.description,
  path: AREA_PATH.ventures,
});

export default function VenturesPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageLd({
            type: "CollectionPage",
            path: AREA_PATH.ventures,
            name: "Ventures by Austin Sia",
            description: copy.description,
          }),
          breadcrumbLd([{ name: "Ventures", path: AREA_PATH.ventures }]),
        )}
      />
      <VenturesNav current={AREA_PATH.ventures} />
      <PageHeader title={copy.heading} sub={areaLine.ventures} />
      <section className="gutter pt-[clamp(8px,1vw,16px)] pb-[clamp(72px,min(9vw,13vh),136px)]">
        <div className="wrap flex flex-col gap-[clamp(72px,8vw,120px)]">
          {ventures.map((v) => (
            <VentureFeature
              key={v.id}
              venture={v}
              look={ventureLook(v)}
              heading="h2"
            />
          ))}
        </div>
      </section>
    </>
  );
}
