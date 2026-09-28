import { allCertificates, certificateGroups } from "@data/certificates";
import { pageMetadata } from "@lib/metadata";
import { PageHeader } from "@components/ui";
import { CertificatesView } from "./certificates-view";

export const metadata = pageMetadata({
  title: "Certificates",
  description: `${allCertificates.length} certificates from AWS, GitHub, LinkedIn Learning and more, earned by Austin Sia.`,
  path: "/about/certificates",
});

export default function CertificatesPage() {
  return (
    <>
      <PageHeader
        back={{ label: "About", href: "/about" }}
        title={`${allCertificates.length} certificates.`}
        sub="From AWS, GitHub, LinkedIn Learning and more."
      />
      <CertificatesView groups={certificateGroups} />
    </>
  );
}
