/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";
import { Select } from "antd";

export interface Props {
  label?: string;
  name?: string;
  value?: string;
  options?: string[];
  // onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  onChange?: (value: string) => void;
}

function FormSelect({ label, value, options, onChange }: Props) {
  if (!Array.isArray(options) || options.length === 0) {
    return null;
  }

  return (
    <div className={`select-container ${label ? "inner-label" : ""}`}>
      {label ? <span className="select-inner-label">{label}</span> : null}
      <Select
        defaultValue={value}
        style={{ width: 120 }}
        onChange={onChange}
        options={options.map((option) => {
          return {
            value: option,
            label: option,
          };
        })}
      />
    </div>
  );

  // return (
  //   <select
  //     className="openapi-explorer__select-input"
  //     value={value}
  //     // @ts-ignore
  //     onChange={onChange}
  //   >
  //     {options.map((option) => {
  //       return (
  //         <option key={option} value={option}>
  //           {option}
  //         </option>
  //       );
  //     })}
  //   </select>
  // );
}

export default FormSelect;
