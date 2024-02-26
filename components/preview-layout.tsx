// TODO antd cause lambda very slow!!!!!!!!!!!!!! It will take more 7s!!!!!!!!

import React, { useState, useEffect, useMemo } from "react";
import { AnchorProps, Tree } from "antd";
import { Breadcrumb, Anchor, Drawer } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "./header";
import Footer from "./footer";

import { MDXRemoteSerializeResult } from "next-mdx-remote";
import {
  DisplayInstance,
  DisplayVersion,
  DocuoConfig,
  SidebarItemType,
  TocItem,
} from "@/lib/types";
import Image from "next/image";
import IconOutlink from "@/assets/images/icon_outlink.png";

import Head from "next/head";
import DocuoTree from "./tree";
import DocuoAnchor from "./Anchor";
import AnchorNode from "./Anchor/Anchor";
import gradientFixed from "@/assets/images/gradient_fixed.png";
import IconBackTop from "@/assets/icons/anchor/IconBackTop.svg";
import IconBreadcrumbArrow from "@/assets/icons/breadcrumb/arrow.svg";
import AnChorMobile from "./Anchor/AnchorMobile";
import InsVersionDropdown from "@/components/dropdown/InsVersionDropdown";

const { DirectoryTree } = Tree;

type Props = {
  children: React.ReactNode;
  slug?: string[];
  instanceID: string;
  docVersion: string;
  mdxSource: MDXRemoteSerializeResult;
  toc: TocItem[];
  folderTreeData: TreeDataObject[];
  docuoConfig: DocuoConfig;
  displayVersions: DisplayVersion[];
  displayInstances: DisplayInstance[];
  algolia?: {
    appId: string;
    apiKey: string;
    indexName: string;
  };
};

type TreeDataObject = {
  key: string;
  title: string;
  type: SidebarItemType;
  link?: string;
  id?: string;
  children?: TreeDataObject[];
};

const PreviewLayout = ({
  children,
  slug,
  instanceID,
  docVersion,
  toc,
  folderTreeData,
  docuoConfig,
  displayVersions,
  displayInstances,
  algolia,
}: Props) => {
  // slug eg: instance routeBasePath/version/folder/filename
  // console.log(
  //   "[Site]init params",
  //   slug,
  //   instanceID,
  //   docVersion,
  //   docuoConfig,
  //   displayVersions,
  //   displayInstances
  // );

  // Avoid empty slug
  if (!slug) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [titleElement, setTitleElement] = useState<HTMLElement | null>(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isExpand, setIsExpand] = useState(true);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [drawerOpen, setDrawerOpen] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedKeys, setSelectedKeys] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [expandedKeys, setExpandedKeys] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    document.body.scrollTo({ top: 0 });
  }, [router]);

  // All articles must have an id
  const docID = slug.join("/");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const docID = slug.join("/");
    const selectedKeys: string[] = [];
    let expandedKeys = [];
    const loop = (children: TreeDataObject[], parentKeys: string[]) => {
      for (const element of children) {
        if (element.id === docID) {
          // Find the first
          expandedKeys = parentKeys.concat(element.key);
          return element.key;
        }
        if (element.children) {
          const result = loop(element.children, parentKeys.concat(element.key));
          if (result) return result;
        }
      }
    };
    const selectedKey = loop(folderTreeData, []);
    selectedKeys.push(selectedKey);
    setSelectedKeys(selectedKeys);
    setExpandedKeys((oldVal) =>
      Array.from(new Set(oldVal.concat(expandedKeys)))
    );
  }, [slug]);

  const formatFormatterTocForAntdAnchor = (data, k): AnchorNode[] => {
    let key = k;
    return data.map((item) => {
      const newItem = { ...item };

      newItem.href = `#${newItem.id}`;
      delete newItem.id;
      newItem.key = key++;

      if (newItem.children) {
        newItem.children = formatFormatterTocForAntdAnchor(
          newItem.children,
          key
        );
      }

      return newItem;
    });
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const tocFormatData = useMemo(() => {
    return formatFormatterTocForAntdAnchor(toc, 0);
  }, [toc]);

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

  const fileSelectHandle = (selectedKeys, node) => {
    if (node.type === SidebarItemType.Category) {
      setExpandedKeys((oldVal) => {
        if (oldVal.includes(node.key)) {
          return oldVal.filter((key) => key !== node.key);
        }
        return [...oldVal, node.key];
      });
    }
    if (node.type === SidebarItemType.Doc) {
      setDrawerOpen(false);
    }
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
        ) : nodeData.type === SidebarItemType.Link ? (
          <Link className="title" href={nodeData.link} target="_blank">
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

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
  };

  // @ts-ignore
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const versions = useMemo<NavBarItem>(() => {
    console.log(displayVersions, docVersion, "displayVersions");
    return {
      label: docVersion,
      type: "dropdown",
      items: displayVersions.map((item) => ({
        ...item,
        label: item.version,
      })),
    };
  }, [docVersion, displayVersions]);
  // @ts-ignore
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const instances = useMemo<NavBarItem>(() => {
    const currentInstanceLabel = displayInstances.find((item) => {
      return item.instance.id === instanceID;
    });

    return {
      label: currentInstanceLabel.instance.label,
      type: "dropdown",
      items: displayInstances.map((item) => ({
        ...item,
        label: item.instance.label,
      })),
    };
  }, [instanceID, displayInstances]);

  return (
    <div className="preview-screen relative">
      <Head>
        <meta name="docsearch:version" content={docVersion} />
        <meta name="docsearch:instance" content={instanceID} />
      </Head>
      <Header
        docuoConfig={docuoConfig}
        currentVersion={docVersion}
        currentInstance={instanceID}
        tocFormatData={tocFormatData}
        displayInstances={displayInstances}
        displayVersions={displayVersions}
        setDrawerOpen={setDrawerOpen}
      ></Header>
      <div className="only_pc__show absolute z-0 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
        <div className="w-[108rem] flex-none flex justify-end">
          <Image
            src={gradientFixed}
            alt=""
            className="w-[71.75rem] flex-none max-w-none dark:hidden"
            decoding="async"
          />
        </div>
      </div>
      <main className="preview-main">
        <div className="preview-sider">
          <div className="flex pl-8">
            <InsVersionDropdown type="instance" menu={instances} />
            <InsVersionDropdown type="version" menu={versions} />
          </div>
          <DocuoTree
            data={folderTreeData}
            selectedKeys={selectedKeys}
            onSelect={fileSelectHandle}
            titleRender={titleRenderHandle}
            setDrawerOpen={setDrawerOpen}
          />
        </div>
        <div className="preview-content-wrap">
          <div className="preview-content">
            <div className="article">
              <div className="article-breadcrumb flex justify-between	items-center">
                <Breadcrumb
                  items={breadCrumbData}
                  separator={<IconBreadcrumbArrow className="m-auto" />}
                />
                <div className={"middle__show  relative"}>
                  <AnChorMobile tocFormatData={tocFormatData} />
                </div>
              </div>

              <div
                className="article-content"
                ref={(current) => {
                  const titleElement =
                    current?.querySelector("h1[class*='title']");
                  setTitleElement(titleElement as HTMLElement);
                }}
              >
                {children}
              </div>
            </div>

            <div className="article-anchor-right">
              {toc?.length ? (
                <div className="pt-[28px]  pb-10 ml-8">
                  <p
                    className="mb-2.5 font-inter-bold font-semibold text-sm text-sidebar-primary"
                    onClick={() => setIsExpand(!isExpand)}
                  >
                    On this page
                  </p>
                  <div className="toc-scroller overflow-auto overscroll-none relative pr-6 max-h-[70vh]">
                    <DocuoAnchor data={tocFormatData} offsetTop={68} />
                  </div>

                  <div className="right-anchor-divide"></div>
                  <div className="back-to-top" onClick={scrollToTop}>
                    <div className="flex flex-shrink-0 items-center justify-center w-6 h-6 rounded-md bg-white opacity-60 border-backtop-default border mr-2.5">
                      <IconBackTop />
                    </div>
                    Back to top
                  </div>
                </div>
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
          <div className="flex pl-8">
            <InsVersionDropdown type="instance" menu={instances} />
            <InsVersionDropdown type="version" menu={versions} />
          </div>
          <DocuoTree
            data={folderTreeData}
            selectedKeys={selectedKeys}
            onSelect={fileSelectHandle}
            titleRender={titleRenderHandle}
            setDrawerOpen={setDrawerOpen}
          />
          {/* <DirectoryTree
            key="2"
            showLine
            blockNode
            defaultExpandAll
            // @ts-ignore
            switcherIcon={(props: AntTreeNodeProps) => (
              <IconFileClose
                style={{
                  fontSize: "18px",
                  transform: props.expanded ? "rotate(90deg)" : "rotate(0deg)",
                }}
              />
            )}
            showIcon={false}
            titleRender={titleRenderHandle}
            onSelect={fileSelectHandle}
            treeData={folderTreeData}
            selectedKeys={selectedKeys}
            // expandedKeys={expandedKeys}
            onExpand={onExpand}
          /> */}
          {/* <div className="generate-desc">
            <span>Powered By</span>
            <a href="https://www.spreading.ai/" target="_blank">
              <Image src={LogoGrey} alt={"spreading"} />
            </a>
          </div> */}
        </Drawer>
      </main>
      <Footer socials={[]} links={[]} />
    </div>
  );
};

export default PreviewLayout;
