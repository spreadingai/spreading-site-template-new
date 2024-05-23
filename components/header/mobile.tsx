import React, { FC, useEffect, useMemo, useState } from "react";
import IconNavMore from "@/assets/icons/IconNavMore.svg";
import IconNavMoreActive from "@/assets/icons/IconNavMoreActive.svg";
import IconNavMoreDark from "@/assets/icons/IconNavMore@dark.svg";
import IconNavMoreActiveDark from "@/assets/icons/IconNavMoreActive@dark.svg";
import IconMenuSearch from "@/assets/icons/iconMenuSearch.svg";
import IconMenuSearchDark from "@/assets/icons/iconMenuSearch@dark.svg";
import IconArrowRight from "@/assets/icons/iconArrowRight.svg";
import styles from "./mobile.module.scss";
import { Collapse } from "antd";
import Link from "next/link";
import { NavbarLink } from "./@types";
import { createPortal } from "react-dom";
import ThemeContext from "@/components/header/Theme.context";

interface Props {
  menus: NavbarLink[];
  renderThemeSwitch: () => any;
  renderLanguageSwitch: () => any;
  isShowSearchIcon: boolean;
}

const Mobile: FC<Props> = ({
  menus,
  renderThemeSwitch,
  renderLanguageSwitch,
  isShowSearchIcon,
}) => {
  const [open, setOpen] = useState(false);
  const { theme } = React.useContext(ThemeContext);

  const DropdownList = useMemo(() => {
    return (
      <div className={styles["mobile-container"]}>
        <div
          className={styles["mobile-mask"]}
          onClick={() => setOpen(() => false)}
        />
        <div className={styles["mobile-menus"]}>
          {/* @ts-ignore */}
          {menus.map((menu, index, arr) => {
            if (!menu) return null;
            if (menu.items) {
              const items = [
                {
                  key: index,
                  label: (
                    <div className={styles["mobile-item"]}>{menu.label}</div>
                  ),
                  children: (
                    <div className={styles["mobile-down-items"]}>
                      {menu.items.map((child, index) => (
                        <Link
                          key={index}
                          className={styles["mobile-down-item"]}
                          href={
                            child.href || child.to || child.defaultLink || "/"
                          }
                          target={child.href ? "_blank" : "_self"}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ),
                  // showArrow: false,
                },
              ];
              return (
                <Collapse
                  key={index}
                  expandIconPosition="end"
                  defaultActiveKey={["1"]}
                  ghost
                  items={items}
                  expandIcon={(panelProps) => {
                    if (panelProps.isActive) {
                      return (
                        <IconArrowRight
                          className={styles["dropdown-icon"]}
                          style={{
                            fontSize: 12,
                            transition: "transform 0.3s",
                            transform: "rotate(90deg)",
                          }}
                        />
                      );
                    }
                    return (
                      <IconArrowRight
                        className={styles["dropdown-icon"]}
                        style={{
                          fontSize: 12,
                          transition: "transform 0.3s",
                        }}
                      />
                    );
                  }}
                />
              );
            }
            return (
              <React.Fragment key={index}>
                <Link
                  className={styles["mobile-item"]}
                  href={menu.href || menu.to || menu.defaultLink || "/"}
                  target={menu.href ? "_blank" : "_self"}
                >
                  {menu.label}
                </Link>
                {arr.length - 1 !== index && <div className={styles["line"]} />}
              </React.Fragment>
            );
          })}
          <div className={styles["mobile-btn-list"]}>
            {renderThemeSwitch()}
            {renderLanguageSwitch()}
          </div>
        </div>
      </div>
    );
  }, [menus]);

  const NavMoreNormal = theme === "dark" ? IconNavMoreDark : IconNavMore;
  const NavMoreActive =
    theme === "dark" ? IconNavMoreActiveDark : IconNavMoreActive;
  const MenuSearch = theme === "dark" ? IconMenuSearchDark : IconMenuSearch;

  return (
    <div>
      <div className={`cursor-pointer flex gap-4`}>
        {isShowSearchIcon && (
          <MenuSearch
            onClick={() => {
              const el: HTMLButtonElement =
                document.querySelector(".DocSearch-Button");
              el && el.click();
            }}
          />
        )}
        <span onClick={() => setOpen((value) => !value)}>
          {open ? <NavMoreActive /> : <NavMoreNormal />}
        </span>
      </div>
      {open &&
        createPortal(DropdownList, document.body, "mobile-menu-container")}
    </div>
  );
};

export default Mobile;
