/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import sdk from "@paloaltonetworks/postman-collection";
import CodeSnippets from "@/components/docuoOpenapi/theme/ApiExplorer/CodeSnippets";
import Request from "@/components/docuoOpenapi/theme/ApiExplorer/Request";
import Response from "@/components/docuoOpenapi/theme/ApiExplorer/Response";
import { ApiItem } from "@/components/docuoOpenapi/docuo-plugin-openapi-docs/src/types";
import TokenGenerate from "@/components/docuoOpenapi/theme/ApiExplorer/TokenGenerate";
import SecuritySchemes from "@/components/docuoOpenapi/theme/ApiExplorer/SecuritySchemes";

function ApiExplorer({
  item,
  infoPath,
}: {
  item: NonNullable<ApiItem>;
  infoPath: string;
}) {
  const postman = new sdk.Request(item.postman);

  return (
    <>
      <SecuritySchemes infoPath={infoPath} />
      {item.method !== "event" && (
        <CodeSnippets
          postman={postman}
          codeSamples={(item as any)["x-codeSamples"] ?? []}
        />
      )}
      <TokenGenerate />
      <Request item={item} />
      <Response item={item} />
    </>
  );
}

export default ApiExplorer;
