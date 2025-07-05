// COMPONENTS
import CertificateSection from "./_components/certificate-section";
import Header from "./_components/header";

// DATA
import certificates from "@data/certificates";

export default function Achievement() {
  const numOfCert = Object.values(certificates).reduce(
    (acc, value) => acc + value.data.length,
    0,
  );
  return (
    <main className="space-y-20 fade-in">
      <Header certificateCount={numOfCert} />
      {Object.entries(certificates).map(([key, value]) => (
        <CertificateSection key={key} header={value.header} data={value.data} />
      ))}
    </main>
  );
}
