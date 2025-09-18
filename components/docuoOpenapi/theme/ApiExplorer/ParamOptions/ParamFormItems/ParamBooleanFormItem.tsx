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
import useLanguage from "@/components/hooks/useLanguage";
import { copywriting } from "@/components/constant/language";

import { Controller, useFormContext } from "react-hook-form";

export interface ParamProps {
  param: Param;
}

export default function ParamBooleanFormItem({ param }: ParamProps) {
  const dispatch = useTypedDispatch();

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const showErrorMessage = errors?.paramBoolean;

  const { currentLanguage } = useLanguage();
  const t = copywriting[currentLanguage]?.openapi || copywriting.en.openapi;

  return (
    <>
      <Controller
        control={control}
        rules={{ required: param.required ? t.request.fieldRequired : false }}
        name="paramBoolean"
        render={({ field: { onChange, name } }) => (
          <FormSelect
            name={name}
            options={["---", "true", "false"]}
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
          name="paramBoolean"
          render={({ message }) => (
            <div className="openapi-explorer__input-error">{message}</div>
          )}
        />
      )}
    </>
  );
}
