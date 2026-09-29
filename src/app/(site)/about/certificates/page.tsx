import { allCertificates, certificateGroups } from "@data/certificates";
import { JsonLd, graph, breadcrumbLd } from "@lib/structured-data";
import { pageMetadata } from "@lib/metadata";
import { pageCopy } from "@data/pages";
import { PageHeader } from "@components/ui";
import { CertificatesView } from "./certificates-view";
import { AboutNav } from "@components/local-nav";

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
      <AboutNav current="/about/certificates" />
      <PageHeader
        title={`${allCertificates.length} Certificates`}
        sub="The certificates I have attained from organizations such as AWS, GitHub and LinkedIn Learning."
      />
      <CertificatesView groups={certificateGroups} />
    </>
  );
}
