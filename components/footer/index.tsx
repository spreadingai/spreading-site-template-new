import React, { FC, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import defaultLogo from "@/assets/images/logo.png";
// import IconDiscord from "@/assets/icons/iconDiscord.svg";
import IconDiscord from "@/assets/icons/social/Discord.svg";
import IconFacebook from "@/assets/icons/social/Facebook.svg";
import IconGithub from "@/assets/icons/social/GitHub.svg";
import IconLinkedIn from "@/assets/icons/social/LinkedIn.svg";
import IconX from "@/assets/icons/social/X.svg";
import IconYoutube from "@/assets/icons/social/YouTube.svg";
import Link from "next/link";
import type { footerProps } from "./@types";
import { useMediaQuery } from "usehooks-ts";
import FooterMobile from "./mobile";
import classNames from "classnames";
import DocuoConfig from "@/docs/docuo.config";

const Footer: FC<footerProps> = (props) => {
  const { footer } = DocuoConfig.themeConfig;
  const itemWidth = 200;
  const len = footer.links.slice(0, 4).length;
  const [width, setWidth] = React.useState(0);
  const [towRowWidth, setTowRowWidth] = React.useState(0);
  const rightRef = useRef<HTMLDivElement>(null);
  const isShowTwoCol = useMediaQuery(`(max-width: ${width}px)`);
  const isWrap = useMediaQuery(`(max-width: ${towRowWidth}px)`);
  const isShowMobile = useMediaQuery(`(max-width: 375px)`);
  const isSMWrap = useMediaQuery(`(max-width: ${3 * 200 + 64}px)`);

  useEffect(() => {
    const towColWidth = 40 * 2 + 320 + 40 + len * itemWidth;
    const rowWidth = 40 * 2 + 320 + 40 + 2 * itemWidth;

    setWidth(towColWidth);
    setTowRowWidth(rowWidth);
  }, []);

  const getSocial = (logo: string) => {
    switch (logo) {
      case "Linkedin":
        return <IconLinkedIn />;
      case "X":
        return <IconX />;
      case "Twitter":
        return <IconX />;
      case "Facebook":
        return <IconFacebook />;
      case "Youtube":
        return <IconYoutube />;
      case "Github":
        return <IconGithub />;
      case "Discord":
        return <IconDiscord />;
      default:
        return (
          <Image src={logo} width={20} height={20} alt={"custom social"} />
        );
    }
  };

  return (
    <footer className={styles["footer-container"]}>
      <div className={styles["footer-wrapper"]}>
        <div className={styles["left"]}>
          <div className={styles["logo-container"]}>
            <Image className={styles.logo} src={defaultLogo} alt={"logo"} />
            {/* <div className={styles["logo-title"]}>{"Untitled"}</div> */}
          </div>
          <div className={styles["description"]}>{footer.caption}</div>
          <div className={styles["social"]}>
            {footer.socials.map((social, index) => {
              return (
                <a key={index} href={social.href} target="_blank">
                  {getSocial(social.logo)}
                  {/* <Image src={social.logo} alt={"logo"} /> */}
                  {/* {<IconDiscord />} */}
                </a>
              );
            })}
          </div>
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
            <FooterMobile items={footer.links} />
          ) : (
            footer.links.slice(0, 4).map((group, index, arr) => {
              return (
                <div key={index} className={`${styles["group"]}`}>
                  <div className={styles["group-title"]}>{group.title}</div>
                  <div className={styles["group-items"]}>
                    {group.items.map((item, index) => {
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
