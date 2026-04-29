import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";
import Mobile from "./mobile";
import DropdownItem from "./DropdownItem";
import IconMenu from "@/assets/icons/iconMenu.svg";
import AnChorMobile from "../Anchor/AnchorMobile";

import { DocuoConfig, NavBarItemType } from "@/lib/types";
import AnchorNode from "../Anchor/Anchor";
import ThemeSwitch from "./ThemeSwitch";
import ThemeContext from "@/components/header/Theme.context";
import LanguageSwitch from "./LanguageSwitch";
import useLanguage from "@/components/hooks/useLanguage";
import useInstance from "@/components/hooks/useInstance";
import useGroup from "@/components/hooks/useGroup";
import useVersion from "@/components/hooks/useVersion";
import usePlatform from "@/components/hooks/usePlatform";
import useSet from "@/components/hooks/useSet";
import AskAI from "./AskAI";
import SearchDropdown from "@/components/search/new/SearchDropdown";

interface Props {
  docuoConfig: DocuoConfig;
  tocFormatData?: AnchorNode[];
  setDrawerOpen?: (value: boolean) => void;
  isSearchPage?: boolean;
}

const Header = (props: Props) => {
  const router = useRouter();
  const { docuoConfig, tocFormatData, setDrawerOpen, isSearchPage } = props;
  const { handleLanguageChanged } = useSet();
  const {
    currentLanguage,
    currentLanguageLabel,
    displayLanguages,
    setCurrentLanguage,
  } = useLanguage();
  const { instanceIDs } = useInstance();
  const { currentGroup, currentGroupLabel } = useGroup();
  const { docVersion } = useVersion();
  const { currentPlatform, currentPlatformLabel } = usePlatform();
  const { themeConfig, search } = docuoConfig;
  const navbar = Object.assign(
    {},
    themeConfig.navbar,
    themeConfig[`navbar.${currentLanguage}`],
  );
  const { items } = navbar;
  const { algolia } = search || {};
  const searchHidden = search?.hidden ?? false;
  const [width, setWidth] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const matches = useMediaQuery(`(max-width: ${Math.max(width, 1024)}px)`); // mobile
  const menusRef = React.useRef<HTMLDivElement>(null);
  const logoRef = React.useRef<HTMLAnchorElement>(null);
  const [scrollLength, setScrollLength] = React.useState(0);
  const { theme } = React.useContext(ThemeContext);

  useEffect(() => {
    setIsMobile(matches);
  }, [matches]);

  useEffect(() => {
    // compute the width of the hamburger menu
    if (menusRef.current) {
      const menuWidth = menusRef.current.clientWidth;
      const logoWidth = logoRef.current?.clientWidth ?? 0;
      const width = menuWidth + logoWidth + 32 * 2 + 40;
      setWidth(width);
    }
    const handleScroll = () => {
      setScrollLength(
        () => document.documentElement.scrollTop || document.body.scrollTop,
      );
    };
    window.addEventListener("scroll", handleScroll, true);
    // localStorage.setItem(' TWILIO_BAR_KEY', 'dotShow');

    return () => {
      window?.removeEventListener("scroll", handleScroll);
    };
    // return window.removeEventListener("scroll", handleScroll, true);
  }, []);

  const searchDropdownComponent = useMemo(() => {
    if (searchHidden) return null;
    return (
      <SearchDropdown
        instanceGroups={themeConfig?.instanceGroups || []}
        currentGroup={currentGroup}
        currentPlatform={currentPlatform}
      />
    );
  }, [searchHidden, themeConfig?.instanceGroups, currentGroup, currentPlatform]);

  const isShowThemeBtn =
    docuoConfig?.themeConfig?.colorMode?.disableSwitch === false;

  const logo = useMemo(() => {
    if (typeof navbar.logo === "string") {
      return navbar.logo;
    }
    let currentMode = "light";
    if (["dark", "light"].includes(theme)) {
      currentMode = theme;
    }
    if (theme === "system") {
      const isDarkMode =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)")?.matches;
      currentMode = isDarkMode ? "dark" : "light";
    }
    if (currentMode === "dark" && typeof navbar.logo?.dark === "string") {
      return navbar.logo?.dark;
    }
    if (currentMode === "light" && typeof navbar.logo?.light === "string") {
      return navbar.logo?.light;
    }
    return "";
  }, [navbar.logo, theme]);

  const renderThemeSwitch = () => {
    return isShowThemeBtn ? (
      <ThemeSwitch className={isMobile ? "mobile" : ""} />
    ) : null;
  };

  const devCenterNav = useMemo(() => {
    return currentLanguage === "zh"
      ? [
          {
            label: "SDK 中心",
            href: "https://doc-zh.zego.im/sdk-download/2968",
          },
          { label: "API 中心", href: "https://doc-zh.zego.im/api-center" },
          { label: "常见问题", href: "https://doc-zh.zego.im/faq/overview" },
        ]
      : [];
  }, [currentLanguage]);

  const renderLanguageSwitch = () => {
    return !!displayLanguages?.length ? (
      !isSearchPage ? (
        <LanguageSwitch className={isMobile ? "mobile" : ""} />
      ) : (
        <LanguageSwitch
          className={isMobile ? "mobile" : ""}
          handleLanguageChanged={handleLanguageChanged}
        />
      )
    ) : null;
  };

  return (
    <header
      className={`header-container ${styles["header-container"]} ${
        scrollLength === 0 ? styles["header-bg-opacity"] : styles["header-bg"]
      } ${isSearchPage ? styles["search-page"] : ""}`}
    >
      <div
        className={`container-wrap ${styles.container} ${currentLanguage === "zh" ? styles.zh : ""}`}
      >
        <div className="flex items-center">
          {logo ? (
            <div className="flex items-center">
              <a
                className={styles["logo-container"]}
                href={navbar.iconRedirectUrl || ""}
                ref={logoRef}
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
                <span className={styles["logo-title"]}>
                  {decodeURI(navbar.title)}
                </span>
              </a>
            </div>
          ) : null}
          <div className={styles["old-dev-center"]}>
            <ul className={styles["old-dev-center-nav"]}>
              {devCenterNav.map((item, index) => (
                <li key={index} className={styles["old-dev-center-nav-item"]}>
                  <Link href={item.href || "/"}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles["fixed-menus"]}>
          {!isSearchPage ? searchDropdownComponent : null}
          {!isSearchPage && themeConfig.showAskAI !== false ? <AskAI /> : null}
        </div>
        {isMobile ? (
          <div className={styles["menus"]}>
            <Mobile
              // @ts-ignore
              menus={[
                ...(navbar.title
                  ? [{ label: navbar.title, href: navbar.iconRedirectUrl }]
                  : []),
                ...devCenterNav,
                ...items,
              ].map((item) => {
                if (item.label) {
                  return item;
                }
              })}
              renderThemeSwitch={renderThemeSwitch}
              renderLanguageSwitch={renderLanguageSwitch}
              isShowSearchIcon={!!algolia && !searchHidden && !isSearchPage}
              isSearchPage={isSearchPage}
            />
          </div>
        ) : (
          <div className={styles["menus"]} ref={menusRef}>
            {(items || []).map((menu, index) => {
              if (!menu) return null;
              if (
                menu?.type === NavBarItemType.Dropdown ||
                Array.isArray(menu.items)
              ) {
                // @ts-ignore
                return <DropdownItem menu={menu} key={index} />;
              }
              if (menu?.type === NavBarItemType.Button) {
                return (
                  <a
                    key={index}
                    className={styles["button-item"]}
                    href={menu.href || menu.to || menu.defaultLink || "/"}
                    target={menu.href ? "_blank" : "_self"}
                  >
                    {menu.label}
                  </a>
                );
              }
              return (
                <Link
                  key={index}
                  className={styles["item"]}
                  href={menu.href || menu.to || menu.defaultLink || "/"}
                  target={menu.href ? "_blank" : "_self"}
                >
                  {menu.label}
                </Link>
              );
            })}
            <div className={styles["menus__btn-list"]}>
              {renderLanguageSwitch()}
              {renderThemeSwitch()}
            </div>
          </div>
        )}
      </div>
      {!isSearchPage && isMobile && (
        <div
          style={{ paddingLeft: 22, paddingRight: 22 }}
          className={`mobile-magic-btn-wrapper w-full flex justify-between ${styles["mobile-magic-btn-wrapper"]}`}
        >
          <span
            style={{ padding: 4, marginRight: 14 }}
            className={`hamburger-btn w-10 h-10 cursor-pointer block rounded-md ${styles["sidebar-btn"]}`}
            onClick={() => setDrawerOpen(true)}
          >
            <IconMenu className={styles["sidebar-icon"]} />
          </span>
          <AnChorMobile tocFormatData={tocFormatData} />
        </div>
      )}

    </header>
  );
};

export default Header;
