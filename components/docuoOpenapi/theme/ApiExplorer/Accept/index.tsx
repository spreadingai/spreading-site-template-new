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

import { setAccept } from "./slice";

function Accept() {
  const value = useTypedSelector((state: any) => state.accept.value);
  const options = useTypedSelector((state: any) => state.accept.options);
  const dispatch = useTypedDispatch();

  if (options.length <= 1) {
    return null;
  }

  return (
    <FormItem label="Accept" hideLabel={true}>
      <FormSelect
        label="Accept"
        value={value}
        options={options}
        // onChange={(e: any) => dispatch(setAccept(e.target.value))}
        onChange={(value) => dispatch(value)}
      />
    </FormItem>
  );
}

export default Accept;
