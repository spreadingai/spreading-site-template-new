import React, { FC } from "react";
import { Tooltip } from "antd";
import styles from "./mobile.module.scss";
const FooterMobileZH: FC<{ logo: any; logoUrl?: string }> = ({
  logo,
  logoUrl,
}) => {
  const handleItemClick = (link: string) => {
    window.open(link);
  };
  const fixedItems = [
    {
      title: "热门产品",
      link: "https://www.zego.im",
    },
    {
      title: "解决方案",
      link: "https://www.zego.im",
    },
    {
      title: "开发者中心",
      link: "https://doc-zh.zego.im",
    },
    {
      title: "价格",
      link: "https://www.zego.im/price",
    },
  ];
  return (
    <div className={styles["mobile-footer-container-zh"]}>
      <div className={styles.top}>
        {logo && (
          <div className={styles["logo-container"]}>
            <a
              href={
                logoUrl ||
                `${
                  process.env.NEXT_PUBLIC_CUSTOM_DOMAIN ||
                  process.env.NEXT_PUBLIC_SITE_URL ||
                  ""
                }${process.env.NEXT_PUBLIC_BASE_PATH || ""}`
              }
              target="_blank"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  (logo as string).includes("http")
                    ? `${logo}`
                    : `${
                        process.env.NEXT_PUBLIC_BASE_PATH || ""
                      }/${logo.replace(/^\//, "")}`
                }
                alt={"logo"}
              />
            </a>
          </div>
        )}
        <div className={styles["contact-ui-icon-con"]}>
          <Tooltip
            classNames={{ body: styles["contact-us-phone-wrap"] }}
            title={
              <span
                onClick={() => {
                  window.location.href = "tel:400-1006-604";
                }}
                className={styles["contact-us-phone"]}
              >
                400-1006-604 转 1
              </span>
            }
            trigger="click"
            arrow={false}
          >
            <span className={styles["contact-ui-icon"]}></span>
          </Tooltip>
          <Tooltip
            classNames={{ body: styles["contact-us-address-wrap"] }}
            title={
              <span className={styles["contact-us-address"]}>
                <span>深圳市南山区前海卓越壹号</span>
                <span>T3写字楼38-39层</span>
              </span>
            }
            trigger="click"
            arrow={false}
          >
            <span className={styles["contact-ui-icon"]}></span>
          </Tooltip>
        </div>
      </div>
      <div className={styles.bottom}>
        {fixedItems.map((item, index) => (
          <div
            key={index}
            className={styles["item-title"]}
            onClick={() => handleItemClick(item.link)}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterMobileZH;
