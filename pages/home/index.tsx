import Router, { useRouter } from "next/router";
import { getFolderTreeData } from "@/lib/folder-tree";

export const getStaticProps = async ({ params }) => {
  console.log(
    new Date().toISOString().slice(0, 23),
    "[Spreading] Home getStaticProps:",
    params
  );

  return {
    props: {
      treeData: await getFolderTreeData(false),
    },
  };
};

export default function Index(props) {
  const findFirstFileKey = (node) => {
    if (node && node.children && node.children.length > 0) {
      for (const child of node.children) {
        if (child.type === "file") {
          return child.key;
        } else if (child.type === "folder") {
          const firstFileKey = findFirstFileKey(child);
          if (firstFileKey) {
            return firstFileKey;
          }
        }
      }
    }
    return undefined;
  };

  if (typeof window !== "undefined") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    const { query } = router;
    const { isPreview } = query;
    const { treeData } = props;
    if (isPreview !== undefined || treeData.length === 0) {
      const url =
        isPreview === "true"
          ? `${router.basePath}/api/tree?isPreview=true`
          : `${router.basePath}/api/tree?isPreview=false`;

      console.log("router: ", router);
      fetch(url).then((response) => {
        response.json().then(({ treeData }) => {
          console.log("Fetch fullTreeData from api:", treeData);
          const firstProject = treeData[0];
          const firstVersion = firstProject.children[0];
          const firstLanguage = firstVersion && firstVersion.children[0];
          const firstPlatform = firstLanguage && firstLanguage.children[0];
          const firstFileKey = firstPlatform && findFirstFileKey(firstPlatform);
          console.log("firstFileKey", firstFileKey);
          if (firstFileKey) {
            Router.push("/" + firstFileKey);
          }
        });
      });
    } else {
      console.log("Fetch fullTreeData from static props: ", treeData);
      const firstProject = treeData[0];
      const firstVersion = firstProject.children[0];
      const firstLanguage = firstVersion && firstVersion.children[0];
      const firstPlatform = firstLanguage && firstLanguage.children[0];
      const firstFileKey = firstPlatform && findFirstFileKey(firstPlatform);
      console.log("firstFileKey", firstFileKey);
      if (firstFileKey) {
        Router.push("/" + firstFileKey);
      }
    }
  }

  return <div />;
}
