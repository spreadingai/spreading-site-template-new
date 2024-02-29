/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import accept from "@/components/docuoOpenapi/theme/ApiExplorer/Accept/slice";
import auth from "@/components/docuoOpenapi/theme/ApiExplorer/Authorization/slice";
import contentType from "@/components/docuoOpenapi/theme/ApiExplorer/ContentType/slice";
import server from "@/components/docuoOpenapi/theme/ApiExplorer/Server/slice";

const rootReducer = combineReducers({
  accept,
  contentType,
  server,
  auth,
});

export type RootState = ReturnType<typeof rootReducer>;

export const createStoreWithState = (
  preloadedState: RootState,
  middlewares: any[]
) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(...middlewares),
  });

export const createStoreWithoutState = (
  preloadedState: {},
  middlewares: any[]
) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(...middlewares),
  });

export type AppDispatch = ReturnType<typeof createStoreWithState>["dispatch"];
