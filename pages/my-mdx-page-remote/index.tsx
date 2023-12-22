import fs from "fs";
import path from "path";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Blockquote from "../../components/Blockquote";
import remarkMdxImages from "remark-mdx-images";
import remarkImages from "remark-images";
import remarkGfm from "remark-gfm";

const Para = (props: any) => (
  <div className="custom para">{props.children}</div>
);
const components = { Blockquote, p: Para };

interface Props {
  mdxSource: MDXRemoteSerializeResult;
}

export default function RemoteMdxPage({ mdxSource, ...props }: Props) {
  console.log(`[RemoteMdxPage]frontmatter `, mdxSource.frontmatter);
  return (
    <>
      <MDXRemote {...mdxSource} components={components} />
    </>
  );
}

export async function getStaticProps() {
  const originContent = fs.readFileSync(
    path.resolve("./mdxs", "github.mdx"),
    "utf8"
  );
  console.log(`[RemoteMdxPage]getStaticProps `, originContent);

  const mdxSource = await serialize(originContent, {
    mdxOptions: {
      remarkPlugins: [remarkImages],
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
