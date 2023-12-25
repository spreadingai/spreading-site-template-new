import React, { FC, useEffect } from "react";
import styles from "./styles.module.scss";
import defaultLogo from "@/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";
import Mobile from "./mobile";
import DropdownItem from "./DropdownItem";
import DocuoConfig from "@/docs/docuo.config";

const Header: FC = () => {
  const { items } = DocuoConfig.themeConfig.navbar;
  const [width, setWidth] = React.useState(0);
  const matches = useMediaQuery(`(max-width: ${Math.max(width, 375)}px)`); // mobile
  const menusRef = React.useRef<HTMLDivElement>(null);
  const logoRef = React.useRef<HTMLAnchorElement>(null);
  console.log(items, "items");

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
      <Link className={styles["logo-container"]} href={"/"} ref={logoRef}>
        <Image className={styles.logo} src={defaultLogo} alt={"logo"} />
        <span className={styles["logo-title"]}>{"Untitled"}</span>
      </Link>
      {matches ? (
        <Mobile menus={items} />
      ) : (
        <div className={styles["menus"]} ref={menusRef}>
          {items.filter(item=>item.label).map((menu, index) => {
            if (menu.type === "dropdown") {
              return <DropdownItem menu={menu} key={index} />;
            }
            return (
              <Link
                key={index}
                className={styles["item"]}
                // href={"#"}
                href={menu.href || { pathname: menu.to }}
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
