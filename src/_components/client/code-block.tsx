"use client";

import { Highlight, themes } from "prism-react-renderer";

/** A code sample in a post, highlighted to suit both themes. */
export function CodeBlock({
  code,
  language,
}: {
  code: string;
  language?: string;
}) {
  return (
    <Highlight
      code={code.replace(/\n$/, "")}
      language={language || "tsx"}
      theme={themes.vsDark}
    >
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre className="my-2 overflow-x-auto rounded-[16px] bg-[#1e1e1e] p-[clamp(16px,2vw,24px)] text-[14px] leading-[1.6]">
          <code>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, k) => (
                  <span key={k} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  );
}
