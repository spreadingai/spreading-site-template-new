/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { useEffect } from "react";

import { ErrorMessage } from "@hookform/error-message";
import FormMultiSelect from "@/components/docuoOpenapi/theme/ApiExplorer/FormMultiSelect";
import {
  Param,
  setParam,
} from "@/components/docuoOpenapi/theme/ApiExplorer/ParamOptions/slice";
import {
  useTypedDispatch,
} from "@/components/docuoOpenapi/theme/ApiItem/hooks";
import { Controller, useFormContext } from "react-hook-form";
import useLanguage from "@/components/hooks/useLanguage";
import { copywriting } from "@/components/constant/language";


export interface ParamProps {
  param: Param;
}

export default function ParamMultiSelectFormItem({ param }: ParamProps) {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  const showErrorMessage = errors?.paramMultiSelect;

  const dispatch = useTypedDispatch();

  const options = param.schema?.items?.enum ?? [];
  const { currentLanguage } = useLanguage();
  const t = copywriting[currentLanguage]?.openapi || copywriting.en.openapi;

  // 当 param.value 变化时，同步到 React Hook Form
  // 这样可以确保外部更新（如 Redux 更新）能够正确清除表单验证错误
  useEffect(() => {
    if (param.value && Array.isArray(param.value) && param.value.length > 0) {
      setValue("paramMultiSelect", param.value, { shouldValidate: true });
    }
  }, [param.value, setValue]);

  return (
    <>
      <Controller
        control={control}
        rules={{ required: param.required ? t.request.fieldRequired : false }}
        name="paramMultiSelect"
        render={({ field: { onChange } }) => (
          <FormMultiSelect
            options={options as string[]}
            value={param.value as string[]}
            // @ts-ignore
            onChange={(values) => {
              dispatch(setParam({ ...param, value: values }));
              onChange(values);
            }}
            // @ts-ignore
            showErrors={showErrorMessage}
          />
        )}
      />
      {showErrorMessage && (
        <ErrorMessage
          errors={errors}
          name="paramMultiSelect"
          render={({ message }) => (
            <div className="openapi-explorer__input-error">{message}</div>
          )}
        />
      )}
    </>
  );
}
