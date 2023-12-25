import React, { FC, useEffect } from "react";
import styles from "./styles.module.scss";
import defaultLogo from "@/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Dropdown, MenuProps } from "antd";
import { useMediaQuery } from "usehooks-ts";
import IconBurgerMenu from "@/assets/icons/iconBurgerMenu.svg";
import Mobile from "./mobile";
import DropdownItem from "./DropdownItem";
import { NavbarLink } from "./@types";

const items: NavbarLink[] = [
  {
    label: "Documentation 01",
    href: "https://www.baidu.com",
  },
  {
    label: "Documentation 02",
    href: "https://www.baidu.com",
  },
];
const menus: NavbarLink[] = [
  {
    label: "Price",
    href: "https://www.baidu.com",
  },
  {
    label: "Blog",
    href: "https://www.google.com",
  },
  {
    type: "dropdown",
    label: "Documentation",
    href: "https://www.google.com",
    items: items,
  },
  {
    type: "dropdown",
    label: "Documentation2",
    href: "https://www.google.com",
    items: items,
  },
];

const Header: FC = () => {
  const [width, setWidth] = React.useState(0);
  const matches = useMediaQuery(`(max-width: ${Math.max(width, 375)}px)`); // mobile
  const menusRef = React.useRef<HTMLDivElement>(null);
  const logoRef = React.useRef<HTMLAnchorElement>(null);

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
        <Mobile menus={menus} />
      ) : (
        <div className={styles["menus"]} ref={menusRef}>
          {menus.map((menu, index) => {
            if (menu.type === "dropdown") {
              return <DropdownItem menu={menu} key={index} />;
            }
            return (
              <Link
                key={index}
                className={styles["item"]}
                href={menu.href}
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
