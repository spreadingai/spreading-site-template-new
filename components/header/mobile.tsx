import React, { FC, useMemo, useState } from "react";
import IconBurgerMenu from "assets/icons/iconBurgerMenu.svg";
import IconBurgerMenuClose from "assets/icons/iconBurgerMenuClose.svg";
import IconArrowRight from "assets/icons/iconArrowRight.svg";
import styles from "./mobile.module.scss";
import { Collapse } from "antd";
import Link from "next/link";
import { NavbarLink } from "./@types";
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
          {menus.map((menu, index) => {
            if (menu.items) {
              const items = [
                {
                  key: index,
                  label: (
                    <div className={styles["mobile-item"]}>{menu.label}</div>
                  ),
                  children: (
                    <div className="mobile-item2">
                      {menu.items.map((child, index) => (
                        <div
                          key={index}
                          style={{
                            height: 44,
                            fontSize: 14,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {child.label}
                        </div>
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
              <Link
                key={index}
                className={styles["mobile-item"]}
                href={menu.href}
                // target={menu.target}
              >
                {menu.label}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }, [menus]);

  return (
    <div>
      <div className={styles["mobile-menus-switch"]}>
        {open ? (
          <IconBurgerMenuClose onClick={() => setOpen(() => false)} />
        ) : (
          <IconBurgerMenu onClick={() => setOpen(() => true)} />
        )}
      </div>
      {open &&
        createPortal(DropdownList, document.body, "mobile-menu-container")}
    </div>
  );
};

export default Mobile;
