import { useEffect } from "react";
import { Theme } from "../header/Theme.context";

const useColorMode = (colorMode, theme, setTheme) => {
  useEffect(() => {
    if (["dark", "light"].includes(theme)) {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);

  useEffect(() => {
    const themeEnabled = colorMode?.disableSwitch === false;
    if (!themeEnabled) return;
    const THEME_KEY = "theme";
    let defaultTheme: Theme = "light";
    const localTheme = localStorage.getItem(THEME_KEY) || "";
    if (["dark", "light"].includes(localTheme)) {
      defaultTheme = localTheme as Theme;
    } else if (colorMode?.respectPrefersColorScheme) {
      const isDarkPrefer = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')?.matches;
      defaultTheme = isDarkPrefer ? "dark" : "light";
    } else if (["dark", "light"].includes(colorMode?.defaultMode)) {
      defaultTheme = colorMode?.defaultMode;
    }
    setTheme(defaultTheme);
  }, [colorMode]);
}

export default useColorMode;