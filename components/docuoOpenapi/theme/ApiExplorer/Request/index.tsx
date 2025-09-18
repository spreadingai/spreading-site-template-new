/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

// @ts-nocheck
import React, { useState } from "react";

import useDoc from "@/components/docuoOpenapi/hook/useDoc";
import sdk from "@paloaltonetworks/postman-collection";
import Accept from "@/components/docuoOpenapi/theme/ApiExplorer/Accept";
import Authorization from "@/components/docuoOpenapi/theme/ApiExplorer/Authorization";
import Body from "@/components/docuoOpenapi/theme/ApiExplorer/Body";
import buildPostmanRequest from "@/components/docuoOpenapi/theme/ApiExplorer/buildPostmanRequest";
import ContentType from "@/components/docuoOpenapi/theme/ApiExplorer/ContentType";
import ParamOptions from "@/components/docuoOpenapi/theme/ApiExplorer/ParamOptions";
import {
  setResponse,
  setCode,
  clearCode,
  setHeaders,
  clearHeaders,
} from "@/components/docuoOpenapi/theme/ApiExplorer/Response/slice";
import Server from "@/components/docuoOpenapi/theme/ApiExplorer/Server";
import {
  useTypedDispatch,
  useTypedSelector,
} from "@/components/docuoOpenapi/theme/ApiItem/hooks";
import { ParameterObject } from "@/components/docuoOpenapi/docuo-plugin-openapi-docs/src/openapi/types";
import { ApiItem } from "@/components/docuoOpenapi/docuo-plugin-openapi-docs/src/types";
import { FormProvider, useForm } from "react-hook-form";
import { useContext } from "react";
import { DocuoContext } from "@/components/docuoOpenapi/context/docuoContext";
import useLanguage from "@/components/hooks/useLanguage";
import { copywriting } from "@/components/constant/language";


import makeRequest from "./makeRequest";

function Request({ item }: { item: NonNullable<ApiItem> }) {
  const postman = new sdk.Request(item.postman);
  const { docData } = useDoc();
  let { proxy, hide_send_button: hideSendButton } = docData.frontMatter;
  // Fallback to global proxy from docuo.config.json if page frontMatter doesn't specify proxy
  try {
    const { docuoData } = useContext(DocuoContext);
    const globalProxy = docuoData?.docuoConfig?.themeConfig?.api?.proxy;
    if (!proxy && globalProxy) proxy = globalProxy;
  } catch {}

  const pathParams = useTypedSelector((state: any) => state.params.path);
  const queryParams = useTypedSelector((state: any) => state.params.query);
  const cookieParams = useTypedSelector((state: any) => state.params.cookie);
  const contentType = useTypedSelector((state: any) => state.contentType.value);
  const headerParams = useTypedSelector((state: any) => state.params.header);
  const body = useTypedSelector((state: any) => state.body);
  const accept = useTypedSelector((state: any) => state.accept.value);
  const acceptOptions = useTypedDispatch((state: any) => state.accept.options);
  const authSelected = useTypedSelector((state: any) => state.auth.selected);
  const server = useTypedSelector((state: any) => state.server.value);
  const serverOptions = useTypedSelector((state: any) => state.server.options);
  const auth = useTypedSelector((state: any) => state.auth);
  const { currentLanguage } = useLanguage();
  const t = copywriting[currentLanguage]?.openapi || copywriting.en.openapi;

  const dispatch = useTypedDispatch();

  const [expandAccept, setExpandAccept] = useState(true);
  const [expandAuth, setExpandAuth] = useState(true);
  const [expandBody, setExpandBody] = useState(true);
  const [expandParams, setExpandParams] = useState(true);
  const [expandServer, setExpandServer] = useState(true);

  const allParams = [
    ...pathParams,
    ...queryParams,
    ...cookieParams,
    ...headerParams,
  ];

  const postmanRequest = buildPostmanRequest(postman, {
    queryParams,
    pathParams,
    cookieParams,
    contentType,
    accept,
    headerParams,
    body,
    server,
    auth,
  });

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const paramsObject = {
    path: [] as ParameterObject[],
    query: [] as ParameterObject[],
    header: [] as ParameterObject[],
    cookie: [] as ParameterObject[],
  };

  item.parameters?.forEach(
    (param: { in: "path" | "query" | "header" | "cookie" }) => {
      const paramType = param.in;
      const paramsArray: ParameterObject[] = paramsObject[paramType];
      paramsArray.push(param as ParameterObject);
    }
  );

  const methods = useForm({ shouldFocusError: false });

  const onSubmit = async (data) => {
    dispatch(setResponse("Fetching..."));
    try {
      await delay(1200);
      const res = await makeRequest(postmanRequest, proxy, body);
      dispatch(setResponse(await res.text()));
      dispatch(setCode(res.status));
      res.headers && dispatch(setHeaders(Object.fromEntries(res.headers)));
    } catch (e: any) {
      console.log(e);
      dispatch(setResponse("Connection failed"));
      dispatch(clearCode());
      dispatch(clearHeaders());
    }
  };

  const showServerOptions = serverOptions.length > 0;
  const showAcceptOptions = acceptOptions.length > 1;
  const showRequestBody = contentType !== undefined;
  const showRequestButton = item.servers && !hideSendButton;
  const showAuth = authSelected !== undefined;
  const showParams = allParams.length > 0;
  const requestBodyRequired = item.requestBody?.required;

  if (
    !showAcceptOptions &&
    !showAuth &&
    !showParams &&
    !showRequestBody &&
    !showServerOptions
  ) {
    return null;
  }

  const expandAllDetails = () => {
    setExpandAccept(true);
    setExpandAuth(true);
    setExpandBody(true);
    setExpandParams(true);
    setExpandServer(true);
  };

  const collapseAllDetails = () => {
    setExpandAccept(false);
    setExpandAuth(false);
    setExpandBody(false);
    setExpandParams(false);
    setExpandServer(false);
  };

  const allDetailsExpanded =
    expandParams && expandBody && expandServer && expandAuth && expandAccept;

  return (
    <FormProvider {...methods}>
      <form
        className="openapi-explorer__request-form"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="openapi-explorer__request-header-container">
          <span className="openapi-explorer__request-title">Request </span>
          <div className="right-btn">
            {allDetailsExpanded ? (
              <span
                className="openapi-explorer__expand-details-btn"
                onClick={collapseAllDetails}
              >
                {t.request.collapseAll}
              </span>
            ) : (
              <span
                className="openapi-explorer__expand-details-btn"
                onClick={expandAllDetails}
              >
                {t.request.expandAll}
              </span>
            )}
            {showRequestButton && item.method !== "event" && (
              <button className="openapi-explorer__request-btn" type="submit">
                {t.request.send}
              </button>
            )}
          </div>
        </div>
        <div className="openapi-explorer__details-outer-container">
          {showServerOptions && item.method !== "event" && (
            <details
              open={expandServer}
              className="openapi-explorer__details-container server"
            >
              <summary
                className="openapi-explorer__details-summary"
                onClick={(e) => {
                  e.preventDefault();
                  setExpandServer(!expandServer);
                }}
              >
                Base URL
              </summary>
              <Server />
            </details>
          )}
          {showAuth && (
            <details
              open={expandAuth}
              className="openapi-explorer__details-container auth"
            >
              <summary
                className="openapi-explorer__details-summary"
                onClick={(e) => {
                  e.preventDefault();
                  setExpandAuth(!expandAuth);
                }}
              >
                Auth
              </summary>
              <Authorization />
            </details>
          )}
          {showParams && (
            <details
              open={
                expandParams || Object.keys(methods.formState.errors).length
              }
              className="openapi-explorer__details-container params"
            >
              <summary
                className="openapi-explorer__details-summary"
                onClick={(e) => {
                  e.preventDefault();
                  setExpandParams(!expandParams);
                }}
              >
                Parameters
              </summary>
              <ParamOptions />
            </details>
          )}
          {showRequestBody && (
            <details
              open={expandBody}
              className="openapi-explorer__details-container body"
            >
              <summary
                className="openapi-explorer__details-summary"
                onClick={(e) => {
                  e.preventDefault();
                  setExpandBody(!expandBody);
                }}
              >
                Body
                {requestBodyRequired && (
                  <span className="openapi-schema__required">{t.content.requiredTag}</span>
                )}
              </summary>
              <>
                <ContentType />
                <Body
                  jsonRequestBodyExample={item.jsonRequestBodyExample}
                  requestBodyMetadata={item.requestBody}
                  required={requestBodyRequired}
                />
              </>
            </details>
          )}
          {showAcceptOptions && (
            <details
              open={expandAccept}
              className="openapi-explorer__details-container"
            >
              <summary
                className="openapi-explorer__details-summary"
                onClick={(e) => {
                  e.preventDefault();
                  setExpandAccept(!expandAccept);
                }}
              >
                Accept
              </summary>
              <Accept />
            </details>
          )}
        </div>
      </form>
    </FormProvider>
  );
}

export default Request;
