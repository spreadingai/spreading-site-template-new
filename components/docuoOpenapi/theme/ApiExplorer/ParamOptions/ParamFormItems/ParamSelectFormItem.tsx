/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { useEffect, useRef, useMemo } from "react";

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
    setValue,
  } = useFormContext();

  const showErrorMessage = errors?.paramSelect;

  const dispatch = useTypedDispatch();

  const { currentLanguage } = useLanguage();
  const t = copywriting[currentLanguage]?.openapi || copywriting.en.openapi;

  // 使用 useMemo 缓存 options，避免每次渲染都创建新数组
  const options = useMemo(() => param.schema?.enum ?? [], [param.schema?.enum]);

  // 用于追踪是否已自动选择唯一选项，避免重复触发
  const hasAutoSelectedRef = useRef(false);

  // 当只有一个选项时，自动选择该选项
  useEffect(() => {
    if (options.length === 1 && !hasAutoSelectedRef.current) {
      const singleOption = options[0];

      // 标记已自动选择，避免重复触发
      hasAutoSelectedRef.current = true;

      // 更新 Redux 中的参数值
      dispatch(
        setParam({
          ...param,
          value: singleOption,
        })
      );

      // 更新 React Hook Form 的字段值并触发验证
      setValue("paramSelect", singleOption, { shouldValidate: true });

      console.log(`Auto-selected single option: ${singleOption}`);
    }
  }, [options, param, dispatch, setValue]);

  return (
    <>
      <Controller
        control={control}
        rules={{ required: param.required ? t.request.fieldRequired : false }}
        name="paramSelect"
        render={({ field: { onChange } }) => (
          <FormSelect
            // 如果只有一个选项，不显示 "---" 占位符；否则显示
            options={options.length === 1 ? (options as string[]) : ["---", ...(options as string[])]}
            value={param.value as string}
            // @ts-ignore
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
