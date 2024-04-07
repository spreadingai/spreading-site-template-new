import { useContext } from "react";
import ThemeContext from "@/components/header/Theme.context";

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
