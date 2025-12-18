// COMPONENTS
import Certificate from "./certificate";
import Title from "@components/ui/title";
import type { StaticImageData } from "next/image";

// LOGO
import Logo from "../../../../public/AS-Circle-Logo.png";

// TYPES
type Certificates = {
  title?: string;
  header?: string;
  src?: string | StaticImageData;
  description?: string;
  sender?: string;
};

interface CertificateSectionProps {
  header: string;
  data: Certificates[];
}

export default function CertificateSection(props: CertificateSectionProps) {
  return (
    <div>
      <Title header={props.header} />
      <div
        className={
          props.data.length >= 2
            ? "mx-auto max-w-5xl px-4"
            : "mx-auto max-w-xl px-4"
        }
      >
        <div
          className={
            props.data.length >= 2
              ? "grid grid-cols-1 md:grid-cols-2 gap-8"
              : "mx-auto max-w-xl px-4"
          }
        >
          {props.data.map((certificate, index) => (
            <Certificate
              title={certificate.title || "Untitled Certificate"}
              sender={certificate.sender || "Unknown Sender"}
              src={(certificate.src || Logo) as string}
              description={certificate.description || ""}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
