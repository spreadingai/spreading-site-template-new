import { useContext, useEffect } from "react";
import styles from "./ThemeSwitch.module.scss";
import { DocuoConfig, ColorMode } from "@/lib/types";
import LightThemeIcon from "@/assets/icons/header/icon_light.svg";
import DarkThemeIcon from "@/assets/icons/header/icon_dark.svg";
import ThemeContext, { Theme } from "@/components/header/Theme.context";

interface ThemeSwitchProps {
  docuoConfig: DocuoConfig;
}

const THEME_KEY = "theme";

const ThemeSwitch = (props: ThemeSwitchProps) => {
  const { docuoConfig } = props;
  const colorMode: ColorMode = docuoConfig?.themeConfig?.colorMode;
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    let defaultTheme: Theme = "light";
    const localTheme = localStorage.getItem(THEME_KEY);
    if (["dark", "light"].includes(localTheme)) {
      defaultTheme = localTheme as Theme;
    } else if (colorMode?.respectPrefersColorScheme) {
      const isDarkPrefer = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')?.matches;
      defaultTheme = isDarkPrefer ? "dark" : "light";
    } else if (["dark", "light"].includes(colorMode?.defaultMode)) {
      defaultTheme = colorMode?.defaultMode;
    }
    setTheme(defaultTheme);
  }, []);

  useEffect(() => {
    if (["dark", "light"].includes(theme)) {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);

  const toggleTheme = () => {
    const targetTheme = theme === "light" ? "dark" : "light";
    setTheme(targetTheme);
    localStorage.setItem(THEME_KEY, targetTheme);
  };

  return (
    <div onClick={toggleTheme} className={styles.colorModeToggle}>
      <button className={styles.toggleButton}>
        <LightThemeIcon className={styles.lightToggleIcon} />
        <DarkThemeIcon className={styles.darkToggleIcon} />
      </button>
    </div>
  )
}

export default ThemeSwitch;