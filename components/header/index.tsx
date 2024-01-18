import React, { FC, useEffect } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";
import Mobile from "./mobile";
import DropdownItem from "./DropdownItem";
import { DocuoConfig } from "@/lib/types";

interface Props {
  docuoConfig: DocuoConfig;
}

const Header = (props: Props) => {
  const { docuoConfig } = props;
  const { navbar } = docuoConfig.themeConfig;
  const { items } = navbar;
  const [width, setWidth] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const matches = useMediaQuery(`(max-width: ${Math.max(width, 375)}px)`); // mobile
  const menusRef = React.useRef<HTMLDivElement>(null);
  const logoRef = React.useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setIsMobile(matches);
  }, [matches]);

  useEffect(() => {
    // compute the width of the hamburger menu
    if (menusRef.current) {
      const menuWidth = menusRef.current.clientWidth;
      const logoWidth = logoRef.current?.clientWidth ?? 0;
      const width = menuWidth + logoWidth + 32 * 2 + 40;
      console.log("[header] width", width);

      setWidth(width);
    }
  }, []);

  return (
    <header className={styles["header-container"]}>
      {navbar.logo ? (
        <Link
          className={styles["logo-container"]}
          href={navbar.iconRedirectUrl || process.env.SITE_URL || ""}
          ref={logoRef}
        >
          <img
            className={styles.logo}
            src={
              (navbar.logo as string).includes("http")
                ? `${navbar.logo}`
                : `/${navbar.logo}`
            }
            alt={"logo"}
          />
          <span className={styles["logo-title"]}>{navbar.title}</span>
        </Link>
      ) : null}
      {isMobile ? (
        // @ts-ignore
        <Mobile menus={items.filter((item) => item.label)} />
      ) : (
        <div className={styles["menus"]} ref={menusRef}>
          {items
            .filter((item) => item.label)
            .map((menu, index) => {
              if ((menu?.type === "dropdown") || Array.isArray(menu.items)) {
                // @ts-ignore
                return <DropdownItem menu={menu} key={index} />;
              }
              return (
                <Link
                  key={index}
                  className={styles["item"]}
                  href={menu.defaultLink || menu.href || { pathname: menu.to }}
                  // target={menu.target}
                >
                  {menu.label}
                </Link>
              );
            })}
        </div>
      )}
    </header>
  );
};

export default Header;
