/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import { ErrorMessage } from "@hookform/error-message";
import FormSelect from "@/components/docuoOpenapi/theme/ApiExplorer/FormSelect";
import {
  Param,
  setParam,
} from "@/components/docuoOpenapi/theme/ApiExplorer/ParamOptions/slice";
import { useTypedDispatch } from "@/components/docuoOpenapi/theme/ApiItem/hooks";
import { Controller, useFormContext } from "react-hook-form";
import useLanguage from "@/components/hooks/useLanguage";
import { copywriting } from "@/components/constant/language";


export interface ParamProps {
  param: Param;
}

export default function ParamSelectFormItem({ param }: ParamProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const showErrorMessage = errors?.paramSelect;

  const dispatch = useTypedDispatch();

  const { currentLanguage } = useLanguage();
  const t = copywriting[currentLanguage]?.openapi || copywriting.en.openapi;

  const options = param.schema?.enum ?? [];

  return (
    <>
      <Controller
        control={control}
        rules={{ required: param.required ? t.request.fieldRequired : false }}
        name="paramSelect"
        render={({ field: { onChange, name } }) => (
          <FormSelect
            options={["---", ...(options as string[])]}
            // @ts-ignore
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            //   const val = e.target.value;
            //   dispatch(
            //     setParam({
            //       ...param,
            //       value: val === "---" ? undefined : val,
            //     })
            //   );
            //   onChange(val);
            // }}
            onChange={(value) => {
              const val = value;
              dispatch(
                setParam({
                  ...param,
                  value: val === "---" ? undefined : val,
                })
              );
              onChange(val);
            }}
          />
        )}
      />
      {showErrorMessage && (
        <ErrorMessage
          errors={errors}
          name="paramSelect"
          render={({ message }) => (
            <div className="openapi-explorer__input-error">{message}</div>
          )}
        />
      )}
    </>
  );
}
