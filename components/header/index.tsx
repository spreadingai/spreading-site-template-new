import React, { useEffect, useMemo } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";
import Mobile from "./mobile";
import DropdownItem from "./DropdownItem";
import IconMenu from "@/assets/icons/iconMenu.svg";
import AnChorMobile from "../Anchor/AnchorMobile";

import { DocuoConfig, NavBarItemType } from "@/lib/types";
import { DocSearch } from "@docsearch/react";
import AnchorNode from "../Anchor/Anchor";
import ThemeSwitch from "./ThemeSwitch";
import ThemeContext from "@/components/header/Theme.context";
import LanguageSwitch from "./LanguageSwitch";
import { copywriting } from "@/components/constant/language";
import useLanguage from "@/components/hooks/useLanguage";
import useInstance from "@/components/hooks/useInstance";
import useGroup from "@/components/hooks/useGroup";
import useVersion from "@/components/hooks/useVersion";
import usePlatform from "@/components/hooks/usePlatform";
import useSet from "@/components/hooks/useSet";
import { defaultLanguage } from "../context/languageContext";
// import "@docsearch/css";

interface Props {
  docuoConfig: DocuoConfig;
  tocFormatData?: AnchorNode[];
  setDrawerOpen?: (value: boolean) => void;
  isSearchPage?: boolean;
}

const Header = (props: Props) => {
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
    themeConfig[`navbar.${currentLanguage}`]
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
        () => document.documentElement.scrollTop || document.body.scrollTop
      );
    };
    window.addEventListener("scroll", handleScroll, true);
    // localStorage.setItem(' TWILIO_BAR_KEY', 'dotShow');

    return () => {
      window?.removeEventListener("scroll", handleScroll);
    };
    // return window.removeEventListener("scroll", handleScroll, true);
  }, []);

  const DocSearchComponent = useMemo(() => {
    if (!algolia || searchHidden) return null;
    return (
      <>
        <DocSearch
          {...algolia}
          {...(copywriting[currentLanguage]
            ? copywriting[currentLanguage].search
            : copywriting.en.search)}
          searchParameters={{
            facetFilters: [
              `version:${docVersion}`,
              // `instance:${instanceIDs[0]}`, // The previous versions of navigationInfo
              `group:${currentGroup}`, // The later versions of navigationInfo
              `language:${currentLanguage}`,
              `platform:${currentPlatform}`, // The later versions of navigationInfo
            ],
          }}
          maxResultsPerGroup={20}
          resultsFooterComponent={(props: any) => {
            const { state } = props;
            const { query, context } = state;
            const { nbHits } = context;
            return (
              <Link href={`/search?k=${query}`}>
                {currentLanguage === defaultLanguage
                  ? `See all ${nbHits} results`
                  : `查看全部 ${nbHits} 条结果`}
              </Link>
            );
          }}
        />
      </>
    );
  }, [
    algolia,
    searchHidden,
    currentLanguage,
    docVersion,
    currentGroup,
    currentPlatform,
  ]);

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
      <div className={`container-wrap ${styles.container}`}>
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
            {!isSearchPage ? DocSearchComponent : null}
          </div>
        ) : null}
        {isMobile ? (
          <div className={styles["menus"]}>
            <Mobile
              // @ts-ignore
              menus={(items || []).map((item) => {
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
