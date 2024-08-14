import { Html, Head, Main, NextScript } from "next/document";
import CommonMeta from "@/components/meta/CommonMeta";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <CommonMeta />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
