/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import { Middleware } from "@reduxjs/toolkit";
import {
  setAuthData,
  setSelectedAuth,
} from "@/components/docuoOpenapi/theme/ApiExplorer/Authorization/slice";
import { setParam } from "@/components/docuoOpenapi/theme/ApiExplorer/ParamOptions/slice";
import {
  AppDispatch,
  RootState,
} from "@/components/docuoOpenapi/theme/ApiItem/store";
/* eslint-disable import/no-extraneous-dependencies*/
import { ThemeConfig } from "@/components/docuoOpenapi/types";

import { createStorage, hashArray } from "./storage-utils";

export function createPersistanceMiddleware(options: ThemeConfig["api"]) {
  const persistanceMiddleware: Middleware<{}, RootState, AppDispatch> =
    (storeAPI) => (next) => (action) => {
      const result = next(action);

      const state = storeAPI.getState();

      const storage = createStorage("sessionStorage");

      if (action.type === setAuthData.type) {
        for (const [key, value] of Object.entries(state.auth.data)) {
          if (Object.values(value as any).filter(Boolean).length > 0) {
            storage.setItem(key, JSON.stringify(value));
          } else {
            storage.removeItem(key);
          }
        }
      }

      if (action.type === setSelectedAuth.type) {
        if (state.auth.selected) {
          storage.setItem(
            hashArray(Object.keys(state.auth.options)),
            state.auth.selected
          );
        }
      }

      // 跨页持久化参数：当用户修改任意参数时，保存到 sessionStorage
      if (action.type === setParam.type) {
        try {
          const raw = storage.getItem("openapi_params") ?? "{}";
          const map = JSON.parse(raw || "{}") as Record<string, any>;
          const p: any = action.payload;
          const key = `${p.in}:${p.name}`;
          if (
            p.value === undefined ||
            (Array.isArray(p.value) && p.value.length === 0)
          ) {
            delete map[key];
          } else {
            map[key] = p.value;
          }
          storage.setItem("openapi_params", JSON.stringify(map));
        } catch (err) {
          // 静默失败，避免影响交互
          console.debug("[openapi] persist params failed", err);
        }
      }

      // TODO: determine way to rehydrate without flashing
      // if (action.type === "contentType/setContentType") {
      //   storage.setItem("contentType", action.payload);
      // }

      // if (action.type === "accept/setAccept") {
      //   storage.setItem("accept", action.payload);
      // }

      if (action.type === "server/setServer") {
        storage.setItem("server", action.payload);
      }

      if (action.type === "server/setServerVariable") {
        const server = storage.getItem("server") ?? "{}";
        const variables = JSON.parse(action.payload);
        let serverObject = JSON.parse(server);
        serverObject.variables[variables.key].default = variables.value;
        storage.setItem("server", JSON.stringify(serverObject));
      }

      return result;
    };
  return persistanceMiddleware;
}
