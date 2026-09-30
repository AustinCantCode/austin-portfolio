import { PageHeader } from "@components/ui";
import { AreaNav } from "@components/local-nav";
import { JsonLd, graph, webPageLd, breadcrumbLd } from "@lib/structured-data";
import { pageMetadata } from "@lib/metadata";
import { pageCopy } from "@data/pages";
import { AREA_PATH, areaLine } from "@data/categories";
import { AreaView } from "../_work/area-view";
import { areaGroups } from "../_work/areas";

const copy = pageCopy.design;

export const metadata = pageMetadata({
  title: copy.title,
  description: copy.description,
  path: AREA_PATH.design,
});

export default function DesignPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageLd({
            type: "CollectionPage",
            path: AREA_PATH.design,
            name: "Design by Austin Sia",
            description: copy.description,
          }),
          breadcrumbLd([{ name: "Design", path: AREA_PATH.design }]),
        )}
      />
      <AreaNav area="design" current={AREA_PATH.design} />
      <PageHeader title={copy.heading} sub={areaLine.design} />
      <AreaView groups={areaGroups.design} />
    </>
  );
}
