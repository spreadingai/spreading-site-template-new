import { useContext } from "react";
import styles from "./ThemeSwitch.module.scss";
import LightThemeIcon from "@/assets/icons/header/icon_light.svg";
import DarkThemeIcon from "@/assets/icons/header/icon_dark.svg";
import ThemeContext from "@/components/header/Theme.context";

const THEME_KEY = "theme";

interface ThemeSwitchProps {
  className?: string;
}

const ThemeSwitch = (props: ThemeSwitchProps) => {
  const { className = "" } = props;
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    const targetTheme = theme === "light" ? "dark" : "light";
    setTheme(targetTheme);
    localStorage.setItem(THEME_KEY, targetTheme);
  };

  return (
    <div className={`${styles.colorModeToggle} ${className}`}>
      <button onClick={toggleTheme} className={styles.toggleButton}>
        <LightThemeIcon className={styles.lightToggleIcon} />
        <DarkThemeIcon className={styles.darkToggleIcon} />
      </button>
    </div>
  )
}

export default ThemeSwitch;