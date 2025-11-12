// COMPONENTS
import LogoCarousel from "./logo-carousel";
import Title from "@components/ui/title";

// DATA
import achievementLogos from "@data/achievement-logos";

type CertificateCount = {
  certificateCount: number;
};

export default function Header(props: CertificateCount) {
  return (
    <div>
      <Title
        header={`${props.certificateCount} Certificates total from ${achievementLogos.length} different institutions and platforms`}
      />
      <LogoCarousel achievementLogos={achievementLogos} />
    </div>
  );
}
