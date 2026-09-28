/** Certificates, edited in the CMS (About → Certificates). */
import raw from "./generated/certificates.json";
import type { Img } from "./cms";
import type { CertificateGroup } from "./types";

type RawGroup = {
  slug: string;
  issuerGroup: string;
  items: { title: string; issuer: string; description: string; image: Img }[];
};

export const certificateGroups: CertificateGroup[] = (
  raw as unknown as RawGroup[]
).map((g) => ({
  id: g.slug,
  issuerGroup: g.issuerGroup,
  items: g.items.map((c) => ({
    title: c.title,
    issuer: c.issuer,
    description: c.description,
    image: c.image ?? undefined,
  })),
}));

export const allCertificates = certificateGroups.flatMap((g) => g.items);
