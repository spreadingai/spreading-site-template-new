interface NavBarItem {
  type?: "default" | "dropdown";
  key: string;
  label: React.ReactNode;
  to?: string;
  href?: string;
  items?: NavbarLink[];
  position?: "left" | "right";
  defaultLink?: string;
  // target?: string; TODO: is this it need?
}
export type NavbarLink = NavBarItem &
  (Required<Pick<NavBarItem, "to">> | Required<Pick<NavBarItem, "href">>);
