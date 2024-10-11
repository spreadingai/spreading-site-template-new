import { Dispatch, SetStateAction, createContext } from "react";
import { CategoryMenuData } from "@/lib/types";

type CategoryContentType = {
  currentCategory: string;
  currentProduct: string;
  displayCategorys: CategoryMenuData[];
  setCurrentCategory?: Dispatch<SetStateAction<string>>;
  setCurrentProduct?: Dispatch<SetStateAction<string>>;
  setDisplayCategorys?: Dispatch<SetStateAction<CategoryMenuData[]>>;
};

export const defaultCurrentCategory: string = "Products";
export const defaultCurrentProduct: string = "ZEGO UIKits";
export const defaultDisplayCategorys: [] = [];

export const CategoryContext = createContext<CategoryContentType>({
  currentCategory: defaultCurrentCategory,
  currentProduct: defaultCurrentProduct,
  displayCategorys: defaultDisplayCategorys,
  setDisplayCategorys: (displayCategory) => displayCategory,
  setCurrentCategory: (currentCategory) => currentCategory,
  setCurrentProduct: (currentProduct) => currentProduct,
});
