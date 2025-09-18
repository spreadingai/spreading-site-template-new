/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { useState } from "react";

import { ErrorMessage } from "@hookform/error-message";
import FormMultiSelect from "@/components/docuoOpenapi/theme/ApiExplorer/FormMultiSelect";
import {
  Param,
  setParam,
} from "@/components/docuoOpenapi/theme/ApiExplorer/ParamOptions/slice";
import {
  useTypedDispatch,
  useTypedSelector,
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
  } = useFormContext();

  const showErrorMessage = errors?.paramMultiSelect;

  const dispatch = useTypedDispatch();

  const options = param.schema?.items?.enum ?? [];
  const { currentLanguage } = useLanguage();
  const t = copywriting[currentLanguage]?.openapi || copywriting.en.openapi;


  const pathParams = useTypedSelector((state: any) => state.params.path);
  const queryParams = useTypedSelector((state: any) => state.params.query);
  const cookieParams = useTypedSelector((state: any) => state.params.cookie);
  const headerParams = useTypedSelector((state: any) => state.params.header);

  const paramTypeToWatch = pathParams.length
    ? pathParams
    : queryParams.length
    ? queryParams
    : cookieParams.length
    ? cookieParams
    : headerParams;

  // const handleChange = (e: any, onChange: any) => {
  //   const values = Array.prototype.filter
  //     .call(e.target.options, (o) => o.selected)
  //     .map((o) => o.value);

  //   const value = values.length > 0 ? values : undefined;
  //   dispatch(
  //     setParam({
  //       ...param,
  //       value,
  //     })
  //   );

  //   onChange(paramTypeToWatch);
  // };
  const handleChange = (values: any, onChange: any) => {
    const value = values.length > 0 ? values : undefined;
    dispatch(
      setParam({
        ...param,
        value,
      })
    );

    onChange(paramTypeToWatch);
  };

  return (
    <>
      <Controller
        control={control}
        rules={{ required: param.required ? t.request.fieldRequired : false }}
        name="paramMultiSelect"
        render={({ field: { onChange, name } }) => (
          <FormMultiSelect
            options={options as string[]}
            name={name}
            // onChange={(e: any) => handleChange(e, onChange)}
            onChange={(values) => handleChange(values, onChange)}
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
