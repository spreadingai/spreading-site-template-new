import { useContext } from "react";
import { SetContext } from "../context/setContext";

const useSet = () => {
  return useContext(SetContext);
};

export default useSet;
