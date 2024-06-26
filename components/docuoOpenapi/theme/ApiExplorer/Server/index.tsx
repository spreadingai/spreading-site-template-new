/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { useState } from "react";

import FloatingButton from "@/components/docuoOpenapi/theme/ApiExplorer/FloatingButton";
import FormItem from "@/components/docuoOpenapi/theme/ApiExplorer/FormItem";
import FormSelect from "@/components/docuoOpenapi/theme/ApiExplorer/FormSelect";
import FormTextInput from "@/components/docuoOpenapi/theme/ApiExplorer/FormTextInput";
import {
  useTypedDispatch,
  useTypedSelector,
} from "@/components/docuoOpenapi/theme/ApiItem/hooks";

import { setServer, setServerVariable } from "./slice";

function Server() {
  const [isEditing, setIsEditing] = useState(true);
  const value = useTypedSelector((state: any) => state.server.value);
  const options = useTypedSelector((state: any) => state.server.options);
  const dispatch = useTypedDispatch();

  if (options.length <= 0) {
    return null;
  }

  if (options.length < 1 && value?.variables === undefined) {
    return null;
  }

  if (!value) {
    const defaultOption = options[0];
    dispatch(setServer(JSON.stringify(defaultOption)));
  }

  // Default to first option when existing server state is mismatched
  if (value) {
    const urlExists = options.find((s: any) => s.url === value.url);
    if (!urlExists) {
      const defaultOption = options[0];
      dispatch(setServer(JSON.stringify(defaultOption)));
    }
  }

  if (!isEditing) {
    let url = "";
    if (value) {
      url = value.url.replace(/\/$/, "");
      if (value.variables) {
        Object.keys(value.variables).forEach((variable) => {
          url = url.replace(
            `{${variable}}`,
            value.variables?.[variable].default ?? ""
          );
        });
      }
    }
    return (
      <FloatingButton onClick={() => setIsEditing(true)} label="Edit">
        <FormItem>
          <span className="openapi-explorer__server-url" title={url}>
            {url}
          </span>
        </FormItem>
      </FloatingButton>
    );
  }
  return (
    <div className="openapi-explorer__server-container">
      <FloatingButton onClick={() => setIsEditing(true)} label="Hide">
        <FormItem hideLabel={true}>
          <FormSelect
            options={options.map((s: any) => s.url)}
            // @ts-ignore
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            //   dispatch(
            //     setServer(
            //       JSON.stringify(
            //         options.filter((s: any) => s.url === e.target.value)[0]
            //       )
            //     )
            //   );
            // }}
            onChange={(value) => {
              dispatch(
                setServer(
                  JSON.stringify(options.filter((s: any) => s.url === value)[0])
                )
              );
            }}
            value={value?.url}
          />
          <small className="openapi-explorer__server-description">
            {value?.description}
          </small>
        </FormItem>
        {value?.variables &&
          Object.keys(value.variables).map((key) => {
            if (value.variables?.[key].enum !== undefined) {
              return (
                <FormItem label={key} key={key} hideLabel={true}>
                  <FormSelect
                    label={key}
                    options={value.variables[key].enum}
                    // @ts-ignore
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    //   dispatch(
                    //     setServerVariable(
                    //       JSON.stringify({ key, value: e.target.value })
                    //     )
                    //   );
                    // }}
                    onChange={(value) => {
                      dispatch(
                        setServerVariable(JSON.stringify({ key, value: value }))
                      );
                    }}
                    value={value?.variables[key].default}
                  />
                </FormItem>
              );
            }
            return (
              <FormItem label={key} key={key}>
                <FormTextInput
                  placeholder={value.variables?.[key].default}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    dispatch(
                      setServerVariable(
                        JSON.stringify({ key, value: e.target.value })
                      )
                    );
                  }}
                  value={value?.variables?.[key].default}
                />
              </FormItem>
            );
          })}
      </FloatingButton>
    </div>
  );
}

export default Server;
