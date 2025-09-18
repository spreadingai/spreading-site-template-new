/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import clsx from "clsx";
import useLanguage from "@/components/hooks/useLanguage";
import { copywriting } from "@/components/constant/language";


export interface Props {
  hideLabel?: boolean;
  label?: string;
  type?: string;
  required?: boolean | undefined;
  children?: React.ReactNode;
  className?: string;
}

function FormItem({
  hideLabel,
  label,
  type,
  required,
  children,
  className,
}: Props) {
  const { currentLanguage } = useLanguage();
  const t = copywriting[currentLanguage]?.openapi || copywriting.en.openapi;

  return (
    <div className={clsx("openapi-explorer__form-item", className)}>
      <div className="openapi-explorer__form-item-label-container">
        {!hideLabel && label && (
          <label className="openapi-explorer__form-item-label">{label}</label>
        )}
        {type && (
          <span className="openapi-explorer__form-item-label-type">{type}</span>
        )}
        {required && (
          <span className="openapi-schema__required">{t.content.requiredTag}</span>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}

export default FormItem;
