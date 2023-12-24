import Router, { useRouter } from "next/router";
import { getFolderTreeData } from '../../../lib/folder-tree'

export const getStaticProps = async ({ params }) => {
    console.log(new Date().toISOString().slice(0, 23), '[Spreading] Home preview getStaticProps:', params)

    return {
        props: {
            treeData: await getFolderTreeData(true)
        },
    };
};

export default function Index({ treeData }) {

    const findFirstFileKey = (node) => {
        if (node && node.children && node.children.length > 0) {
            for (const child of node.children) {
                if (child.type === "file") {
                    return child.key
                } else if (child.type === "folder") {
                    const firstFileKey = findFirstFileKey(child)
                    if (firstFileKey) {
                        return firstFileKey
                    }
                }
            }

        }
        return undefined;
    }

    if (typeof window !== "undefined") {
        const router = useRouter();

        console.log('Fetch fullTreeData from static props:', treeData);
        if (treeData.length === 0) {
            return (<div/>)
        }
        const firstProject = treeData[0]
        const firstVersion = firstProject.children[0]
        const firstLanguage = firstVersion && firstVersion.children[0]
        const firstPlatform = firstLanguage && firstLanguage.children[0]
        const firstFileKey = firstPlatform && findFirstFileKey(firstPlatform)
        console.log('firstFileKey', firstFileKey);
        if (firstFileKey) {
            Router.push('/' + firstFileKey);
        }
    }

    return (
        <div />
    );
}
