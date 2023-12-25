import React, { FC } from "react";
import { FooterLinkGroup } from "./@types";
import Link from "next/link";
import styles from "./mobile.module.scss";
import IconArrowRight from "@/assets/icons/iconArrowDown.svg";
import { Collapse, CollapseProps } from "antd";
const FooterMobile: FC<{ items: FooterLinkGroup[] }> = ({ items }) => {
  const data: CollapseProps["items"] = items.map((item, index) => {
    return {
      key: index,
      label: <div className={styles["mobile-items-title"]}>{item.title}</div>,
      children: (
        <div className={styles["mobile-items"]}>
          {item.items.map((child, index) => (
            <Link
              key={index}
              className={styles["mobile-item"]}
              href={child.href || child.to}
            >
              {child.label}
            </Link>
          ))}
        </div>
      ),
      className: styles["collapse-item"],
    };
  });

  return (
    <div className={styles["mobile-footer-container"]}>
      <Collapse
        ghost
        expandIconPosition="end"
        items={data}
        expandIcon={(panelProps) => {
          if (panelProps.isActive) {
            return (
              <IconArrowRight
                style={{
                  fontSize: 24,
                  color: "#FFF",
                  transition: "transform 0.3s",
                }}
              />
            );
          }
          return (
            <IconArrowRight
              style={{
                fontSize: 24,
                color: "#FFF",
                transition: "transform 0.3s",
                transform: "rotate(-90deg)",
              }}
            />
          );
        }}
      />
    </div>
  );
};

export default FooterMobile;
