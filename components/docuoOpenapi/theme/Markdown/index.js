/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import { Code } from "@/components/mdx";
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
          a({ href, children, ...props }) {
            const raw = href || "";
            const isExternal = raw.startsWith("http") || raw.startsWith("mailto:") || raw.startsWith("tel:");
            if (isExternal || raw.startsWith("/article/")) return <a {...props} href={href}>{children}</a>;
            const clean = raw.split("#")[0].split("?")[0];
            const last = clean.substring(clean.lastIndexOf("/") + 1);
            const hasExt = /\.[^./]+$/.test(last);
            const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
            const needBase = raw.startsWith("/") && basePath && !raw.startsWith(`${basePath}/`) && !hasExt;
            const finalHref = needBase ? `${basePath}${raw}` : raw;
            return <a {...props} href={finalHref}>{children}</a>;
          },
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
