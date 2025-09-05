import * as React from 'react';
export interface DocuoAnchor {
  registerLink: (link: string) => void;
  unregisterLink: (link: string) => void;
  activeLink: string | null;
  scrollTo: (link: string) => void;
  // 主动设置当前激活的锚点（用于目标在隐藏Tab/Accordion时，仍需立即高亮TOC）
  setActiveLink?: (link: string) => void;
  // onClick?: (
  //   e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  //   link: { title: React.ReactNode; href: string },
  // ) => void;
}
const AnchorContext = React.createContext<DocuoAnchor | undefined>(undefined);

export default AnchorContext;
