import { useContext } from "react";
import styles from "./ThemeSwitch.module.scss";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useMediaQuery } from "usehooks-ts";
import IconLight from "@/assets/icons/header/icon_light.svg";
import IconDark from "@/assets/icons/header/icon_dark.svg";
import IconSystem from "@/assets/icons/header/icon_system.svg";
import ThemeContext, { Theme } from "@/components/header/Theme.context";

const THEME_KEY = "theme";

interface ThemeSwitchProps {
  className?: string;
}

const ModeList = [
  {
    name: "Light",
    value: "light",
    icon: <IconLight />,
  },
  {
    name: "Dark",
    value: "dark",
    icon: <IconDark />,
  },
  {
    name: "System",
    value: "system",
    icon: <IconSystem />,
  },
];
const ThemeSwitch = (props: ThemeSwitchProps) => {
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
    className: `${styles.modeItem} ${item.value === theme ? styles.active : ""}`
  }));

  return (
    <div className={`${styles.colorModeToggle} ${className}`}>
      <Dropdown
        trigger={["click"]}
        menu={{ items, className: styles.modesWrapper, onClick: handleThemeChanged }}
        placement="bottomLeft"
      >
        <button className={styles.toggleButton}>
          <IconLight className={styles.lightToggleIcon} />
          <IconDark className={styles.darkToggleIcon} />
        </button>
      </Dropdown>
    </div>
  );
}

export default ThemeSwitch;