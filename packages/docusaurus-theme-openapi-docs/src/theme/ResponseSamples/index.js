/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import { Code } from "@/components/mdx";

function ResponseSamples({ responseExample, language }) {
  return (
    <div className="openapi-code__response-samples-container">
      <Code code={responseExample} lang={language ? language : "json"} />
    </div>
  );
}

export default ResponseSamples;
