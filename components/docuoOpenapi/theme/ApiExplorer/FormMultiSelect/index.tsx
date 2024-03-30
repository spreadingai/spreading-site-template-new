/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { useState } from "react";

import clsx from "clsx";
import { Select } from "antd";

export interface Props {
  value?: string[];
  options: string[];
  // onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  onChange?: (value: string[]) => void;
  showErrors?: boolean;
}

function FormMultiSelect({ value, options, onChange, showErrors }: Props) {
  const defaultValue = value || options;
  const [selectValue, setSelectValue] = useState(defaultValue);

  if (options.length === 0) {
    return null;
  }

  // let height;
  // if (options.length < 6) {
  //   const selectPadding = 12 * 2;
  //   const rawHeight = options.length * 29;
  //   const innerMargins = 4 * options.length - 1;
  //   const outerMargins = 4 * 2;
  //   const mysteryScroll = 1;
  //   height =
  //     rawHeight + innerMargins + outerMargins + selectPadding + mysteryScroll;
  // }

  const changeHandle = (value) => {
    setSelectValue(value);
    onChange(value);
  };

  console.log("####value", defaultValue);

  return (
    <Select
      popupClassName="openapi-form-select-dropdown"
      className={clsx({
        error: showErrors,
      })}
      mode="multiple"
      defaultValue={defaultValue}
      value={selectValue}
      onChange={changeHandle}
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
