/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import useTheme from "@/components/docuoOpenapi/hook/useTheme";
import { useThemeConfig } from "../utils/useThemeConfig";
import type { PrismTheme } from "prism-react-renderer";

/**
 * Returns a color-mode-dependent Prism theme: whatever the user specified in
 * the config. Falls back to `palenight`.
 */
export function usePrismTheme(): PrismTheme {
  const { prism } = useThemeConfig();
  const { theme } = useTheme();
  console.log("####usePrismTheme", theme);
  const lightModeTheme = prism.theme;
  const darkModeTheme = prism.darkTheme || lightModeTheme;
  const prismTheme = theme === "dark" ? darkModeTheme : lightModeTheme;

  // The dark theme is currently used
  return darkModeTheme;
}
