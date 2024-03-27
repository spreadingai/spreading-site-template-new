import React, { FC, useEffect, useMemo, useRef } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import type { footerProps } from "./@types";
import { useMediaQuery } from "usehooks-ts";
import FooterMobile from "./mobile";
import classNames from "classnames";
import { getSocial } from "./utils";
import ThemeContext from "@/components/header/Theme.context";

const defaultFooter = {
  logo: undefined,
  copyright: undefined,
  caption: undefined,
  links: [],
  socials: [],
};

const Footer: FC<footerProps> = ({ docuoConfig }) => {
  const footer = Object.assign(
    {},
    defaultFooter,
    docuoConfig?.themeConfig?.footer || {}
  );
  const itemWidth = 200;
  const links = footer?.links || [];
  const socials = footer?.socials || [];
  const len = links.slice(0, 4).length;
  const [width, setWidth] = React.useState(0);
  const [towRowWidth, setTowRowWidth] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const rightRef = useRef<HTMLDivElement>(null);
  const isShowTwoCol = useMediaQuery(`(max-width: ${width}px)`);
  const isWrap = useMediaQuery(`(max-width: ${towRowWidth}px)`);
  const isShowMobile = useMediaQuery(`(max-width: 1024px)`);
  const isSMWrap = useMediaQuery(`(max-width: ${3 * 200 + 64}px)`);
  const { theme } = React.useContext(ThemeContext);

  useEffect(() => {
    const towColWidth = 40 * 2 + 320 + 40 + len * itemWidth;
    const rowWidth = 40 * 2 + 320 + 40 + 2 * itemWidth;

    setWidth(towColWidth);
    setTowRowWidth(rowWidth);
  }, [len]);

  useEffect(() => {
    setIsMobile(isShowMobile);
  }, [isShowMobile]);

  const logo = useMemo(() => {
    if (typeof footer.logo === "string") {
      return footer.logo;
    }
    if (theme === "dark" && typeof footer.logo?.dark === "string") {
      return footer.logo?.dark;
    }
    if (theme === "light" && typeof footer.logo?.light === "string") {
      return footer.logo?.light;
    }
    return "";
  }, [footer.logo, theme]);

  const isDarkMode = theme === "dark";

  return (
    <footer
      className={`${styles["footer-container"]} w-full flex  justify-center`}
    >
      <div className={styles["container"]}>
        <div className={styles["footer-wrapper"]}>
          <div className={styles["left"]}>
            {logo && (
              <div className={styles["logo-container"]}>
                <img
                  className={styles.logo}
                  src={
                    (logo as string).includes("http")
                      ? `${logo}`
                      : `${process.env.NEXT_PUBLIC_BASE_PATH || "/"}${
                          process.env.NEXT_PUBLIC_BASE_PATH ? "/" : ""
                        }${logo}`
                  }
                  alt={"logo"}
                />
              </div>
            )}

            {footer.caption && (
              <div className={styles["description"]}>{footer.caption}</div>
            )}
            {socials.length > 0 && (
              <div className={styles["social"]}>
                {socials.map((social, index) => {
                  return (
                    <a key={index} href={social.href} target="_blank">
                      <span className={styles["social-item"]}>
                        {getSocial(social.logo, isDarkMode)}
                      </span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div
            className={classNames(styles["right"], {
              [styles["two-row"]]: isWrap,
              [styles["two-col"]]: isShowTwoCol,
              [styles["sm-wrap"]]: isSMWrap,
            })}
            ref={rightRef}
          >
            {isMobile ? (
              <FooterMobile items={links} />
            ) : (
              links.map((group, index, arr) => {
                return (
                  <div key={index} className={`${styles["group"]}`}>
                    <div className={styles["group-title"]}>{group.title}</div>
                    <div className={styles["group-items"]}>
                      {group.items.map((item: any, index) => {
                        return (
                          <Link
                            key={index}
                            className={styles["group-item"]}
                            href={item.href || { pathname: item.to }}
                            target="_blank"
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        {footer["copyright"] && (
          <div className={styles["copyright"]}>{footer["copyright"]}</div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
