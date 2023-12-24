import React from "react";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import Icon from "@ant-design/icons";

const PageNorSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 20 20">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g
        transform="translate(3.500000, 3.000000)"
        stroke="#171717"
        strokeWidth="1.2"
      >
        <path d="M8.23774164,0.6 L12.4,4.46178764 L12.4,12.6 C12.4,12.816096 12.3016926,13.009322 12.1499541,13.1501066 C11.9813313,13.3065566 11.7474936,13.4 11.4910714,13.4 L11.4910714,13.4 L1.50892857,13.4 C1.25250642,13.4 1.01866867,13.3065566 0.850045884,13.1501066 C0.698307432,13.009322 0.6,12.816096 0.6,12.6 L0.6,12.6 L0.6,1.4 C0.6,1.18390396 0.698307432,0.990677969 0.850045884,0.849893418 C1.01866867,0.693443402 1.25250642,0.6 1.50892857,0.6 L1.50892857,0.6 L8.23774164,0.6 Z"></path>
        <line x1="7.89285714" y1="6.825" x2="3.25" y2="6.825"></line>
        <line x1="9.98214286" y1="9.625" x2="3.25" y2="9.625"></line>
      </g>
    </g>
  </svg>
);

export const IconPageNor = (props: Partial<CustomIconComponentProps>) => (
  <Icon rev={undefined} component={PageNorSvg} {...props} />
);
