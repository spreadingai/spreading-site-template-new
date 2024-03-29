/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import { interpolate } from "@/components/docuoOpenapi/core/lib/client/exports/Interpolate";
// Can't read it from context, due to exposing imperative API
// TODO: Docuo: The multilingual problem needs to be solved
// import codeTranslations from "@generated/codeTranslations";
const codeTranslations = {};

function getLocalizedMessage({ id, message }) {
  if (typeof id === "undefined" && typeof message === "undefined") {
    throw new Error(
      "Docusaurus translation declarations must have at least a translation id or a default translation message"
    );
  }
  return codeTranslations[id ?? message] ?? message ?? id;
}
// Imperative translation API is useful for some edge-cases:
// - translating page titles (meta)
// - translating string props (input placeholders, image alt, aria labels...)
export function translate({ message, id, description }, values) {
  const localizedMessage = getLocalizedMessage({ message, id });
  return interpolate(localizedMessage, values);
}
// Maybe we'll want to improve this component with additional features
// Like toggling a translation mode that adds a little translation button near
// the text?
export default function Translate({ children, id, values }) {
  if (children && typeof children !== "string") {
    throw new Error(
      "The Docusaurus <Translate> component only accept simple string values"
    );
  }
  const localizedMessage = getLocalizedMessage({ message: children, id });
  return <>{interpolate(localizedMessage, values)}</>;
}
