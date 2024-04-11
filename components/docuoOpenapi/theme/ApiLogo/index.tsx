/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import useTheme from "@/components/docuoOpenapi/hook/useTheme";
import useBaseUrl from "@/components/docuoOpenapi/core/lib/client/exports/useBaseUrl";
import ThemedImage from "@/components/docuoOpenapi/theme-classic/src/theme/ThemedImage";

export default function ApiLogo(props: any): JSX.Element | undefined {
  const { theme } = useTheme();
  const { logo, darkLogo } = props;
  const altText = () => {
    if (theme === "dark") {
      return darkLogo?.altText ?? logo?.altText;
    }
    return logo?.altText;
  };
  const lightLogoUrl = useBaseUrl(logo?.url);
  const darkLogoUrl = useBaseUrl(darkLogo?.url);

  if (logo && darkLogo) {
    return (
      <ThemedImage
        alt={altText()}
        sources={{
          light: lightLogoUrl,
          dark: lightLogoUrl,
        }}
        className="openapi__logo"
      />
    );
  }
  if (logo || darkLogo) {
    return (
      <ThemedImage
        alt={altText()}
        sources={{
          light: lightLogoUrl ?? darkLogoUrl,
          dark: lightLogoUrl ?? darkLogoUrl,
        }}
        className="openapi__logo"
      />
    );
  }

  return undefined;
}
