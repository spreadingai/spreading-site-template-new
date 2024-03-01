/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { isValidElement } from "react";

import useIsBrowser from "@/components/docuoOpenapi/core/lib/client/exports/useIsBrowser";
import { CodeBlock } from "@spreading/docuo-mdx-component";
// import ElementContent from "@/components/docuoOpenapi/theme/ApiExplorer/ApiCodeBlock/Content/Element";
// import StringContent from "@/components/docuoOpenapi/theme/ApiExplorer/ApiCodeBlock/Content/String";
/**
 * Best attempt to make the children a plain string so it is copyable. If there
 * are react elements, we will not be able to copy the content, and it will
 * return `children` as-is; otherwise, it concatenates the string children
 * together.
 */
function maybeStringifyChildren(children) {
  if (React.Children.toArray(children).some((el) => isValidElement(el))) {
    return children;
  }
  // The children is now guaranteed to be one/more plain strings
  return Array.isArray(children) ? children.join("") : children;
}

const CodeBlockCopy = ({ children }) => {
  return <div>{children}</div>;
};

export default function ApiCodeBlock({ children: rawChildren, ...props }) {
  // The Prism theme on SSR is always the default theme but the site theme can
  // be in a different mode. React hydration doesn't update DOM styles that come
  // from SSR. Hence force a re-render after mounting to apply the current
  // relevant styles.
  const isBrowser = useIsBrowser();
  console.log("#############rawChildren", rawChildren);
  const children = maybeStringifyChildren(rawChildren);
  // const CodeBlockComp =
  //   typeof children === "string" ? StringContent : ElementContent;
  const CodeBlockComp = CodeBlock;
  return (
    <CodeBlockComp key={String(isBrowser)} {...props}>
      {children}
    </CodeBlockComp>
    // <div>{children}</div>
    // <CodeBlockCopy>{children}</CodeBlockCopy>
  );
}
