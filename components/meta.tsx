import Head from "next/head";
import { CMS_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
import LibControllerImpl from "@/lib/index";

const Meta = () => {
  const docuoConfig = LibControllerImpl.getDocuoConfig();
  const favicon = `/${docuoConfig.favicon}` || "/favicon/favicon.ico";
  console.log(`Meta favicon`, favicon);
  return (
    <>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={favicon || "/favicon/apple-touch-icon.png"}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={favicon || "/favicon/favicon-32x32.png"}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={favicon || "/favicon/favicon-16x16.png"}
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href={favicon} />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta
        name="description"
        content={`A statically generated blog example using Next.js and ${CMS_NAME}.`}
      />
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />
    </>
  );
};

export default Meta;
