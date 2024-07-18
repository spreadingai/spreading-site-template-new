import { PaginationData } from "@/components/articlePager";
import SlugControllerImpl from "./slug-help";

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
          const temp = nextData.params.slug[
            nextData.params.slug.length - 1
          ].replaceAll("-", " ");
          result.next.description =
            temp.charAt(0).toUpperCase() + temp.slice(1);
        }
        if (prevData && prevData.params.instanceID === params.instanceID) {
          result.prev.href = prevData.params.slug.join("/");
          const temp = prevData.params.slug[
            prevData.params.slug.length - 1
          ].replaceAll("-", " ");
          result.prev.description =
            temp.charAt(0).toUpperCase() + temp.slice(1);
        }
        break;
      }
    }
    return result;
  }
}

export default PageController.getInstance();
