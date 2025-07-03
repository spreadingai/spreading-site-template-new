import { useContext } from "react";
import { TabContext } from "../context/tabContext";

const useTab = () => {
  return useContext(TabContext);
};

export default useTab;
