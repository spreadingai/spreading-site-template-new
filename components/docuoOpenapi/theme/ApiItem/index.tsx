/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import zlib from "zlib";
import React, { useState } from "react";
import clsx from "clsx";
import {
  ServerObject,
  ParameterObject,
} from "@/components/docuoOpenapi/docuo-plugin-openapi-docs/src/openapi/types";
import type { ApiItem as ApiItemType } from "@/components/docuoOpenapi/docuo-plugin-openapi-docs/src/types";
import type { DocFrontMatter } from "@/components/docuoOpenapi/types";
import { Provider } from "react-redux";
import { createStoreWithoutState, createStoreWithState } from "./store";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { DocuoConfig, TocItem } from "@/lib/types";
import DocItemLayout from "@/components/docuoOpenapi/theme/ApiItem/Layout";
import ApiExplorer from "@/components/docuoOpenapi/theme/ApiExplorer";
import { createAuth } from "@/components/docuoOpenapi/theme/ApiExplorer/Authorization/slice";
import useIsBrowser from "@/components/docuoOpenapi/core/lib/client/exports/useIsBrowser";
import { createPersistanceMiddleware } from "@/components/docuoOpenapi/theme/ApiExplorer/persistanceMiddleware";
import {
  DocContext,
  DocContextType,
} from "@/components/docuoOpenapi/context/docContext";

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
  const docValues = {
    toc: props.toc,
    slug: props.slug,
    docuoConfig: props.docuoConfig,
  };
  const [docData, setDocData] = useState<DocContextType>(docValues);
  const children = props.children;
  const frontMatter = props.mdxSource.frontmatter;
  const { info_path: infoPath } = frontMatter as DocFrontMatter;
  let { api } = frontMatter as ApiFrontMatter;
  // decompress and parse
  if (api) {
    api = JSON.parse(
      zlib.inflateSync(Buffer.from(api as any, "base64")).toString()
    );
    console.log("####api", api);

    // TODO: fix this
    const options = {};
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isBrowser = useIsBrowser();

    // Regex for 2XX status
    const statusRegex = new RegExp("(20[0-9]|2[1-9][0-9])");

    // Define store2
    let store2: any = {};
    const persistanceMiddleware = createPersistanceMiddleware(options);

    // Init store for SSR
    if (!isBrowser) {
      store2 = createStoreWithoutState({}, [persistanceMiddleware]);
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
      const contentTypeArray = Object.keys(content);
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
      const auth = createAuth({
        security: api?.security,
        securitySchemes: api?.securitySchemes,
        options,
      });
      console.log("#######auth", auth);
      // TODO: determine way to rehydrate without flashing
      // const acceptValue = window?.sessionStorage.getItem("accept");
      // const contentTypeValue = window?.sessionStorage.getItem("contentType");
      // const server = window?.sessionStorage.getItem("server");
      const defaultServer = JSON.stringify(api.servers[0]);
      const server =
        typeof window !== "undefined"
          ? window?.sessionStorage.getItem("server") || defaultServer
          : typeof sessionStorage !== "undefined"
          ? sessionStorage.getItem("server") || defaultServer
          : defaultServer;
      const serverObject = (JSON.parse(server!) as ServerObject) ?? {};

      store2 = createStoreWithState(
        {
          accept: {
            value: acceptArray[0],
            options: acceptArray,
          },
          contentType: {
            value: contentTypeArray[0],
            options: contentTypeArray,
          },
          server: {
            value: (serverObject as any).url ? serverObject : undefined,
            options: servers,
          },
          response: { value: undefined },
          body: { type: "empty" },
          params,
          auth,
        },
        []
      );
    }
    return (
      <DocContext.Provider value={{ docData, setDocData }}>
        <DocItemLayout>
          <Provider store={store2}>
            <div className={clsx("row", "theme-api-markdown")}>
              <div className="col col--7 openapi-left-panel__container">
                {children}
              </div>
              <div className="col col--5 openapi-right-panel__container">
                <ApiExplorer item={api} infoPath={infoPath} />
              </div>
            </div>
          </Provider>
        </DocItemLayout>
      </DocContext.Provider>
    );
  }
  return <>{children}</>;
}
