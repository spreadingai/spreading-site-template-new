import { Html, Head, Main, NextScript } from "next/document";
import CommonMeta from "@/components/meta/CommonMeta";
import Script from "next/script";
import LibControllerImpl from "@/lib/index";

export default function Document() {
  const docuoConfig = LibControllerImpl.getDocuoConfig();
  const { analytics = {} } = docuoConfig;
  const baiduTongjiStr = analytics["baidu-tongji"];
  return (
    <Html lang="en">
      <Head>
        <CommonMeta />
      </Head>
      <body>
        <Main />
        <NextScript />
        {baiduTongjiStr ? (
          <Script
            id="baidu-tongji"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: baiduTongjiStr,
            }}
          />
        ) : null}
      </body>
    </Html>
  );
}
