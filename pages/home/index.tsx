import Router, { useRouter } from "next/router";
import {
  getDocuoConfig,
  getSidebars,
  getUsedVersions,
  traverseChildren,
} from "@/lib/docs";
import { NavBarItemType, SidebarItem } from "@/lib/types";

interface Props {
  slug: string[];
}

export const getStaticProps = async () => {
  console.log(
    new Date().toISOString().slice(0, 23),
    "[Spreading] Home getStaticProps:"
  );
  const docuoConfig = getDocuoConfig();
  const { themeConfig, instances } = docuoConfig;
  const instanceID = instances[0].id;
  const routeBasePath = instances[0].routeBasePath;
  const version = getUsedVersions(instanceID)[0];
  const { navbar } = themeConfig;
  const docNavBarItem = navbar.items.filter(
    (item) => item.type === NavBarItemType.DocSidebar
  )[0];
  const sidebarId = docNavBarItem.sidebarIds[0];
  const sidebarItemList = getSidebars(instanceID, version)[
    sidebarId
  ] as SidebarItem[];
  let preSlug = [routeBasePath];
  version && (preSlug = preSlug.concat([version]));
  const slug = traverseChildren(
    instanceID,
    version,
    sidebarId,
    sidebarItemList,
    preSlug
  )[0].params.slug;
  console.log(`[Home]getStaticProps slug: `, slug);
  return {
    props: {
      slug,
    },
  };
};

export default function Index({ slug }: Props) {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    router.replace(`/${slug.join("/")}`);
  }

  return <div />;
}
