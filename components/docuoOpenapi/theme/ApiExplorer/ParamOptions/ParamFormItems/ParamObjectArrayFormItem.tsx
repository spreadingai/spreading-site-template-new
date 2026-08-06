import React, { useEffect, useState } from "react";

import {
  Param,
  ParameterValue,
  setParam,
} from "@/components/docuoOpenapi/theme/ApiExplorer/ParamOptions/slice";
import { useTypedDispatch } from "@/components/docuoOpenapi/theme/ApiItem/hooks";
import { sanitizeParameterValue } from "@/components/docuoOpenapi/theme/ApiExplorer/parameterValue";
import { getObjectArrayInitialValues } from "../selectInitialValue";
import SchemaValueEditor from "./SchemaValueEditor";

export default function ParamObjectArrayFormItem({ param }: { param: Param }) {
  const dispatch = useTypedDispatch();
  const [value, setValue] = useState<ParameterValue[]>(() =>
    getObjectArrayInitialValues(param)
  );

  useEffect(() => {
    const sanitized = sanitizeParameterValue(param.schema, value);
    dispatch(setParam({ ...param, value: sanitized }));
  }, [value]);

  return (
    <SchemaValueEditor
      schema={param.schema}
      value={value}
      path={param.name}
      required={param.required}
      onChange={(nextValue) =>
        setValue(Array.isArray(nextValue) ? nextValue : [])
      }
    />
  );
}
