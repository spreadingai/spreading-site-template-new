// TODO antd cause lambda very slow!!!!!!!!!!!!!! It will take more 7s!!!!!!!!

import React, { useState } from "react";
import { AnchorProps, Tree } from "antd";
import { useRouter } from "next/navigation";
import type { TreeProps } from "antd/es/tree";
import { Breadcrumb, Anchor, Drawer } from "antd";
import { IconFileClose } from "./icons";
import Link from "next/link";
import { createPortal } from "react-dom";

const { DirectoryTree } = Tree;

const LANGUAGES = {
  af_za: "Afrikaans",
  am_et: "አማርኛ",
  ar_ar: "العربية",
  as_in: "অসমীয়া",
  az_az: "Azərbaycanca",
  be_by: "Беларуская",
  bg_bg: "Български",
  bn_in: "বাংলা",
  bs_ba: "Bosanski",
  ca_es: "Català",
  cs_cz: "Čeština",
  cy_gb: "Cymraeg",
  da_dk: "Dansk",
  de_de: "Deutsch",
  el_gr: "Ελληνικά",
  en_au: "English (Australia)",
  en_ca: "English (Canada)",
  en_gb: "English (United Kingdom)",
  en_in: "English (India)",
  en_sg: "English (Singapore)",
  en_us: "English (United States)",
  en_za: "English (South Africa)",
  eo_eo: "Esperanto",
  es_ar: "Español (Argentina)",
  es_bo: "Español (Bolivia)",
  es_cl: "Español (Chile)",
  es_co: "Español (Colombia)",
  es_cr: "Español (Costa Rica)",
  es_do: "Español (República Dominicana)",
  es_ec: "Español (Ecuador)",
  es_es: "Español (España)",
  es_gt: "Español (Guatemala)",
  es_hn: "Español (Honduras)",
  es_mx: "Español (México)",
  es_ni: "Español (Nicaragua)",
  es_pa: "Español (Panamá)",
  es_pe: "Español (Perú)",
  es_pr: "Español (Puerto Rico)",
  es_py: "Español (Paraguay)",
  es_sv: "Español (El Salvador)",
  es_us: "Español (Estados Unidos)",
  es_uy: "Español (Uruguay)",
  es_ve: "Español (Venezuela)",
  et_ee: "Eesti",
  eu_es: "Euskara",
  fa_ir: "فارسی",
  fi_fi: "Suomi",
  fil_ph: "Filipino",
  fo_fo: "Føroyskt",
  fr_be: "Français (Belgique)",
  fr_ca: "Français (Canada)",
  fr_ch: "Français (Suisse)",
  fr_fr: "Français (France)",
  fr_lu: "Français (Luxembourg)",
  ga_ie: "Gaeilge",
  gl_es: "Galego",
  gsw_ch: "Schwiizerdütsch",
  gu_in: "ગુજરાતી",
  he_il: "עברית",
  hi_in: "हिन्दी",
  hr_hr: "Hrvatski",
  hu_hu: "Magyar",
  hy_am: "Հայերեն",
  id_id: "Bahasa Indonesia",
  ig_ng: "Igbo",
  is_is: "Íslenska",
  it_ch: "Italiano (Svizzera)",
  it_it: "Italiano",
  ja_jp: "日本語",
  ka_ge: "ქართული",
  kk_kz: "Қазақ",
  km_kh: "ភាសាខ្មែរ",
  kn_in: "ಕನ್ನಡ",
  ko_kr: "한국어",
  kok_in: "कोंकणी",
  ky_kg: "Кыргыz",
  lb_lu: "Lëtzebuergesch",
  lo_la: "ລາວ",
  lt_lt: "Lietuvių",
  lv_lv: "Latviešu",
  mi_nz: "Te Reo Māori",
  mk_mk: "Македонски",
  ml_in: "മലയാളം",
  mn_mn: "Монгол",
  mr_in: "मराठी",
  ms_my: "Bahasa Melayu",
  mt_mt: "Malti",
  nb_no: "Norsk bokmål",
  ne_np: "नेपाली",
  nl_be: "Nederlands (België)",
  nl_nl: "Nederlands",
  nn_no: "Norsk nynorsk",
  nso_za: "Sesotho sa Leboa",
  oc_fr: "Occitan",
  or_in: "ଓଡ଼ିଆ",
  pa_in: "ਪੰਜਾਬੀ",
  pl_pl: "Polski",
  prs_af: "دری",
  ps_af: "پښتو",
  pt_br: "Português (Brasil)",
  pt_pt: "Português",
  quz_pe: "Runasimi",
  ro_ro: "Română",
  ru_ru: "Русский",
  rw_rw: "Kinyarwanda",
  sa_in: "संस्कृत",
  sah_ru: "Саха",
  se_fi: "Davvisámegiella",
  se_no: "Davvisámegiella (Norga)",
  se_se: "Davvisámegiella (Suopma)",
  si_lk: "සිංහල",
  sk_sk: "Slovenčina",
  sl_si: "Slovenščina",
  sq_al: "Shqip",
  sr_cyrl: "Српски (ћирилица)",
  sr_cyrl_me: "Српски (ћирилица, Црна Гора)",
  sr_latn: "Srpski (latinica)",
  sr_latn_me: "Srpski (latinica, Crna Gora)",
  sv_fi: "Svenska (Finland)",
  sv_se: "Svenska (Sverige)",
  sw_ke: "Kiswahili",
  ta_in: "தமிழ்",
  te_in: "తెలుగు",
  tg_tj: "Тоҷикӣ",
  th_th: "ไทย",
  tk_tm: "Türkmençe",
  tn_za: "Setswana",
  tr_tr: "Türkçe",
  tt_ru: "Татар",
  ug_cn: "ئۇيغۇرچە",
  uk_ua: "Українська",
  ur_in: "اردو",
  ur_pk: "اردو (پاکستان)",
  uz_uz: "O‘zbek",
  vi_vn: "Tiếng Việt",
  wo_sn: "Wolof",
  xh_za: "isiXhosa",
  zh_cn: "简体中文",
  zh_hk: "繁體中文 (香港)",
  zh_tw: "繁體中文 (台灣)",
};
const PREVIEW_KEY = "preview";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
  slug?: string[];
  frontmatter: any;
  folderTreeData: TreeDataObject[];
  siteInfo: any;
  proxyPath: string;
};

type TreeDataObject = {
  key: string;
  title: string;
  type: string;
  children?: TreeDataObject[];
};

type TreeWidgetItem = {
  value: string;
  label: string;
  index: number;
};

const PreviewLayout = ({
  children,
  slug,
  frontmatter,
  folderTreeData,
  siteInfo,
  proxyPath,
  ...props
}: Props) => {
  console.log("[Site]init params", slug, folderTreeData, siteInfo, proxyPath);
  console.log("[Site] other props", props);

  if (!slug) {
    return null;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [titleElement, setTitleElement] = useState<HTMLElement | null>(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const basePath = process.env.BASE_PATH || "";
  const isPreview = slug[slug.length - 1] === PREVIEW_KEY;
  const getSlugWithoutProxy = () => {
    const slugStr = slug.join("/");
    let sp = [];
    if (proxyPath !== "" && slugStr.startsWith(proxyPath)) {
      sp = slugStr.slice(proxyPath.length + 1).split("/");
    } else {
      sp = slug;
    }
    return sp;
  };
  const slugWithoutProxy = getSlugWithoutProxy();
  console.log("[Site]slugWithoutProxy", slugWithoutProxy);

  // Get default expanded keys
  const getDefaultExpandedKeys = (
    treeData: TreeDataObject[],
    defaultKey: string
  ) => {
    let defaultExpandedKeys = [];
    function loop(nodeData, parents) {
      for (let child of nodeData) {
        if (child.key === defaultKey) {
          defaultExpandedKeys = parents.concat(child.key);
        }
        if (child.children) {
          loop(child.children, parents.concat(child.key));
        }
      }
    }
    loop(treeData || [], []);
    return defaultExpandedKeys;
  };

  // Version
  const changeVersion = (
    versionName: string,
    currentProject: TreeDataObject,
    slugWithoutProxy: string[]
  ) => {
    // Reset all when change version
    const versionWidgetItemList: TreeWidgetItem[] = currentProject.children.map(
      (item, index) => ({ label: item.title, value: item.key, index })
    );
    const currentVersionWidgetItem = versionWidgetItemList.find(
      (item) => item.label === versionName
    );
    const currentVersionIndex = currentProject.children.findIndex(
      (item) => item.title === versionName
    );
    const currentVersionDataObj = currentProject.children[currentVersionIndex];
    if (currentVersionIndex == -1) {
      return {};
    }

    // Language
    const languageWidgetItemList: TreeWidgetItem[] =
      currentVersionDataObj.children.map((item, index) => ({
        label: item.title,
        value: item.key,
        index,
      }));
    const languageSlugIndex = 2;
    const languageInURL = Object.keys(LANGUAGES).includes(
      slugWithoutProxy[languageSlugIndex].toLocaleLowerCase()
    )
      ? slugWithoutProxy[languageSlugIndex].toLocaleLowerCase()
      : "en_us";
    const currentLanguageWidgetItem = languageWidgetItemList.find(
      (item) =>
        item.value.split("/").pop().toLocaleLowerCase() === languageInURL
    );
    const currentLanguageDataObj = currentVersionDataObj.children.find(
      (item) => item.key.split("/").pop().toLowerCase() === languageInURL
    );

    // Collection
    const collectionSlugIndex = 3;
    const collectionInURL =
      currentLanguageDataObj.children.length > 1
        ? slugWithoutProxy[collectionSlugIndex]
        : currentLanguageDataObj.children[0].title;
    const currentCollectionDataObj = currentLanguageDataObj.children.find(
      (item) => item.title === collectionInURL
    ).children;

    return {
      currentVersionDataObj,
      currentLanguageDataObj,
      currentCollectionDataObj,
    };
  };
  const versionInURL = slugWithoutProxy[1];
  console.log("[Site]versionInURL", slugWithoutProxy);
  const { currentCollectionDataObj } = changeVersion(
    versionInURL,
    folderTreeData[0],
    slugWithoutProxy
  );
  console.log("[Site]currentCollectionDataObj", currentCollectionDataObj[0]);

  // The key of tree node contains the project name, but not the proxy
  const defaultURL = [`${(slug as string[]).join("/")}`];
  console.log("[Site]defaultURL", defaultURL);
  const defaultExpandedKeys = getDefaultExpandedKeys(
    currentCollectionDataObj,
    defaultURL[0]
  );
  console.log("[Site]defaultExpandedKeys", defaultExpandedKeys);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isExpand, setIsExpand] = useState(true);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [drawerOpen, setDrawerOpen] = useState(false);

  const dfsGetSelfAndParents = (node, targetKey, parents = []) => {
    if (node.key === targetKey) {
      return [...parents, node];
    }

    parents.push(node);

    for (const child of node.children) {
      const result = dfsGetSelfAndParents(child, targetKey, parents);
      if (result.length > 0) {
        return result;
      }
    }

    parents.pop();
    return [];
  };

  // Update bread crumb data
  const getBreadCrumbData = () => {
    const data = dfsGetSelfAndParents(
      folderTreeData[0],
      defaultURL[0],
      []
    ) as any[];
    data.splice(0, 1); // remove project name
    data.splice(1, 2); // remove default folder name and language
    return data.map((item, index, arr) => {
      if (index === 0) return { title: item.title };
      if (arr.length - 1 === index) return { title: item.title };
      return { title: item.title, href: `/${item.key}` };
    });
  };
  const breadCrumbData = getBreadCrumbData();
  console.log("[Site]breadCrumbData", breadCrumbData);

  const fileSelectHandle: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("[Site]fileSelectHandle", selectedKeys, info);
    const { node } = info as any;
    if (node.type === "file") {
      setDrawerOpen(false);
      // TODO router.push 会导致客户端使用浏览器内的缓存，这样即使服务端已经更新了，这个目录树还是不更新(这个问题在有CDN的情况下才有)。https://nextjs.org/docs/app/building-your-application/caching#router-cache
      // 但是使用 window.open 的方式会导致UI闪一下，折叠也不管用

      // router.prefetch(`${node.key}`);
      // router.push(`${node.key}`);
      // router.refresh();
      // router.replace(`${node.key}`);
      // const projectName = node.key.split('/').shift() + "/"
      // const targetURL = window.location.href.split(projectName).shift() + node.key
      // window.open(targetURL, "_self");
    } else if (node.type === "link") {
      if (typeof window !== "undefined") {
        window.open(node.key, "_blank");
      }
    }
  };

  const renderTocItems = (items) => {
    return items.map((item) => (
      <Anchor.Link key={item.url} href={item.url} title={item.title}>
        {item.children && renderTocItems(item.children)}
      </Anchor.Link>
    ));
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

  const titleRenderHandle = (nodeData: any) => {
    return (
      <div className="custom-node-title">
        {nodeData.type === "file" ? (
          <Link className="title" href={nodeData.key}>
            {nodeData.title}
          </Link>
        ) : (
          <span className="title">{nodeData.title}</span>
        )}
        {nodeData.type === "link" ? (
          <img src={`${proxyPath}/icon_outlink.png`} alt="link" />
        ) : null}
      </div>
    );
  };

  return (
    <div className="preview-screen">
      <header className="preview-header">
        <div
          className="logo"
          onClick={() => {
            console.log("[Site]iconRedirectUrl", siteInfo.iconRedirectUrl);
            if (siteInfo.iconRedirectUrl) {
              window.open(siteInfo.iconRedirectUrl, "_blank");
            }
          }}
        >
          <img src={`${proxyPath}/logo.png`} alt={siteInfo.title || "docuo"} />
          <span className="title">{siteInfo.title || "Docuo"}</span>
        </div>
      </header>
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
            defaultSelectedKeys={defaultURL}
            onSelect={fileSelectHandle}
            treeData={currentCollectionDataObj}
            defaultExpandedKeys={defaultExpandedKeys}
          />
          <div className="generate-desc">
            <span>Powered By</span>
            <a href="https://www.spreading.ai/" target="_blank">
              <img src={`${proxyPath}/logo_grey.png`} alt="spreading" />
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
                  <img src={`${proxyPath}/icon_list.png`} alt="directory" />
                </span>
                <Breadcrumb items={breadCrumbData} />
              </div>
              {titleElement ? (
                createPortal(
                  <div className="article-anchor-top">
                    {frontmatter.toc ? (
                      <>
                        <div
                          className="drop-expand"
                          onClick={() => setIsExpand(!isExpand)}
                        >
                          <span className="left-icon">
                            <img src={`${proxyPath}/icon_this_page.png`} />
                            ON THIS PAGE
                          </span>
                          <IconFileClose className={`right-icon "expand"`} />
                        </div>
                        <div className={`top-anchor-divide expand`}></div>
                        <Anchor
                          className={`drop-anchor ${isExpand ? "expand" : ""}`}
                          items={formatFrontmatterTocForAntdAnchor(
                            frontmatter.toc,
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
                  {frontmatter.toc ? (
                    <>
                      <div
                        className="drop-expand"
                        onClick={() => setIsExpand(!isExpand)}
                      >
                        <span className="left-icon">
                          <img src={`${proxyPath}/icon_this_page.png`} />
                          ON THIS PAGE
                        </span>
                        <IconFileClose className={`right-icon "expand"`} />
                      </div>
                      <div className={`top-anchor-divide expand`}></div>
                      <Anchor
                        className={`drop-anchor ${isExpand ? "expand" : ""}`}
                        items={formatFrontmatterTocForAntdAnchor(
                          frontmatter.toc,
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
              {frontmatter.toc ? (
                <>
                  <div
                    className="drop-expand"
                    onClick={() => setIsExpand(!isExpand)}
                  >
                    <span className="left-icon">
                      <img src={`${proxyPath}/icon_this_page.png`} />
                      ON THIS PAGE
                    </span>
                  </div>
                  <Anchor
                    className={`drop-anchor ${isExpand ? "expand" : ""}`}
                    targetOffset={10}
                    items={formatFrontmatterTocForAntdAnchor(
                      frontmatter.toc,
                      0
                    )}
                    getContainer={() => document.body}
                    affix={false}
                    onClick={handleAnchorClick}
                  />
                  <div className="right-anchor-divide"></div>
                  <div className="back-to-top" onClick={scrollToTop}>
                    <img src={`${proxyPath}/icon_pack_up.png`} />
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
            defaultSelectedKeys={defaultURL}
            onSelect={fileSelectHandle}
            treeData={currentCollectionDataObj}
            defaultExpandedKeys={defaultExpandedKeys}
          />
          <div className="generate-desc">
            <span>Powered By</span>
            <a href="https://www.spreading.ai/" target="_blank">
              <img src={`${proxyPath}/logo_grey.png`} alt="spreading" />
            </a>
          </div>
        </Drawer>
      </main>
    </div>
  );
};

export default PreviewLayout;
