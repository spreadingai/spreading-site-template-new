import fs from "fs";
import path from "path";
import PreviewLayout from "@/components/PreviewLayout";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkMdxImages from "remark-mdx-images";
import remarkImages from "remark-images";
import remarkGfm from "remark-gfm";
import {
  SH,
  STitle,
  SImage,
  SCodeBlock,
  SCodeBlockTab,
  SCallout,
  SCalloutHeader,
  SCalloutContent,
  STable,
  STableRow,
  STableHeader,
  STableCell,
  SVideo,
  SQuote,
} from "listen-test-ui";
import { visit } from "unist-util-visit";

const UUID = "37e7bcb6-4fa7-431d-b11c-df9a1c26cf62";

const components = {
  SH,
  STitle,
  SImage,
  SCodeBlock,
  SCodeBlockTab,
  SCallout,
  SCalloutHeader,
  SCalloutContent,
  STable,
  STableRow,
  STableHeader,
  STableCell,
  SVideo,
  SQuote,
};

interface Props {
  mdxSource: MDXRemoteSerializeResult;
}

export default function RemoteMdxPage({ mdxSource, ...props }: Props) {
  console.log(`[RemoteMdxPage]frontmatter `, mdxSource.frontmatter);
  return (
    <div className="prose" style={{ maxWidth: "unset" }}>
      <article className="editor-wrapper">
        <MDXRemote {...mdxSource} components={components} />
      </article>
    </div>
  );
}

export async function getStaticProps({ params }) {
  let originContent = fs.readFileSync(
    path.resolve("./mdxs", "test.mdx"),
    "utf8"
  );
  originContent = originContent
    .replace(
      /```(\S*?\s)([\s\S]*?)(```)(?=\n<\/SCodeBlock>)/gm,
      (_, lang, code) => {
        code = code.replace(/```/g, UUID);
        return "```" + lang + code + "```";
      }
    )
    .replaceAll("&nbsp;", " ");
  console.log(`[RemoteMdxPage]getStaticProps `, originContent);

  const myRemarkPlugin = () => {
    return function (tree) {
      visit(tree, "code", function (node) {
        if (typeof node.value === "string") {
          node.value = node.value.replaceAll(UUID, "```");
        }
      });
    };
  };
  const mdxSource = await serialize(originContent, {
    mdxOptions: {
      remarkPlugins: [remarkImages, myRemarkPlugin],
      rehypePlugins: [],
      format: "mdx",
      useDynamicImport: true,
    },
    parseFrontmatter: true,
  });
  return {
    props: {
      mdxSource,
    },
  };
}

// RemoteMdxPage.getLayout = function getLayout(page, pageProps) {
//   return <PreviewLayout {...pageProps}>{page}</PreviewLayout>;
// };
