import React, { Dispatch, SetStateAction, useState } from "react";
import { Popover, Tabs } from "antd";
import useGroup from "@/components/hooks/useGroup";
import useCategory from "@/components/hooks/useCategory";
import { CategoryMenuData } from "@/lib/types";
import styles from "./CategoryMenu.module.scss";
import Link from "next/link";
import IconArrowRight from "@/assets/icons/iconArrowRight.svg";

const CategoryContent = (props: {
  productData: CategoryMenuData;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { currentGroup } = useGroup();
  const { productData, setOpen } = props;
  return (
    <div className={styles.categoryContentWrap}>
      {productData.children.map((item) => {
        return (
          <div key={item.id} className={styles.productWrap}>
            <div className={styles.productTitle}>{item.name}</div>
            <div
              className={styles.productContent}
              onClick={() => {
                setTimeout(() => {
                  setOpen(false);
                }, 50);
              }}
            >
              {item.children.map((subItem) => {
                return (
                  // Setting prefetch does not take effect here
                  subItem.defaultLink.startsWith("http") ? (
                    <a
                      href={subItem.defaultLink}
                      key={subItem.id}
                      className={styles.groupContent}
                      target="_blank"
                      style={{
                        display: subItem.visible === false ? "none" : "flex",
                      }}
                    >
                      <span
                        className={`${styles.groupName} ${
                          subItem.id === currentGroup ? styles.activeGroup : ""
                        }`}
                      >
                        {subItem.name}
                      </span>
                      {subItem.tag ? (
                        <span
                          className={`${styles.groupTag} ${
                            subItem.tag.toLowerCase() === "new"
                              ? styles.newTag
                              : styles.hotTag
                          }`}
                        >
                          {subItem.tag}
                        </span>
                      ) : null}
                    </a>
                  ) : (
                    <Link
                      href={subItem.defaultLink}
                      key={subItem.id}
                      className={styles.groupContent}
                      style={{
                        display: subItem.visible === false ? "none" : "flex",
                      }}
                    >
                      <span
                        className={`${styles.groupName} ${
                          subItem.id === currentGroup ? styles.activeGroup : ""
                        }`}
                      >
                        {subItem.name}
                      </span>
                      {subItem.tag ? (
                        <span
                          className={`${styles.groupTag} ${
                            subItem.tag.toLowerCase() === "new"
                              ? styles.newTag
                              : styles.hotTag
                          }`}
                        >
                          {subItem.tag}
                        </span>
                      ) : null}
                    </Link>
                  )
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CategoryTabs = (props) => {
  const { setOpen } = props;
  const { currentCategory, currentProduct, displayCategorys } = useCategory();
  const defaultActiveKey = currentCategory;
  const [currentKey, setCurrentKey] = useState(currentCategory);
  const changeHandle = (activeKey: string) => {
    setCurrentKey(activeKey);
  };
  console.log("[CategoryTabs]", currentCategory, currentProduct);
  return (
    <Tabs
      rootClassName="category-tabs"
      defaultActiveKey={defaultActiveKey}
      tabPosition="left"
      items={displayCategorys.map((item, index) => {
        return {
          label: (
            <span
              className={`${styles.tabItem} ${
                item.id === currentKey ? styles.activeTab : ""
              }`}
            >
              {item.name}
            </span>
          ),
          key: item.id,
          children: <CategoryContent productData={item} setOpen={setOpen} />,
        };
      })}
      onChange={changeHandle}
    />
  );
};

const CategoryMenu = () => {
  const { currentGroupLabel } = useGroup();
  const [open, setOpen] = useState(false);
  const changeHandle = (open) => {
    setOpen(open);
  };
  return (
    <Popover
      overlayClassName={styles.currentGroupWrap}
      content={<CategoryTabs setOpen={setOpen} />}
      title={null}
      trigger="click"
      placement="bottomLeft"
      open={open}
      onOpenChange={changeHandle}
    >
      <div className={styles.currentGroup}>
        <span className={styles.label}>{currentGroupLabel}</span>
        {open ? (
          <IconArrowRight
            className={styles["icon"]}
            style={{ transform: "rotate(-90deg)" }}
          />
        ) : (
          <IconArrowRight
            className={styles["icon"]}
            style={{ transform: "rotate(90deg)" }}
          />
        )}
      </div>
    </Popover>
  );
};

export default CategoryMenu;
