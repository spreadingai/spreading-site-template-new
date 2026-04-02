import React, { FC, useEffect, useMemo, useRef } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import type { footerProps } from "./@types";
import { useMediaQuery } from "usehooks-ts";
import FooterMobile from "./mobile";
import FooterMobileZH from "./mobile-zh";
import classNames from "classnames";
import { getSocial } from "./utils";
import ThemeContext from "@/components/header/Theme.context";
import useLanguage from "@/components/hooks/useLanguage";

const defaultFooter = {
  logo: undefined,
  logoUrl: undefined,
  copyright: undefined,
  caption: undefined,
  links: [],
  socials: [],
  policies: [],
};

const Footer: FC<footerProps> = ({ docuoConfig }) => {
  const { currentLanguage } = useLanguage();
  const footer = Object.assign(
    {},
    defaultFooter,
    docuoConfig.themeConfig["footer"] || {},
    docuoConfig.themeConfig[`footer.${currentLanguage}`] || {},
  );
  const links = footer?.links || [];
  const socials = footer?.socials || [];
  const policies = (footer?.policies || []).slice(0, 6); // 最多显示6个
  const [isMobile, setIsMobile] = React.useState(false);
  const rightRef = useRef<HTMLDivElement>(null);
  const isShowMobile = useMediaQuery(`(max-width: 1024px)`);
  const { theme } = React.useContext(ThemeContext);

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
      className={`${styles["footer-container"]} ${currentLanguage === "zh" ? styles["zh"] : ""} w-full flex  justify-center`}
    >
      <div className={styles["container"]}>
        <div className={styles["footer-wrapper"]}>
          <div className={styles["left"]}>
            {currentLanguage !== "zh" && logo && (
              <div className={styles["logo-container"]}>
                <a
                  href={
                    footer.logoUrl ||
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
                    className={styles.logo}
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
            <div className={styles["details-info"]}>
              {currentLanguage === "zh" && (
                <>
                  <div className={styles["contact-us-tips"]}>
                    关注或联系我们
                  </div>
                  <div className={styles["contact-us-tips-mobile"]}>
                    关注公众号视频号，联系技术专家，了解更多咨询
                  </div>
                </>
              )}
              {currentLanguage === "zh" && (
                <div className={styles["phone-number"]}>
                  电话:
                  <span> 400-1006-604 转 1</span>
                </div>
              )}
              {footer.caption && (
                <div className={styles["description"]}>{footer.caption}</div>
              )}
              {currentLanguage === "zh" && (
                <div className={styles["contact-us-qrcode-con"]}>
                  <div className={styles["qrcode-item"]}>
                    <span className={styles["qrcode-text"]}>技术专家</span>
                  </div>
                  <div className={styles["qrcode-item"]}>
                    <span className={styles["qrcode-text"]}>公众号</span>
                  </div>
                  <div className={styles["qrcode-item"]}>
                    <span className={styles["qrcode-text"]}>视频号</span>
                  </div>
                </div>
              )}
            </div>
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
            {currentLanguage !== "zh" && (
              <div className={styles["medal-con"]}>
                <span className={styles["medal-item"]} onClick={() => window.open("https://www.g2.com/products/zegocloud-zegocloud/reviews")}></span>
                <span className={styles["medal-item"]} onClick={() => window.open("https://www.g2.com/products/zegocloud-zegocloud/reviews")}></span>
                <span className={styles["medal-item"]} onClick={() => window.open("https://www.g2.com/products/zegocloud-zegocloud/reviews")}></span>
                <span className={styles["medal-item"]} onClick={() => window.open("https://www.g2.com/products/zegocloud-zegocloud/reviews")}></span>
              </div>
            )}
          </div>

          <div
            className={classNames(styles["right"])}
            style={{ display: links?.length === 0 ? "none" : undefined }}
            ref={rightRef}
          >
            {isMobile ? (
              currentLanguage !== "zh" ? (
                <FooterMobile items={links} />
              ) : (
                <FooterMobileZH logo={logo} logoUrl={footer.logoUrl} />
              )
            ) : (
              links.map((group, index, arr) => {
                return (
                  <div key={index} className={`${styles["group"]}`}>
                    <div className={styles["group-title"]}>{group.title}</div>
                    <div className={styles["group-items"]}>
                      {group.items.map((item: any, index) => {
                        return item.href ? (
                          <a
                            key={index}
                            className={styles["group-item"]}
                            href={item.href}
                            target="_blank"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <Link
                            key={index}
                            className={styles["group-item"]}
                            href={item.to || "/"}
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
          <div className={styles["copyright-container"]}>
            {currentLanguage === "zh" && logo && (
              <div className={styles["logo-container"]}>
                <a
                  href={
                    footer.logoUrl ||
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
                    className={styles.logo}
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
            <div className={styles["copyright-content"]}>
              <div className={styles["copyright"]}>
                {typeof footer["copyright"] === "string" ? (
                  footer["copyright"]
                ) : footer["copyright"].href ? (
                  <a
                    href={footer["copyright"].href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {footer["copyright"].label}
                    {currentLanguage === "zh" && (
                      <span className={styles["copyright-icon-con"]}>
                        <i className={styles["copyright-icon"]}></i>
                        <span>粤公网安备44030502006452号</span>
                      </span>
                    )}
                  </a>
                ) : (
                  <Link href={footer["copyright"].to || "/"}>
                    {footer["copyright"].label}
                  </Link>
                )}
              </div>
              {policies.length > 0 && (
                <div className={styles["policies"]}>
                  {policies.map((policy, index) => (
                    <React.Fragment key={index}>
                      {policy.href ? (
                        <a
                          href={policy.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles["policy-link"]}
                        >
                          {policy.label}
                        </a>
                      ) : (
                        <Link
                          href={policy.to || "/"}
                          className={styles["policy-link"]}
                        >
                          {policy.label}
                        </Link>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
            {currentLanguage !== "zh" && (
              <div className={styles["copyright-details"]}>
                <span>Guangdong PSB Filing No. 44030502006028</span>
                <span>粤ICP备15113647号</span>
              </div>
            )}
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
