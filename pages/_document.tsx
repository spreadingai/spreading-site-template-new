import { Html, Head, Main, NextScript } from "next/document";
import CommonMeta from "@/components/meta/CommonMeta";
import Script from "next/script";
import LibControllerImpl from "@/lib/index";

export default function Document() {
  const docuoConfig = LibControllerImpl.getDocuoConfig();
  const { analytics = {} } = docuoConfig;
  const { baidu = {} } = analytics;
  const { tongjiID } = baidu;
  let baiduTongjiStr = tongjiID
    ? `var _hmt = _hmt || [];(function() {var hm = document.createElement('script'); hm.src = 'https://hm.baidu.com/hm.js?${tongjiID}'; hm.async = true; hm.onerror = function() { console.warn('Baidu Analytics failed to load'); }; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(hm, s);})();`
    : "";

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
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: baiduTongjiStr,
            }}
          />
        ) : null}
      </body>
    </Html>
  );
}
