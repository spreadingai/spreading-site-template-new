import { footerProps } from "@/components/footer/@types";
import { NavbarLink } from "@/components/header/@types";

interface docuoConfigType {
  themeConfig: ThemeConfig;
}

interface ThemeConfig {
  navbar: Navbar;
  footer: footerProps;
}

interface Navbar {
  logo?: string;
  title?: string;
  items: NavbarLink[];
}
export { docuoConfigType };
