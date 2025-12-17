import { defaultLanguage } from "@/components/context/languageContext";
import LibControllerImpl from "./index";
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
    const instanceGroups = LibControllerImpl.getInstanceGroups();
    const displayCategorys: CategoryMenuData[] = [];
    let currentCategory: string = "";
    let currentProduct: string = "";
    let index = 0;

    // 获取当前实例的导航信息
    const currentNavInfo = LibControllerImpl.getNavigationInfoByInstanceId(instanceID);
    if (currentNavInfo.category) {
      currentCategory = currentNavInfo.category[0] || "";
      currentProduct = currentNavInfo.category[1] || "";
    }

    const genetateTreeData = (
      category: string[],
      group: { id: string; name: string; tag?: string },
      defaultLink: string,
      visible: boolean
    ) => {
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
      for (let i = 1, len = category.length; i < len; i++) {
        key += `-${currentLevelChildren.length}`;
        const exist = currentLevelChildren.find(
          (item) => item.id === category[i]
        );
        let newNode: CategoryMenuData =
          i !== len - 1
            ? {
                id: category[i],
                key: `${key}`,
                name: category[i],
                children: [],
              }
            : {
                id: category[i],
                key: `${key}`,
                name: category[i],
                children: [
                  {
                    id: group.id,
                    key: `${key}-0`,
                    name: group.name,
                    tag: group.tag || null,
                    defaultLink,
                    visible: visible !== false,
                  },
                ],
              };
        if (exist) {
          newNode = exist;
          const groupExist = newNode.children.find(
            (item) => item.id === group.id
          );
          i === len - 1 &&
            !groupExist &&
            newNode.children.push({
              id: group.id,
              key: `${newNode.key}-${newNode.children.length}`,
              name: group.name,
              tag: group.tag || null,
              defaultLink,
              visible: visible !== false,
            });
        } else {
          currentLevelChildren.push(newNode);
        }
        currentLevelChildren = newNode.children;
      }
      !exist && displayCategorys.push(treeData);
    };

    // 遍历 instanceGroups 生成分类树
    instanceGroups.forEach((group) => {
      // 检查该 group 是否有当前语言的实例
      const groupInstances = group.instances || [];
      const hasLocaleInstance = groupInstances.some((groupInst) => {
        const inst = instances.find((i) => i.id === groupInst.id);
        return inst && (inst.locale === currentLanguage || (!inst.locale && currentLanguage === defaultLanguage));
      });

      if (!hasLocaleInstance) return;
      if (!group.category) return;

      // 找到该 group 对应的 defaultLink
      const displayGroup = displayGroups.find((item) => item.group === group.id);
      const defaultLink = displayGroup?.defaultLink || "";

      // 找到该 group 下任一实例的 visible 属性
      const firstGroupInst = groupInstances.find((groupInst) => {
        const inst = instances.find((i) => i.id === groupInst.id);
        return inst && (inst.locale === currentLanguage || (!inst.locale && currentLanguage === defaultLanguage));
      });
      const firstInstance = firstGroupInst ? instances.find((i) => i.id === firstGroupInst.id) : null;
      const visible = firstInstance?.visible !== false;

      genetateTreeData(
        group.category,
        { id: group.id, name: group.name, tag: group.tag || null },
        defaultLink,
        visible
      );
    });

    return {
      displayCategorys,
      currentCategory,
      currentProduct,
    };
  }
}

export default CategoryController.getInstance();
