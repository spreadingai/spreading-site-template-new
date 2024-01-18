import { Dropdown, MenuProps, Space } from "antd";
import React, { FC, useMemo } from "react";
import styles from "./styles.module.scss";
import IconArrowRight from "@/assets/icons/iconArrowRight.svg";
import Link from "next/link";
import { NavbarLink } from "./@types";

const DropdownItem: FC<{ menu: NavbarLink }> = ({ menu }) => {
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
      };
    });
  }, [menu.items, menu.to]);
  return (
    <Dropdown
      menu={{ items: DropdownList, className: styles["popup"] }}
      open={open}
      onOpenChange={setOpen}
    >
      <div className={styles["items-container"]}>
        <span className={styles["items"]}>{menu.label}</span>
        {open ? (
          <IconArrowRight
            className={styles["icon"]}
            style={{ transform: "rotate(-90deg)" }}
          />
        ) : (
          <IconArrowRight
            className={styles["icon"]}
            style={{ transform: "rotate(90deg)" }}
          />
        )}
      </div>
    </Dropdown>
  );
};

export default DropdownItem;
