import React, { FC, useMemo, useState } from "react";
import IconBurgerMenu from "@/assets/icons/iconBurgerMenu.svg";
import IconNavMore from "@/assets/icons/IconNavMore.svg";
import IconBurgerMenuClose from "@/assets/icons/iconBurgerMenuClose.svg";
import IconMenuSearch from "@/assets/icons/iconMenuSearch.svg";
import IconArrowRight from "@/assets/icons/iconArrowRight.svg";
import styles from "./mobile.module.scss";
import { Collapse } from "antd";
import Link from "next/link";
import { NavBarItem, NavbarLink } from "./@types";
import { createPortal } from "react-dom";

interface Props {
  menus: NavbarLink[];
}

const Mobile: FC<Props> = ({ menus }) => {
  const [open, setOpen] = useState(false);

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
                            child.defaultLink ||
                            child.href || { pathname: child.to }
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
                          style={{
                            fontSize: 12,
                            color: "#444444",
                            transition: "transform 0.3s",
                            transform: "rotate(90deg)",
                          }}
                        />
                      );
                    }
                    return (
                      <IconArrowRight
                        style={{
                          fontSize: 12,
                          color: "#444444",
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
                  href={menu.defaultLink || menu.href || { pathname: menu.to }}
                  target={menu.href ? "_blank" : "_self"}
                >
                  {menu.label}
                </Link>
                {arr.length - 1 !== index && <div className={styles["line"]} />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }, [menus]);

  return (
    <div>
      <div className={`cursor-pointer flex gap-4`}>
        <IconMenuSearch
          onClick={() => {
            const el: HTMLButtonElement =
              document.querySelector(".DocSearch-Button");

            el && el.click();
          }}
        />
        <span onClick={() => setOpen((value) => !value)}>
          {open ? <IconBurgerMenu /> : <IconNavMore />}
        </span>
      </div>
      {open &&
        createPortal(DropdownList, document.body, "mobile-menu-container")}
    </div>
  );
};

export default Mobile;
