import { useContext } from "react";
import { CategoryContext } from "../context/categoryContext";

const useCategory = () => {
  return useContext(CategoryContext);
};

export default useCategory;
