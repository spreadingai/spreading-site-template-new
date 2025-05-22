import { DocuoConfig } from "@/lib/types";

interface FooterLinkItem {
  label: string;
  to?: string;
  href?: string;
}

type FooterLink = FooterLinkItem &
  (
    | Required<Pick<FooterLinkItem, "to">>
    | Required<Pick<FooterLinkItem, "href">>
  );

interface Socials {
  logo:
    | string
    | "X"
    | "Twitter"
    | "Facebook"
    | "Linkedin"
    | "Github"
    | "Youtube"
    | "Discord";
  href: string;
}
export interface FooterLinkGroup {
  title?: string;
  items: FooterLink[];
}
export interface footerProps {
  docuoConfig: DocuoConfig;
  logo?: string;
  copyright?: string | FooterLinkItem;
  caption?: string;
  links: FooterLinkGroup[];
  socials: Socials[];
  policies?: FooterLinkItem[];
}
