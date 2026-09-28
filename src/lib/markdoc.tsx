/**
 * Renders Markdoc (CMS rich text) with the site's own components:
 * linkable headings, images at their own shape, highlighted code.
 */
import Markdoc, { Tag, type Config, type Node } from "@markdoc/markdoc";
import React from "react";
import Link from "next/link";
import images from "@data/generated/body-images.json";
import { AnchorHeading } from "@components/anchor-heading";
import { NaturalImage } from "@components/media";
import { CodeBlock } from "@components/client/code-block";
import type { StaticImageData } from "next/image";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const textOf = (node: Node): string =>
  [...node.walk()]
    .filter((n) => n.type === "text")
    .map((n) => String(n.attributes.content ?? ""))
    .join("");

const config: Config = {
  nodes: {
    // The page provides the <article>; the document itself adds no wrapper.
    document: { ...Markdoc.nodes.document, render: "Body" },
    heading: {
      ...Markdoc.nodes.heading,
      render: "Heading",
      transform(node, cfg) {
        return new Tag(
          "Heading",
          { level: node.attributes.level, id: slugify(textOf(node)) },
          node.transformChildren(cfg),
        );
      },
    },
    image: { ...Markdoc.nodes.image, render: "Img" },
    fence: {
      ...Markdoc.nodes.fence,
      render: "Code",
      transform(node) {
        return new Tag("Code", {
          code: node.attributes.content,
          language: node.attributes.language,
        });
      },
    },
    link: { ...Markdoc.nodes.link, render: "A" },
  },
};

function Body({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function Heading({
  level,
  id,
  children,
}: {
  level: number;
  id: string;
  children: React.ReactNode;
}) {
  const text = React.Children.toArray(children).join("");
  if (level <= 2)
    return (
      <AnchorHeading id={id} className="mt-[clamp(24px,3vw,40px)]">
        {text}
      </AnchorHeading>
    );
  return (
    <h3
      id={id}
      className="mt-4 scroll-mt-[96px] text-[clamp(21px,2vw,24px)] leading-[1.25] font-semibold"
    >
      {children}
    </h3>
  );
}

function Img({ src, alt }: { src: string; alt?: string }) {
  const image = (images as Record<string, StaticImageData>)[src];
  if (!image) return null;
  return (
    <figure className="m-0 my-2 flex flex-col gap-3">
      <div className="overflow-hidden rounded-[20px] bg-bg-alt p-[clamp(12px,2vw,24px)]">
        <NaturalImage
          media={{ src: image, alt: alt ?? "" }}
          placeholder={alt ?? "Image"}
          sizes="(max-width: 800px) 100vw, 720px"
          className="mx-auto rounded-[10px]"
        />
      </div>
      {alt && <figcaption className="text-[14px] text-fg-2">{alt}</figcaption>}
    </figure>
  );
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return href.startsWith("/") ? (
    <Link href={href}>{children}</Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export function parseMarkdoc(source: string) {
  const ast = Markdoc.parse(source);
  const toc = [...ast.walk()]
    .filter((n) => n.type === "heading" && n.attributes.level === 2)
    .map((n) => ({ id: slugify(textOf(n)), title: textOf(n) }));
  const content = Markdoc.transform(ast, config);
  return {
    toc,
    node: Markdoc.renderers.react(content, React, {
      components: { Body, Heading, Img, Code: CodeBlock, A },
    }),
  };
}
