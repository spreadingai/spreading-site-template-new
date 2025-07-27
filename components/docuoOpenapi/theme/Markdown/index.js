/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import { Code } from "@spreading/docuo-mdx-component";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

function Markdown({ children }) {
  return (
    <div>
      <ReactMarkdown
        // eslint-disable-next-line react/no-children-prop
        children={children}
        rehypePlugins={[rehypeRaw]}
        components={{
          pre: "div",
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            if (inline) return <code>{children}</code>;
            const lang = match ? match[1] : "text";
            const codeString = Array.isArray(children) ? children.join("") : children;
            return !inline ? (
              <Code code={codeString} lang={lang} className={className} />
            ) : (
              <Code code={codeString} lang="text" />
            );
          },
        }}
      />
    </div>
  );
}

export default Markdown;
