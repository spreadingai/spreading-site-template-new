import { defaultLanguage } from "@/components/context/languageContext";
import LibControllerImpl from "./index";
import SlugControllerImpl from "./slug-help";
import { DisplayGroup } from "./types";

interface MenuData {
  key: string;
  name: string;
  tag?: string;
  defaultLink?: string;
  children?: MenuData[];
}

class CategoryController {
  static _instance: CategoryController;
  static getInstance() {
    return (
      CategoryController._instance ||
      (CategoryController._instance = new CategoryController())
    );
  }
  getDisplayCategorys(
    slug: string[],
    currentLanguage: string,
    currentGroup: string,
    displayGroups: DisplayGroup[]
  ) {
    let result: MenuData[] = [];
    const tree = { children: [] };
    let currentLevel = tree.children;
    const instances = LibControllerImpl.getInstances();
    instances.forEach((instance) => {
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
          for (let index = 0, len = category.length; index < len; index++) {
            const item = category[index];
            let newNode;
            // if (index === len - 1) {
            //   newNode = {
            //     key: navigationInfo.group.id,
            //     name: navigationInfo.group.name,
            //     tag: navigationInfo.group.tag,
            //     defaultLink,
            //     children: [],
            //   };
            // } else {
            newNode = {
              key: item,
              name: item,
              children: [],
            };
            // }
            currentLevel.push(newNode);
            currentLevel = newNode.children;
          }
          result = result.concat(currentLevel);

          // const categoryExist = result.find(
          //   (element) => element.key === item
          // );
          // if (categoryExist) {
          //   const groupExist = categoryExist.children.find(
          //     (element) => element.key === navigationInfo.group.id
          //   );
          //   if (!groupExist) {
          //     categoryExist.children.push({
          //       key: navigationInfo.group.id,
          //       name: navigationInfo.group.name,
          //       tag: navigationInfo.group.tag,
          //       defaultLink,
          //     });
          //   }
          // } else {
          //   result.push({
          //     key: item,
          //     name: item,
          //     children: [
          //       {
          //         key: navigationInfo.group.id,
          //         name: navigationInfo.group.name,
          //         tag: navigationInfo.group.tag,
          //         defaultLink,
          //       },
          //     ],
          //   });
          // }
        }
      }
    });
    return result;
  }
}

export default CategoryController.getInstance();
