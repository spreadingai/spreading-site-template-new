/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { cloneElement, useRef, useEffect, useState } from "react";

import {
  // useScrollPositionBlocker,
  useTabs,
} from "@/components/docuoOpenapi/theme-common/src/internal";
import useLanguage from "@/components/hooks/useLanguage";
import { copywriting } from "@/components/constant/language";
import useIsBrowser from "@/components/docuoOpenapi/core/lib/client/exports/useIsBrowser";
import clsx from "clsx";
import flatten from "lodash/flatten";

function TabList({ className, block, selectedValue, selectValue, tabValues }) {
  const tabRefs = [];
  // TODO: Docuo: The scroll problem needs to be solved
  // const { blockElementScrollPositionUntilNextRender } =
  //   useScrollPositionBlocker();
  const handleTabChange = (event) => {
    const newTab = event.currentTarget;
    const newTabIndex = tabRefs.indexOf(newTab);
    const newTabValue = tabValues[newTabIndex].value;
    if (newTabValue !== selectedValue) {
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
    <div className="openapi-tabs__schema-tabs-container">
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
          "openapi-tabs__schema-list-container",
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
              "openapi-tabs__schema-item",
              attributes?.className,
              {
                active: selectedValue === value,
              }
            )}
          >
            <span className="openapi-tabs__schema-label">{label ?? value}</span>
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
  );
}
function TabContent({ lazy, children, selectedValue }) {
  // eslint-disable-next-line no-param-reassign
  children = Array.isArray(children) ? children : [children];
  const flattenedChildren = flatten(children);

  if (lazy) {
    const selectedTabItem = flattenedChildren.find(
      (tabItem) => tabItem.props.value === selectedValue
    );
    if (!selectedTabItem) {
      // fail-safe or fail-fast? not sure what's best here
      return null;
    }
    return cloneElement(selectedTabItem);
  }
  return (
    <div>
      {children.map((tabItem, i) =>
        cloneElement(tabItem, {
          key: i,
          hidden: tabItem.props.value !== selectedValue,
        })
      )}
    </div>
  );
}
function TabsComponent(props) {
  const tabs = useTabs(props);
  const { currentLanguage } = useLanguage();
  const t = copywriting[currentLanguage]?.openapi || copywriting.en.openapi;

  const localizedTabs = React.useMemo(() => {
    const mapLabel = (label) => {
      if (!label) return label;
      const text = String(label);
      if (text === "Example (from schema)") return t.content.exampleFromSchema;
      if (text === "Example") return t.content.example;
      if (text === "Schema") return t.content.schemaTitle || text;
      return label;
    };
    return {
      ...tabs,
      tabValues: (tabs.tabValues || []).map((tv) => ({
        ...tv,
        label: mapLabel(tv.label),
      })),
    };
  }, [tabs, t]);

  return (
    <div className="openapi-tabs__schema-container">
      <TabList {...props} {...localizedTabs} />
      <TabContent {...props} {...localizedTabs} />
    </div>
  );
}
export default function SchemaTabs(props) {
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
