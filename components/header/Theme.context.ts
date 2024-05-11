import React from "react";

export type Theme = "light" | "dark" | "system";
const ThemeContext = React.createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: "light",
  setTheme: () => {},
});

export default ThemeContext;