/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import clsx from "clsx";
import { Select } from "antd";

export interface Props {
  value?: string[];
  options: string[];
  onChange?: (value: string[]) => void;
  showErrors?: boolean;
}

function FormMultiSelect({ value, options, onChange, showErrors }: Props) {
  if (options.length === 0) {
    return null;
  }

  return (
    <Select
      popupClassName="openapi-form-select-dropdown"
      className={clsx({
        error: showErrors,
      })}
      mode="multiple"
      value={value || []}
      onChange={onChange}
      options={options.map((option) => {
        return {
          value: option,
          label: option,
        };
      })}
    />
    // <select
    //   style={{ height: height }}
    //   className={clsx("openapi-explorer__multi-select-input", {
    //     error: showErrors,
    //   })}
    //   value={value}
    //   onChange={onChange}
    //   size={Math.min(6, options.length + 1)}
    //   multiple
    // >
    //   {options.map((option) => {
    //     return (
    //       <option
    //         key={option}
    //         value={option}
    //         className={clsx({
    //           active: value && value.includes(option),
    //         })}
    //       >
    //         {option}
    //       </option>
    //     );
    //   })}
    // </select>
  );
}

export default FormMultiSelect;
