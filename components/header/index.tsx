import React, { useEffect, useMemo } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";
import Mobile from "./mobile";
import DropdownItem from "./DropdownItem";
import IconMenu from "@/assets/icons/iconMenu.svg";
import AnChorMobile from "../Anchor/AnchorMobile";

import {
  DisplayInstance,
  DisplayVersion,
  DocuoConfig,
  NavBarItemType,
} from "@/lib/types";
import { DocSearch } from "@docsearch/react";
import AnchorNode from "../Anchor/Anchor";
import ThemeSwitch from "./ThemeSwitch";
import ThemeContext from "@/components/header/Theme.context";

// import "@docsearch/css";

interface Props {
  docuoConfig: DocuoConfig;
  currentVersion: string;
  currentInstance: string;
  tocFormatData: AnchorNode[];
  displayInstances: DisplayInstance[];
  displayVersions: DisplayVersion[];
  setDrawerOpen: (value: boolean) => void;
}

const Header = (props: Props) => {
  const {
    docuoConfig,
    currentVersion,
    currentInstance,
    tocFormatData,
    setDrawerOpen,
  } = props;
  const { themeConfig, search } = docuoConfig;
  const { navbar } = themeConfig;
  const { items } = navbar;
  const { algolia } = search || {};
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
    if (!algolia) return null;
    return (
      <>
        <DocSearch
          {...algolia}
          translations={{
            button: {
              buttonText: "Quick search...",
            },
          }}
          placeholder="Find or ask what you want"
          // searchParameters={{
          //   facetFilters: [
          //     `version:${currentVersion}`,
          //     `instance:${currentInstance}`,
          //   ],
          // }}
          maxResultsPerGroup={20}
        />
      </>
    );
  }, [algolia, currentVersion, currentInstance]);

  const isShowThemeBtn = !docuoConfig?.themeConfig?.colorMode?.disableSwitch;

  const logo = useMemo(() => {
    if (typeof navbar.logo === "string") {
      return navbar.logo;
    }
    if (theme === "dark" && typeof navbar.logo?.dark === "string") {
      return navbar.logo?.dark;
    }
    if (theme === "light" && typeof navbar.logo?.light === "string") {
      return navbar.logo?.light;
    }
    return "";
  }, [navbar.logo, theme]);

  const renderThemeSwitch = () => {
    return isShowThemeBtn ? <ThemeSwitch className={isMobile ? "mobile" : ""} /> : null;
  }

  return (
    <header
      className={`${styles["header-container"]} ${
        scrollLength === 0 ? styles["header-bg-opacity"] : styles["header-bg"]
      }`}
    >
      <div className={styles.container}>
        {logo ? (
          <div className="flex items-center">
            <Link
              className={styles["logo-container"]}
              href={navbar.iconRedirectUrl || process.env.SITE_URL || ""}
              ref={logoRef}
            >
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
              <span className={styles["logo-title"]}>
                {decodeURI(navbar.title)}
              </span>
            </Link>
            {DocSearchComponent}
          </div>
        ) : null}
        {isMobile ? (
          <div className={styles["menus"]}>
            {/* {DocSearchComponent} */}
            <Mobile
              // @ts-ignore
              menus={(items || []).map((item) => {
                if (item.label) {
                  return item;
                }
              })}
              renderThemeSwitch={renderThemeSwitch}
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
                  href={menu.defaultLink || menu.href || { pathname: menu.to }}
                  target={menu.href ? "_blank" : "_self"}
                >
                  {menu.label}
                </Link>
              );
            })}
            <div className={styles["menus__btn-list"]}>
              {renderThemeSwitch()}
            </div>
          </div>
        )}
      </div>
      {isMobile && (
        <div
          style={{ paddingLeft: 22, paddingRight: 22 }}
          className={`w-full flex justify-between ${styles["mobile-magic-btn-wrapper"]}`}
        >
          <span
            style={{ padding: 4, marginRight: 14 }}
            className={`w-10 h-10 cursor-pointer block rounded-md ${styles["sidebar-btn"]}`}
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
