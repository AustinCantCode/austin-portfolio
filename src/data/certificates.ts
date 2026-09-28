/** Certificates, edited in the CMS (About → Certificates). */
import raw from "./generated/certificates.json";
import type { Img } from "./cms";
import type { CertificateGroup } from "./types";

type RawGroup = {
  slug: string;
  issuerGroup: string;
  items: {
    title: string;
    issuer: string;
    description: string;
    image: Img;
    featured?: boolean;
  }[];
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

/** Awards ticked "Show on the homepage", for the Recognition strip. */
export const featuredCertificates = (raw as unknown as RawGroup[]).flatMap(
  (g) =>
    g.items
      .filter((c) => c.featured && c.image)
      .map((c) => ({
        title: c.title,
        issuer: c.issuer,
        description: c.description,
        image: c.image!,
      })),
);
