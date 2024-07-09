import LibControllerImpl from "./index";
import SlugControllerImpl from "./slug-help";
import { DisplayPlatform, InstanceType, NavigationInfo } from "./types";

class CategoryController {
  static _instance: CategoryController;
  static getInstance() {
    return (
      CategoryController._instance ||
      (CategoryController._instance = new CategoryController())
    );
  }
  getCategoryGroups(slug: string[]) {}
}

export default CategoryController.getInstance();
