import React, { FC, useEffect, useMemo } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";
import Mobile from "./mobile";
import DropdownItem from "./DropdownItem";
import {
  DisplayInstance,
  DisplayVersion,
  DocuoConfig,
  NavBarItemType,
} from "@/lib/types";
import { NavBarItem, NavbarLink } from "./@types";
import { DocSearch } from "@docsearch/react";

import "@docsearch/css";

interface Props {
  docuoConfig: DocuoConfig;
  currentVersion: string;
  currentInstance: string;
  displayInstances: DisplayInstance[];
  displayVersions: DisplayVersion[];
}

const Header = (props: Props) => {
  const {
    docuoConfig,
    currentVersion,
    currentInstance,
    displayInstances,
    displayVersions,
  } = props;
  const { themeConfig, search } = docuoConfig;
  const { navbar } = themeConfig;
  const { items } = navbar;
  const { algolia } = search || {};
  const [width, setWidth] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const matches = useMediaQuery(`(max-width: ${Math.max(width, 375)}px)`); // mobile
  const menusRef = React.useRef<HTMLDivElement>(null);
  const logoRef = React.useRef<HTMLAnchorElement>(null);
  console.log(items, "items");

  useEffect(() => {
    setIsMobile(matches);
  }, [matches]);

  useEffect(() => {
    // compute the width of the hamburger menu
    if (menusRef.current) {
      const menuWidth = menusRef.current.clientWidth;
      const logoWidth = logoRef.current?.clientWidth ?? 0;
      const width = menuWidth + logoWidth + 32 * 2 + 40;
      console.log("[header] width", width);

      setWidth(width);
    }
  }, []);

  // @ts-ignore
  const versions = useMemo<NavBarItem>(() => {
    console.log(displayVersions, currentVersion, "displayVersions");
    return {
      label: currentVersion,
      type: "dropdown",
      items: displayVersions.map((item) => ({
        ...item,
        label: item.version,
      })),
    };
  }, [currentVersion, displayVersions]);
  // @ts-ignore
  const instances = useMemo<NavBarItem>(() => {
    const currentInstanceLabel = displayInstances.find((item) => {
      return item.instance.id === currentInstance;
    });

    return {
      label: currentInstanceLabel.instance.label,
      type: "dropdown",
      items: displayInstances.map((item) => ({
        ...item,
        label: item.instance.label,
      })),
    };
  }, [currentInstance, displayInstances]);

  const DocSearchComponent = useMemo(() => {
    if (!algolia) return null;
    return (
      <DocSearch
        {...algolia}
        // searchParameters={{
        //   facetFilters: [
        //     `version:${currentVersion}`,
        //     `instance:${currentInstance}`,
        //   ],
        // }}
      />
    );
  }, [algolia, currentVersion, currentInstance]);

  return (
    <header className={styles["header-container"]}>
      {navbar.logo ? (
        <Link
          className={styles["logo-container"]}
          href={navbar.iconRedirectUrl || process.env.SITE_URL || ""}
          ref={logoRef}
        >
          <img
            className={styles.logo}
            src={
              (navbar.logo as string).includes("http")
                ? `${navbar.logo}`
                : `/${navbar.logo}`
            }
            alt={"logo"}
          />
          <span className={styles["logo-title"]}>
            {decodeURI(navbar.title)}
          </span>
        </Link>
      ) : null}
      {isMobile ? (
        <div className={styles["menus"]}>
          {DocSearchComponent}
          {/*  @ts-ignore */}
          <Mobile menus={(items || []).filter((item) => item.label)} />
        </div>
      ) : (
        <div className={styles["menus"]} ref={menusRef}>
          {(items || []).map((menu, index) => {
            if (!menu) return null;
            if (menu?.type === NavBarItemType.DocsInstanceDropdown) {
              // @ts-ignore
              return <DropdownItem key={index} menu={instances} />;
            }

            if (menu?.type === NavBarItemType.DocsVersionDropdown) {
              // @ts-ignore
              return <DropdownItem key={index} menu={versions} />;
            }
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
          {DocSearchComponent}
        </div>
      )}
    </header>
  );
};

export default Header;
