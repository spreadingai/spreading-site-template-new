import { defaultLanguage } from "@/components/context/languageContext";
import LibControllerImpl from "./index";
import SlugControllerImpl from "./slug-help";

interface MenuData {
  key: string;
  name: string;
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
  getDisplayCategorys(slug: string[], currentLanguage: string) {
    const result: MenuData[] = [];
    const instances = LibControllerImpl.getInstances();
    instances.forEach((instance) => {
      if (
        instance.locale === currentLanguage ||
        (!instance.locale && currentLanguage === defaultLanguage)
      ) {
        const navigationInfo = instance.navigationInfo;
        if (navigationInfo && navigationInfo.category) {
          navigationInfo.category.forEach((item) => {
            const exist = result.find((element) => element.key === item);
            exist &&
              result.push({
                key: item,
                name: item,
              });
          });
        }
      }
    });
  }
}

export default CategoryController.getInstance();
