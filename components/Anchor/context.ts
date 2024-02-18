import * as React from 'react';
export interface DocuoAnchor {
  registerLink: (link: string) => void;
  unregisterLink: (link: string) => void;
  activeLink: string | null;
  scrollTo: (link: string) => void;
  // onClick?: (
  //   e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  //   link: { title: React.ReactNode; href: string },
  // ) => void;
}
const AnchorContext = React.createContext<DocuoAnchor | undefined>(undefined);

export default AnchorContext;
