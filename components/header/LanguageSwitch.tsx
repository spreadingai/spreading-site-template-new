import { useContext } from "react";
import styles from "./ThemeSwitch.module.scss";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useMediaQuery } from "usehooks-ts";
import IconLanguageNorLight from "@/assets/icons/header/icon_language_nor_light.svg";
import IconLanguageNorDark from "@/assets/icons/header/icon_language_nor_dark.svg";
import ThemeContext, { Theme } from "@/components/header/Theme.context";

const THEME_KEY = "theme";

interface LanguageSwitchProps {
  className?: string;
}

const ModeList = [
  {
    name: "Light",
    value: "light",
  },
  {
    name: "Dark",
    value: "dark",
  },
  {
    name: "System",
    value: "system",
  },
];
const LanguageSwitch = (props: LanguageSwitchProps) => {
  const { className = "" } = props;
  const { theme, setTheme } = useContext(ThemeContext);
  const isMobile = useMediaQuery(`(max-width: 1024px)`);

  const handleThemeChanged: MenuProps["onClick"] = ({ key: theme }) => {
    setTheme(theme as Theme);
    localStorage.setItem(THEME_KEY, theme);
  };

  const items = ModeList.map((item) => ({
    key: item.value,
    icon: isMobile ? null : item.icon,
    label: <span>{item.name}</span>,
    className: `${styles.modeItem} ${
      item.value === theme ? styles.active : ""
    }`,
  }));

  return (
    <div className={`${styles.colorModeToggle} ${className}`}>
      <Dropdown
        trigger={["click"]}
        menu={{
          items,
          className: styles.modesWrapper,
          onClick: handleThemeChanged,
        }}
        placement="bottomLeft"
      >
        <button className={styles.toggleButton}>
          <IconLanguageNorLight className={styles.lightToggleIcon} />
          <IconLanguageNorDark className={styles.darkToggleIcon} />
        </button>
      </Dropdown>
    </div>
  );
};

export default LanguageSwitch;
