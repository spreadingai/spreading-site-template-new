/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import FormItem from "@/components/docuoOpenapi/theme/ApiExplorer/FormItem";
import FormSelect from "@/components/docuoOpenapi/theme/ApiExplorer/FormSelect";
import FormTextInput from "@/components/docuoOpenapi/theme/ApiExplorer/FormTextInput";
import {
  useTypedDispatch,
  useTypedSelector,
} from "@/components/docuoOpenapi/theme/ApiItem/hooks";

import { setAuthData, setSelectedAuth } from "./slice";

function Authorization() {
  const data = useTypedSelector((state: any) => state.auth.data);
  const options = useTypedSelector((state: any) => state.auth.options);
  const selected = useTypedSelector((state: any) => state.auth.selected);

  const dispatch = useTypedDispatch();

  if (selected === undefined) {
    return null;
  }

  const selectedAuth = options[selected];

  const optionKeys = Object.keys(options);

  return (
    <div>
      {optionKeys.length > 1 && (
        <FormItem label="Security Scheme" hideLabel={true}>
          <FormSelect
            label="Security Scheme"
            options={optionKeys}
            value={selected}
            // @ts-ignore
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            //   dispatch(setSelectedAuth(e.target.value));
            // }}
            onChange={(value) => {
              dispatch(setSelectedAuth(value));
            }}
          />
        </FormItem>
      )}
      {selectedAuth.map((a: any) => {
        if (a.type === "http" && a.scheme === "bearer") {
          return (
            <FormItem
              label="Bearer Token"
              key={a.key + "-bearer"}
              hideLabel={true}
            >
              <FormTextInput
                prefix="Bearer Token"
                placeholder="Enter Bearer Token"
                value={data[a.key].token ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  dispatch(
                    setAuthData({
                      scheme: a.key,
                      key: "token",
                      value: value ? value : undefined,
                    })
                  );
                }}
              />
            </FormItem>
          );
        }

        if (a.type === "oauth2") {
          return (
            <FormItem
              label="Bearer Token"
              key={a.key + "-oauth2"}
              hideLabel={true}
            >
              <FormTextInput
                prefix="Bearer Token"
                placeholder="Enter Bearer Token"
                value={data[a.key].token ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  dispatch(
                    setAuthData({
                      scheme: a.key,
                      key: "token",
                      value: value ? value : undefined,
                    })
                  );
                }}
              />
            </FormItem>
          );
        }

        if (a.type === "http" && a.scheme === "basic") {
          return (
            <React.Fragment key={a.key + "-basic"}>
              <FormItem label="Username" hideLabel={true}>
                <FormTextInput
                  prefix="Username"
                  placeholder="Enter Username"
                  value={data[a.key].username ?? ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    dispatch(
                      setAuthData({
                        scheme: a.key,
                        key: "username",
                        value: value ? value : undefined,
                      })
                    );
                  }}
                />
              </FormItem>
              <FormItem label="Password" hideLabel={true}>
                <FormTextInput
                  prefix="Password"
                  placeholder="Enter Password"
                  password
                  value={data[a.key].password ?? ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    dispatch(
                      setAuthData({
                        scheme: a.key,
                        key: "password",
                        value: value ? value : undefined,
                      })
                    );
                  }}
                />
              </FormItem>
            </React.Fragment>
          );
        }

        if (a.type === "apiKey") {
          return (
            <FormItem
              label={`${a.key}`}
              key={a.key + "-apikey"}
              hideLabel={true}
            >
              <FormTextInput
                prefix={`${a.key}`}
                placeholder={`Enter ${a.key}`}
                value={data[a.key].apiKey ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  dispatch(
                    setAuthData({
                      scheme: a.key,
                      key: "apiKey",
                      value: value ? value : undefined,
                    })
                  );
                }}
              />
            </FormItem>
          );
        }

        return null;
      })}
    </div>
  );
}

export default Authorization;
