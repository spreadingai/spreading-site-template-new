import React from "react";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import Icon from "@ant-design/icons";

const Svg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <polyline
        stroke="#444444"
        strokeWidth="1.4"
        transform="translate(7.646447, 8.292893) scale(-1, 1) rotate(-90.000000) translate(-7.646447, -8.292893) "
        points="9.29289322 11.5857864 6 8.29289322 9.29289322 5"
      ></polyline>
    </g>
  </svg>
);

export const IconFileClose = (props: Partial<CustomIconComponentProps>) => (
  <Icon rev={undefined} component={Svg} {...props} />
);
