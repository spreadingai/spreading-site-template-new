import { PaginationData } from "@/components/articlePager";
import SlugControllerImpl from "./slug-help";
import SidebarsControllerImpl from "./sidebars-help";
import { SidebarItem } from "./types";

class PageController {
  static _instance: PageController;
  static getInstance() {
    return (
      PageController._instance ||
      (PageController._instance = new PageController())
    );
  }
  getPageTurningData(slug: string[]) {
    const result: { prev: PaginationData; next: PaginationData } = {
      prev: { description: "", href: "" },
      next: { description: "", href: "" },
    };
    const allSlugs = SlugControllerImpl.getAllSlugs();
    for (let index = 0, len = allSlugs.length; index < len; index++) {
      const element = allSlugs[index];
      const params = element.params;
      if (params.slug.toString() === slug.toString()) {
        const nextData = allSlugs[index + 1];
        const prevData = allSlugs[index - 1];
        if (nextData && nextData.params.instanceID === params.instanceID) {
          result.next.href = nextData.params.slug.join("/");

          const description = this.findSitebarItemLabel(nextData.params.slug);
          if (!description) {
            const temp = nextData.params.slug[
              nextData.params.slug.length - 1
            ].replaceAll("-", " ");
            result.next.description =
              temp.charAt(0).toUpperCase() + temp.slice(1);
          } else {
            result.next.description = description;
          }
        }
        if (prevData && prevData.params.instanceID === params.instanceID) {
          result.prev.href = prevData.params.slug.join("/");

          const description = this.findSitebarItemLabel(prevData.params.slug);
          if (!description) {
            const temp = prevData.params.slug[
              prevData.params.slug.length - 1
            ].replaceAll("-", " ");
            result.prev.description =
              temp.charAt(0).toUpperCase() + temp.slice(1);
          } else {
            result.prev.description = description;
          }
        }
        break;
      }
    }
    return result;
  }
  findSitebarItemLabel(slug) {
    let targetLabel = "";
    const { instanceID, docVersion, mdxFileID } =
      SlugControllerImpl.getExtractInfoFromSlug(slug);
    const sidebars = SidebarsControllerImpl.getSidebars(instanceID, docVersion);
    const temp = mdxFileID.split("/");
    const arr = Object.values(sidebars)[0] as SidebarItem[];
    const loop = (list: SidebarItem[], level) => {
      if (targetLabel) return false;
      for (let index = 0, len = list.length; index < len; index++) {
        const element = list[index];
        if (element.id === mdxFileID) {
          targetLabel = element.label;
          return false;
        } else {
          if (element.items) {
            const result = loop(element.items as SidebarItem[], level + 1);
            if (result === false) return false;
          }
        }
      }
    };
    loop(arr, 1);
    return targetLabel;
  }
}

export default PageController.getInstance();
