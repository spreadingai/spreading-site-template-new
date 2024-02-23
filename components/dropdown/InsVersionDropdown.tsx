import styles from './index.module.scss';
import { Dropdown } from "antd";
import React, { useMemo } from "react";
import IconArrowRight from "@/assets/icons/iconArrowRight.svg";
import Link from "next/link";
import { NavbarLink } from "../header/@types";

interface InsVersionDropdownProps {
  type: "instance" | "version";
  menu: NavbarLink;
}

const InsVersionDropdown = ({ type, menu }: InsVersionDropdownProps) => {
  const [open, setOpen] = React.useState(false);

  const DropdownList = useMemo(() => {
    return menu.items.map((item, index) => {
      return {
        ...item,
        key: index,
        label: (
          <Link
            href={item.defaultLink || item.href || { pathname: menu.to }}
            target={item.href ? "_blank" : "_self"}
          >
            {item.label}
          </Link>
        ),
        className: `${styles["popup-list-item"]} ${menu.label === item.label ? styles.active : ""}`,
      };
    });
  }, [menu.items, menu.to]);

  if (menu.items.length <= 1) return null;

  return (
    <Dropdown
      menu={{
        items: DropdownList,
        className: styles["ins-version-popup"],
        style: { top: "4px" }
      }}
      open={open}
      onOpenChange={setOpen}
    >
      <div
        title={menu.label as string}
        className={`${styles["ins-version-wrapper"]} ${styles[type]} ${open ? styles.active : ""}`}
      >
        <span className={`${styles["label"]} pop-overlay text-ellipsis overflow-hidden`}>{menu.label}</span>
        {open ? (
          <IconArrowRight className={styles["icon"]} style={{ transform: "rotate(-90deg)" }} />
        ) : (
          <IconArrowRight className={styles["icon"]} style={{ transform: "rotate(90deg)" }} />
        )}
      </div>
    </Dropdown>
  );
};

export default InsVersionDropdown;
