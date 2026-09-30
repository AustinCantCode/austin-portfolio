import { PageHeader } from "@components/ui";
import { AreaNav } from "@components/local-nav";
import { JsonLd, graph, webPageLd, breadcrumbLd } from "@lib/structured-data";
import { pageMetadata } from "@lib/metadata";
import { pageCopy } from "@data/pages";
import { AREA_PATH, areaLine } from "@data/categories";
import { AreaView } from "../_work/area-view";
import { areaGroups } from "../_work/areas";

const copy = pageCopy.development;

export const metadata = pageMetadata({
  title: copy.title,
  description: copy.description,
  path: AREA_PATH.dev,
});

export default function DevelopmentPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageLd({
            type: "CollectionPage",
            path: AREA_PATH.dev,
            name: "Development by Austin Sia",
            description: copy.description,
          }),
          breadcrumbLd([{ name: "Development", path: AREA_PATH.dev }]),
        )}
      />
      <AreaNav area="dev" current={AREA_PATH.dev} />
      <PageHeader title={copy.heading} sub={areaLine.dev} />
      <AreaView groups={areaGroups.dev} />
    </>
  );
}
