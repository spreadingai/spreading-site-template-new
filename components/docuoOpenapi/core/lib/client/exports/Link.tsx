import React, { useEffect, useImperativeHandle, useRef } from "react";

type Props = {
  isNavLink?: boolean;
  to?: string;
  href?: string;
  activeClassName?: string;
  isActive?: boolean;
  "data-noBrokenLinkCheck"?: boolean;
  autoAddBaseUrl?: boolean;
  children: React.ReactNode;
};

const Link = (
  {
    isNavLink,
    to,
    href,
    activeClassName,
    isActive,
    // TODO:??????
    "data-noBrokenLinkCheck": noBrokenLinkCheck,
    autoAddBaseUrl = true,
    children,
    // TODO:??????
    ...props
  }: Props,
  forwardedRef
) => {
  const innerRef = useRef(null);
  useImperativeHandle(forwardedRef, () => innerRef.current);

  return (
    <a ref={innerRef} href={to}>
      {children}
    </a>
  );
};

export default React.forwardRef(Link);
