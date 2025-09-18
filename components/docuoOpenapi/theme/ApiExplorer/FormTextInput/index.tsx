/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

// @ts-nocheck
import React, { ReactNode } from "react";

import { ErrorMessage } from "@hookform/error-message";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import useLanguage from "@/components/hooks/useLanguage";
import { copywriting } from "@/components/constant/language";


export interface Props {
  prefix?: ReactNode;
  value?: string;
  placeholder?: string;
  password?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

function FormTextInput({
  prefix,
  isRequired,
  value,
  placeholder,
  password,
  onChange,
  paramName,
}: Props) {
  placeholder = placeholder?.split("\n")[0];

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const showErrorMessage = errors?.[paramName]?.message;

  const { currentLanguage } = useLanguage();
  const t = copywriting[currentLanguage]?.openapi || copywriting.en.openapi;

  return (
    <>
      <div
        className={clsx("openapi-explorer__form-item-input-container", {
          "has-prefix": !!prefix,
          error: showErrorMessage,
        })}
      >
        <div className="prefix-container">{prefix ? prefix : null}</div>
        {paramName ? (
          <input
            {...register(paramName, {
              required: isRequired ? t.request.fieldRequired : false,
            })}
            className={clsx("openapi-explorer__form-item-input")}
            type={password ? "password" : "text"}
            placeholder={placeholder}
            title={placeholder}
            value={value}
            onChange={onChange}
            autoComplete="off"
          />
        ) : (
          <input
            className="openapi-explorer__form-item-input"
            type={password ? "password" : "text"}
            placeholder={placeholder}
            title={placeholder}
            value={value}
            onChange={onChange}
            autoComplete="off"
          />
        )}
      </div>
      {showErrorMessage && (
        <ErrorMessage
          errors={errors}
          name={paramName}
          render={({ message }) => (
            <div className="openapi-explorer__input-error">{message}</div>
          )}
        />
      )}
    </>
  );
}

export default FormTextInput;
