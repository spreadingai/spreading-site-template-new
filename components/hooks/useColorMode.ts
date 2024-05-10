import { useEffect } from "react";
import { Theme } from "../header/Theme.context";

const useColorMode = (colorMode, theme, setTheme) => {
  useEffect(() => {
    if (["dark", "light"].includes(theme)) {
      document.documentElement.dataset.theme = theme;
    }
    if (theme === "system") {
      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')?.matches;
      document.documentElement.dataset.theme = isDarkMode ? "dark" : "light";
    }
  }, [theme]);

  useEffect(() => {
    const THEME_KEY = "theme";
    let defaultTheme: Theme = "light";
    const localTheme = localStorage.getItem(THEME_KEY) || "";
    if (["dark", "light", "system"].includes(localTheme)) {
      defaultTheme = localTheme as Theme;
    } else if (["dark", "light", "system"].includes(colorMode?.defaultMode)) {
      defaultTheme = colorMode?.defaultMode;
    }
    setTheme(defaultTheme);
  }, [colorMode]);
}

export default useColorMode;