import styles from "./index.module.scss";
import { Dropdown } from "antd";
import React, { useMemo } from "react";
import IconArrowRight from "@/assets/icons/iconArrowRight.svg";
import Link from "next/link";
import { NavbarLink } from "../header/@types";
import { platformList } from "@/components/context/platformContext";

interface InsVersionDropdownProps {
  type: "instance" | "version" | "group" | "platform";
  menu: NavbarLink;
}

const InsVersionDropdown = ({ type, menu }: InsVersionDropdownProps) => {
  const [open, setOpen] = React.useState(false);

  const DropdownList = useMemo(() => {
    return menu.items.map((item, index) => {
      const isExternal = !!item.href || /^https?:/i.test(item.defaultLink);
      const content = (
        <>
          <span
            className={`mr-[6px] zgfont ${platformList[item.key] || ""}`}
          ></span>
          {item.label}
        </>
      );
      return {
        key: index,
        // 注意：<a>/<Link> 必须是 label 的根节点（ant-dropdown-menu-title-content 的直接子元素），
        // antd 才会用 a::after{position:absolute;inset:0} 把点击热区扩展成整个列表项
        label: isExternal ? (
          <a
            href={item.href || item.defaultLink || "/"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            {content}
          </a>
        ) : (
          <Link
            href={item.to || item.defaultLink || "/"}
            className="flex items-center"
          >
            {content}
          </Link>
        ),
        className: `${styles["popup-list-item"]} ${
          menu.key === item.key ? styles.active : ""
        }`,
      };
    });
  }, [menu.items, menu.key]);

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (val) {
      setTimeout(() => {
        const activeNode = document.querySelector(
          `.${styles.active}.${styles["popup-list-item"]}`
        );
        if (activeNode) {
          activeNode.scrollIntoView();
        }
      }, 100);
    }
  };

  if (
    (type === "instance" || type === "version" || type === "platform") &&
    menu.items.length <= 1
  )
    return null;

  return (
    <Dropdown
      menu={{
        items: DropdownList,
        className: styles["ins-version-popup"],
        style: { top: "4px" },
      }}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <div
        title={menu.label as string}
        id="ins-version-popup-wrapper"
        className={`mt-[12px] ${styles["ins-version-wrapper"]} ${
          styles[type]
        } ${open ? styles.active : ""}`}
      >
        <span
          id="pop-overlay"
          className={`${styles["label"]} pop-overlay text-ellipsis overflow-hidden`}
        >
          {menu.label}
        </span>
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

export default InsVersionDropdown;
