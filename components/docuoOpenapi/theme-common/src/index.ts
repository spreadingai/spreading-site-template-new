/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 * APIs to document
 */
export { useThemeConfig } from "./utils/useThemeConfig";
export {
  createStorageSlot,
  useStorageSlot,
  listStorageKeys,
} from "./utils/storageUtils";

export {
  useIsomorphicLayoutEffect,
  useEvent,
  usePrevious,
  composeProviders,
  ReactContextError,
} from "./utils/reactUtils";

export { duplicates, uniq } from "./utils/jsUtils";

export { usePrismTheme } from "./hooks/usePrismTheme";
