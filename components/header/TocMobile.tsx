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
        key: index,
        label: item.href ? (
          <a href={item.href} target="_blank">
            {item.label}
          </a>
        ) : (
          <Link href={item.to || item.defaultLink || "/"}>{item.label}</Link>
        ),
        className: styles["popup-list-items"],
      };
    });
  }, [menu.items, menu.to]);
  return (
    <Dropdown
      menu={{
        items: DropdownList,
        className: styles["popup"],
      }}
      open={open}
      onOpenChange={setOpen}
    >
      <div className={styles["items-container"]}>
        <span className={`${styles["items"]} pop-overlay`}>{menu.label}</span>
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
