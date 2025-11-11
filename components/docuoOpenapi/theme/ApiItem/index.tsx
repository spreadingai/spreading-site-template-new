/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import zlib from "zlib";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import {
  ServerObject,
  ParameterObject,
} from "@/components/docuoOpenapi/docuo-plugin-openapi-docs/src/openapi/types";
import type { ApiItem as ApiItemType } from "@/components/docuoOpenapi/docuo-plugin-openapi-docs/src/types";
import type { DocFrontMatter } from "@/components/docuoOpenapi/types";
import { Provider } from "react-redux";
import { createStoreWithoutState, createStoreWithState } from "./store";
import { DocInstance, DocuoConfig, TocItem } from "@/lib/types";
import DocItemLayout from "@/components/docuoOpenapi/theme/ApiItem/Layout";
import ApiExplorer from "@/components/docuoOpenapi/theme/ApiExplorer";
import { createAuth } from "@/components/docuoOpenapi/theme/ApiExplorer/Authorization/slice";
import useIsBrowser from "@/components/docuoOpenapi/core/lib/client/exports/useIsBrowser";
import { createPersistanceMiddleware } from "@/components/docuoOpenapi/theme/ApiExplorer/persistanceMiddleware";
// import useLanguage from "@/components/hooks/useLanguage";
// import { copywriting } from "@/components/constant/language";
import {
  DocuoContext,
  DocuoContextType,
} from "@/components/docuoOpenapi/context/docuoContext";
import {
  DocContext,
  DocContextType,
} from "@/components/docuoOpenapi/context/docContext";
import { parseByInfoPath } from "@/components/docuoOpenapi/utils";
import useInstance from "@/components/hooks/useInstance";
import useVersion from "@/components/hooks/useVersion";

interface Props {
  mdxSource: any;
  toc: TocItem[];
  slug: string[];
  docuoConfig: DocuoConfig;
  children: React.ReactNode;
}

interface ApiFrontMatter extends DocFrontMatter {
  readonly api?: ApiItemType;
}

export default function ApiItem(props: Props): JSX.Element {
  const { displayInstances } = useInstance();
  const { versions } = useVersion();
  const docuoValues = {
    toc: props.toc,
    slug: props.slug,
    docuoConfig: props.docuoConfig,
  };
  const [docuoData, setDocuoData] = useState<DocuoContextType>(docuoValues);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isBrowser = useIsBrowser();
  const children = props.children;
  const frontMatter = props.mdxSource.frontmatter;
  const [docData, setDocData] = useState<DocContextType>({
    frontMatter,
  });
  // const { currentLanguage } = useLanguage();
  // const t = copywriting[currentLanguage]?.openapi || copywriting.en.openapi;

  // useEffect(() => {
  //   console.log("33333~33333");
  //   if (!isBrowser) return;

  //   const translate = (root?: Document | Element | null) => {
  //   console.log("33333~44444");
  //     try {
  //       const scope: Document | Element = root && (root as any).querySelector
  //         ? (root as Document | Element)
  //         : document;
  //       // required 标签本地化
  //       scope
  //         .querySelectorAll(
  //           ".openapi-left-panel__container .openapi-schema__required"
  //         )
  //         .forEach((el) => {
  //           console.log("33333~55555");
  //           const txt = (el.textContent || "").trim();
  //           if (txt !== t.content.requiredTag) {
  //             el.textContent = t.content.requiredTag;
  //           }
  //         });

  //       // Schema 折叠标题本地化
  //       scope
  //         .querySelectorAll(
  //           ".openapi-left-panel__container .openapi-markdown__details-summary-response strong"
  //         )
  //         .forEach((el) => {
  //           console.log("33333~66666");
  //           const txt = (el.textContent || "").trim().toLowerCase();
  //           if (txt === "schema") {
  //             el.textContent = t.content.schemaTitle;
  //           }
  //         });
  //     } catch {}
  //   };

  //   // 进入页面先翻译一次
  //   translate();

  //   // 监听左侧面板内容变化（路由切换/折叠展开导致的重渲染）
  //   const container = document.querySelector(
  //     ".openapi-left-panel__container"
  //   );
  //   if (!container) return;

  //   const observer = new MutationObserver(() => translate(container));
  //   observer.observe(container, {
  //     childList: true,
  //     subtree: true,
  //     characterData: true,
  //   });

  //   return () => observer.disconnect();
  // }, [isBrowser, t]);

  let { info_path: infoPath } = frontMatter as DocFrontMatter;
  // Parse the instance and version
  infoPath = parseByInfoPath(infoPath, displayInstances, versions);
  let { api } = frontMatter as ApiFrontMatter;
  // decompress and parse
  if (api) {
    api = JSON.parse(
      zlib.inflateSync(Buffer.from(api as any, "base64") as any).toString()
    );

    // TODO: fix this
    const options = {};

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

      // 从 sessionStorage 恢复同名参数的已填值（跨页继承）
      try {
        const rawParams =
          typeof window !== "undefined"
            ? window.sessionStorage.getItem("openapi_params")
            : typeof sessionStorage !== "undefined"
            ? sessionStorage.getItem("openapi_params")
            : undefined;
        const map = (rawParams ? JSON.parse(rawParams) : {}) as Record<string, any>;
        const applyValues = (
          arr: ParameterObject[],
          type: "path" | "query" | "header" | "cookie"
        ) =>
          arr.map((p: any) => {
            const key = `${type}:${p.name}`;
            const val = map[key];
            if (val === undefined) return p;

            const isArrayType = p?.schema?.type === "array";
            try {
              if (isArrayType) {
                if (Array.isArray(val)) {
                  return { ...p, value: val.map((v: any) => String(v)) };
                } else {
                  return { ...p, value: [String(val)] };
                }
              } else {
                if (Array.isArray(val)) {
                  return { ...p, value: String(val[0]) };
                } else {
                  return { ...p, value: String(val) };
                }
              }
            } catch {
              return p;
            }
          });
        // 仅在存在对应键时赋值，并在类型不一致时进行安全转换
        params.path = applyValues(params.path, "path") as any;
        params.query = applyValues(params.query, "query") as any;
        params.header = applyValues(params.header, "header") as any;
        params.cookie = applyValues(params.cookie, "cookie") as any;
      } catch (e) {
        // 静默失败，避免影响渲染
        console.debug("[openapi] rehydrate params failed", e);
      }
      const auth = createAuth({
        security: api?.security,
        securitySchemes: api?.securitySchemes,
        options,
      });
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
        [persistanceMiddleware]
      );
    }
    return (
      <DocuoContext.Provider value={{ docuoData, setDocuoData }}>
        <DocContext.Provider value={{ docData, setDocData }}>
          <DocItemLayout>
            <Provider store={store2}>
              <div className={clsx("theme-api-markdown")}>
                <div className="openapi-left-panel__container">{children}</div>
                <div className="openapi-right-panel__container">
                  <ApiExplorer item={api} infoPath={infoPath} />
                </div>
              </div>
            </Provider>
          </DocItemLayout>
        </DocContext.Provider>
      </DocuoContext.Provider>
    );
  }
  return <>{children}</>;
}
