import { defaultLanguage } from "@/components/context/languageContext";
import LibControllerImpl from "./index";
import SlugControllerImpl from "./slug-help";
import { CategoryMenuData, DisplayGroup } from "./types";

class CategoryController {
  static _instance: CategoryController;
  static getInstance() {
    return (
      CategoryController._instance ||
      (CategoryController._instance = new CategoryController())
    );
  }
  getDisplayCategorys(
    currentLanguage: string,
    instanceID: string,
    displayGroups: DisplayGroup[]
  ) {
    const instances = LibControllerImpl.getInstances();
    const displayCategorys: CategoryMenuData[] = [];
    let currentCategory: string;
    let currentProduct: string;
    let index = 0;
    const genetateTreeData = (category, group, defaultLink) => {
      // ["Products", "ZEGO UIKits", "xxx", "xxx", ...]
      let treeData: CategoryMenuData = {
        id: category[0],
        key: `${index++}`,
        name: category[0],
        children: [],
      };
      const exist = displayCategorys.find((item) => item.id === category[0]);
      if (exist) {
        treeData = exist;
      }
      let currentLevelChildren = treeData.children;
      let key = treeData.key;
      for (let index = 1, len = category.length; index < len; index++) {
        key += `-${currentLevelChildren.length}`;
        const exist = currentLevelChildren.find(
          (item) => item.id === category[index]
        );
        let newNode: CategoryMenuData =
          index !== len - 1
            ? {
                id: category[index],
                key: `${key}`,
                name: category[index],
                children: [],
              }
            : {
                id: category[index],
                key: `${key}`,
                name: category[index],
                children: [
                  {
                    id: group.id,
                    key: `${key}-0`,
                    name: group.name,
                    tag: group.tag,
                    defaultLink,
                  },
                ],
              };
        if (exist) {
          newNode = exist;
          const groupExist = newNode.children.find(
            (item) => item.id === group.id
          );
          index === len - 1 &&
            !groupExist &&
            newNode.children.push({
              id: group.id,
              key: `${newNode.key}-${newNode.children.length}`,
              name: group.name,
              tag: group.tag,
              defaultLink,
            });
        } else {
          currentLevelChildren.push(newNode);
        }
        currentLevelChildren = newNode.children;
      }
      !exist && displayCategorys.push(treeData);
    };
    instances.forEach((instance) => {
      if (
        instanceID === instance.id &&
        instance.navigationInfo &&
        instance.navigationInfo.category
      ) {
        currentCategory = instance.navigationInfo.category[0];
        currentProduct = instance.navigationInfo.category[1];
      }
      if (
        instance.locale === currentLanguage ||
        (!instance.locale && currentLanguage === defaultLanguage)
      ) {
        const navigationInfo = instance.navigationInfo;
        if (navigationInfo && navigationInfo.category) {
          const defaultLink = displayGroups.find(
            (item) => item.group === navigationInfo.group.id
          ).defaultLink;
          const category = navigationInfo.category;
          genetateTreeData(category, navigationInfo.group, defaultLink);
        }
      }
    });
    return {
      displayCategorys,
      currentCategory,
      currentProduct,
    };
  }
}

export default CategoryController.getInstance();
