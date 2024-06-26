/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import FormItem from "@/components/docuoOpenapi/theme/ApiExplorer/FormItem";
import FormSelect from "@/components/docuoOpenapi/theme/ApiExplorer/FormSelect";
import {
  useTypedDispatch,
  useTypedSelector,
} from "@/components/docuoOpenapi/theme/ApiItem/hooks";

import { setContentType } from "./slice";

function ContentType() {
  const value = useTypedSelector((state: any) => state.contentType.value);
  const options = useTypedSelector((state: any) => state.contentType.options);
  const dispatch = useTypedDispatch();

  if (options.length <= 1) {
    return null;
  }

  return (
    <FormItem label="Content-Type" hideLabel={true}>
      <FormSelect
        label="Content-Type"
        value={value}
        options={options}
        // @ts-ignore
        // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        //   dispatch(setContentType(e.target.value))
        // }
        onChange={(value) => dispatch(setContentType(value))}
      />
    </FormItem>
  );
}

export default ContentType;
