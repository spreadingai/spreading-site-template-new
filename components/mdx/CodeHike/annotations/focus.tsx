import React from "react";
import { AnnotationHandler, InnerLine } from "codehike/code";
import styles from "../Code.module.scss";

export const focus: AnnotationHandler = {
  name: "focus",
  onlyIfAnnotated: true,
  Line: (props) =>
    React.createElement(InnerLine, {
      merge: props,
      className: styles.focusUnfocused,
    }),
  AnnotatedLine: ({ annotation, ...props }) =>
    React.createElement(InnerLine, {
      merge: props,
      // @ts-ignore - allow data attribute for styling
      "data-focus": true,
      className: styles.focusFocused,
    } as any),
};