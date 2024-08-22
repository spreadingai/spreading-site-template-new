import { useContext } from "react";
import ThemeContext from "../header/Theme.context";

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
