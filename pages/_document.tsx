import { Html, Head, Main, NextScript } from "next/document";
import Meta from "@/components/meta";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Meta />
      </Head>
      <body className="scrollbar-thin scrollbar-thumb-sidebar-scrollbar scrollbar-track-transparent">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
