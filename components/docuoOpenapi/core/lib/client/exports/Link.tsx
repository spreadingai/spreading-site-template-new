import React, { useEffect, useImperativeHandle, useRef } from "react";
import NextLink from "next/link";

type Props = {
  className?: string;
  title?: string;
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
    className,
    title,
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
    <NextLink ref={innerRef} href={to}>
      {children}
    </NextLink>
  );
};

export default React.forwardRef(Link);
