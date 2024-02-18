/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import FormItem from "@/components/openapi/theme/ApiExplorer/FormItem";
import FormSelect from "@/components/openapi/theme/ApiExplorer/FormSelect";
import {
  useTypedDispatch,
  useTypedSelector,
} from "@/components/openapi/theme/ApiItem/hooks";

import { setContentType } from "./slice";

function ContentType() {
  const value = useTypedSelector((state: any) => state.contentType.value);
  const options = useTypedSelector((state: any) => state.contentType.options);
  const dispatch = useTypedDispatch();

  if (options.length <= 1) {
    return null;
  }

  return (
    <FormItem label="Content-Type">
      <FormSelect
        value={value}
        options={options}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setContentType(e.target.value))
        }
      />
    </FormItem>
  );
}

export default ContentType;
