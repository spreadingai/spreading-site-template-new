export interface DocuoConfig {
  title: string;
  description?: string;
  favicon: string;
  logo:
    | string
    | {
        dark?: string;
        light?: string;
      };
  url?: string;
  metadata?: Record<string, string>[];
  instances: DocInstance[];
  themeConfig: {
    [key: `navbar${string}`]: NavbarConfig;
    [key: `footer${string}`]: FooterConfig;
    colorMode?: ColorMode;
    colors?: Colors;
    removeWatermark?: boolean;
  };
  search?: {
    hidden?: boolean;
    algolia?: {
      appId: string;
      apiKey: string;
      indexName: string;
    };
  };
  analytics?: {
    ga4?: {
      measurementId: string;
    };
  };
  i18n?: {
    defaultLocale: string;
    localeConfigs: {
      [index: string]: string;
    };
  };
}
export enum InstanceType {
  All = 1,
  Normal,
  OutsideChain,
}
export enum NavBarItemType {
  Default = "default",
  DocSidebar = "docSidebar",
  Dropdown = "dropdown",
  DocsVersionDropdown = "docsVersionDropdown",
  DocsInstanceDropdown = "docsInstanceDropdown",
  Search = "search",
}
export interface NavBarItem {
  type: NavBarItemType;
  to?: string;
  href?: string;
  label?: string;
  position?: "left" | "right" | "center";
  sidebarIds?: string[];
  sidebarId?: string;
  docsInstanceId: string;
  items: NavBarItem[];
  defaultLink?: string;
}
export interface NavbarConfig {
  title: string;
  logo:
    | string
    | {
        dark?: string;
        light?: string;
      };
  iconRedirectUrl: string;
  items: NavBarItem[];
}
export interface FooterItem {
  label: string;
  to?: string;
  href?: string;
}
export interface FooterLink {
  title: string;
  items: FooterItem[];
}
export interface SocialItem {
  logo: string;
  href: string;
}
export interface FooterConfig {
  hidden?: boolean;
  logo:
    | string
    | {
        dark?: string;
        light?: string;
      };
  logoUrl?: string;
  copyright: string;
  caption: string;
  links: FooterLink[];
  socials: SocialItem[];
}
export interface ColorMode {
  defaultMode: "light" | "dark" | "system";
  disableSwitch: boolean;
}
export interface Colors {
  primaryLight: string;
  primaryDark: string;
  backgroundLight: string;
  backgroundDark: string;
}
export interface NavigationGroupInfo {
  id: string;
  name: string;
  tag?: string;
}
export interface NavigationInfo {
  group?: NavigationGroupInfo;
  category?: string[];
  platform?: string;
}
export interface DocInstance {
  id: string;
  label: string;
  path: string;
  routeBasePath: string;
  locale?: string;
  navigationInfo?: NavigationInfo;
}

export enum SidebarItemType {
  Doc = "doc",
  Link = "link",
  Category = "category",
  Autogenerated = "autogenerated",
}
export interface SidebarItem {
  type: SidebarItemType;
  dirName?: string;
  label?: string;
  id?: string;
  items?: (string | SidebarItem)[];
  to?: string;
  href?: string;

  collapsible?: boolean;
  collapsed?: boolean;
}
export interface Sidebars {
  [index: string]: (string | SidebarItem)[];
}
export interface DisplayVersion {
  version: string;
  defaultLink?: string;
}
export interface DisplayInstance {
  instance: DocInstance;
  defaultLink?: string;
}
export interface DisplayLanguage {
  language: string;
  languageLabel: string;
  defaultLink?: string;
}
export interface DisplayCategory {
  category: string;
  categoryLabel: string;
  defaultLink: string;
}
export interface DisplayGroup {
  group: string;
  groupLabel: string;
  tag?: string;
  defaultLink?: string;
}
export interface DisplayPlatform {
  platform: string;
  platformLabel: string;
  defaultLink?: string;
}
export interface SlugData {
  params: {
    slug: string[];
    instanceID: string;
    slugVersion: string;
    sidebarId: string;
  };
}

export interface TocItem {
  id: string;
  level: number;
  title: string;
  children: TocItem[];
  index?: number;
}

export enum Plan {
  None = 0,
  ProTrial = 1,
  Free = 2,
  Pro = 3,
  Enterprise = 4,
}

export interface FolderTreeItem {
  children?: FolderTreeItem[];
  docVersion: string;
  instanceID: string;
  key: string;
  slugVersion: string;
  title: string;
  type: SidebarItemType;
  id?: string;
  mdxFileID?: string;
  originID?: string;
  link?: string;
}

export interface FolderTreeData {
  children: FolderTreeItem[];
  docVersion: string;
  instanceID: string;
  key: string;
  slugVersion: string;
  title: string;
  type: SidebarItemType;
}

export interface CategoryMenuData {
  id: string;
  key: string;
  name: string;
  tag?: string;
  defaultLink?: string;
  children?: CategoryMenuData[];
}
