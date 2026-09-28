import { allCertificates, certificateGroups } from "@data/certificates";
import { JsonLd, graph, breadcrumbLd } from "@lib/structured-data";
import { pageMetadata } from "@lib/metadata";
import { pageCopy } from "@data/pages";
import { PageHeader } from "@components/ui";
import { CertificatesView } from "./certificates-view";

export const metadata = pageMetadata({
  title: pageCopy.certificates.title,
  description: pageCopy.certificates.description,
  path: "/about/certificates",
});

export default function CertificatesPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbLd([
            { name: "About", path: "/about" },
            { name: "Certificates", path: "/about/certificates" },
          ]),
        )}
      />
      <PageHeader
        back={{ label: "About", href: "/about" }}
        title={`${allCertificates.length} certificates.`}
        sub="From AWS, GitHub, LinkedIn Learning and more."
      />
      <CertificatesView groups={certificateGroups} />
    </>
  );
}
