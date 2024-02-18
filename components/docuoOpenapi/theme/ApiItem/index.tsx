/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import zlib from "zlib";
import React from "react";
import clsx from "clsx";
import useIsBrowser from "../../core/client/exports/useIsBrowser";
import { ServerObject } from "docusaurus-plugin-openapi-docs/src/openapi/types";
import { ParameterObject } from "docusaurus-plugin-openapi-docs/src/openapi/types";
import type { ApiItem as ApiItemType } from "docusaurus-plugin-openapi-docs/src/types";
import type { DocFrontMatter } from "docusaurus-theme-openapi-docs/src/types";
import { Provider } from "react-redux";
import { createStoreWithoutState, createStoreWithState } from "./store";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { DocuoConfig, TocItem } from "@/lib/types";
interface Props {
  mdxSource: MDXRemoteSerializeResult;
  toc: TocItem[];
  slug: string[];
  docuoConfig: DocuoConfig;
  children: React.ReactNode;
}

interface ApiFrontMatter extends DocFrontMatter {
  readonly api?: ApiItemType;
}

export default function ApiItem(props: Props): JSX.Element {
  const children = props.children;
  const frontMatter = props.mdxSource.frontmatter;
  let { api } = frontMatter as ApiFrontMatter;
  // decompress and parse
  if (api) {
    api = JSON.parse(
      zlib.inflateSync(Buffer.from(api as any, "base64")).toString()
    );
    console.log("####api", api);
  }

  const isBrowser = true;

  // Regex for 2XX status
  const statusRegex = new RegExp("(20[0-9]|2[1-9][0-9])");

  // Define store2
  let store2: any = {};

  // Init store for SSR
  if (!isBrowser) {
    store2 = createStoreWithoutState({}, []);
  }

  // Init store for CSR to hydrate components
  if (isBrowser) {
    // Create list of only 2XX response content types to create request samples from
    let acceptArray: any = [];
    for (const [code, content] of Object.entries(api?.responses ?? [])) {
      if (statusRegex.test(code)) {
        acceptArray.push(Object.keys(content.content ?? {}));
      }
    }
    acceptArray = acceptArray.flat();

    const content = api?.requestBody?.content ?? {};
    const servers = api?.servers ?? [];
    const params = {
      path: [] as ParameterObject[],
      query: [] as ParameterObject[],
      header: [] as ParameterObject[],
      cookie: [] as ParameterObject[],
    };
    api?.parameters?.forEach(
      (param: { in: "path" | "query" | "header" | "cookie" }) => {
        const paramType = param.in;
        const paramsArray: ParameterObject[] = params[paramType];
        paramsArray.push(param as ParameterObject);
      }
    );
    // TODO: determine way to rehydrate without flashing
    // const acceptValue = window?.sessionStorage.getItem("accept");
    // const contentTypeValue = window?.sessionStorage.getItem("contentType");
    // const server = window?.sessionStorage.getItem("server");
    const server = JSON.stringify(api.servers[0]);
    const serverObject = (JSON.parse(server!) as ServerObject) ?? {};

    store2 = createStoreWithState(
      {
        server: {
          value: (serverObject as any).url ? serverObject : undefined,
          options: servers,
        },
      },
      []
    );
  }

  if (api) {
    return <Provider store={store2}>{children}</Provider>;
  }
}
