import { Menu } from "../../../types/Menu";
import { getTreePlatformLangList } from "../data/platformList";

export class DataUtil {
  static locale: string;
  static setLocale(locale: string) {
    DataUtil.locale = locale;
  }
  static getMenuById(id: number, data: Menu[]) {
    let _item: Menu = {} as Menu;

    const reverseMenu = (id: number, data: Menu[]) => {
      for (const item of data) {
        if (item.id === id) {
          _item = item;
          // console.log("getItemById", item, _item);
          break;
        } else if (item.children && item.children.length > 0) {
          reverseMenu(id, item.children);
        }
      }
    };

    reverseMenu(id, data);

    return _item;
  }
  static getMenuByPath(params: any, data: Menu[]) {
    let _item: Menu = {} as Menu;
    const { product = "", docKey = "", platform = "", language = "" } = params;
    const getTargetDocs = (menu) => {
      if (menu?.children) {
        for (const item of menu.children) {
          if (item.type === "docs" && docKey === item.routeKey) {
            return item;
          } else if (item.type === "dic") {
            const res = getTargetDocs(item);
            if (res) return res;
          }
        }
      }

      return null;
    };

    const getDefaultPlatformLanguage = (docsChildren = []) => {
      const KeyItemMap = docsChildren.reduce((acc, cur) => {
        acc[cur.key] = cur;
        return acc;
      }, {});
      for (const item of getTreePlatformLangList(DataUtil.locale)) {
        for (const language of item.langs) {
          const key = `${item.value}_${language}`;
          if (KeyItemMap[key]) {
            return KeyItemMap[key];
          }
        }
      }

      if (KeyItemMap.all) return KeyItemMap.all;
      return null;
    };

    const productItem = data.find((x: any) => x.routeKey === product);
    if (productItem) {
      const docs = getTargetDocs(productItem);
      if (docs) {
        let children = docs.children || [];
        if (!platform || !language) {
          if (platform)
            children = children.filter((x) => x.key.startsWith(platform + "_"));
          _item = getDefaultPlatformLanguage(children);
        } else if (platform === "all") {
          _item = children.find((x) => x.key === "all") || children[0];
        } else {
          _item =
            children.find((x) => x.key === platform + "_" + language) ||
            children[0];
        }
      }
    }

    return _item;
  }
}
