/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { cloneElement, useRef, useState, useEffect } from "react";

import {
  // useScrollPositionBlocker,
  useTabs,
} from "@/components/docuoOpenapi/theme-common/src/internal";
import useIsBrowser from "@/components/docuoOpenapi/core/lib/client/exports/useIsBrowser";
import Heading from "@/components/docuoOpenapi/theme-classic/src/theme/Heading";
import clsx from "clsx";

function TabList({
  className,
  block,
  selectedValue,
  selectValue,
  tabValues,
  label = "Responses",
  id = "responses",
}) {
  const tabRefs = [];
  // TODO: Docuo: The scroll problem needs to be solved
  // const { blockElementScrollPositionUntilNextRender } =
  //   useScrollPositionBlocker();

  const handleTabChange = (event) => {
    const newTab = event.currentTarget;
    const newTabIndex = tabRefs.indexOf(newTab);
    const newTabValue = tabValues[newTabIndex].value;
    if (newTabValue !== selectedValue) {
      // TODO: Docuo: The scroll problem needs to be solved
      // blockElementScrollPositionUntilNextRender(newTab);
      selectValue(newTabValue);
    }
  };

  const handleKeydown = (event) => {
    let focusElement = null;
    switch (event.key) {
      case "Enter": {
        handleTabChange(event);
        break;
      }
      case "ArrowRight": {
        const nextTab = tabRefs.indexOf(event.currentTarget) + 1;
        focusElement = tabRefs[nextTab] ?? tabRefs[0];
        break;
      }
      case "ArrowLeft": {
        const prevTab = tabRefs.indexOf(event.currentTarget) - 1;
        focusElement = tabRefs[prevTab] ?? tabRefs[tabRefs.length - 1];
        break;
      }
      default:
        break;
    }
    focusElement?.focus();
  };

  const tabItemListContainerRef = useRef(null);
  const [showTabArrows, setShowTabArrows] = useState(false);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target.offsetWidth < entry.target.scrollWidth) {
          setShowTabArrows(true);
        } else {
          setShowTabArrows(false);
        }
      }
    });

    resizeObserver.observe(tabItemListContainerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleRightClick = () => {
    tabItemListContainerRef.current.scrollLeft += 90;
  };

  const handleLeftClick = () => {
    tabItemListContainerRef.current.scrollLeft -= 90;
  };

  return (
    <div className="openapi-tabs__response-header-section">
      <Heading as="h2" id={id} className="openapi-tabs__response-header">
        {label}
      </Heading>
      <div className="openapi-tabs__response-container">
        {showTabArrows && (
          <button
            className="openapi-tabs__arrow left"
            onClick={handleLeftClick}
          />
        )}
        <ul
          ref={tabItemListContainerRef}
          role="tablist"
          aria-orientation="horizontal"
          className={clsx(
            "openapi-tabs__response-list-container",
            "tabs",
            {
              "tabs--block": block,
            },
            className
          )}
        >
          {tabValues.map(({ value, label, attributes }) => (
            <li
              // TODO extract TabListItem
              role="tab"
              tabIndex={selectedValue === value ? 0 : -1}
              aria-selected={selectedValue === value}
              key={value}
              ref={(tabControl) => tabRefs.push(tabControl)}
              onKeyDown={handleKeydown}
              onClick={handleTabChange}
              {...attributes}
              className={clsx(
                "tabs__item",
                "openapi-tabs__response-code-item",
                attributes?.className,
                parseInt(value) >= 400
                  ? "danger"
                  : parseInt(value) >= 200 && parseInt(value) < 300
                  ? "success"
                  : "info",
                {
                  active: selectedValue === value,
                }
              )}
            >
              {label ?? value}
            </li>
          ))}
        </ul>
        {showTabArrows && (
          <button
            className="openapi-tabs__arrow right"
            onClick={handleRightClick}
          />
        )}
      </div>
    </div>
  );
}
function TabContent({ lazy, children, selectedValue }) {
  // eslint-disable-next-line no-param-reassign
  children = Array.isArray(children) ? children : [children];
  if (lazy) {
    const selectedTabItem = children.find(
      (tabItem) => tabItem.props.value === selectedValue
    );
    if (!selectedTabItem) {
      // fail-safe or fail-fast? not sure what's best here
      return null;
    }
    return cloneElement(selectedTabItem, {
      className: "apitab-tabpanel-container",
    });
  }
  return (
    <div className="apitab-tabpanel-container">
      {children.map((tabItem, i) =>
        cloneElement(tabItem, {
          key: i,
          hidden: tabItem.props.value !== selectedValue,
          className: "tabpanel",
        })
      )}
    </div>
  );
}
function TabsComponent(props) {
  const tabs = useTabs(props);
  return (
    <div className="openapi-tabs__container">
      <TabList {...props} {...tabs} />
      <TabContent {...props} {...tabs} />
    </div>
  );
}
export default function ApiTabs(props) {
  const isBrowser = useIsBrowser();
  return (
    <TabsComponent
      // Remount tabs after hydration
      // Temporary fix for https://github.com/facebook/docusaurus/issues/5653
      key={String(isBrowser)}
      {...props}
    />
  );
}
