// TODO antd cause lambda very slow!!!!!!!!!!!!!! It will take more 7s!!!!!!!!

import React, { useState } from "react";
import { AnchorProps, Tree } from "antd";
import type { TreeProps } from "antd/es/tree";
import { Breadcrumb, Anchor, Drawer } from "antd";
import { IconFileClose } from "./icons";
import Link from "next/link";
import Header from "./header";
import Footer from "./footer";
import ArticlePager from "./articlePager";
import { createPortal } from "react-dom";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { DisplayVersion, DocuoConfig, SidebarItemType } from "@/lib/types";
import Image from "next/image";
import IconOutlink from "@/assets/images/icon_outlink.png";
import IconList from "@/assets/images/icon_list.png";
import IconPackUp from "@/assets/images/icon_pack_up.png";
import IconThisPage from "@/assets/images/icon_this_page.png";
import LogoGrey from "@/assets/images/logo_grey.png";

const { DirectoryTree } = Tree;

type Props = {
  children: React.ReactNode;
  slug?: string[];
  instanceID: string[];
  mdxSource: MDXRemoteSerializeResult;
  folderTreeData: TreeDataObject[];
  docuoConfig: DocuoConfig;
  displayVersions: DisplayVersion[];
};

type TreeDataObject = {
  key: string;
  title: string;
  type: string;
  link?: string;
  id?: string;
  children?: TreeDataObject[];
};

const PreviewLayout = ({
  children,
  slug,
  instanceID,
  mdxSource,
  folderTreeData,
  docuoConfig,
  displayVersions,
}: Props) => {
  // slug eg: instance routeBasePath/version/folder/filename
  console.log(
    "[Site]init params",
    slug,
    instanceID,
    docuoConfig,
    displayVersions
  );

  if (!slug) {
    return null;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [titleElement, setTitleElement] = useState<HTMLElement | null>(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isExpand, setIsExpand] = useState(true);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [drawerOpen, setDrawerOpen] = useState(false);

  // All articles must have an id
  const docID = slug.join("/");

  // Get default selected, expanded keys
  const getDefaultKeys = () => {
    const defaultSelectedKeys: string[] = [];
    let defaultExpandedKeys = [];
    const loop = (children: TreeDataObject[], parentKeys: string[]) => {
      for (const element of children) {
        if (element.id === docID) {
          // Find the first
          defaultExpandedKeys = parentKeys.concat(element.key);
          return element.key;
        }
        if (element.children) {
          const result = loop(element.children, parentKeys.concat(element.key));
          if (result) return result;
        }
      }
    };
    const defaultSelectedKey = loop(folderTreeData, []);
    defaultSelectedKeys.push(defaultSelectedKey);
    return [defaultSelectedKeys, defaultExpandedKeys];
  };
  const [defaultSelectedKeys, defaultExpandedKeys] = getDefaultKeys();
  console.log("[Site]getDefaultKeys", defaultSelectedKeys, defaultExpandedKeys);

  // Update bread crumb data
  const getBreadCrumbData = () => {
    let result: TreeDataObject[] = [];
    const loop = (
      children: TreeDataObject[],
      parentNodes: TreeDataObject[]
    ) => {
      for (const element of children) {
        if (element.id === docID) {
          result = parentNodes.concat(element);
          return;
        }
        if (element.children) {
          loop(element.children, parentNodes.concat(element));
        }
      }
    };
    loop(folderTreeData, []);
    return result.map((item, index, arr) => {
      return { title: item.title };
    });
  };
  const breadCrumbData = getBreadCrumbData();
  console.log("[Site]breadCrumbData", breadCrumbData);

  const fileSelectHandle: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("[Site]fileSelectHandle", selectedKeys, info);
    const { node } = info as any;
    if (node.type === SidebarItemType.Doc) {
      setDrawerOpen(false);
    } else if (node.type === SidebarItemType.Link) {
      if (typeof window !== "undefined") {
        window.open(node.key, "_blank");
      }
    }
  };

  const formatFrontmatterTocForAntdAnchor = (data, k) => {
    let key = k;

    return data.map((item) => {
      const newItem = { ...item };

      newItem.href = newItem.url;
      delete newItem.url;
      newItem.key = key++;

      if (newItem.children) {
        newItem.children = formatFrontmatterTocForAntdAnchor(
          newItem.children,
          key
        );
      }

      return newItem;
    });
  };

  const scrollToTop = () => {
    document.body.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleAnchorClick: AnchorProps["onClick"] = (event) => {
    if ((event.target as HTMLElement).matches("a")) {
      event.preventDefault();

      // 执行您的自定义逻辑
      console.log("[Site]handleAnchorClick", event);
    }
  };

  const onDrawerClose = () => {
    setDrawerOpen(false);
  };

  const titleRenderHandle = (nodeData: TreeDataObject) => {
    return (
      <div className="custom-node-title">
        {nodeData.id ? (
          <Link className="title" href={nodeData.id}>
            {nodeData.title}
          </Link>
        ) : (
          <span className="title">{nodeData.title}</span>
        )}
        {nodeData.type === SidebarItemType.Link ? (
          <Image src={IconOutlink} alt={"link"} />
        ) : null}
      </div>
    );
  };

  return (
    <div className="preview-screen">
      <Header docuoConfig={docuoConfig}></Header>
      <main className="preview-main">
        <div className="preview-sider">
          <DirectoryTree
            key="1"
            showLine
            blockNode
            // @ts-ignore
            switcherIcon={<IconFileClose style={{ fontSize: "18px" }} />}
            showIcon={false}
            titleRender={titleRenderHandle}
            defaultSelectedKeys={defaultSelectedKeys}
            onSelect={fileSelectHandle}
            treeData={folderTreeData}
            defaultExpandedKeys={defaultExpandedKeys}
          />
          <div className="generate-desc">
            <span>Powered By</span>
            <a href="https://www.spreading.ai/" target="_blank">
              <Image src={LogoGrey} alt={"spreading"} />
            </a>
          </div>
        </div>
        <div className="preview-content-wrap">
          <div className="preview-content">
            <div className="article">
              <div className="article-breadcrumb">
                <span
                  className="drawer-switch"
                  onClick={() => {
                    setDrawerOpen(true);
                  }}
                >
                  <Image src={IconList} alt={"directory"} />
                </span>
                <Breadcrumb items={breadCrumbData} />
              </div>
              {titleElement ? (
                createPortal(
                  <div className="article-anchor-top">
                    {mdxSource.frontmatter.toc ? (
                      <>
                        <div
                          className="drop-expand"
                          onClick={() => setIsExpand(!isExpand)}
                        >
                          <span className="left-icon">
                            <Image src={IconThisPage} alt={""} />
                            ON THIS PAGE
                          </span>
                          <IconFileClose className={`right-icon "expand"`} />
                        </div>
                        <div className={`top-anchor-divide expand`}></div>
                        <Anchor
                          className={`drop-anchor ${isExpand ? "expand" : ""}`}
                          items={formatFrontmatterTocForAntdAnchor(
                            mdxSource.frontmatter.toc,
                            0
                          )}
                          affix={false}
                        />
                      </>
                    ) : null}
                  </div>,
                  titleElement
                )
              ) : (
                <div className="article-anchor-top">
                  {mdxSource.frontmatter.toc ? (
                    <>
                      <div
                        className="drop-expand"
                        onClick={() => setIsExpand(!isExpand)}
                      >
                        <span className="left-icon">
                          <Image src={IconThisPage} alt={""} />
                          ON THIS PAGE
                        </span>
                        <IconFileClose className={`right-icon "expand"`} />
                      </div>
                      <div className={`top-anchor-divide expand`}></div>
                      <Anchor
                        className={`drop-anchor ${isExpand ? "expand" : ""}`}
                        items={formatFrontmatterTocForAntdAnchor(
                          mdxSource.frontmatter.toc,
                          0
                        )}
                        affix={false}
                      />
                    </>
                  ) : null}
                </div>
              )}
              <div
                className="article-content"
                ref={(current) => {
                  const titleElement =
                    current?.querySelector("h1[class*='title']");
                  console.log(titleElement, "titleElement");

                  setTitleElement(titleElement as HTMLElement);
                }}
              >
                {children}
              </div>
            </div>

            <div className="article-anchor-right">
              {mdxSource.frontmatter.toc ? (
                <>
                  <div
                    className="drop-expand"
                    onClick={() => setIsExpand(!isExpand)}
                  >
                    <span className="left-icon">
                      <Image src={IconThisPage} alt={""} />
                      ON THIS PAGE
                    </span>
                  </div>
                  <Anchor
                    className={`drop-anchor ${isExpand ? "expand" : ""}`}
                    targetOffset={10}
                    items={formatFrontmatterTocForAntdAnchor(
                      mdxSource.frontmatter.toc,
                      0
                    )}
                    getContainer={() => document.body}
                    affix={false}
                    onClick={handleAnchorClick}
                  />
                  <div className="right-anchor-divide"></div>
                  <div className="back-to-top" onClick={scrollToTop}>
                    <Image src={IconPackUp} alt={""} />
                    Back to top
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
        <Drawer
          rootClassName="mobile-tree-container"
          placement="left"
          onClose={onDrawerClose}
          open={drawerOpen}
          key="left"
          getContainer={false}
        >
          <DirectoryTree
            key="2"
            showLine
            blockNode
            // @ts-ignore
            switcherIcon={<IconFileClose style={{ fontSize: "18px" }} />}
            showIcon={false}
            titleRender={titleRenderHandle}
            defaultSelectedKeys={defaultSelectedKeys}
            onSelect={fileSelectHandle}
            treeData={folderTreeData}
            defaultExpandedKeys={defaultExpandedKeys}
          />
          <div className="generate-desc">
            <span>Powered By</span>
            <a href="https://www.spreading.ai/" target="_blank">
              <Image src={LogoGrey} alt={"spreading"} />
            </a>
          </div>
        </Drawer>
      </main>
      <Footer socials={[]} links={[]} />
    </div>
  );
};

export default PreviewLayout;
