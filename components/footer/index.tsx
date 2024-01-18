import React, { FC, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import IconDiscord from "@/assets/icons/social/Discord.svg";
import IconFacebook from "@/assets/icons/social/Facebook.svg";
import IconGithub from "@/assets/icons/social/GitHub.svg";
import IconLinkedIn from "@/assets/icons/social/LinkedIn.svg";
import IconX from "@/assets/icons/social/X.svg";
import IconYoutube from "@/assets/icons/social/YouTube.svg";
import Link from "next/link";
import type { footerProps } from "./@types";
import { useMediaQuery, useDarkMode } from "usehooks-ts";
import FooterMobile from "./mobile";
import classNames from "classnames";
import DocuoConfig from "@/docs/docuo.config.json";
import { getSocial } from "./utils";

const defaultFooter = {
  logo: undefined,
  copyright: undefined,
  caption: undefined,
  links: [],
  socials: [],
};

const Footer: FC<footerProps> = (props) => {
  const footer = DocuoConfig?.themeConfig?.footer || defaultFooter;
  const itemWidth = 200;
  const links = footer?.links || [];
  const socials = footer?.socials || [];
  const len = links.slice(0, 4).length;
  const [width, setWidth] = React.useState(0);
  const [towRowWidth, setTowRowWidth] = React.useState(0);
  const rightRef = useRef<HTMLDivElement>(null);
  const isShowTwoCol = useMediaQuery(`(max-width: ${width}px)`);
  const isWrap = useMediaQuery(`(max-width: ${towRowWidth}px)`);
  const isShowMobile = useMediaQuery(`(max-width: 375px)`);
  const isSMWrap = useMediaQuery(`(max-width: ${3 * 200 + 64}px)`);
  const { isDarkMode } = useDarkMode(false);

  useEffect(() => {
    const towColWidth = 40 * 2 + 320 + 40 + len * itemWidth;
    const rowWidth = 40 * 2 + 320 + 40 + 2 * itemWidth;

    setWidth(towColWidth);
    setTowRowWidth(rowWidth);
  }, [len]);
  if (!footer) return null;
  return (
    <footer className={styles["footer-container"]}>
      <div className={styles["footer-wrapper"]}>
        <div className={styles["left"]}>
          {footer.logo && (
            <div className={styles["logo-container"]}>
              <img
                className={styles.logo}
                src={
                  (footer.logo as string).includes("http")
                    ? `${footer.logo}`
                    : `/${footer.logo}`
                }
                alt={"logo"}
              />
              {/* <div className={styles["logo-title"]}>{"Untitled"}</div> */}
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
                    {/* <Image src={social.logo} alt={"logo"} /> */}
                    {/* {<IconDiscord />} */}
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
          {isShowMobile ? (
            <FooterMobile items={links} />
          ) : (
            links.slice(0, 4).map((group, index, arr) => {
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
    </footer>
  );
};

export default Footer;
