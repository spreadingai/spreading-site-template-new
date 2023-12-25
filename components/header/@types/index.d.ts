interface NavBarItem {
  type?: "default" | "dropdown";
  label: React.ReactNode;
  to?: string;
  href?: string;
  items?: NavbarLink[];
  position?: "left" | "right";
  // target?: string; TODO: is this it need?
}
export type NavbarLink = NavBarItem &
  (Required<Pick<NavBarItem, "to">> | Required<Pick<NavBarItem, "href">>);